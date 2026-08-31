# FA-1: Move current site into random/ and turn index.html into a breakpoint router (random at 800-900px)

Complexity: low-medium. No build step — this is a GitHub Pages static site (branch `liquid`, repo root = site root, domain forrestalmasi.com via `CNAME`).

## Context

The site (forrestalmasi.com) is being revamped: root `index.html` will serve an ENTIRELY DIFFERENT sub-site depending on desktop viewport-width bucket (every 100px), plus mobile portrait/landscape variants later. Each sub-site is a self-contained static folder (`random/`, `memphis/`, `liquid/` — the latter two currently contain only empty `BRANDING.md` placeholders). This task is step one: move today's site (the random-colors site) into `random/`, and make root `index.html` a breakpoint router that serves `random/` for the 800–900px bucket and falls back to `random/` everywhere else so the live site never breaks.

## Chosen routing mechanism: full-viewport iframe, src swapped on resize

**Decision: a single full-viewport `<iframe>` in the root page, whose `src` is set by a small inline router script based on viewport width, and re-evaluated on `resize`.**

Rationale, vs. the alternatives:

- **JS redirect (`location.replace('/random/')`)** — rejected. It changes the visible URL (breaks the "one URL, many sites" novelty), a resize mid-visit would require every sub-site to embed the router and hard-navigate back and forth (full page reloads, history churn, flicker), and canonical/OG tags at root would point at a page users never stay on.
- **fetch + innerHTML injection** — rejected. Sub-site scripts/styles would execute in the root document, so sub-sites would not be self-contained (script/style collisions between sites; the current `script.js` grabs `document.querySelectorAll('section')` globally — it must own its document).
- **iframe** — chosen. The root URL never changes; live-switching on resize is just swapping `iframe.src` (the core novelty appeal); each sub-site remains a genuinely standalone document (own `<head>`, CSS, JS — no namespace collisions); SEO/OG/Twitter meta stays on the root page which is what crawlers and unfurlers fetch; and CSS viewport units + media queries *inside* the iframe resolve against the iframe's own box, which we make exactly the viewport, so sub-sites behave identically to being served standalone. `mailto:` links, touch events, etc. all work inside iframes. Known tradeoff (acceptable): crawlers see little body content at root — the meta tags carry the SEO payload, same as today (today's body is 5 empty `<section>`s anyway).

The iframe gets a static default `src="./random/"` in the HTML itself, so with JS disabled (or before JS runs) the site still shows `random/` — the "never breaks" guarantee is structural, not script-dependent.

## File moves and creations

Work on branch `liquid` (already linked to this task). All paths below are relative to repo root `/Users/forrest/Code/malls.github.io`.

### 1. Move assets into `random/` (use `git mv` to preserve history)

- `git mv script.js random/script.js`
- `git mv style.css random/style.css`
- Do **not** move: `CNAME`, `favicon.ico`, `splash.png`, `twitter-splash-malls.png`, `README.md` — these must stay at root. The OG/Twitter meta point at `https://www.forrestalmasi.com/twitter-splash-malls.png` (root); `favicon.ico` is fetched from root by convention; `splash.png` is unreferenced by code but stays put.
- Do **not** modify `script.js` or `style.css` contents. In particular `script.js` indexes `document.querySelectorAll('section')[0..3]` and has the quirky-but-working `window.onclick = init()` line — leave all of it byte-identical. The `<section>` markup moves with it (below), so the selectors keep resolving.

### 2. Create `random/index.html`

A standalone page = the current root page's structure with the shareability meta simplified out (root owns SEO/OG). Exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Forrest Almasi</title>

	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width"/>
	<meta name="description" content="Software developer Forrest Almasi's personal website">
	<meta name="robots" content="noindex">

	<link href="https://fonts.cdnfonts.com/css/maximum-impact" rel="stylesheet"/>
	<link rel="stylesheet" href="./style.css?vbvcxb"/>

	<script src="./script.js?fdasfadsfbvcxbdsa"></script>
</head>

<body>
	<div class="container">
		<section class="random-background quarter-height"></section>
		<section class="random-background quarter-height"></section>
		<section class="random-background quarter-height"></section>
		<section class="random-background quarter-height"></section>
		<section class="random-background quarter-height"></section>
	</div>
</body>

</html>
```

Notes: relative `./style.css` / `./script.js` resolve inside `random/`; cache-bust query strings preserved as-is; body markup is byte-identical to current (five sections — `script.js` depends on that count/order). `noindex` keeps crawlers from indexing the framed page over the root. `style.css` also `@import`s the same font URL, so the external font keeps working either way.

### 3. Rewrite root `index.html` as the breakpoint router

Keep the ENTIRE current `<head>` metadata block unchanged: title, charset, viewport, description, all `og:*` tags, all `twitter:*` tags, and the canonical link (lines 4–30 of the current file). Drop the font/style/script includes (those belong to `random/` now). New body + inline style + inline router script:

```html
	<style>
		html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
		#site-frame { position: fixed; inset: 0; width: 100%; height: 100%; border: 0; display: block; }
	</style>
</head>

<body>
	<iframe id="site-frame" src="./random/" title="Forrest Almasi"></iframe>

	<script>
		// Breakpoint router: serves a different sub-site per viewport bucket.
		// To add a site: drop its folder in the repo root, then map it below.
		var DEFAULT_SITE = 'random';                 // any width not mapped in BUCKET_SITES
		var MOBILE_PORTRAIT_SITE = 'random';         // placeholder until built
		var MOBILE_LANDSCAPE_SITE = 'random';        // placeholder until built
		var BUCKET_SITES = {                         // key = lower bound of 100px-wide desktop bucket
			800: 'random'                            // 800 <= width < 900
			// 900: 'memphis',  1000: 'liquid',  ... add trivially here
		};

		var isMobile = window.matchMedia('(hover: none) and (pointer: coarse)');
		var isPortrait = window.matchMedia('(orientation: portrait)');

		function siteForViewport() {
			if (isMobile.matches) return isPortrait.matches ? MOBILE_PORTRAIT_SITE : MOBILE_LANDSCAPE_SITE;
			var bucket = Math.floor(window.innerWidth / 100) * 100;
			return BUCKET_SITES[bucket] || DEFAULT_SITE;
		}

		var frame = document.getElementById('site-frame');
		var currentSite = 'random'; // matches the static src above

		function route() {
			var site = siteForViewport();
			if (site === currentSite) return;   // only reload the frame when the site actually changes
			currentSite = site;
			frame.src = './' + site + '/';
		}

		var resizeTimer;
		window.addEventListener('resize', function () {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(route, 100); // debounce so mid-drag widths don't thrash reloads
		});
		isPortrait.addEventListener('change', route);
		route();
	</script>
</body>
```

Design points the implementer must preserve:
- **Extensible mapping**: adding a future site is one line in `BUCKET_SITES` (or swapping a mobile constant). Buckets are keyed by lower bound; anything unmapped falls to `DEFAULT_SITE`. Never remove the fallback.
- **Live resize switching** is the novelty: `resize` listener + debounce + only-swap-on-change (avoids iframe reload flicker on every pixel of a drag).
- **No-JS safety**: static `src="./random/"` on the iframe. No `<noscript>` needed.
- Mobile detection uses `(hover: none) and (pointer: coarse)` rather than width, so narrow desktop windows still route through the desktop buckets; portrait/landscape via `orientation` media query with a `change` listener.
- Root page must have no scrollbars and the iframe must fill the viewport exactly (so `100vh`/media queries inside sub-sites see true viewport dimensions).

### 4. Update project `CLAUDE.md`

Append a short section at the END of `/Users/forrest/Code/malls.github.io/CLAUDE.md` (after the Lattice section; do not touch the Lattice content):

```markdown
## Site Architecture

This is a static GitHub Pages site (no build step) for forrestalmasi.com. The root
`index.html` is a **breakpoint router**: a full-viewport iframe whose `src` is chosen
from the viewport width by an inline script, re-evaluated live on resize. Each 100px
desktop width bucket (plus mobile portrait/landscape) can map to a different sub-site.

- Sub-sites are self-contained folders at repo root (`random/`, `memphis/`, `liquid/`),
  each with its own `index.html` + assets and a `BRANDING.md` constraining its design.
- To add a sub-site: build the folder, then add one entry to `BUCKET_SITES` (or set a
  mobile constant) in the root `index.html` router script. Unmapped widths fall back to
  `DEFAULT_SITE` — never remove that fallback; the live site must never 404.
- Root-level files that must stay at root: `CNAME`, `favicon.ico`, `splash.png`,
  `twitter-splash-malls.png`, and all SEO/OG/Twitter meta in the root `index.html`.
- `random/` is the original site (random colors on interaction); its `script.js`
  indexes `document.querySelectorAll('section')` positionally — its five `<section>`
  elements must keep their count and order.
```

## Testing (manual, before commit)

1. `cd /Users/forrest/Code/malls.github.io && python3 -m http.server 8080` (run in background).
2. `curl -s http://localhost:8080/ | grep -c 'og:'` — meta tags present; `curl -sI http://localhost:8080/random/` and `/random/style.css?vbvcxb`, `/random/script.js?fdasfadsfbvcxbdsa` all return 200.
3. Open `http://localhost:8080/` in a browser if available (or reason through it): full-bleed colored quarter-height sections render inside the frame, hover changes colors, no double scrollbars, resizing across 800/900px doesn't blank the page (all buckets currently resolve to `random`, so no swap occurs — verify by checking `siteForViewport()` in the console returns `'random'` at several widths).
4. Verify `http://localhost:8080/random/` works standalone.

## Commit

One commit on branch `liquid`. Stage exactly: `index.html`, `random/index.html`, the two `git mv` results (`random/script.js`, `random/style.css`), and `CLAUDE.md` (currently untracked — the architecture doc update requires committing it; committing its Lattice section too is intended). Do **not** stage `.lattice/` or `agents.md`. Suggested message:

```
Move original site into random/, make root index.html a breakpoint router

random/ is now a self-contained sub-site; root serves it via a
full-viewport iframe with a width-bucket map (800-900px -> random,
everything else falls back to random). Groundwork for per-bucket
sub-sites (memphis, liquid, mobile variants).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

Then `lattice status FA-1 review --actor agent:fable-5-impl` (implementer's actor ID).

## Acceptance criteria

- [ ] `random/index.html`, `random/script.js`, `random/style.css` exist; `script.js`/`style.css` moved via `git mv` with contents unchanged; `/random/` renders and behaves exactly like the old site standalone.
- [ ] Root `index.html` retains every OG/Twitter/description/canonical meta tag and title verbatim; `CNAME`, `favicon.ico`, `splash.png`, `twitter-splash-malls.png` untouched at root.
- [ ] Root page shows `random/` at every viewport width (iframe fills viewport, no borders/scrollbars), including with JS disabled (static iframe src).
- [ ] Router has the declarative `BUCKET_SITES` map with the `800: 'random'` entry, `DEFAULT_SITE` fallback, mobile portrait/landscape constants, debounced resize re-routing that only swaps `src` on an actual site change.
- [ ] `CLAUDE.md` ends with the Site Architecture section (Lattice section untouched).
- [ ] No build step introduced; no files outside the staged list committed; one commit on `liquid`.

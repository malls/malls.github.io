# FA-4 — Replace JS iframe router with CSS-breakpoint single-page build

**Complexity: medium.** Fresh implementation agent: this plan is self-sufficient. Read it fully before touching files.

## Context

- Repo: static GitHub Pages site for forrestalmasi.com, branch `liquid`. No CI, no node_modules — ever.
- Current root `index.html` (from FA-1, commit 29427ed) is a JS iframe router that swaps `iframe.src` per viewport bucket. **It is superseded and goes away entirely** — the built page must contain no iframe and no routing JS.
- New architecture (binding decisions recorded on the task):
  1. Site switching via **CSS media queries only** — all sub-sites live in ONE root `index.html`; inactive sites are `display: none`.
  2. Root `index.html` is **compiled** by a **zero-dependency Node script** (`node build.js`, stdlib only).
  3. Built `index.html` is **committed**; Pages serves it as-is.
  4. Site folders (`random/`, later `memphis/`, `liquid/`) remain the source of truth and stay standalone-previewable at `/random/` etc.
  5. Bucket map: 100px desktop buckets; `random` at 800–<900; `random` is the default for all unmapped widths; mobile portrait/landscape slots reserved (both `random` for now).

## Files

**Create (repo root):**
- `build.js` — the compiler (CommonJS, `require('fs')`/`require('path')` only)
- `sites.config.json` — declarative breakpoint→site map
- `template.html` — root head boilerplate + insertion markers (source of the meta/OG/canonical block)

**Modify:**
- `random/script.js` — conform to the JS authoring contract (below)
- `random/index.html` — move scripts to end of body, add standalone boot line
- `index.html` — replaced wholesale by build output (delete iframe router)
- `CLAUDE.md` — replace the `## Site Architecture` section (exact text below)

**Delete:** nothing else. Do not touch `CNAME`, `favicon.ico`, `splash.png`, `twitter-splash-malls.png`, `random/style.css` (unchanged), `liquid/`, `memphis/`, or the empty `castle/`, `isomorphic/`, `mobile-web1/` dirs.

## 1. `sites.config.json`

```json
{
  "bucketSize": 100,
  "default": "random",
  "mobile": {
    "portrait": "random",
    "landscape": "random"
  },
  "buckets": {
    "800": "random"
  }
}
```

Schema:
- `bucketSize` (int px, default 100): width of each desktop bucket.
- `default` (site name): shown at any width not matched by a bucket, and on browsers too old for range media queries.
- `mobile.portrait` / `mobile.landscape` (site name): shown when `(hover: none) and (pointer: coarse)`, split by orientation. These override buckets (a phone at 850px landscape gets the landscape site, not the 800 bucket).
- `buckets` (object): key = bucket lower bound in px (string of a non-negative integer, must be a multiple of `bucketSize`); value = site name. Bucket `"800"` means `800px <= viewport width < 900px`.

Site names are folder names at repo root. The set of sites to compile = union of every name referenced anywhere in the config. Adding memphis/liquid later = build the folder, add config entries, `node build.js`, commit.

## 2. `template.html`

Contains the full document skeleton with the current root head boilerplate copied **verbatim from the existing root `index.html` lines 1–30** (doctype, `<html lang="en">`, title, charset, viewport, description, all `og:*` and `twitter:*` metas, canonical link) — but NOT the iframe, router script, or the old inline `<style>`. Insertion markers:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Forrest Almasi</title>
	... (all existing meta/OG/twitter/canonical lines, verbatim) ...
	<link rel="canonical" href="https://www.forrestalmasi.com/" />

	<!-- BUILD:STYLES -->
</head>
<body>
<!-- BUILD:SITES -->
<!-- BUILD:SCRIPTS -->
</body>
</html>
```

`template.html` is the source of truth for root metadata from now on; edit it (not the built `index.html`) to change metas.

## 3. `build.js`

Run as `node build.js` from repo root (use `__dirname` so cwd doesn't matter). No flags needed. Deterministic: same inputs → byte-identical output (no timestamps). Steps:

1. Read + validate `sites.config.json` (see Validation below). Derive ordered site list: config-referenced sites, sorted alphabetically for stable output.
2. Per site `<name>`, read `<name>/index.html` (required), `<name>/style.css` (required), `<name>/script.js` (optional — skip JS steps if absent).
3. **HTML**: extract inner body via regex `/<body[^>]*>([\s\S]*?)<\/body>/i` (error if no match). Strip every `<script[\s\S]*?<\/script>` occurrence from the extracted body (standalone boot scripts live there; the combined page provides its own). Trim. Wrap: `<div id="site-<name>" data-site="<name>">` + body + `</div>`. Site `<head>` content is ignored entirely (it is standalone-only: per-site title, noindex robots meta, stylesheet/font links).
4. **CSS**: apply the scoping transform (section 4) to `style.css`; emit as `<style data-site="<name>">…</style>`.
5. **JS**: no transform. Emit verbatim as `<script data-site="<name>">…</script>` (one tag per site, so a syntax error in one site can't break others).
6. Generate the **shell style** (first `<style>` in head):
   ```css
   html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; overscroll-behavior: none; }
   body > [data-site] { display: none; height: 100%; position: relative; }
   ```
7. Generate the **visibility style** (LAST `<style>` in head — must come after all site styles so it wins ties; see section 5).
8. Generate the **boot script** (last `<script>` in body):
   ```js
   for each site with a script.js:
   try { SITES['<name>'](document.getElementById('site-<name>')); } catch (e) { console.error('<name> init failed', e); }
   ```
9. Assemble: read `template.html`; replace `<!-- BUILD:STYLES -->` with shell style + site styles + visibility style; `<!-- BUILD:SITES -->` with the wrapper divs; `<!-- BUILD:SCRIPTS -->` with site script tags + boot script. Prepend after doctype: `<!-- GENERATED by build.js — DO NOT EDIT. Edit site folders / sites.config.json / template.html, then run: node build.js -->`. Write to `index.html`, print a one-line summary, exit 0.

**Validation (any failure: print message, exit 1):**
- Config missing/unparseable; missing `default`, `buckets`, or `mobile.portrait`/`mobile.landscape`; bucket key not a non-negative integer multiple of `bucketSize`.
- Referenced site folder missing `index.html` or `style.css`.
- Body regex fails to match a site's index.html.
- Literal `</style>` inside a style.css, or literal `</script>` inside a script.js (would break inlining).
- CSS transform meets an at-rule other than `@import`/`@media`/`@supports`/`@keyframes`/`@font-face` (fail loudly rather than mangle).
- Template missing any of the three markers.

## 4. CSS scoping transform (exact rules)

**Mechanism chosen: build-time selector prefixing** (rewrite `html`/`body`/`:root` to the wrapper, prefix everything else with `#site-<name> `). Rejected `@scope`: it cannot express html/body rules anyway, has younger browser support, and adds specificity subtleties — prefixing is a ~60-line transform that works in every browser and is fully predictable because we author all site CSS under the conventions below.

Implementation: strip `/* … */` comments, then a single character walk tracking `{}` depth to split top-level statements. Per statement:

- `@import …;` → hoist to the very top of that site's `<style>` block, byte-identical (CSS requires @import before other rules; each site has its own style element so this is valid). This is how sites pull external fonts in combined mode — random's `@import url('https://fonts.cdnfonts.com/css/maximum-impact')` already conforms.
- `@media <cond> { … }` and `@supports <cond> { … }` → keep the prelude untouched (viewport-based conditions keep working — they query the viewport, not the wrapper), recurse the transform on inner rules.
- `@keyframes` and `@font-face` → emit unchanged (authoring convention: keyframe names and font-family names must be prefixed with the site name to avoid cross-site collisions).
- Ordinary rule `selectors { decls }`: split the selector list on top-level commas; per selector (trimmed):
  - exactly `html`, `body`, or `:root` → `#site-<name>`
  - starts with `html`, `body`, or `:root` followed by whitespace or a combinator (`>`, `+`, `~`) → replace that leading token with `#site-<name>`
  - anything else → `#site-<name> ` + selector (descendant combinator)
  - then dedupe within the list (`html, body {…}` → single `#site-<name> {…}`). Declarations untouched.

Sanity for random/style.css: `html, body` and separate `html`/`body` rules all collapse onto `#site-random` (their declarations don't conflict — margin/padding/font/height/width/overflow/position merge fine); `section:nth-child(4)` → `#site-random section:nth-child(4)` (nth-child still counts siblings inside `.container` — semantics unchanged); the three `@media (max-width: …)` blocks recurse and keep working. `height: 100%` on the wrapper resolves against `body` which the shell fixes at `height: 100%` — same computed sizes as standalone.

## 5. Generated visibility CSS (exactly one site visible)

Strategy: **hide-all base + ordered overrides**, no media-query negation needed. Emit in this exact order (later rules of equal specificity win):

```css
/* base */
#site-a, #site-b, … { display: none; }        /* every compiled site */
#site-<default> { display: block; }

/* desktop buckets, ascending — emitted ONLY when bucket site != default */
@media (800px <= width < 900px) {
	#site-<default> { display: none; }
	#site-<bucketSite> { display: block; }
}

/* mobile — ALWAYS emitted, LAST, so it beats any bucket at phone widths */
@media (hover: none) and (pointer: coarse) and (orientation: portrait) {
	<every site except mobile.portrait, comma list> { display: none; }
	#site-<mobile.portrait> { display: block; }
}
@media (hover: none) and (pointer: coarse) and (orientation: landscape) {
	<same shape for mobile.landscape> { display: block; }
}
```

- Omit any rule whose selector list is empty (e.g., "hide every site except X" when X is the only site).
- Range syntax `(800px <= width < 900px)` is gapless (no 899.98px hack); baseline in all evergreen browsers since 2023. Graceful degradation is built in: a browser too old to parse it drops the bucket block and shows `default`.
- Invariant argument: base shows exactly the default; bucket ranges are disjoint and each block swaps default→bucketSite; mobile blocks are last and explicitly hide everything but the mobile site. With today's config (all `random`) the output degenerates to "random always visible" — the generator must still implement the general algorithm.
- This block is the last `<style>` in head, so its `#site-x` rules (specificity 1,0,0) beat site rules of equal specificity (transformed html/body rules) by source order. Convention (documented): site CSS never sets `display` on `html`/`body`/its wrapper.

## 6. JS contract + `random/script.js` rewrite

**Contract** (no build-time JS transform — the file shape itself provides isolation):

```js
(window.SITES = window.SITES || {})['<sitename>'] = function (root) {
	// entire site's JS lives here. DOM inside `root` is parsed when called.
	// - query ONLY via root.querySelector/querySelectorAll
	// - attach listeners only to elements inside root (window/document listeners forbidden)
	// - never mutate document/body styles; page-level concerns go in CSS html/body rules
};
```

Standalone: the site's own index.html loads `script.js` at the **end of body**, then boots with `<script>SITES['<sitename>'](document);</script>`. Combined: build.js inlines the file verbatim and the generated boot script calls `SITES['<sitename>'](document.getElementById('site-<sitename>'))`. `root.querySelectorAll(...)` works identically for both (document vs element). Every site's JS runs at load even while hidden — that's intended (random pre-paints its colors; listeners on hidden elements are inert until the CSS reveals them).

**Rewrite `random/script.js`** — keep every helper byte-identical where possible; the diff is:
1. Replace outer `window.onload = function() {` wrapper with `(window.SITES = window.SITES || {}).random = function (root) {` (closing `};` stays).
2. Every `document.querySelectorAll` → `root.querySelectorAll` (occurrences: `.random-color`, `.random-background`, `'section'` for the mailto listener, four `'section'` calls plus `.animated-letter` inside `init`).
3. **Delete** the line `if ('onmouseover' in document.documentElement) window.onclick = init();` — note: it *called* `init()` immediately and assigned the undefined result to `window.onclick`, so its only effect was a redundant second init run (innerHTML rebuilt twice, final state identical). Removing it plus keeping the existing trailing `init();` preserves visible behavior exactly (random colors, letter hover/touchstart recolor, background mouseleave/touchend recolor, mailto on 4th section) and satisfies the no-global-handlers rule.
4. Everything else (randomColor, filterValue, template, switchColors, mailto listener, init body) unchanged.

**Rewrite `random/index.html`**: keep head as-is minus the script tag (title, charset, viewport, description, `robots noindex`, font link, `style.css?vbvcxb` link stay — head is standalone-only, build ignores it); move to end of body:

```html
	<script src="./script.js?fdasfadsfbvcxbdsa"></script>
	<script>SITES['random'](document);</script>
```

(Timing note: end-of-body execution replaces the old `window.onload` wait; nothing in the script depends on images/fonts having loaded, so behavior is unchanged apart from colors appearing marginally sooner.)

## 7. `CLAUDE.md` — replace the `## Site Architecture` section

Replace everything from the `## Site Architecture` heading (line ~199) to end of file with:

```markdown
## Site Architecture

forrestalmasi.com is a static GitHub Pages site with a **build step**: the root
`index.html` is GENERATED by `node build.js` (zero dependencies, no node_modules,
Node stdlib only) and committed. It contains every sub-site in one page; CSS media
queries — not JS — decide which one is visible (`display: none` for the rest),
driven by `sites.config.json`: 100px desktop width buckets plus mobile
portrait/landscape slots, with `default` shown at any unmapped width. Exactly one
site is visible at any viewport; never remove the `default` fallback.

**Never edit the root `index.html` by hand.** Edit the sources — site folders,
`sites.config.json`, `template.html` (root meta/OG/canonical boilerplate) — then
run `node build.js` and commit the rebuilt `index.html` together with the source
changes. A hand edit to `index.html` is destroyed by the next build.

Sub-sites are self-contained folders at repo root (`random/`, `memphis/`,
`liquid/`), each standalone-previewable at `/<name>/` and constrained by its
`BRANDING.md`. `random/` is the original site; its `script.js` indexes
`root.querySelectorAll('section')` positionally — its five `<section>` elements
must keep their count and order.

### Authoring contract for a sub-site (build.js relies on this)

- **Files**: `<name>/index.html` (required), `<name>/style.css` (required),
  `<name>/script.js` (optional). The build extracts the site's `<body>` inner
  HTML (with `<script>` tags stripped), transforms `style.css`, and inlines
  `script.js` verbatim. The site's `<head>` is standalone-only (its own title,
  `robots noindex`, stylesheet/font links) — the build ignores it.
- **CSS**: written as if standalone; the build rewrites `html`/`body`/`:root`
  selectors to the site's wrapper `#site-<name>` and prefixes all other selectors
  with `#site-<name> `. Rules: external resources via `@import` at the top of
  `style.css` (head `<link>`s don't survive the build); only
  `@import`/`@media`/`@supports`/`@keyframes`/`@font-face` at-rules; prefix
  keyframe and custom font-family names with the site name; no commas inside
  functional pseudo-classes (`:is(a, b)`) — write separate selectors; never set
  `display` on `html`/`body`; don't set the same property differently on `html`
  vs `body` (both map to the wrapper); no literal `</style>` in CSS or
  `</script>` in JS.
- **JS**: the whole file is one registry function —
  `(window.SITES = window.SITES || {})['<name>'] = function (root) { ... };`
  Query only via `root.querySelector(All)`; listeners only on elements inside
  `root`; no `window`/`document` handlers; no mutating document/body styles.
  Standalone boot at end of the site's own body:
  `<script src="./script.js"></script><script>SITES['<name>'](document);</script>`.
  In the combined page every site's JS runs on load, even while hidden.

**To add a sub-site**: build the folder to the contract, map it in
`sites.config.json` (bucket key = lower bound of a 100px range, e.g. `"900":
"memphis"` for 900–<1000px, or a `mobile` slot), run `node build.js`, verify,
commit sources + `sites.config.json` + `index.html`.

Root-level files that must stay at root: `CNAME`, `favicon.ico`, `splash.png`,
`twitter-splash-malls.png`. All SEO/OG/Twitter meta lives in `template.html`.
```

## 8. Commit

Single commit on branch `liquid` (already linked to FA-4). Stage **explicitly by path** — never `git add -A`/`git add .`:

```
git add build.js sites.config.json template.html index.html random/index.html random/script.js CLAUDE.md
```

- **Never commit**: `.lattice/`, `agents.md`. **Leave unstaged**: `liquid/BRANDING.md`, `memphis/BRANDING.md` (other agents' in-flight work), and the empty `castle/`/`isomorphic/`/`mobile-web1/` dirs.
- `CLAUDE.md` is currently untracked but is the project's shared instructions; commit it so the authoring contract reaches future agents. (If the orchestrator objects, drop it from the commit and leave it modified in-tree — everything else stands alone.)
- Message: something like `replace iframe router with compiled single-page site (CSS breakpoint switching)` + the Claude Co-Authored-By trailer.
- Before committing, run `git log --oneline -3` and `git status` — other agents share this worktree; stage only the paths above and never revert changes you can't attribute.

## 9. Verification (implementer must run all)

1. `node --check build.js` and `node --check random/script.js` pass.
2. `node build.js` exits 0; run it twice — second run produces a byte-identical `index.html` (`git diff` clean after second run).
3. Built `index.html` contains: the GENERATED banner; all OG/twitter/canonical metas (`grep -c 'og:' index.html` matches template); NO `<iframe>`, NO `matchMedia`, NO `BUCKET_SITES`; one `#site-random` wrapper div; `@import url('https://fonts.cdnfonts.com/css/maximum-impact')` at top of the random style block; no bare `html {`/`body {` selectors inside the site style block.
4. Serve locally (`python3 -m http.server 8000`) and load `http://localhost:8000/`:
   - At 850px wide: random site visible (5 colored bands, "Forrest Almasi / i'm a developer / what's up? / email me").
   - At 500px and 1200px: still random (default). Resize across 800/900 — page never blank.
   - Hover letters → color/shadow changes; mouse out of a band → background recolors; click 4th band → mailto opens. Console has no errors.
   - DevTools device emulation (touch, portrait and landscape): random visible.
5. `http://localhost:8000/random/` standalone: identical behavior to production today (colors, hover, touch, mailto), console clean.
6. Sanity-check exactly-one-visible in the console: `[...document.querySelectorAll('[data-site]')].filter(e => getComputedStyle(e).display !== 'none').length === 1`.
7. `CLAUDE.md` Site Architecture section matches section 7; no iframe-router language remains anywhere in the repo (grep `site-frame`).

## Acceptance criteria

- [ ] Root `index.html` is build output: no iframe, no router JS; switching is pure CSS media queries; exactly one site visible at any viewport (bucket 800–<900 → random; all other widths → random default; mobile portrait/landscape → random).
- [ ] `build.js` is zero-dependency Node, deterministic, validates inputs, and generates visibility CSS from `sites.config.json` per the section-5 algorithm (general algorithm, not hardcoded to today's config).
- [ ] `random/` remains fully standalone at `/random/` with behavior preserved, and its extracted/scoped copy behaves identically in the combined page.
- [ ] Root meta/OG/canonical boilerplate preserved verbatim via `template.html`.
- [ ] CLAUDE.md documents the new architecture, authoring contract, and the "edit sources, never built output; rebuild + commit both" rule.
- [ ] Commit contains exactly the files in section 8; `.lattice/`, `agents.md`, and the two BRANDING.md files untouched/unstaged.

## Out of scope

Building memphis/liquid content; changing random's visuals; CI; minification; adding `.nojekyll`; touching FA-1's task record (the supersession is recorded here and on FA-4).

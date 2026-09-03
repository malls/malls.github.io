# blog/ — publishing workflow

`/blog/` is a standalone destination on forrestalmasi.com. It is **not** mapped in
`sites.config.json`, the root `index.html` is **not** rebuilt for it, and `node build.js`
knows nothing about it. Every page here is hand-written HTML sharing one stylesheet.

Design source of truth: **`blog/BRANDING.md`**. If you change how the pages look, change it
to match the brief, or change the brief first — do not let the two drift.

## Files

| Path | What |
|---|---|
| `index.html` | The front page: masthead, nav, entry list, sidebar, footer. |
| `archive.html` | Every post grouped by month and by tag, with anchors. |
| `posts/YYYY-MM-DD-slug.html` | One file per post. |
| `posts/_template.html` | Copy this to write a new post. Never linked from anywhere. |
| `style.css` | One stylesheet, loaded by every page. |
| `feed.xml` | RSS 2.0, hand-maintained. |
| `README.md` | This file. |

There is no `script.js` and no JavaScript anywhere on the site (see "Adding JavaScript"
below if that ever changes).

## Publishing a post — the five steps

### 1. `posts/YYYY-MM-DD-slug.html`

Copy `posts/_template.html`. Fill in, and **delete the `<meta name="robots" content="noindex">`
line** — that belongs to the template only, real posts are indexed.

Everything to replace is in `[ALL CAPS BRACKETS]`. The id shapes are fixed:

| Thing | Shape | Example |
|---|---|---|
| Post file | `posts/YYYY-MM-DD-slug.html` | `posts/2026-09-03-hello-world.html` |
| Entry id | `blog-entry-<slug>` where `<slug>` is the filename without `.html` | `blog-entry-2026-09-03-hello-world` |
| Month anchor | `blog-archive-YYYY-MM` | `blog-archive-2026-09` |
| Tag anchor | `blog-tag-<name>` | `blog-tag-writing` |

**Every `id` on every page starts with `blog-`.** The folder is authored to the sub-site
contract in the repo's `CLAUDE.md` so it could be mapped into a viewport bucket later
without a rewrite, and in that combined page ids resolve document-wide across all sites.

**Every href on a post page is relative to `posts/`** — `../style.css`, `../index.html`,
`../archive.html`, `../feed.xml`, `./<other-post>.html`. No root-absolute path (`href="/…"`)
exists anywhere on this site; the only absolute URLs are `https://www.forrestalmasi.com/…`
in `<head>` meta, in `feed.xml`, and the blogroll's outbound links.

Date and time copy format, everywhere it appears:

```
Posted by Forrest on September 3, 2026 at 1:14 pm
```

Long-form American date, 12-hour time, lowercase meridiem, `·` separators, counts
parenthetical (`September 2026 (3)`).

**Prev/next links.** There is currently only one post, so no prev/next nav is rendered —
that is a decision, not an oversight: a disabled or fragment-only prev/next link is a dead
widget. When you add post N you wire **both** directions by hand: `next` on post N-1 and
`prev` on post N. `posts/_template.html` carries the commented-out markup.

### 2. `index.html` — the entry list

Add a new `<article class="blog-entry">` at the **top** of the block between the
`<!-- blog:entries -->` and `<!-- /blog:entries -->` markers. The entry is:

```
article.blog-entry  id="blog-entry-<slug>"
  h2.blog-entry-title   → <a> to posts/<file>.html#blog-entry-<slug>
  p.blog-entry-meta     → Posted by … · Filed under: <tag links> · Permalink (same URL)
  div.blog-entry-body   → the excerpt: paragraphs 1–3 of the post, copied verbatim
  p.blog-entry-more     → <a> "Continue reading →" (same URL)
```

The title link, the Permalink and `Continue reading →` all point at the same URL, and that
URL **must carry the `#blog-entry-<slug>` fragment** — that fragment is what fires the
Yellow Fade (`.blog-entry:target`) on the post page. Without it the effect is decorative.

### 3. `archive.html` — month and tags

Add the post **twice or more**: once under its month in `#blog-by-month`, and once under
each of its tags in `#blog-by-tag`.

- If the month group does not exist yet, add a new `div.blog-group` with
  `id="blog-archive-YYYY-MM"`, newest month first.
- If a tag group does not exist yet, add a new `div.blog-group` with
  `id="blog-tag-<name>"`.
- Update the `(N)` count in every group heading you touched.

Per-tag pages under `blog/tags/` were the accepted alternative and were **not** taken —
one `archive.html` keeps the per-post edit count flat as tags multiply. Stay consistent.

### 4. `feed.xml`

New `<item>` at the **top** of the channel, and update `<lastBuildDate>`. Skeleton:

```xml
		<item>
			<title>POST TITLE</title>
			<link>https://www.forrestalmasi.com/blog/posts/YYYY-MM-DD-slug.html#blog-entry-YYYY-MM-DD-slug</link>
			<description><![CDATA[The excerpt, as plain text.]]></description>
			<pubDate>Thu, 03 Sep 2026 13:14:28 -0400</pubDate>
			<guid isPermaLink="true">https://www.forrestalmasi.com/blog/posts/YYYY-MM-DD-slug.html#blog-entry-YYYY-MM-DD-slug</guid>
		</item>
```

`<pubDate>` and `<lastBuildDate>` are **RFC 822**: `Day, DD Mon YYYY HH:MM:SS ±HHMM`. On
macOS, `date "+%a, %d %b %Y %H:%M:%S %z"` prints exactly that.

Check it still parses before committing:

```
python3 -c "import xml.dom.minidom;xml.dom.minidom.parse('blog/feed.xml')"
```

### 5. The sidebar block, in every page

The sidebar lives between `<!-- blog:sidebar -->` and `<!-- /blog:sidebar -->` in
`index.html`, `archive.html`, `posts/_template.html` and **every post page**. Two things in
it change when you publish:

- **Archives module** — bump the month's `(N)`, or add the new month at the top.
- **Tags module** — bump each tag's step class (below), or add a new pill.

The block is byte-identical across pages **except for `./` vs `../` in every href**: pages
at the top of `blog/` use `./…`, pages in `blog/posts/` use `../…`. Easiest safe move: copy
the block from the nearest page at the **same depth**, never across depths.

#### Tag-cloud step table

Absolute thresholds — no recalculating a relative maximum on every publish.

| Posts carrying the tag | Class | Size | Weight | Colour |
|---|---|---|---|---|
| 1 | `.blog-tag-1` | `--t-tag-1` | 400 | `--ink-soft` |
| 2 | `.blog-tag-2` | `--t-tag-2` | 400 | `--ink-soft` |
| 3–4 | `.blog-tag-3` | `--t-tag-3` | 600 | mix toward `--link` |
| 5–8 | `.blog-tag-4` | `--t-tag-4` | 600 | `--link` |
| 9+ | `.blog-tag-5` | `--t-tag-5` | 700 | `--link` |

Every pill carries `class="blog-tag blog-tag-N"`. Do not inflate counts to make the cloud
look fuller.

## Rules that are easy to break

- **`style.css` contains no `url(` at all.** All texture is CSS-generated. Two reasons: the
  same sheet is loaded as `./style.css` from `blog/` and `../style.css` from `blog/posts/`,
  so a relative `url()` would resolve differently per depth; and if the folder is ever
  mapped into a viewport bucket, `build.js` rewrites relative `url()` targets to `blog/…`,
  which breaks the post-page case. Images that ever get added live in markup with a per-page
  relative `src` — the avatar and the feed chiclet are inline SVG for exactly this reason,
  and they carry **no internal `id` attributes** so they can repeat inside one document.
- **`style.css` never contains the string `#site-blog`.** If the folder is ever mapped into
  a bucket, `build.js` adds that prefix itself; authoring it produces `#site-blog #site-blog`
  and matches nothing, standalone or built. The page ground goes on `body`.
- **No external network requests.** No webfont, no `@import`, no `<link>` to a font CDN, no
  remote script or image. Everything is system fonts and CSS.
- **No commas inside functional pseudo-classes** — write `a:hover` and `a:focus-visible` as
  separate rules, never `:is(a, b)`.
- **No gradient, shadow, radius or tint on any element containing prose** (`BRANDING.md`
  §4.7). The chrome is glossy; the writing is not.
- **Nothing here says "web 2.0", "retro", "throwback" or otherwise captions the design** —
  not in copy, not in `alt` text, not in HTML comments.

## Indexing

`index.html`, `archive.html` and post pages carry a `<link rel="canonical">` and **no
`robots` meta** — this is a destination meant to be read and linked, unlike the sibling
direction folders (`memphis/`, `vhs/`, …), which are `noindex` because `build.js` inlines
their bodies into the root `index.html` and their standalone copies are duplicates.

`posts/_template.html` keeps `noindex`. It also begins with `_`, and GitHub Pages runs
Jekyll by default, which skips files whose names begin with `_` — so it will almost
certainly not be served at all.

**If `/blog/` is ever mapped into a viewport bucket in `sites.config.json`,** its body would
start appearing inside the root `index.html` and this decision must be revisited: the pages
would then be duplicates of part of `/`, and the root page sets
`html, body { height: 100%; overflow: hidden }`, so the blog's own scroll container would
need re-checking too.

## Adding JavaScript later

There is none today, and the front page works completely without it. If you ever add it, it
must be exactly one registry function, per the repo's `CLAUDE.md` sub-site contract:

```js
(window.SITES = window.SITES || {})['blog'] = function (root) { … };
```

Query only via `root.querySelector` / `root.querySelectorAll`; attach listeners only to
elements inside `root`, never to `window` or `document`; never write styles or classes to
`root` itself (standalone, `root` is the `document`, and `Document` has no `.style` — put
state classes on an element inside it). Boot it at the end of the front page's body with:

```html
<script src="./script.js"></script><script>SITES['blog'](document);</script>
```

and `../script.js` on post pages. In a combined page every site's JS runs on load even while
hidden, so the boot must be idempotent and cheap.

The only feature `BRANDING.md` sanctions for it is a client-side search filter over the
rendered entry list (§5), and only if it actually works — a search box that does nothing is
a dead widget, which is why the Search module is omitted entirely today.

## A note on the first post

`posts/2026-09-03-hello-world.html` is a stub. It was written to contain only statements
that are true by virtue of the page existing — no opinions, biography, plans or claims in
your voice. **Edit it or delete it once you have real writing here.** If you delete it,
remember to remove it from `index.html`, `archive.html` and `feed.xml`, and to drop the now
empty month and tag groups and their counts.

The About blurb in the sidebar is a slot too, marked with a
`<!-- blog:about-blurb -->` comment in each page. Replace it with your own words.

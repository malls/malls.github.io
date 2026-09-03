# FA-32: blog/: build the /blog site from BRANDING.md — home, post pages, posting workflow

## 0. Read this first

You are building from a brief you did not write. `blog/BRANDING.md` (703 lines) is
**normative**: its palette tokens, class names, CSS recipes, layout numbers, content model
and §9 test are requirements, not suggestions. Read it in full before you open an editor.
This plan does not restate the brief — it resolves the decisions the brief deliberately
left to the builder, and it fixes the things the brief cannot know (what content is true,
how many posts exist, where the workflow doc lives).

Where this plan and the brief disagree, the brief wins on **design** and this plan wins on
**content, file layout and indexing** — those are the areas the brief hands off.

### Do NOT invoke the `brand-page` skill

`.claude/skills/brand-page/SKILL.md` is stale on one point: it says direction pages are
"self-contained" with an inline `<style>`. That is no longer true — every direction folder
in this repo ships an external `style.css`, and `build.js` hard-requires
`<name>/style.css` (line 283). The brief §9 also names `blog/style.css` explicitly. Build
by hand, following this plan.

## 1. Scope

Build a working weblog at `/blog/`, standalone. Reading order before writing anything:

1. `blog/BRANDING.md` — in full.
2. `CLAUDE.md` — "Site Architecture" + the sub-site authoring contract bullets.
3. `build.js` — specifically `scopeSelector` (104), `isRewritableUrl` (117),
   `rewriteUrls` (134), `transformStatements` (170), and the wrapper/boot at 290/301.
   You are not running it, but the CSS must survive it.
4. `memphis/index.html` + `memphis/style.css` — house head block, tab indentation,
   `:root` token block at the top of the stylesheet, section comment banners
   (`/* ── Name ─────── */`).
5. `vhs/index.html` + `vhs/style.css` — id/class prefixing discipline, how a brief's
   §-numbered recipes map to commented CSS blocks.
6. `liquid/script.js` or `shibuya/script.js` — the registry pattern (you will probably
   not need it; see §10).

### Out of scope — do not touch

- `sites.config.json`, root `index.html`, `template.html`, `build.js`. `/blog/` is a
  standalone destination, **not** a viewport bucket (brief §9). Do not run `node build.js`
  and do not hand-edit root `index.html`.
- Any other direction folder. Do not add a "Blog" link into `random/`, `memphis/` etc. —
  that would require a root rebuild and is a separate task.
- `blog/BRANDING.md`. It has been reviewed and committed (`85f4879`, `ecf8110`). If you
  believe it is wrong, say so in the review comment; do not edit it to match the page.

## 2. Files to create

| Path | What |
|---|---|
| `blog/index.html` | The front page: masthead, nav, entry list, sidebar, footer. |
| `blog/style.css` | **One** stylesheet, shared by every page in the folder. |
| `blog/archive.html` | Every post grouped by month and by tag, with anchors. |
| `blog/posts/2026-09-03-hello-world.html` | The one real post. |
| `blog/posts/_template.html` | Copy-to-write skeleton + the workflow checklist comment. |
| `blog/feed.xml` | RSS 2.0, hand-maintained, one `<item>`. |
| `blog/README.md` | The publishing workflow, long form. See §11. |

**Not created:** `blog/script.js` (§10), `blog/tags/` (§8), any image, font or binary asset
(§4), `about.html` (the nav's About tab points at the sidebar module — §5).

Use today's date for the post. `2026-09-03` is correct as of this plan; if you commit on a
different day, rename the file, the anchor and every reference consistently.

## 3. The wrapper-selector rule — read this before writing one line of CSS

This was the defect the FA-31 reviewer had to fix in the brief itself, and it will be the
easiest one to reintroduce.

**`style.css` never contains the string `#site-blog`.** Not as a selector, not as an
ancestor, nowhere. `build.js` `scopeSelector()` prefixes every authored selector with
`#site-blog` itself, so an authored `#site-blog .blog-wrap` compiles to
`#site-blog #site-blog .blog-wrap` and matches nothing — and standalone it matches nothing
either, because the wrapper `<div id="site-blog">` is *created by the build* (build.js:290)
and does not exist in your markup. Zero of the twelve sibling stylesheets contain a
`#site-` selector; zero sibling `index.html` files contain an `id="site-*"` element.

Consequences:

- The page ground (brief §4.5) goes on **`body`**, which the build rewrites to the wrapper.
- No page in `blog/` carries `id="site-blog"`.
- Write bare selectors: `.blog-wrap`, `.blog-entry:target`, `.blog-module-head`.
- `html, body { margin: 0; padding: 0; height: 100%; }` — identical values, one rule
  (both map to the wrapper; differing values silently lose). Then `body { overflow-y: auto }`
  on body only. That pair is sanctioned by brief §5 and is the only place `html` appears.
- Never set `display` on `html` or `body`.

## 4. The shared-stylesheet problem, resolved

The front page loads `./style.css`; post pages, one directory deeper, load `../style.css`.
`build.js` `rewriteUrls()` rewrites every *relative* `url()` target in `style.css` to
`blog/…`, which would be correct for the built root page and wrong for both the front page
and the post pages. The brief's answer (§9) is to make the problem not exist:

> **`blog/style.css` contains no `url(` token at all.**

I verified the brief holds to this everywhere it could have cheated:

- §4.5 the ground tile — `linear-gradient` + `repeating-linear-gradient`, no image.
- §4.4 the feed chiclet — "a dot and two arcs in CSS or inline SVG, **not** an image file
  and **not** an emoji".
- §5 the About avatar — "an `<img>` in markup, or inline SVG; **never** a CSS `url()`".
- §3 no webfont, no `@import`, no font `<link>` in any head.

So: **one stylesheet, `blog/style.css`, loaded by all four page kinds, with zero `url()`.**
No second stylesheet for post pages — a second sheet would drift from the first and there
is nothing for it to contain. `grep -c 'url(' blog/style.css` must return `0`.

Two builder decisions that follow, and that you must take:

- **The avatar is inline SVG, not an `<img>`.** An `<img>` needs a `src` that differs per
  directory depth (`./avatar.png` vs `../avatar.png`) — three chances per new post to get
  it wrong — and it puts a binary in an otherwise asset-free folder. Draw a small flat
  monogram/silhouette in SVG, in `--blue` / `--paper-alt`, `aria-hidden="true"`,
  `focusable="false"`, and give it **no internal `id` attributes** (see below).
- **The feed chiclet is inline SVG with no internal ids** — a white dot and two arcs on a
  `--rss` fill with a `--rss-deep` 1px edge. It appears in the sidebar Subscribe module and
  may appear again in the footer; any `id` inside it would then be duplicated *within one
  document*, which is a bug independent of the build. No ids means it repeats safely.
  If you need a defs-based gradient, you don't — the brief says flat paint.

## 5. `blog/index.html` — DOM structure

Tab-indented, `<!DOCTYPE html>`, `<html lang="en">`. Every `id` starts with `blog-`.
Classes are the brief's normative names; do not rename them.

```
body
  .blog-wrap                                        (§5: min(100% - 24px, 940px), margin 0 auto)
    header.blog-masthead.blog-gloss                 (~110px, --r-md top corners only)
      h1.blog-wordmark        <a href="./index.html">   --font-title, --t-2xl, Content White,
                                                        entirely ABOVE the 50% hard stop
      p.blog-tagline                                    --font-ui, --t-sm, Kubrick Pale,
                                                        entirely BELOW the 50% hard stop
    nav.blog-nav  aria-label="Blog"                 (flat --blue-deep, 34px, tabs left, --s-2 gap)
      a.blog-tab.blog-tab-on   Home        ./index.html
      a.blog-tab               Archives    ./archive.html
      a.blog-tab               About       ./index.html#blog-about
      a.blog-tab               Subscribe   ./feed.xml
    div.blog-cols                                   (620 + 28 gutter + 268 = 916)
      main#blog-main.blog-main
        <!-- blog:entries -->                       (marker, see §11)
        article.blog-entry  id="blog-entry-2026-09-03-hello-world"
          h2.blog-entry-title   <a href="./posts/2026-09-03-hello-world.html#blog-entry-…">
          p.blog-entry-meta     Posted by Forrest on September 3, 2026 at H:MM pm ·
                                Filed under: <a>meta</a>, <a>writing</a> ·
                                <a>Permalink</a>          (same URL as the title)
          div.blog-entry-body   the excerpt: paragraphs 1–3 of the post, verbatim
          p.blog-entry-more     <a>Continue reading →</a> (same URL)
        <!-- /blog:entries -->
      aside.blog-sidebar   aria-label="Sidebar"
        <!-- blog:sidebar -->                       (marker, see §11)
        section#blog-about.blog-module     → About
        section.blog-module                → Subscribe
        section#blog-tags.blog-module      → Tags
        section#blog-archives.blog-module  → Archives
        section.blog-module                → Elsewhere
        <!-- /blog:sidebar -->
    footer.blog-footer
      p.blog-badges     truthful badge row (§7)
      p.blog-colophon   © 2026 Forrest Almasi · <a href="./feed.xml">RSS</a>
```

Every module is `section.blog-module` containing exactly
`h2.blog-module-head.blog-gloss` + (`.blog-module-body` or a `<ul>`). There is no second
sidebar shape (§4.3). Entries are separated by a 1px `--rule` hairline and `--s-6`; an
entry is **not** a card — no border, radius, shadow or tint on `.blog-entry` (§6).

### The five sidebar modules, and how each is load-bearing today

The brief's rule 2 ("every widget is load-bearing") is the acceptance bar. With a one-post
blog, each module is satisfied as follows — this is the concrete answer, not a hope:

1. **About** (`id="blog-about"`) — inline-SVG avatar + a short blurb in `--font-prose` at
   `--t-sm` + a link to `https://www.forrestalmasi.com/`. **The blurb is a slot.** Ship
   only what is true by construction; see §9. Do not invent biography, employment or
   opinions. Load-bearing because the nav's About tab targets this id and the outbound link
   is real.
2. **Subscribe** — one `<a href="./feed.xml">` containing the chiclet SVG *and* the word
   `Subscribe`. The file exists and its newest `<item>` is the newest post. The chiclet is
   never the only affordance (§2: white on Feed Orange measures 2.9).
3. **Tags** — pills for `meta` and `writing`, each `href="./archive.html#blog-tag-meta"` /
   `#blog-tag-writing`. Both anchors exist on `archive.html`. Size mapping in §8.
4. **Archives** — `<a href="./archive.html#blog-archive-2026-09">September 2026 (1)</a>`.
   The anchor exists. One month, count `(1)`, honest.
5. **Elsewhere** — the blogroll, **real outbound links only**, and these four are the only
   ones verified in this repo (see `vhs/index.html`):
   `https://github.com/malls`, `https://twitter.com/forrestalmasi`,
   `mailto:_@forrestalmasi.com`, `https://www.forrestalmasi.com/`.
   Do not add a link you cannot verify. A blogroll of invented names is the dead-widget
   failure in its purest form (§5).
6. **Search — omitted entirely.** See §10.

### The `beta` / `new` badge — where it truthfully goes

The brief specifies the badge recipe (§4.4) but the honest placement is a builder call.
**Do not put a `NEW` sticker on the newest entry and do not put `BETA` on the masthead.**
`NEW` ages into a lie the moment a second post ships and nobody hand-removes it; `BETA` is
a claim about the site that nothing backs. Instead the badge recipe carries the **footer
badge row**, which is where the truthful assertions live:

```
HAND-WRITTEN HTML   NO TRACKERS   RSS 2.0   2026
```

`.blog-gloss` with `--gloss-fill: var(--beta)`, `--gloss-edge: rgb(0 0 0 / 0.35)`,
`inset 0 1px 0 var(--beta-lite)`, `--paper` ALL CAPS at `--t-xs`. Never `Valid XHTML 1.0`
(this is HTML5) and never a framework name. That satisfies "every brief-named component is
present" without shipping a badge that lies.

## 6. `blog/archive.html` and `blog/posts/*.html`

### archive.html

Chosen over per-tag pages under `blog/tags/`. The brief permits either but demands
consistency; one file is the right pick because the manual workflow (§11) already names
`archive.html` and per-tag pages would multiply the per-post edit count by the number of
tags. Structure: the same masthead / nav (Archives tab lit) / sidebar / footer shell, with
the main column carrying two sections:

```
section#blog-by-month
  h2.blog-module-head-ish "By month"           (heading style, not a sidebar module)
  section#blog-archive-2026-09   h3 "September 2026 (1)"  → ul of post links
section#blog-by-tag
  section#blog-tag-meta          h3 "meta (1)"            → ul of post links
  section#blog-tag-writing       h3 "writing (1)"         → ul of post links
```

Anchor ids are exactly `blog-archive-YYYY-MM` and `blog-tag-<name>` (brief §6). Every
sidebar archive month and every tag pill must resolve to one of these. Links in the lists
point at `./posts/<file>.html#blog-entry-<slug>`.

### Post pages — `blog/posts/YYYY-MM-DD-slug.html`

Same shell, same sidebar (brief §6). **Every href is relative to one directory deeper** —
`../style.css`, `../index.html`, `../archive.html`, `../feed.xml`,
`../posts/<other>.html` (or just `<other>.html`). **No root-absolute path exists anywhere
on this site.** Grep for `href="/` and `src="/` before you finish; the only absolute URLs
are `https://www.forrestalmasi.com/…` in `<head>` meta and in `feed.xml`.

Main column:

```
article.blog-entry  id="blog-entry-2026-09-03-hello-world"
  h1.blog-entry-title        --font-title at --t-xl (post pages use --t-xl, front page --t-lg)
  p.blog-entry-meta          same format as the front page, but Permalink is the current page
  div.blog-entry-body        the FULL post
  footer.blog-post-foot      in this order (brief §6):
    p  Filed under: <tag links to ../archive.html#blog-tag-…>
    p  <a href="mailto:_@forrestalmasi.com?subject=…">Reply by email</a>
    nav prev / next post links — OMITTED while only one post exists (see below)
    p  <a href="../index.html">← Back to the front page</a>
```

**Prev/next with one post:** do not render disabled or `href="#"` prev/next links — that is
a dead widget. With one post the nav is absent; `_template.html` and `blog/README.md`
document that adding post N means wiring `next` on post N-1 and `prev` on post N. Say this
out loud in the README so the omission reads as a decision, not an oversight.

**Which nav tab is lit on a post page: none.** A lit tab asserts "you are here" about one
of the four sections, and a permalink is not one of them. `Home` is lit on `index.html`,
`Archives` on `archive.html`, and no tab is lit on a post page. The connected-tab metaphor
(§4.4) still renders on the two pages that have a current section.

**The Yellow Fade must be live.** `.blog-entry:target` gets `animation: blog-yft 1.2s
ease-out 1`. It fires because the front-page title, the front-page Permalink, the
`Continue reading →` link, the archive listings and the feed `<guid>` all point at
`…/posts/<file>.html#blog-entry-<slug>` — the post page's own entry id. Without that
fragment the effect is decorative and violates rule 2.

## 7. `blog/posts/_template.html`

A complete, valid post page with the body copy replaced by obvious placeholders in
`ALL CAPS BRACKETS` (`[POST TITLE]`, `[YYYY-MM-DD]`, `[Month D, YYYY]`, `[slug]`), opening
with the workflow comment block the brief mandates (§6):

```html
<!--
	New post checklist — there is no build step for /blog/. Every one of these is by hand.
	1. blog/posts/YYYY-MM-DD-slug.html   copy this file; fill title, date, tags, body, ids
	2. blog/index.html                   new .blog-entry at the top of <!-- blog:entries -->
	3. blog/archive.html                 add under its month AND under each of its tags
	4. blog/feed.xml                     new <item> at the top of the channel
	5. the sidebar block in every page   archive counts + tag-cloud steps
	Full details, including the tag-cloud step table: blog/README.md
-->
```

The template carries `<meta name="robots" content="noindex">` (it is a skeleton, not
content) and is linked from nowhere. Note: GitHub Pages runs Jekyll by default and Jekyll
skips files whose names begin with `_`, so `_template.html` will almost certainly not be
served at all — the `noindex` is belt and braces, not the primary defence.

## 8. Content — how much ships, and the tag-cloud mapping

### Exactly one post ships. Recommendation, with the reasoning.

Ship the single real "hello world" post and **no placeholder entries**. The alternative —
two or three lorem/"Example post" entries so the list, the cloud and the archive look
populated — is precisely the failure the brief spends rule 2 and the "Deliberately absent"
list forbidding: *"any widget whose content would have to be invented"*, *"a dead widget is
not a widget — it is a picture of one"*. A fake entry is a dead widget with a headline. The
task description also forbids fabricating in the author's voice.

A one-post front page is not broken; it is what day one of a weblog looks like, and the
brief's chrome carries the page on its own. Mitigate it honestly:

- Write the post long enough that the front-page **excerpt is a real excerpt** — four to six
  short paragraphs, of which the first two or three appear on the front page under
  `Continue reading →`. That exercises the whole entry anatomy (title, meta, excerpt, more
  link, permalink, `:target` fade) with one post.
- Ship the *mechanism* complete even where the *data* is thin: all five tag-cloud step
  classes exist in CSS, the archive groups by month, the feed has a real channel. The
  design is complete; the corpus is honest.
- `blog/README.md` tells the author exactly how to add post 2.

If the user later wants the layout demonstrated with a fuller list, that is a separate task
with real writing — not this one.

### Tag-cloud step mapping (put this table in `blog/README.md`)

Absolute thresholds, so the cloud grows correctly as posts accumulate and no recalculation
of a relative maximum is needed on every publish:

| Posts carrying the tag | Class | Size | Weight | Colour |
|---|---|---|---|---|
| 1 | `.blog-tag-1` | `--t-tag-1` | 400 | `--ink-soft` |
| 2 | `.blog-tag-2` | `--t-tag-2` | 400 | `--ink-soft` |
| 3–4 | `.blog-tag-3` | `--t-tag-3` | 600 | mix toward `--link` |
| 5–8 | `.blog-tag-4` | `--t-tag-4` | 600 | `--link` |
| 9+ | `.blog-tag-5` | `--t-tag-5` | 700 | `--link` |

Today both tags are at step 1. That is the accepted, deliberate consequence of one post —
do not inflate the counts to make the cloud look better. Pills are `--r-pill`,
`--paper-alt` ground, `--rule` border, `--link` text, hover tint
`rgb(91 163 224 / 0.15)` (measured 5.4 on Alt Row).

### `blog/feed.xml`

Ships. RSS 2.0, hand-maintained, no generator. `<channel>` with `<title>`, `<link>`,
`<description>`, `<language>en-us</language>`, `<lastBuildDate>`, and one `<item>` per post
carrying `<title>`, `<link>`, `<description>` (the excerpt as plain text or CDATA),
`<pubDate>` in RFC 822, and `<guid isPermaLink="true">`. **Absolute URLs at
`https://www.forrestalmasi.com`** — `https://www.forrestalmasi.com/blog/posts/2026-09-03-hello-world.html#blog-entry-2026-09-03-hello-world`.
Nothing generates it: step 4 of the manual workflow updates it, and `blog/README.md` shows
a copy-paste `<item>` skeleton. Also add
`<link rel="alternate" type="application/rss+xml" title="Forrest Almasi — Blog" href="./feed.xml">`
(`../feed.xml` on post pages) to every page head.

## 9. What the hello-world post may say — hard constraint

**Do not write opinions, biography, employment history, technical claims, anecdotes, plans,
promises about cadence or topics, or a personality, in Forrest's voice.** He has not
supplied any of that and inventing it is the single worst outcome of this task.

The test to apply to every sentence: **is it true purely by virtue of this page existing?**
If not, cut it.

Safe territory (all true by construction):

- This is the first post here.
- The blog lives at `forrestalmasi.com/blog` and is where writing will be published.
- The feed is at `feed.xml`; that is how to follow it.
- There is no comment system; replies go by email, and the address is on the page.
- The pages are hand-written HTML with no build step, no trackers and no analytics.

Forbidden in the copy, on top of the fabrication rule — brief §8: **no caption that explains
the joke.** No "web 2.0", no "remember when", no reference to the design being retro, of an
era, nostalgic or a throwback, and no wink in an `alt` attribute or an HTML comment. The
blog does not know it is old. Describing the chrome is the fastest way to break it.

Same rule governs the About blurb, the tagline and the `description` meta. The tagline is a
plain descriptive line (`Writing by Forrest Almasi`, or similar) — not a slogan, not a joke.

Put a note in `blog/README.md` — **not** in the post — saying the first post is a stub
written to be true and replaceable, and that the author should edit or delete it once real
writing exists.

## 10. `blog/script.js` — do not ship one

The only candidate the brief sanctions is the §5 client-side search filter, and the brief
makes it conditional: *"optional, and only if it works… If it is not built the module is
omitted entirely."* A search box that filters a list of one entry is a dead widget by rule
2. So:

- **No `blog/script.js`. No Search module. Zero JavaScript on the site.**
- No standalone boot script at the end of any body.
- "Works with JS disabled" becomes trivially true, and the whole `SITES` registry / boot /
  idempotency surface disappears.

Record the shape in `blog/README.md` for whoever adds it later, so the constraint is not
rediscovered: it must be exactly one registry function,
`(window.SITES = window.SITES || {})['blog'] = function (root) { … };`, querying only via
`root.querySelector`/`querySelectorAll`, listeners only on elements inside `root`, never on
`window` or `document`, never writing styles or classes to `root` itself (standalone `root`
is the `document`, and `Document` has no `.style`), booted at the end of the front page's
body with `<script src="./script.js"></script><script>SITES['blog'](document);</script>`
and `../script.js` on post pages.

## 11. The publishing workflow, and where it is documented

The brief's five-file workflow is right but understates one line: step 5, "the sidebar, in
every page", grows with the post count — with N posts the sidebar block lives in
`index.html`, `archive.html` and N post pages. Reconcile it honestly rather than pretending
it is five files forever:

**Make the repeated blocks copy-replaceable, not hunt-and-peck.** Wrap them in HTML comment
markers in every page that carries them:

```html
<!-- blog:sidebar -->  …the five modules, byte-identical except for ./ vs ../ hrefs…  <!-- /blog:sidebar -->
<!-- blog:entries -->  …the front page entry list…                                    <!-- /blog:entries -->
```

The `./` vs `../` difference between the front page and post pages means the block is not
literally byte-identical across depths; the README must say so and give both variants, or
tell the author to copy from the nearest same-depth page. These markers are functional
build notes, not a wink — they are allowed.

**Documentation lives in two places, deliberately:**

- `blog/posts/_template.html` — the mandatory five-step comment block (brief §6 requires it
  to be there and it must stay short enough to read at a glance).
- `blog/README.md` — the canonical long form, and the thing `_template.html` points at.
  It must contain: the five steps expanded with exact anchors and file paths; the tag-cloud
  step table from §8; the archive-count update rule; a copy-paste `feed.xml` `<item>`
  skeleton with the RFC-822 date format; the date/time copy format
  (`September 3, 2026 at 9:42 pm` — long-form American, 12-hour, lowercase meridiem,
  counts parenthetical); the `blog-` id-prefix rule and the exact id shapes
  (`blog-entry-<slug>`, `blog-archive-YYYY-MM`, `blog-tag-<name>`); the prev/next wiring
  rule; the "no `url()` in style.css" rule and why; the registry-function shape from §10;
  the note that the first post is a replaceable stub; and a pointer to `blog/BRANDING.md`
  as the design source of truth.

A `README.md` inside `blog/` is safe to serve: Jekyll copies markdown without front matter
verbatim, and the repo root already ships one.

## 12. `blog/style.css` — organisation

Mirror the brief's section order so a reviewer can diff brief against sheet, and use the
house banner comments (`/* ── Palette — §2 ─────────── */`) the way `vhs/style.css` does:

1. `:root` — every token from §2 (23 colour/depth), §3 (4 font stacks, 6 sizes, 5 tag
   steps), §4.6 (3 radii, 2 shadows), §5 (6 spacing steps). All of them, named exactly as
   the brief names them.
2. Reset + page ground (`html, body` pair from §3 of this plan; `body` background from §4.5).
3. `.blog-gloss` + `::after` + `> *` (§4.1), `.blog-well` (§4.2), `.blog-module*` (§4.3).
4. Masthead, nav/tabs, layout columns (§5 numbers are normative: 940/12/916/620/28/268,
   masthead ~110px, nav 34px).
5. Entries and prose (§3, §6) — **no gradient, shadow, radius or tint on anything
   containing prose.**
6. Sidebar module internals: tag pills and the five steps, archive list, blogroll, About,
   chiclet.
7. Footer + badges.
8. `@keyframes blog-yft` + `.blog-entry:target` (§7).
9. `@media (max-width: 760px)` — the single breakpoint (§5): sidebar below main, both
   fluid, wrapper padding 8px, largest tag step drops to `--t-tag-4`, tab strip wraps to
   two rows. No hamburger.
10. `@media (prefers-reduced-motion: reduce)` — the brief's block verbatim.

Contract traps to avoid while writing it: no `@import`; only `@media`/`@supports`/
`@keyframes` at-rules; no commas inside functional pseudo-classes (write `a:hover` and
`a:focus-visible` as separate rules, never `:is(a, b)` or `:where(h1, h2)`); no literal
`</style>`; no `position: fixed` or `position: sticky`; no `border-radius` above 8px
(`--r-pill` on tag pills is the sole exception the brief carves out); keyframe name
prefixed `blog-`.

## 13. Head blocks and indexing — recommendation

**Recommendation: `/blog/` and its posts are NOT `noindex`. Drop the robots meta.**

Every sibling direction folder carries `<meta name="robots" content="noindex">` for a
specific reason: each one's `<body>` is inlined into the root `index.html` by `build.js`,
so `/vhs/` standalone is a duplicate of `/`, and the standalone copy is a preview artefact
rather than a destination. **None of that is true of `/blog/`.** It is explicitly not in
`sites.config.json`, its content appears nowhere else on the domain, and it is the one part
of this site that exists to be read and linked. `noindex`-ing a blog defeats the point of
publishing it.

So:

- `blog/index.html`, `blog/archive.html`, `blog/posts/*.html` — **no `robots` meta at all**,
  plus a per-page `<link rel="canonical">` at the page's own absolute
  `https://www.forrestalmasi.com/blog/…` URL.
- `blog/posts/_template.html` — **keep `noindex`** (§7).
- If `/blog/` is ever mapped into a viewport bucket later, its body *would* start appearing
  in the root page and this decision must be revisited. Note that in `blog/README.md`.

Head block per page, following the house shape in `memphis/index.html` (tab-indented, full
OG + Twitter set, absolute URLs at `https://www.forrestalmasi.com`, **no font `<link>`**):

| | `index.html` | `archive.html` | post page |
|---|---|---|---|
| `<title>` | `Blog — Forrest Almasi` | `Archives — Forrest Almasi` | `<Post title> — Forrest Almasi` |
| `description` | real, one sentence, about the blog | real, about the archive | the post's own summary |
| `og:type` | `website` | `website` | `article` |
| `og:url` / canonical | `…/blog/` | `…/blog/archive.html` | `…/blog/posts/<file>.html` |
| stylesheet | `./style.css` | `./style.css` | `../style.css` |
| feed `alternate` | `./feed.xml` | `./feed.xml` | `../feed.xml` |
| robots | none | none | none |

Reuse the site's existing card image, `https://www.forrestalmasi.com/twitter-splash-malls.png`,
with the existing `twitter:image:alt` — it is real and already at the repo root. Do not
invent a new OG image and do not add an image file.

## 14. Acceptance criteria — checkable, not vibeable

Contract and hygiene (run these):

1. `grep -c 'url(' blog/style.css` → `0`. `grep -c '#site-' blog/style.css` → `0`.
   `grep -Ec '@import|:is\(|:where\(' blog/style.css` → `0`.
2. No `border-radius` above `8px` in `blog/style.css` except `--r-pill: 999px` on tag pills.
3. `grep -n 'id="' blog/*.html blog/posts/*.html` — every id starts with `blog-`. The only
   `@keyframes` name is `blog-yft`. No element anywhere has `id="site-blog"`.
4. `grep -n 'href="/\|src="/' blog/*.html blog/posts/*.html` → nothing. The only absolute
   URLs are `https://www.forrestalmasi.com/…` in `<head>` meta, `feed.xml`, and the
   blogroll's genuine outbound links.
5. **No external network requests.** No `<link>` to a font CDN, no `<script src>` to a CDN,
   no remote image. Open the page with the network panel filtered to third-party: empty.
6. `git status` shows changes only under `blog/`. `sites.config.json`, root `index.html`,
   `template.html` and `build.js` are untouched.
7. `blog/script.js` does not exist and no page references it.

Brief conformance:

8. Every `:root` token the brief names in §2, §3, §4.6 and §5 is present in
   `blog/style.css`, spelled exactly as the brief spells it.
9. Every brief-named component renders: `.blog-gloss` (masthead, active tab, module heads,
   badges), `.blog-well`, `.blog-module` ×5, tag cloud with the five step classes defined,
   archive-by-month with counts, the feed chiclet inside the `Subscribe` link, the truthful
   badge row, the copyright line.
10. Layout numbers hold at ≥ 940px: wrapper 940, main 620, gutter 28, sidebar 268.
11. **No gradient, shadow, radius or tint on any element containing prose** — inspect
    `.blog-entry-body`, every `p`, the excerpt, blockquotes and the meta line.
12. No letterform anywhere is Feed Orange, Sky Highlight or Sticker Green. `--sheen` is
    `0.18` and no element carries two reflections. Every white letterform sits on a
    ground that passes ≥ 4.5 composited (the brief's §2 table is the reference; if you
    introduce a new gloss fill, measure it).
13. `.blog-entry:target` yellow-fades when you follow a Permalink from the front page.
    Under `prefers-reduced-motion: reduce` it arrives un-highlighted and nothing animates.

Function:

14. **Works over `file://`.** Open `blog/index.html` directly from the filesystem: styles
    load, the sidebar renders, and every internal link — nav, permalink, archive, tag,
    Continue reading, Back to the front page — navigates to a file that exists.
15. **No dead links.** Every tag pill, every archive month, every nav tab, every blogroll
    entry, the About link and the chiclet resolve. No `href="#"` anywhere. The feed's
    newest `<item>` is the newest post.
16. **No horizontal scroll at 320px**, at 100% and at 200% zoom: the tab strip wraps to two
    rows, the sidebar sits below the main column, the tag cloud does not push the viewport.
17. **Full-bleed:** the ground reaches all four edges at every width — no white gap above
    the masthead or below the footer — and the wrapper stays centred.
18. **JavaScript off:** every post title, date, tag, excerpt, permalink and nav link still
    renders and works, and nothing on the page has moved (there is no JS to disable).

Content:

19. Every sentence in the post, the About blurb and the tagline is true by virtue of the
    page existing. No invented opinion, biography, employment, cadence or technical claim.
20. No copy anywhere says "web 2.0", "retro", "throwback", "remember when", or otherwise
    captions the design — including in `alt` text and HTML comments.
21. Exactly one entry in the list, and it is real. No placeholder or example entries.
22. `blog/README.md` covers all thirteen items listed in §11, and `_template.html` opens
    with the five-step comment block pointing at it.

## 15. Commit

One commit, message in the house style (`blog: …`, lowercase, no trailing period — see
`git log`). Sources only; do not rebuild the root page. Then move FA-32 to `review`.

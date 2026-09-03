# FA-31: blog/: BRANDING.md — Web 2.0 bloggy design direction (glossy gradients, sidebar, badges) for /blog writing site

## Scope

Write exactly one file: `/Users/forrest/Code/malls.github.io/blog/BRANDING.md`.

Create the `blog/` folder if it does not exist. Do **not** write `blog/index.html`,
`blog/style.css`, `blog/script.js`, `feed.xml`, or any post — FA-32 builds the page from
this brief. Do not touch `sites.config.json`, the root `index.html`, or `build.js`.

The brief is the source of truth (see `.claude/skills/brand-page/SKILL.md`: "`BRANDING.md`
is the source of truth. `index.html` is a build output"). Everything FA-32 needs must be
in this one file — the implementer of FA-32 will read it cold, with no shared context.

Complexity: medium. Deliverable is prose, but it has to be specific enough to build from.

## Reference material — read these first, in this order

1. `/Users/forrest/Code/malls.github.io/vhs/BRANDING.md` (796 lines) — the model for this
   brief. Read §1 and §8 and §9 especially closely. Its governing idea is
   **"the machine does not know it is old, because for the machine it is 1996."** That
   framing, transposed, is the single most important thing to carry over.
2. `/Users/forrest/Code/malls.github.io/memphis/BRANDING.md` (482 lines) — the tightest
   example of the house format: palette tables with named swatches, a "one hard rule"
   contrast section, a `what this is not` table, a `page application` closer.
3. `/Users/forrest/Code/malls.github.io/software/BRANDING.md` §6 — the model for the ASCII
   layout diagram.
4. `/Users/forrest/Code/malls.github.io/CLAUDE.md`, "Site Architecture" and the
   authoring-contract bullets — every constraint in §9 of the new brief comes from here.

## House format the brief must match

Sibling briefs are all the same shape. Match it exactly:

- `# Blog` title, then a `>` blockquote of 4–8 lines stating the direction in one breath
  and honoring the user's ask verbatim (`"i want to make a new site /blog for my writing.
  the branding should be bloggy and web 2.0"`), the way `vhs/` quotes its user's concept.
- Nine numbered `## ` sections, `---` rules between them.
- Palette tables with four columns — `| Token | Name | Hex | Role |` — where **Name** is a
  period-specific proper noun, not a color word (`Feed Orange`, `Kubrick Blue`,
  `Yellow Fade`), followed by a single `:root { }` code block listing every token.
- Real CSS in fenced blocks for every recipe that has one — gradients, shadows, the type
  scale, the reduced-motion block. Copy-pasteable, not pseudocode.
- Declarative, deadpan voice. States rules; never hedges, never says "consider", never
  addresses the reader as "you".
- Target 450–700 lines. Shorter than `vhs/`, at least as dense as `memphis/`.

## Required section outline

### Title + blockquote
Names the era (2005–2008), the reference set, and the discipline ("played straight, the way
`vhs/` plays the TV-VCR straight"). Quote the user's ask.

### `## 1. The direction`
- What this era actually was: the moment the read-write web arrived and the chrome got
  optimistic — glossy gradient headers, reflections, 4–6px rounded corners, 1px borders
  with inner highlights, tags instead of categories, RSS everywhere, "beta" as a badge of
  honor. Name real references so FA-32 has something to aim at: **Blogger's 2006 default
  templates (Minima, Rounders, Denim), WordPress's Kubrick theme with its blue gradient
  header band, Movable Type, Flickr, del.icio.us tag clouds, 37signals/Basecamp, Digg, the
  RSS chiclet, the web-2.0-badge generators.**
- Then **three numbered things to hold onto**, in the shape `vhs/` and `memphis/` use
  ("getting them wrong produces X rather than Y"). These three are the load-bearing
  content of the whole brief:
  1. **The chrome is glossy; the writing is not.** Gloss, bevels, gradients, badges and
     reflections live on the masthead, nav, module headers, buttons and badges. The post
     body is plain Georgia on white, generous leading, capped measure, no gradient, no
     shadow, no rounded box, no tint. The direction is a *frame* around prose that reads
     better than most 2026 blogs. A gradient behind a paragraph is this direction's flat
     design — the fastest way to break it.
  2. **Every widget is load-bearing.** Nothing is a prop. The feed badge links to a feed
     that exists. Tag-cloud tags resolve to a real listing. Archive months resolve. The
     blogroll goes somewhere. A widget that does nothing is exactly where pastiche starts,
     because a dead widget is a picture of a widget.
  3. **It is 2006 sincerely, not 1998 ironically.** The Geocities furniture — marquee, hit
     counter, under-construction GIF, starfield tile, guestbook, "best viewed in" — is a
     *different decade* and always reads as a joke. So does any caption that explains the
     joke. This blog is a working weblog, competently built, in the idiom of its year.
- Close §1 with a **Voice** paragraph, as the siblings do: the chrome speaks plain blog
  furniture (`About`, `Archives`, `Elsewhere`, `Subscribe`, `Filed under`, `Permalink`,
  `Continue reading →`); dates are long-form American (`March 4, 2026`), times 12-hour.
  Nothing anywhere winks, apologizes, or says "retro" — **the blog does not know it is
  old, because for this blog it is 2006 and this is simply how a weblog is built.**

### `## 2. Palette`
Small saturated accent set over near-white content on a colored, tiled page ground.
Split into three sub-tables: **Page and paper**, **Accents**, **Depth**. Then one `:root`
block containing every token, then the contrast rule.

The hexes below are **proposed starting values — the implementer must compute the real
WCAG ratios and adjust the hexes (darker, never the rule) until the contrast table below
passes, then publish the measured table in the brief.** Token names and roles are fixed;
hexes are the implementer's to land.

**Page and paper**

| Token | Name | Role |
|---|---|---|
| `--ground` | Template Blue (`#34586F`) | The page ground behind everything. Colored, never white — the content column floats on it. |
| `--ground-tile` | Tile Stripe (`rgb(255 255 255 / 0.035)`) | The repeating diagonal/horizontal stripe on the ground. Pure CSS, no image file (§4.5). |
| `--paper` | Content White (`#FFFFFF`) | The post well and module bodies. Period-correct pure white — the warmth lives in the ground behind it, not in the paper. |
| `--paper-alt` | Alt Row (`#F7F9FB`) | Zebra rows, blockquote and code grounds, recessed wells. |
| `--rule` | Hairline (`#D6DBE0`) | Every 1px border on paper. |
| `--ink` | Body Grey (`#333333`) | Body prose. Never `#000` — 2006 body copy was `#333`. |
| `--ink-head` | Headline Charcoal (`#222222`) | Post titles and the masthead's dark counterpart. |
| `--ink-soft` | Meta Grey (`#6E7378`) | Meta lines, timestamps, counts, captions. Must still clear 4.5 on `--paper`. |

**Accents** — three families and nothing else.

| Token | Name | Role |
|---|---|---|
| `--blue` | Kubrick Blue (`#1F5C96`) | Top stop of every gloss gradient on chrome: masthead, nav, module headers. |
| `--blue-deep` | Kubrick Deep (`#123F6B`) | Bottom stop of the same gradients; chrome borders. |
| `--blue-lite` | Sky Highlight (`#5BA3E0`) | **Graphic only** — hairline highlights, hover tints, light stop of buttons that carry *dark* text. Never a ground for white text. |
| `--link` | Hyperlink Blue (`#0B5FAE`) | Link text on paper. |
| `--visited` | Visited Purple (`#6B3FA0`) | `:visited`. The era honored visited state and so does this blog — it is genuinely useful on an archive. |
| `--rss` | Feed Orange (`#FF6600`) | The canonical feed orange. The chiclet fill and graphic marks. **Never a ground under a letterform** (§2 hard rule). |
| `--rss-deep` | Feed Orange Deep (`#C64600`) | The one orange that carries white label text; bottom stop of the feed button. |
| `--beta` | Beta Green (`#3F7A0C`) | The `new` / `beta` badge ground with white text. |
| `--beta-lite` | Sticker Green (`#8CC63F`) | Graphic only — the bright half of a green badge's gloss, never under small text. |
| `--highlight` | Yellow Fade (`#FFF6BF`) | The `:target` permalink flash (§7). After 37signals' Yellow Fade Technique, 2004. |

**Depth** — the alphas that make the gloss. `--gloss` (`rgb(255 255 255 / 0.55)`, the 1px
inner top highlight), `--sheen` (`rgb(255 255 255 / 0.18)`, the reflection overlay — the
cap is load-bearing, see below), `--shade` (`rgb(0 0 0 / 0.18)`, the tight downward drop
shadow), `--inset` (`rgb(0 0 0 / 0.12)`, the recessed-well inner shadow).

**`### Contrast — the one hard rule`.** Every sibling brief has one; this one is:
**white text sits only on a ground whose *lightest composited* pixel measures ≥ 4.5:1.**
Gloss gradients plus a `--sheen` reflection make the top of a header much lighter than its
fill, and that composite — not the fill hex — is the ground under the label. The brief must
state the composite formula (`c' = c + sheen·(1 − c)` per channel in sRGB), publish a
measured table covering at minimum:

- Body Grey on Content White, Meta Grey on Content White, Meta Grey on Alt Row
- Hyperlink Blue on Content White, Visited Purple on Content White
- Content White on Kubrick Blue **composited with `--sheen`** (the masthead/module-header
  worst case — this is the pair that forces the blue to be dark)
- Content White on Kubrick Deep, Content White on Feed Orange Deep, Content White on Beta Green
- Content White on Feed Orange — record it as **failing**, with the consequence spelled out:
  the feed chiclet carries the white *feed glyph* (a graphic, drawn in CSS or inline SVG),
  and the word "Subscribe" sits beside it in Hyperlink Blue on paper. Graphic, never a
  letterform — the same logic `vhs/` uses for Static Grey.
- Body Grey on the Yellow Fade highlight (the `:target` flash must not drop legibility).

Two consequences to state outright: **Sky Highlight, Feed Orange and Sticker Green never
carry text**, and **`--sheen` is capped at 0.18** — raising the reflection is how the
masthead label silently fails.

### `## 3. Type`
- **Open with the rule, explicitly: no webfont, no external request, no `@import`, no head
  `<link>` to a font CDN.** State it as a sentence FA-32 cannot miss. `memphis/` does the
  same ("No webfonts"). The era's blogs used the OS stack, which is also the accurate
  choice. (`vhs/` loads one webfont; this direction deliberately does not — say so.)
- Stacks table + `:root` block:
  - `--font-ui`: `'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'Trebuchet MS', Verdana, sans-serif` — masthead, nav, module headers, meta lines, badges, buttons. The 2006 interface face.
  - `--font-prose`: `Georgia, 'Times New Roman', 'Nimbus Roman No9 L', serif` — post bodies, excerpts, blockquotes. The reading face.
  - `--font-title`: `'Trebuchet MS', 'Lucida Grande', Verdana, sans-serif` — post titles and the wordmark, if the brief wants titles sans; state which and be consistent.
  - `--font-mono`: `Monaco, 'Andale Mono', Consolas, 'Courier New', monospace` — code blocks and any `<pre>`.
- A `clamp()`-based scale (`--t-xs` … `--t-2xl`) plus the prose specifics: prose at
  ~16–17px Georgia, `line-height: 1.65`, measure capped at **`68ch`** (state a number),
  paragraph spacing from the spacing scale, first-line indent **off**.
- Rules to state: in-prose links are underlined **always** (chrome links underline on
  hover only); no letterspacing on prose; `text-shadow` is permitted **only** on the
  masthead wordmark and nav labels over gloss, and never counted toward contrast;
  ALL CAPS only on badges; module headers are bold `--font-ui` at ~12px with `+0.02em`
  tracking.

### `## 4. Gloss, bevel and edge`
The material section — the heart of the brief, the analogue of `vhs/ §4` and `memphis/ §3`.
Named recipes with real CSS, each with a class name FA-32 can use verbatim:

- **4.1 `.blog-gloss`** — the era's signature surface: a two-stop `linear-gradient` with a
  **hard stop at 50%** (the top half lighter, the bottom half darker — that hard break is
  what makes it read as 2006 rather than as a soft modern gradient), a 1px border one step
  darker than the bottom stop, `box-shadow: inset 0 1px 0 var(--gloss)` for the lit top
  edge, and an optional `::after` reflection over the top half at `--sheen`. State the
  z-order (label above the reflection) and the contrast consequence from §2.
- **4.2 `.blog-well`** — recessed field (search input, code block, quote): `--paper-alt`
  fill, 1px `--rule`, `box-shadow: inset 0 1px 2px var(--inset)`. Recessed is the inverse
  of gloss and the two never appear on the same element.
- **4.3 `.blog-module`** — the sidebar unit: white body, 1px `--rule`, `border-radius: 5px`,
  a `.blog-gloss` header bar with white `--font-ui` bold label, a `<ul>` body with hairline
  row separators. Every module is this shape; there is no second sidebar shape.
- **4.4 Buttons, tabs and badges** — the nav tabs (gloss, active tab lighter and connected
  to the bar below it), the feed chiclet (`--rss` fill, white glyph, 3px radius), the
  `new`/`beta` badge (`--beta` ground, white ALL CAPS 10–11px), and the footer badge row.
  **Badges assert only true things** — no "Valid XHTML 1.0" or a framework the page does
  not use. Truthful badges only (e.g. hand-coded HTML, no trackers, RSS 2.0).
- **4.5 The page tile** — the ground texture: a `repeating-linear-gradient` stripe at 45°
  or a 1px horizontal ruling, in `--ground-tile` over `--ground`, plus a top-down darkening
  gradient behind the masthead. **Pure CSS, no image file** (§9 explains why this is not
  optional).
- **4.6 Radius, border and shadow scales** — bimodal radius: `--r-sm: 4px` / `--r-md: 6px`
  on chrome, `--r-pill: 999px` on tag pills, and the explicit ceiling: **nothing exceeds
  8px.** A 16–20px radius reads as 2015 iOS and is the single most out-of-vocabulary thing
  that can appear here. Shadows are tight, dark, and offset downward
  (`0 1px 2px var(--shade)`, `0 2px 5px var(--shade)` for the content column lifting off
  the ground) — never a large soft ambient bloom.
- **4.7 The gloss gotchas** — where gloss is forbidden: behind prose, behind meta lines,
  on the content well, on any surface that also carries `--inset`. Plus: one reflection per
  element, `--sheen` never above 0.18, no `backdrop-filter` (it did not exist and it reads
  as 2020), no `border-radius` on the post body, no gradient on a paragraph background.

### `## 5. Layout`
- An ASCII diagram of the page, in the style of `software/ §6`: masthead → nav strip →
  two columns (main left, sidebar right) → footer, all inside a centered wrapper on the
  tiled ground.
- Concrete numbers: wrapper `width: min(100% - 24px, 940px)`, `margin: 0 auto`; main column
  `620px`, sidebar `268px`, gutter `28px`; masthead ~`110px` tall. Fixed-ish and centered,
  the way 2006 layouts were — the content column has a real edge against the ground, with a
  1px border and a small drop shadow.
- Spacing scale `--s-1` … `--s-6`.
- **Masthead**: gloss blue band, wordmark in `--font-title` white, tagline under it in a
  pale blue. **Nav strip**: darker blue bar with gloss tabs — `Home · Archives · About ·
  Subscribe`; the current tab is lit and connected to the content below it.
- **Sidebar modules, in this order** (all `.blog-module`; at least five must ship):
  1. **About** — small avatar (inline SVG or an `<img>` in markup, never a CSS `url()`),
     2–3 factual sentences, a link back to `forrestalmasi.com`. The blurb is a slot: the
     brief must instruct FA-32 **not to invent biography or opinions in the user's voice**.
  2. **Subscribe** — the Feed Orange chiclet linking to a real `feed.xml`, per §2's rule.
  3. **Tags** — a real tag cloud: five size steps (`--t-tag-1` … `--t-tag-5`), weight and
     color stepping with size, every tag a link that resolves.
  4. **Archives** — by month with post counts (`March 2026 (3)`), each linking to a real
     archive anchor.
  5. **Elsewhere / blogroll** — real outbound links (GitHub, Twitter, email, the main site).
  6. **Search** — *optional, and only if it actually works* client-side over the rendered
     post list. A search box that does nothing violates §1 rule 2 and must be omitted
     instead. State this explicitly so FA-32 does not ship a dead input.
- **Footer**: a bar inside the wrapper, small `--font-ui` grey type, the truthful badge row,
  a copyright line.
- **Responsive**: below ~760px the sidebar drops beneath the main column, everything goes
  fluid, and there is **no horizontal scroll at 320px**. The masthead never becomes a
  hamburger — the tab strip wraps.
- **Scrolling**: this is a blog, so it scrolls — and the brief must say *how*, because the
  combined shell does not scroll. The site owns its own scroll container: `html, body`
  both `height: 100%` (identical values on both — the contract forbids differing values),
  and `body { overflow-y: auto }`, which maps to `#site-blog` in a build. No
  `position: fixed`, no sticky masthead.

### `## 6. The content model`
This section is what FA-32 builds against; be specific and name the classes.

- **Entry anatomy** on the front page, reverse-chronological:
  `.blog-entry` › `h2.blog-entry-title` (links to the permalink) › `.blog-entry-meta`
  (`Posted by Forrest on March 4, 2026 at 9:42 pm · Filed under: <tags> · Permalink`) ›
  `.blog-entry-body` (excerpt: the first 1–3 paragraphs) › `.blog-entry-more`
  (`Continue reading →`).
- **Permalinks**: every post has a stable URL. Specify the shape —
  `blog/posts/YYYY-MM-DD-slug.html` — and require both the title and the `Permalink` word
  to point at it. Post pages are one directory deep; **all cross-page hrefs are relative**
  (`../style.css`, `../index.html`).
- **Post pages**: same shell, same sidebar, one full entry; a post footer with the tag
  list, a `Reply by email` mailto (there is no comment system on a static site — so **no
  comment form and no fake comment count**), previous/next post links, and
  `← Back to the front page`.
- **Archive** (`blog/archive.html`): every post grouped by month with anchors
  (`#blog-archive-2026-03`) and by tag (`#blog-tag-<name>`), so the sidebar's archive and
  tag-cloud links resolve. Alternative accepted shape: per-tag pages under `blog/tags/`.
  Name both and let FA-32 pick; require only that **no tag or month link is dead**.
- **Feed**: a real `blog/feed.xml` (RSS 2.0) that the chiclet points at. Publishing a post
  updates it.
- **Post template**: `blog/posts/_template.html`, copy-to-write, with a comment block
  listing every place a new post must be registered (the post file, the front page entry,
  the archive, the feed). No build step exists — the brief must say so and make the manual
  workflow explicit.
- **Deliberately absent**: comment form, comment counts, share buttons, analytics, cookie
  banner, newsletter modal, related-posts widget, reading-time estimate, infinite scroll.
- **The writing renders with JavaScript off.** State it as a rule: JS is optional on this
  site, and no post text, title, date or link may depend on it.

### `## 7. Motion`
2006 predates CSS transitions, so motion is nearly absent and mechanical. A table of the
sanctioned effects — no more than five — each with a duration cap:

- Chrome link/tab hover: instant or ≤ 120ms `ease-out`, on `background-color`/`color` only.
- Button/tab `:active`: `translateY(1px)`, gloss inverted, no transition on the press.
- **Yellow Fade Technique**: `:target` on an entry runs `blog-yft` once, ~1.2s `ease-out`,
  `--highlight` → transparent. The one period citation, and the one keyframe worth having.
- In-prose link underline is always on — it is not a motion effect and must not become one.
- Nothing else: no reveal-on-scroll, no parallax, no scroll-jacking, no sticky header, no
  skeleton loaders, no marquee, no page-load animation.
- The standard `@media (prefers-reduced-motion: reduce)` block, copied from `memphis/ §7`.

### `## 8. What this is not`
A `| Not this | Because |` table, at least six rows, and it must include:

- **Geocities / Web 1.0** — the nearest miss. Tiled starfields, marquee, hit counter,
  under-construction GIF, guestbook. Wrong decade and, worse, wrong sincerity: that
  furniture is only ever quoted as a joke.
- **Frutiger Aero** — shares the gloss, wrong register. Bubbles, water, grass, lens flare,
  2007–2012 consumer OS wallpaper. This is web chrome, flat-lit, not an ecosystem.
- **`iphone/` next door** — the repo's other gloss, and the closest continuity risk. 2009's
  molded gel buttons and hard specular seams versus 2006's flat two-stop web gradient. A
  gel button in this sidebar is a continuity error.
- **A modern minimal blog (Medium / Substack)** — a 700px centered column, no sidebar, no
  chrome, system sans. The default this direction exists in order to not be.
- **Bootstrap-era 2012** — where the gradients went grey and subtle, the radius went to 4px
  on everything, and the sidebar died.
- **Vaporwave / "retro web" pastiche** — the ironic memory of this era. Winking, deliberately
  broken, captioned. This blog plays it straight or it does not work.
- Close with an "Also out" paragraph: dark mode, hamburger menus, card grids, glassmorphism,
  `backdrop-filter`, emoji as icons, webfonts, radii above 8px, gradients behind prose,
  and any caption that explains the joke — no "web 2.0" in the copy, no "remember when".

### `## 9. Page application`
The closer, in the shape of `vhs/ §9` — what gets built, then the build-contract specifics
stated in full so FA-32 needs nothing outside this file, then a checkable test.

**What gets built**: `blog/index.html` (front page), `blog/style.css` (shared),
`blog/archive.html`, `blog/posts/YYYY-MM-DD-slug.html`, `blog/posts/_template.html`,
`blog/feed.xml`, and an optional `blog/script.js`.

**Contract specifics** — pull every one of these from the root `CLAUDE.md` and state them
as rules of this direction:

- `/blog/` is a **standalone destination**, not a viewport bucket: it is not added to
  `sites.config.json` and the root `index.html` is not rebuilt for it. The reason belongs
  in the brief: the buckets 500–1400 are taken and the built root page does not scroll,
  while a blog must. **Nothing in this brief may prevent mapping it later**, so the front
  page is authored to the sub-site contract anyway.
- Wrapper `#site-blog`. **Every `id` in markup and in inline SVG is prefixed `blog-`**, and
  every `@keyframes` name too (`blog-yft`) — all sites share one document in the built page
  and ids, filter refs and keyframes resolve document-wide.
- **`style.css` contains no `url()` pointing at a local file.** All texture is CSS-generated
  (§4.5). Two reasons, both worth stating: `build.js` rewrites relative `url()` targets to
  `blog/…`, which would break the same stylesheet when loaded by a post page one directory
  deeper; and it keeps the folder asset-free. Images live in markup as `<img>` with a
  per-page relative `src`.
- **No `@import`** (§3 — there is no webfont), and only
  `@media`/`@supports`/`@keyframes`/`@font-face` at-rules.
- **No commas inside functional pseudo-classes** — write `#site-blog a:hover` and
  `#site-blog a:focus-visible` as separate rules, never `:is(a, b)`.
- No literal `</style>` in CSS, no literal `</script>` in JS.
- Never set `display` on `html`/`body`; never set the same property to different values on
  `html` vs `body` (both map to the wrapper). The scroll container rule from §5 restated.
- No `position: fixed` anywhere.
- If `blog/script.js` exists it is exactly one registry function —
  `(window.SITES = window.SITES || {})['blog'] = function (root) { … }` — querying only via
  `root.querySelector(All)`, listeners only on elements inside `root`, never on
  `window`/`document`, never writing styles or classes to `root` itself (`root` is
  `document` standalone and `Document` has no `.style`). Standalone boot at the end of the
  front page's body:
  `<script src="./script.js"></script><script>SITES['blog'](document);</script>`.
  Post pages boot the same function with `../script.js`.
- Head conventions per `.claude/skills/brand-page/SKILL.md` §3: `<!DOCTYPE html>`,
  `lang="en"`, charset + viewport, description, the OG/Twitter set, canonical, tab-indented
  markup, absolute URLs at `https://www.forrestalmasi.com`.

**The test** — a checkable list closing the brief, in `vhs/`'s style. At minimum:
every sidebar link resolves; the feed chiclet points at a file that exists; JS disabled and
every post still reads; no horizontal scroll at 320px; no gradient, shadow or radius on any
element containing prose; measured contrast on every sanctioned text pair; no radius above
8px; `--sheen` ≤ 0.18; no `url()` in `style.css`; every `id` prefixed `blog-`; the page is
full-bleed with no white gaps against the ground.

## Judgment calls made here, so FA-32 does not reopen them

- **Hexes are proposed, not fixed.** Names and roles are fixed. The implementer computes
  ratios and darkens stops until §2's table passes. The blue in particular will likely need
  to be darker than instinct suggests, because the sheen composites over it.
- **No webfont.** Deviates from `vhs/` (one webfont) and matches `memphis/`/`software/`
  (none). The era's blogs used the OS stack; Lucida Grande and Georgia are the accurate
  choice and cost nothing.
- **Pure white content well**, deviating from `memphis/`'s "never `#FFF`" rule. 2006 content
  columns were `#FFF` with a 1px grey border; the warmth lives in the ground behind it.
- **Feed Orange never carries a letterform.** The historically accurate white-on-`#FF6600`
  chiclet fails WCAG; the brief keeps the look by making the white mark a *glyph* and
  putting the word next to it.
- **No comment UI at all** — a static site cannot serve one, and a decorative comment count
  is exactly the dead widget §1 rule 2 forbids. `Reply by email` instead.
- **Search is conditional** on actually working.

## Acceptance criteria

1. `blog/BRANDING.md` exists and is the only file added or changed. No `index.html`,
   `style.css`, or post file is created. `sites.config.json`, root `index.html` and
   `build.js` are untouched.
2. The file has a title, a `>` direction blockquote quoting the user's ask, and nine `## `
   sections in the order above.
3. §1 contains three numbered "things to hold onto" and a Voice paragraph, and states some
   form of "the blog does not know it is old."
4. §2 has ≥ 16 tokens across three `| Token | Name | Hex | Role |` tables; every token
   appears in a single `:root` block and vice versa; every Name is a period-specific proper
   noun. A contrast subsection publishes **measured** ratios for every sanctioned text/ground
   pair including the sheen-composited masthead worst case; every pair carrying prose or
   small UI text measures ≥ 4.5; Feed Orange, Sky Highlight and Sticker Green are explicitly
   recorded as non-text.
5. §3 contains an explicit sentence that no webfont is loaded and `style.css` has no
   `@import`, plus four named stacks and a `clamp()` scale, plus a numeric prose measure.
6. §4 defines at least five named recipes (`.blog-gloss`, `.blog-well`, `.blog-module`,
   badge/tab, the ground tile) with real CSS, plus radius/border/shadow scales with the
   8px radius ceiling, plus a gotchas subsection that forbids gloss behind prose.
7. §5 has an ASCII layout diagram, numeric wrapper/main/sidebar/gutter widths, an ordered
   list of ≥ 5 sidebar modules, the 760px breakpoint, "no horizontal scroll at 320px", and
   the `html`/`body` scroll-container rule.
8. §6 names the entry parts as CSS classes, fixes the permalink URL shape, lists the
   deliverable pages including `feed.xml` and `_template.html`, states the manual
   publishing workflow, lists what is deliberately absent, and states that the writing
   renders with JS off.
9. §7 lists ≤ 5 sanctioned effects each with a duration cap, includes the Yellow Fade
   `:target` treatment, and includes the `prefers-reduced-motion` block.
10. §8 is a table of ≥ 6 near misses including Geocities/Web 1.0, Frutiger Aero, `iphone/`,
    a modern minimal blog, and an ironic retro-web pastiche.
11. §9 covers all of: standalone-not-bucketed, `#site-blog`, `blog-` id and keyframe
    prefixes, no local `url()` in `style.css` (with the `build.js` rewrite reason),
    no `@import`, no commas in functional pseudo-classes, no literal `</style>`/`</script>`,
    the `html`/`body` rules, no `position: fixed`, the `SITES['blog']` registry function and
    standalone boot line, and closes with a checkable test list.
12. Nothing in the brief contradicts the authoring contract in the root `CLAUDE.md`.
    Spot-checks: no head `<link>` font, no root-absolute asset path, no sticky/fixed
    positioning, no `display` on `html`/`body`.
13. The brief instructs FA-32 not to fabricate biography or opinions in the user's voice
    (the About blurb and post copy are slots).
14. Length 450–700 lines; voice matches `vhs/` and `memphis/` — declarative, deadpan, no
    hedging, no second person, and the brief itself never winks.

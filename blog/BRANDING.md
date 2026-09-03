# Blog

> Design direction: **the weblog, 2005–2008** — the read-write web at the exact moment
> its chrome got optimistic. Glossy blue gradient headers with a reflection across the
> top half, 5px rounded corners, 1px borders with a lit inner edge, a real right sidebar
> carrying a tag cloud and an archive by month, an orange feed chiclet, Lucida Grande
> furniture over Georgia prose. The reference set is Blogger's 2006 default templates,
> WordPress's Kubrick, Movable Type, Flickr, del.icio.us and 37signals. The user's ask,
> honored in full: *"i want to make a new site /blog for my writing. the branding should
> be bloggy and web 2.0."* Played straight, the way `vhs/` plays the TV-VCR straight.

## 1. The direction

2006 is when the web stopped being a set of documents and became a set of accounts — a
profile, a feed, a tag cloud, a permalink, something to say every few days. The chrome that
arrived with it was cheerful and slightly overbuilt: gradients on everything structural, a
reflection across the top half of every header bar, a 1px inner highlight to make the
plastic look wet, corners rounded 4 to 6 pixels and never more, `beta` worn as a badge of
honor. Underneath it the *writing* was the most conservative thing on the page: Georgia, 16
pixels, black-ish on white, a narrow measure, a date. That contradiction is the direction.

Three things to hold onto, because getting them wrong produces a retro-themed home page
rather than a weblog:

1. **The chrome is glossy; the writing is not.** Gloss, bevels, gradients, reflections and
   badges live on the masthead, the nav strip, module headers, buttons and pills. The post
   body is plain Georgia on white — generous leading, capped measure, no gradient, no
   shadow, no rounded box, no tint, no card. This direction is a *frame* around prose that
   reads better than most blogs shipping in 2026, and a gradient behind a paragraph is its
   flat design: the fastest way to break it.
2. **Every widget is load-bearing.** Nothing here is a prop. The feed chiclet links to a
   feed that exists, every tag in the cloud resolves to a listing containing that tag, every
   archive month resolves to posts, the blogroll goes somewhere real. A widget that does
   nothing is where pastiche starts, because a dead widget is not a widget — it is a picture
   of one.
3. **It is 2006 sincerely, not 1998 ironically.** The Geocities furniture — marquee, hit
   counter, under-construction GIF, starfield tile, guestbook, "best viewed in" — is a
   different decade and only ever gets quoted as a joke. So does any caption that explains
   the joke. This is a working weblog, competently built, in the idiom of its year.

**Voice.** The chrome speaks plain blog furniture and nothing else: `About`, `Archives`,
`Elsewhere`, `Subscribe`, `Filed under`, `Permalink`, `Continue reading →`, `Posted by`.
Dates are long-form American — `March 4, 2026` — times 12-hour with a lowercase meridiem
(`9:42 pm`), counts parenthetical (`March 2026 (3)`). Nothing anywhere winks, apologizes or
says "retro" — **the blog does not know it is old, because for this blog it is 2006 and this
is simply how a weblog is built.**

---

## 2. Palette

A small saturated accent set, over a near-white content column, over a colored tiled ground.
The ground is never white — the column has to float on something, or the chrome has no
object to sit on. Swatches are named for what they are on the period web; use the names in
code and in conversation.

### Page and paper

| Token | Name | Hex | Role |
|---|---|---|---|
| `--ground` | Template Blue | `#34586F` | The page ground behind everything. Colored, never white — the content column floats on it. |
| `--ground-tile` | Tile Stripe | `rgb(255 255 255 / 0.035)` | The repeating stripe drawn over the ground. Pure CSS, no image file (§4.5). |
| `--paper` | Content White | `#FFFFFF` | The post well and module bodies. Period-correct pure white — the warmth lives in the ground behind it, not in the paper. |
| `--paper-alt` | Alt Row | `#F7F9FB` | Zebra rows, blockquote and code grounds, recessed wells. |
| `--rule` | Hairline | `#D6DBE0` | Every 1px border on paper. |
| `--ink` | Body Grey | `#333333` | Body prose. Never `#000` — 2006 body copy was `#333`. |
| `--ink-head` | Headline Charcoal | `#222222` | Post titles and every heading on paper. |
| `--ink-soft` | Meta Grey | `#686D72` | Meta lines, timestamps, counts, captions. Dark enough to clear 4.5 on Alt Row, which is where it usually lands. |

### Accents — three families, blue, orange and green, and nothing else

| Token | Name | Hex | Role |
|---|---|---|---|
| `--blue` | Kubrick Blue | `#1B528A` | The `--gloss-fill` of every blue chrome surface: masthead, active tab, module headers. The lightest solid pixel of any blue gloss. |
| `--blue-deep` | Kubrick Deep | `#103A63` | The nav strip ground and the 1px edge on every blue gloss surface. |
| `--blue-pale` | Kubrick Pale | `#CFE0F0` | Type *on* Kubrick Deep only: the masthead tagline, inactive nav labels. Never on Kubrick Blue, which carries the reflection. |
| `--blue-lite` | Sky Highlight | `#5BA3E0` | **Graphic only** — hairline lit edges, the tag-pill hover tint, the lit half of a badge. Never a ground for text, never a focus ring on paper. |
| `--link` | Hyperlink Blue | `#0B5FAE` | Link text on paper, and the focus outline on paper. |
| `--visited` | Visited Purple | `#6B3FA0` | `:visited`. The era honored visited state and so does this blog — on an archive it is genuinely useful. |
| `--rss` | Feed Orange | `#FF6600` | The canonical feed orange. The chiclet fill and graphic marks. **Never a ground under a letterform.** |
| `--rss-deep` | Feed Orange Deep | `#A03900` | The one orange that carries a white label — darker than instinct, because the reflection composites over it. Also the chiclet's 1px edge. |
| `--beta` | Beta Green | `#316209` | The `new` / `beta` badge fill, with white ALL CAPS on it. |
| `--beta-lite` | Sticker Green | `#8CC63F` | Graphic only — the 1px lit edge of a green badge. Never under text. |
| `--highlight` | Yellow Fade | `#FFF6BF` | The `:target` permalink flash (§7). After 37signals' Yellow Fade Technique, 2004. |

### Depth — the four alphas that make the gloss, and the whole material vocabulary

| Token | Name | Hex | Role |
|---|---|---|---|
| `--gloss` | Lit Edge | `rgb(255 255 255 / 0.55)` | The 1px `inset 0 1px 0` highlight along the top of every raised surface. |
| `--sheen` | Reflection | `rgb(255 255 255 / 0.18)` | The reflection over the top half of a gloss surface. **The cap is load-bearing — see below.** |
| `--shade` | Drop | `rgb(0 0 0 / 0.18)` | The tight downward drop shadow under raised chrome and the content column. |
| `--inset` | Recess | `rgb(0 0 0 / 0.12)` | The inner shadow of a recessed well. |

```css
:root {
	--ground:      #34586F;
	--ground-tile: rgb(255 255 255 / 0.035);
	--paper:       #FFFFFF;
	--paper-alt:   #F7F9FB;
	--rule:        #D6DBE0;
	--ink:         #333333;
	--ink-head:    #222222;
	--ink-soft:    #686D72;
	--blue:        #1B528A;
	--blue-deep:   #103A63;
	--blue-pale:   #CFE0F0;
	--blue-lite:   #5BA3E0;
	--link:        #0B5FAE;
	--visited:     #6B3FA0;
	--rss:         #FF6600;
	--rss-deep:    #A03900;
	--beta:        #316209;
	--beta-lite:   #8CC63F;
	--highlight:   #FFF6BF;
	--gloss:       rgb(255 255 255 / 0.55);
	--sheen:       rgb(255 255 255 / 0.18);
	--shade:       rgb(0 0 0 / 0.18);
	--inset:       rgb(0 0 0 / 0.12);
}
```

### Contrast — the one hard rule

**White text sits only on a ground whose lightest composited pixel measures ≥ 4.5:1.**

The fill hex is not the ground. A gloss surface carries a `--sheen` reflection over its top
half (§4.1), so the pixels under the first line of a header label are 18% of the way to
white. Measure the composite, not the swatch: `c' = c + sheen · (1 − c)`, per channel, sRGB
0–1, `sheen = 0.18`.

One exception, and only one: the 1px `--gloss` lit edge is excluded, because no glyph sits
on it — every label is inset at least 5px from the top edge of its surface.

Measured (WCAG 2.1, computed against the ground the text actually sits on):

| Pair | Ratio |
|---|---|
| Body Grey on Content White | **12.6** ✓ |
| Headline Charcoal on Content White | **15.9** ✓ |
| Meta Grey on Content White | **5.2** ✓ |
| Meta Grey on Alt Row | **5.0** ✓ |
| Hyperlink Blue on Content White | **6.4** ✓ |
| Visited Purple on Content White | **7.4** ✓ |
| Content White on Kubrick Blue, composited with `--sheen` (`#44719F`) — the masthead and module-header worst case | **5.1** ✓ |
| Content White on Kubrick Deep | **11.6** ✓ |
| Kubrick Pale on Kubrick Deep | **8.6** ✓ |
| Content White on Feed Orange Deep, composited with `--sheen` (`#B15D2E`) | **4.7** ✓ |
| Content White on Beta Green, composited with `--sheen` (`#567E35`) | **4.7** ✓ |
| Body Grey on Yellow Fade | **11.5** ✓ |
| Content White on Feed Orange | 2.9 ✗ — see below |
| Content White on Sky Highlight | 2.7 ✗ — graphic only |
| Content White on Sticker Green | 2.1 ✗ — graphic only |

Three consequences, stated so they are not rediscovered:

- **Feed Orange never carries a letterform.** The accurate white-on-`#FF6600` chiclet
  fails, and darkening it until it passes stops being the feed orange — so the chiclet keeps
  `--rss` and carries the white **feed glyph**, a graphic drawn in CSS or inline SVG, while
  the *word* `Subscribe` sits beside it in Hyperlink Blue on paper at 6.4. The chiclet is
  decorative and never the only affordance: it lives inside the same `<a>` as the word,
  which is what conveys the link. Same logic `vhs/` uses for Static Grey.
- **Sky Highlight and Sticker Green never carry text and never draw a focus ring on paper**
  (2.7 and 2.1 on white, below the 3:1 non-text floor). Focus rings are Hyperlink Blue on
  paper, Content White on chrome.
- **`--sheen` is capped at 0.18, one reflection per element.** Raising or stacking the
  reflection is how the masthead label silently drops below 4.5 while still looking fine to
  whoever raised it. Any new `--gloss-fill` under white text is re-measured composited
  before it ships.

---

## 3. Type

**No webfont. No external font request. No `@import` in `style.css`, and no `<link>` to a
font CDN in any head.** The 2006 blog set itself in whatever the operating system had, which
is also the accurate choice — Lucida Grande and Georgia shipped on the machines that read
these blogs. `vhs/` loads one webfont; this direction deliberately loads none.

Four stacks; every element on the page belongs to one of them.

| Token | Stack | Role |
|---|---|---|
| `--font-ui` | Lucida Grande → Lucida Sans Unicode → Lucida Sans → Trebuchet MS → Verdana | The 2006 interface face. Masthead tagline, nav, module headers, meta lines, badges, buttons, footer, tag cloud. |
| `--font-prose` | Georgia → Times New Roman → Nimbus Roman No9 L | The reading face. Post bodies, excerpts, blockquotes, the About blurb. |
| `--font-title` | Trebuchet MS → Lucida Grande → Verdana | The wordmark and every post title. Titles are **sans** on this blog — Trebuchet over Georgia is the period's own contrast, and it keeps the serif exclusively for reading. |
| `--font-mono` | Monaco → Andale Mono → Consolas → Courier New | `<code>`, `<pre>`, and nothing else. |

```css
:root {
	--font-ui:    'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'Trebuchet MS', Verdana, sans-serif;
	--font-prose: Georgia, 'Times New Roman', 'Nimbus Roman No9 L', serif;
	--font-title: 'Trebuchet MS', 'Lucida Grande', Verdana, sans-serif;
	--font-mono:  Monaco, 'Andale Mono', Consolas, 'Courier New', monospace;

	--t-xs:  clamp(0.6875rem, 0.67rem + 0.06vw, 0.75rem);    /* badges, footer, counts */
	--t-sm:  clamp(0.75rem,   0.72rem + 0.12vw, 0.8125rem);  /* meta lines, module labels, nav */
	--t-md:  clamp(1rem,      0.97rem + 0.14vw, 1.0625rem);  /* prose — 16 to 17px Georgia */
	--t-lg:  clamp(1.125rem,  1.05rem + 0.35vw, 1.375rem);   /* entry titles on the front page */
	--t-xl:  clamp(1.5rem,    1.30rem + 0.90vw, 2rem);       /* the post title on a post page */
	--t-2xl: clamp(1.75rem,   1.40rem + 1.60vw, 2.5rem);     /* the wordmark */

	/* the tag cloud's five steps, §5 */
	--t-tag-1: 0.6875rem; --t-tag-2: 0.8125rem; --t-tag-3: 0.9375rem;
	--t-tag-4: 1.125rem;  --t-tag-5: 1.375rem;
}
```

```css
#site-blog .blog-entry-body {
	font-family: var(--font-prose);
	font-size: var(--t-md);       /* 16–17px Georgia */
	line-height: 1.65;
	color: var(--ink);
	max-width: 68ch;
}
#site-blog .blog-entry-body p { margin: 0 0 var(--s-4); text-indent: 0; }
```

- **Measure is capped at `68ch`**, and first-line indent is **off** — 2006 blogs used a
  blank line between paragraphs, not an indent, and mixing the two is a typographic error.
- **In-prose links are underlined always.** Chrome links — nav, modules, footer, tag cloud
  — underline on hover only. That split is the whole link system; there is no third case.
- **No letterspacing on prose.** Module headers are bold `--font-ui` at `--t-sm`,
  `letter-spacing: 0.02em`; badges are ALL CAPS `--font-ui` at `--t-xs`, `0.04em`. ALL CAPS
  appears on badges and nowhere else — not on module headers, not on the wordmark.
- **`text-shadow` is permitted on exactly two things**: the masthead wordmark and the nav
  labels, both `0 1px 0 rgb(0 0 0 / 0.35)` over gloss. It is never counted toward contrast
  — the ratios in §2 assume no shadow at all.
- Headings inside a post body are `--font-title` in `--ink-head`, never larger than the
  post title above them.

---

## 4. Gloss, bevel and edge

The material section. Every raised surface is one recipe, every recessed surface is its
inverse, the two never appear on the same element, and the class names below are normative.

### 4.1 The gloss surface — `.blog-gloss`

The signature: a fill, a **hard stop at 50%** to a darkened bottom half, a 1px edge one step
darker than the fill, a 1px lit top edge, and a reflection over the top half. The hard break
is what makes it read as 2006 — a smooth top-to-bottom ramp is a 2012 button.

```css
.blog-gloss {
	--gloss-fill: var(--blue);
	--gloss-edge: var(--blue-deep);
	position: relative;
	background-color: var(--gloss-fill);
	background-image: linear-gradient(to bottom,
		rgb(0 0 0 / 0) 0, rgb(0 0 0 / 0) 50%,
		rgb(0 0 0 / 0.18) 50%, rgb(0 0 0 / 0.30) 100%);
	border: 1px solid var(--gloss-edge);
	border-radius: var(--r-sm);
	box-shadow: inset 0 1px 0 var(--gloss);
	color: var(--paper);
	font-family: var(--font-ui);
}
.blog-gloss::after {
	content: '';
	position: absolute;
	inset: 0 0 50% 0;                 /* the top half only */
	border-radius: var(--r-sm) var(--r-sm) 0 0;
	background-image: linear-gradient(to bottom, var(--sheen), rgb(255 255 255 / 0));
	pointer-events: none;
}
.blog-gloss > * { position: relative; z-index: 1; }
```

Three things this recipe fixes permanently. **The bottom half is derived, not a token** —
blue, orange and green use the same black overlay, so a new gloss color is one
`--gloss-fill` override; **the lightest solid pixel of any gloss surface is its
`--gloss-fill`**, no stop ever lighter, which is what makes §2's measurement complete; and
**labels sit above the reflection** (`z-index: 1` on children, `pointer-events: none` on the
`::after`), because a white label rendered *under* an 18% white wash is a worse number than
the one measured in §2. The reflection rounds only its top corners —
`border-radius: inherit` on a half-height `::after` rounds its *bottom* edge too and leaves
a notch across the middle of the bar.

### 4.2 The recessed well — `.blog-well`

The inverse: search inputs, `<pre>` blocks, blockquotes, anything that should read as cut
into the paper rather than raised off it.

```css
.blog-well {
	background-color: var(--paper-alt);
	border: 1px solid var(--rule);
	border-radius: var(--r-sm);
	box-shadow: inset 0 1px 2px var(--inset);
}
```

Recessed and raised never meet: an element with `--inset` never carries `--gloss`, `--sheen`
or a gradient. A well that glosses is a bump and the light stops making sense.

### 4.3 The sidebar module — `.blog-module`

Every sidebar unit is this shape; there is no second sidebar shape.

```css
.blog-module {
	background-color: var(--paper);
	border: 1px solid var(--rule);
	border-radius: var(--r-md);
	box-shadow: 0 1px 2px var(--shade);
	margin-bottom: var(--s-5);
	overflow: hidden;                 /* clips the square-cornered header to the module radius */
}
.blog-module-head {                   /* also carries .blog-gloss */
	border-width: 0 0 1px 0;
	border-radius: 0;                 /* square; the module's overflow clips it, and the
	                                     same clip catches the ::after reflection */
	padding: 6px 10px;
	font: bold var(--t-sm) var(--font-ui);
	letter-spacing: 0.02em;
}
.blog-module-body { padding: var(--s-3) 10px; font: var(--t-sm) var(--font-ui); }
.blog-module ul { margin: 0; padding: 0; list-style: none; }
.blog-module li { padding: 5px 10px; border-top: 1px solid var(--rule); }
.blog-module li:first-child { border-top: 0; }
```

### 4.4 Buttons, tabs, badges and the chiclet

- **Nav tabs.** The nav strip is flat `--blue-deep`. An inactive tab is transparent with a
  `--blue-pale` label; hover lifts its ground by `rgb(255 255 255 / 0.08)` and its label to
  `--paper`. The **active tab is `.blog-gloss`** with `--gloss-fill: var(--blue)`, a
  `--paper` label, `--r-sm` top corners, square bottom corners, and
  `border-bottom-color: transparent` with a `-1px` bottom margin so it is physically
  connected to the content below — that connection is the era's whole tab metaphor. Plain
  buttons are the same recipe at `--r-sm`, `--font-ui` bold at `--t-sm`, at least 32px tall
  and 44px wide; `:active` seats them (§7).
- **The `new` / `beta` badge.** `.blog-gloss` with `--gloss-fill: var(--beta)`,
  `--gloss-edge: rgb(0 0 0 / 0.35)`, and `inset 0 1px 0 var(--beta-lite)` as its lit edge
  in place of `--gloss`. `--r-sm`, `--paper` ALL CAPS at `--t-xs`, `2px 6px` padding.
  Measured white-on-composite: 4.7.
- **The feed chiclet.** 14×14px, 3px radius, `--rss` fill, `--rss-deep` 1px edge, with the
  white feed glyph inside it — a dot and two arcs in CSS or inline SVG, **not** an image
  file and **not** an emoji. It sits inline inside the `Subscribe` link, before the word.
  The word is the affordance; the chiclet is the mark (§2).
- **Truthful badges only.** The footer badge row asserts things true of this page:
  hand-written HTML, no trackers, RSS 2.0, the year. It never claims `Valid XHTML 1.0` (the
  page is HTML5) and never names a framework the page does not use. A badge that lies is a
  dead widget in a costume.

### 4.5 The page tile — the ground

Pure CSS, no image file (§9 explains why that is not optional): a 1px light ruling every 4px
over Template Blue — or a 45° stripe at the same alpha — plus a top-down darkening behind
the masthead so the wrapper reads as sitting under a lit sky rather than pasted on a flat
field. Either way the tile stays at or below `0.035`, a texture nobody should be able to
describe without leaning in.

```css
#site-blog {
	background-color: var(--ground);
	background-image:
		linear-gradient(to bottom, rgb(0 0 0 / 0.22), rgb(0 0 0 / 0) 320px),
		repeating-linear-gradient(to bottom,
			var(--ground-tile) 0 1px, rgb(255 255 255 / 0) 1px 4px);
}
```

### 4.6 Radius, border and shadow

Radius is bimodal and there is a hard ceiling:

```css
:root {
	--r-sm:   4px;    /* buttons, tabs, badges, the chiclet, wells */
	--r-md:   6px;    /* modules, the content column, the masthead */
	--r-pill: 999px;  /* tag pills only */

	--sh-1: 0 1px 2px var(--shade);   /* modules, buttons, the nav strip's foot */
	--sh-2: 0 2px 5px var(--shade);   /* the content column lifting off the ground */
}
```

**Nothing exceeds 8px.** A 16–20px radius reads as 2015 iOS and is the most out-of-vocabulary
thing that can appear here; the post body and every element containing prose has **no radius
at all**. Borders are 1px — there is no 2px border anywhere. Shadows are tight, dark and
offset straight down, a room light rather than a stage light: no soft ambient bloom, no
colored shadow, no lateral or negative offset, no `filter: drop-shadow`.

### 4.7 The gloss gotchas

- **No gloss behind prose.** Not behind a paragraph, an excerpt, a meta line, a blockquote
  or the content well. Prose grounds are `--paper` or `--paper-alt`, flat, always.
- **One reflection per element**, `--sheen` never above `0.18` (§2), gloss never sharing an
  element with `--inset` (§4.2), and **1px means 1px** — doubling an edge to make it visible
  means the color is wrong.
- **No `backdrop-filter`, no `filter: blur()`, no `mix-blend-mode`, no `border-radius` on the
  post body.** None of the first three existed and all read as 2020; the gloss is opaque
  paint.

---

## 5. Layout

Centered, fixed-ish, two columns — the 2006 shape. The content column has a real edge
against the ground: 1px border, 6px radius, `--sh-2`.

```
┌─ #site-blog ── ground: Template Blue + 1px tile (§4.5) ────────────────┐
│  ┌─ .blog-wrap   min(100% - 24px, 940px), margin 0 auto ────────────┐  │
│  │ MASTHEAD .blog-gloss ~110px   wordmark: top half, Content White  │  │
│  │   ······························ 50% hard stop ················  │  │
│  │                                tagline: bottom half, Kubrick Pale│  │
│  │ NAV  flat Kubrick Deep, 34px   [Home] Archives  About  Subscribe │  │
│  ├───────────────────────────────┬──────────────────────────────────┤  │
│  │ MAIN 620px      ←— 28px —→    │ SIDEBAR 268px                    │  │
│  │   .blog-entry                 │   [ About     ]  avatar, blurb   │  │
│  │     h2.blog-entry-title       │   [ Subscribe ]  chiclet + word  │  │
│  │     .blog-entry-meta          │   [ Tags      ]  5-step cloud    │  │
│  │     .blog-entry-body          │   [ Archives  ]  month (count)   │  │
│  │     .blog-entry-more →        │   [ Elsewhere ]  real links      │  │
│  │   ── hairline ── .blog-entry …│                                  │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ FOOTER  Meta Grey --font-ui, truthful badge row, copyright       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

Numbers, all normative:

```css
:root {
	--s-1: 0.25rem; --s-2: 0.5rem; --s-3: 0.75rem; --s-4: 1.25rem; --s-5: 2rem; --s-6: 3rem;
}
#site-blog .blog-wrap { width: min(100% - 24px, 940px); margin: 0 auto; }
```

Wrapper `940px` with `12px` of internal padding a side leaves `916px` of content: main `620`
+ gutter `28` + sidebar `268`. Those four numbers are one system. Masthead ~`110px`, nav
strip `34px`, `--s-6` between entries over a single `--rule` hairline, `--s-5` above the
wrapper and `--s-6` below.

**Masthead.** `.blog-gloss` in blue, `--r-md` on its top corners only. The wordmark is
`--font-title` in Content White at `--t-2xl`, entirely in the **top half** of the bar, over
the reflection (measured 5.1). The tagline is `--font-ui` at `--t-sm` in Kubrick Pale,
entirely **below the 50% hard stop** on the darkened half (measured 8.6). That split is not
decorative — it is what makes both readings pass.

**Nav strip.** Flat `--blue-deep`, tabs left-aligned with `--s-2` between them: `Home`,
`Archives`, `About`, `Subscribe`. The current tab is the lit one and connects to the content
below (§4.4). No dropdown, no mega-menu, no search in the nav.

**Sidebar modules, in this order.** All are `.blog-module`. At least five ship.

1. **About** — a small avatar (an `<img>` in markup, or inline SVG; **never a CSS
   `url()`**, §9), two or three factual sentences in `--font-prose` at `--t-sm`, a link back
   to `forrestalmasi.com`. **The blurb is a slot:** whoever builds this page does not invent
   biography, opinions or employment history in the author's voice. Ship the copy the author
   supplies, or a placeholder that is obviously one. Nothing in between.
2. **Subscribe** — the chiclet plus the word, linking to a `feed.xml` that exists (§2, §6).
3. **Tags** — a real tag cloud: five size steps (`--t-tag-1` … `--t-tag-5`) mapped to post
   count, weight stepping with size (400 at steps 1–2, 700 at step 5), color stepping from
   `--ink-soft` to `--link`. Pills are `--r-pill`, `--paper-alt` ground, `--rule` border,
   `--link` text, hover tint `rgb(91 163 224 / 0.15)` (measured 5.6). Every tag resolves.
4. **Archives** — by month, newest first, with counts: `March 2026 (3)`, each linking to a
   real anchor.
5. **Elsewhere** — the blogroll. Real outbound links only: GitHub, Twitter, email, the main
   site. A blogroll of invented names is the dead-widget failure in its purest form.
6. **Search** — **optional, and only if it works.** A client-side filter over the rendered
   entry list, in `blog/script.js`, degrading to nothing when JS is off. If it is not built
   the module is omitted entirely: a search box that does nothing violates §1 rule 2.

**Footer.** A bar inside the wrapper: `--paper-alt` ground, 1px `--rule` top border,
`--font-ui` at `--t-xs` in `--ink-soft`, the truthful badge row (§4.4), a copyright line, no
links to sections that do not exist.

**Responsive.** One breakpoint at `760px`. Below it the sidebar drops beneath the main
column, both go fluid, wrapper padding drops to `8px`, the tag cloud's largest step drops to
`--t-tag-4`, and the tab strip **wraps to two rows** — the masthead never becomes a
hamburger, because there was no hamburger and four tabs do not need one. **No horizontal
scroll at 320px**, at any zoom.

**Scrolling.** This is a blog, so it scrolls, and the built shell does not — the site owns
its own scroll container:

```css
html, body { height: 100%; }
body { overflow-y: auto; }
```

Both selectors carry the *same* `height` — the contract forbids differing values, since both
map to `#site-blog` — and `overflow-y: auto` on the body maps to the wrapper, which is
exactly the scroll container this direction wants. No `position: fixed`, no
`position: sticky`, nothing scroll-linked: the masthead scrolls away like everything else.

---

## 6. The content model

**Entry anatomy.** The front page is a reverse-chronological list of entries. Each is:

```
.blog-entry
  h2.blog-entry-title  → <a> to the permalink
  .blog-entry-meta     → Posted by Forrest on March 4, 2026 at 9:42 pm · Filed under: <tags> · Permalink
  .blog-entry-body     → the excerpt: the first one to three paragraphs, Georgia
  .blog-entry-more     → <a> "Continue reading →" to the permalink
```

The title is `--font-title` at `--t-lg` in `--ink-head`, its link inheriting that color and
underlining on hover only — a title is chrome-adjacent, not prose. The meta line is
`--font-ui` at `--t-sm` in `--ink-soft` with `·` separators; `Filed under:` lists tag links
and `Permalink` points at the same URL as the title. Entries are separated by a 1px `--rule`
hairline and `--s-6`. An entry is **not** a card: no border, radius, shadow or tint.

**Permalinks.** Every post has one stable URL and its shape is fixed:
`blog/posts/YYYY-MM-DD-slug.html`. Post pages live one directory deep, so **every cross-page href on a post page is relative to
that depth** — `../style.css`, `../index.html`, `../archive.html`, `../feed.xml`. The front
page uses `./style.css` and `posts/…`. No root-absolute path exists anywhere on this site.

**Post pages.** Same shell, same sidebar, one full entry. The post footer carries, in order:
the tag list, a `Reply by email` `mailto:` link, previous/next post links, and `← Back to
the front page`. **There is no comment system** — a static site cannot serve one, and a
decorative comment count is exactly the dead widget §1 rule 2 forbids. No comment form, no
comment count, no "0 Comments" line, no Disqus embed. `Reply by email` is the honest
substitute.

**Archive and tags.** `blog/archive.html` lists every post grouped by month with anchors
(`#blog-archive-2026-03`) and by tag (`#blog-tag-<name>`), so the sidebar's archive links and
every tag in the cloud resolve. Per-tag pages under `blog/tags/<name>.html` are the accepted
alternative; pick one and be consistent. The requirement is shape-independent and absolute:
**no month link and no tag link is ever dead.**

**Feed.** `blog/feed.xml`, RSS 2.0, with `<title>`, `<link>`, `<description>`, `<pubDate>` and
a `<guid isPermaLink="true">` per item, absolute URLs at `https://www.forrestalmasi.com`. The
chiclet points at it; publishing a post updates it.

**The post template and the publishing workflow.** **There is no build step for this site** —
`build.js` builds the root page and does not know about `/blog/`. Posts are written by hand,
so the workflow lives where it cannot be lost: `blog/posts/_template.html`, copied to write a
new post, opens with a comment block listing every place a post must be registered.

```
1. blog/posts/YYYY-MM-DD-slug.html  — this file: title, date, tags, body
2. blog/index.html                  — a new .blog-entry at the top of the list
3. blog/archive.html                — under its month heading and under each of its tags
4. blog/feed.xml                    — a new <item> at the top of the channel
5. the sidebar, in every page       — archive counts and tag-cloud steps
```

Five files, by hand, every time — the cost of having no build step, and cheaper written
down than rediscovered.

**Deliberately absent.** Comment form, comment count, share buttons, social embeds,
analytics, cookie banner, newsletter modal, related-posts widget, reading-time estimate,
"trending" list, infinite scroll, and any widget whose content would have to be invented.

**JavaScript is optional.** **The writing renders with JavaScript off** — no post text,
title, date, tag, permalink or navigation link may depend on it. `blog/script.js` exists only
if it adds something genuinely optional (the §5 search filter), and every page is complete
without it.

---

## 7. Motion

2006 predates CSS transitions, so motion here is nearly absent and mechanical. Five
sanctioned effects; everything else holds still.

| Effect | What | Timing | Notes |
|---|---|---|---|
| Chrome hover | `background-color` and `color` on nav tabs, module links, footer links | ≤ 120ms `ease-out`, or instant | Never on `transform`, `box-shadow` or `opacity`. |
| Press | `:active` on buttons and tabs: `transform: translateY(1px)`, gloss inverted | **no transition** | A button does not ease into being pressed. |
| Yellow Fade | `blog-yft` on `.blog-entry:target` | 1.2s `ease-out`, once | The one period citation worth having. |
| Focus | `outline: 2px solid var(--link)` on paper, `--paper` on chrome, `outline-offset: 2px` | instant | Square, hairline, always visible. |
| Tag pill hover | ground to `rgb(91 163 224 / 0.15)` | ≤ 120ms `ease-out` | Measured in §2. |

```css
@keyframes blog-yft {
	0%   { background-color: var(--highlight); }
	100% { background-color: rgb(255 246 191 / 0); }
}
#site-blog .blog-entry:target { animation: blog-yft 1.2s ease-out 1; }
```

The fade ends at a **transparent version of the highlight**, never at the `transparent`
keyword — that interpolates through black in some engines and flashes grey. The in-prose
underline is always on; it is not a motion effect and must never become one, so no underline
that grows, slides or draws in from the center. Nothing else moves: no reveal-on-scroll, no
parallax, no scroll-jacking, no sticky header, no skeleton loader, no page-load animation,
no marquee, no animated GIF, no carousel.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

Under reduced motion the `:target` entry arrives already un-highlighted, which loses
nothing — the anchor still scrolls it into view.

---

## 8. What this is not

Every failure mode here is adjacent, and adjacency is what makes them fatal:

| Not this | Because |
|---|---|
| Geocities / Web 1.0 | The nearest miss and the most common one. Tiled starfields, marquee, hit counter, under-construction GIF, guestbook, "best viewed in". Wrong decade — and worse, wrong sincerity: that furniture is only ever quoted as a joke, and this direction is not joking. |
| Frutiger Aero | Shares the gloss, wrong register entirely. Bubbles, water droplets, grass, lens flare, tropical fish — 2007–2012 consumer OS wallpaper. This is web chrome: flat-lit, painted, sitting on a page, not an ecosystem. |
| `iphone/` next door | The repo's other gloss and the closest continuity risk. 2009's molded gel buttons, hard specular seams and pill-shaped controls versus 2006's flat two-stop web gradient with a hard 50% break. A gel button in this sidebar is a continuity error, not a variation. |
| A modern minimal blog | Medium, Substack, every static-site-generator default: a 700px centered column, system sans, no sidebar, no chrome, no color. This is the default that this direction exists in order to not be. |
| Bootstrap-era 2012 | Where the gradients went grey and subtle, `border-radius: 4px` landed on literally everything, the sidebar died and the page became three equal cards. Same lineage, one generation too late, all the personality gone. |
| Vaporwave / "retro web" pastiche | The ironic memory of this era. Winking, deliberately broken, captioned, hosted on a fake CRT. This blog plays it straight or it does not work. |
| A dashboard | Cards, tiles, KPI rows, a grid of modules in the *main* column. The sidebar is modular; the writing is not. The main column is one linear list of prose. |

Also out: dark mode, hamburger menus, card grids, glassmorphism, `backdrop-filter`, emoji as
icons, webfonts, any radius above 8px, gradients behind prose, hero images, cookie banners,
and any caption that explains the joke — no "web 2.0" in the copy, no "remember when", no
wink in an `alt` attribute or an HTML comment.

---

## 9. Page application

`blog/` renders this brief as a working weblog at `/blog/`. **What gets built:**
`blog/index.html` (the front page), `blog/style.css` (one stylesheet shared by every page in
the folder), `blog/archive.html`, `blog/posts/YYYY-MM-DD-slug.html` (one per post),
`blog/posts/_template.html`, `blog/feed.xml`, and — only if it earns its place (§6) —
`blog/script.js`.

**`/blog/` is a standalone destination, not a viewport bucket.** It is not added to
`sites.config.json` and the root `index.html` is not rebuilt for it: the desktop buckets
from 500 to 1400 are already mapped, and the built root page sets
`html, body { height: 100%; overflow: hidden }` — it does not scroll, and a blog must.

**Even so the front page is authored to the sub-site contract anyway**, so mapping it into a
bucket later stays possible without a rewrite. Every rule below comes from the root
`CLAUDE.md` and is a rule of this direction:

- **Wrapper `#site-blog`.** `style.css` is written as if standalone; the build rewrites
  `html` / `body` / `:root` to the wrapper and prefixes every other selector.
- **Every `id` in markup and inline SVG is prefixed `blog-`** — `blog-archive-2026-03`,
  `blog-tag-css`, `blog-feed-glyph`, `blog-main` — and so is every `@keyframes` name
  (`blog-yft`). All sites share one document in the built page: ids, `<use href>` targets,
  `aria-labelledby` references, `filter: url(#…)` refs and keyframe names resolve
  document-wide and bind silently to another direction's element.
- **`style.css` contains no `url()` pointing at a local file.** All texture is CSS-generated
  (§4.5). Two reasons: `build.js` rewrites relative `url()` targets to `blog/…`, which
  breaks the *same stylesheet* when a post page one directory deeper loads it as
  `../style.css`; and it keeps the folder asset-free, which is why the ground is a gradient
  and the feed glyph is drawn. Images that do exist — the avatar — live in markup as `<img>`
  with a per-page relative `src`.
- **No `@import`** (§3) — the only at-rules in `style.css` are `@media`, `@supports` and
  `@keyframes` — and **no literal `</style>` sequence in CSS, no literal `</script>` in JS.**
- **No commas inside functional pseudo-classes.** Write `#site-blog a:hover` and
  `#site-blog a:focus-visible` as separate rules; never `:is(a, b)` or `:where(h1, h2)`.
- **Never set `display` on `html` or `body`**, and never set the same property to different
  values on `html` versus `body` — both map to the wrapper and the last one wins. The one
  sanctioned pair is §5's scroll container: `html, body { height: 100% }` (identical) plus
  `body { overflow-y: auto }` (body only).
- **No `position: fixed`, no `position: sticky`.** Normal flow, or `position: absolute`
  inside a `position: relative` parent.
- **If `blog/script.js` exists it is exactly one registry function:**
  `(window.SITES = window.SITES || {})['blog'] = function (root) { … }` — querying only via
  `root.querySelector` / `root.querySelectorAll`, listeners only on elements inside `root`
  and never on `window` or `document`, and never writing styles or classes to `root` itself
  (`root` is `document` standalone and `Document` has no `.style`; state classes go on an
  element inside it). Standalone boot at the end of the front page's body:
  `<script src="./script.js"></script><script>SITES['blog'](document);</script>`; post pages
  boot the same function with `../script.js`. Every site's JS runs on load in a combined
  page even while hidden, so the boot is idempotent and does nothing expensive.
- **Head conventions**, on every page in the folder: `<!DOCTYPE html>`, `<html lang="en">`,
  charset and viewport, a real per-page `description`, the OG and Twitter set, a canonical
  link, tab-indented markup, absolute URLs at `https://www.forrestalmasi.com` in meta and in
  the feed, and no `<link>` to a font.

**The test.** Checkable, not vibeable:

- Every sidebar link resolves — every tag, every archive month, every blogroll entry, the
  About link. No 404, no empty anchor, no `href="#"`. The feed chiclet points at
  `blog/feed.xml`, the file exists, and its newest `<item>` is the newest post.
- With JavaScript disabled every post title, date, tag, excerpt, permalink and nav link still
  renders and works; the search module is gone or inert and nothing else moved. No horizontal
  scroll at 320px: the tab strip wraps, the sidebar sits below the main column, the tag cloud
  does not push the viewport.
- **No gradient, shadow, radius or tint on any element containing prose** — inspect the post
  body, every paragraph, blockquote, excerpt and meta line.
- Every white letterform sits on a ground measured composited with `--sheen` at ≥ 4.5 (§2),
  `--sheen` is `0.18`, no element carries two reflections, and no letterform anywhere is in
  Feed Orange, Sky Highlight or Sticker Green.
- Grep `style.css`: no `border-radius` above 8px, no `url(` at all, no `@import`, no
  `:is(`. Grep the markup: every `id` and every `@keyframes` name starts with `blog-`.
- The page is full-bleed — the ground reaches all four edges at every width, no white gap
  above the masthead or below the footer, wrapper centered at every width.
- Under `prefers-reduced-motion` the `:target` entry arrives composed and un-highlighted and
  nothing animates.

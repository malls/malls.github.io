# FA-17: horse/: BRANDING.md — Muybridge 'The Horse in Motion' slideshow direction (mobile landscape)

## Scope

Write **`horse/BRANDING.md` only** — the design-direction document for a new sub-site
targeting the **mobile landscape** slot of the combined page. Do NOT build
`horse/index.html`, `style.css`, `script.js`, or the frame assets in this task; page
generation happens afterwards via the repo's `brand-page` skill, and the
`sites.config.json` mapping + `node build.js` happen with that page work. The
`horse/` folder already exists (empty) — the BRANDING.md goes in it.

The BRANDING.md must be complete enough that the brand-page agent can generate the
page (and produce the image asset) from it with no other context. Match the depth,
tone, and structure of the existing direction docs — read `marble/BRANDING.md` and
`liquid/BRANDING.md` as the house style: opinionated laws up front, concrete tokens
and code recipes, WCAG-checked palette, a "what this is not" table, and a closing
"Page application" section that restates the build-contract landmines.

## Key files to read before writing

- `/Users/forrest/Code/malls.github.io/CLAUDE.md` — Site Architecture + authoring
  contract (hard constraints; the BRANDING.md must restate the ones that bite here).
- `/Users/forrest/Code/malls.github.io/marble/BRANDING.md` and
  `/Users/forrest/Code/malls.github.io/liquid/BRANDING.md` — format, tone, section
  conventions, how each ends with a "Page application" + "The test" section.
- `/Users/forrest/Code/malls.github.io/sites.config.json` — mobile slots:
  `"mobile": { "portrait": "random", "landscape": "random" }`. This direction will
  claim `"landscape": "horse"` (at page-generation time, not in this task).
- Optionally `/Users/forrest/Code/malls.github.io/liquid/script.js` or another
  site's script for the `SITES['<name>']` registry-function shape.

## The direction (what the BRANDING.md is about)

**The 1878 Palo Alto cabinet card, made interactive.** Eadweard Muybridge's
*The Horse in Motion* ("Sallie Gardner," owned by Leland Stanford; running at a
1:40 gait over the Palo Alto track, 19th June 1878) — public domain. The page IS
the card: a warm album-gray mount, one sepia albumen photograph at a time, engraved
serif captions. The viewer flips through the frames; a swipe makes the horse run —
the card becomes the zoetrope it always wanted to be. Mobile landscape is the native
orientation: a galloping horse is a landscape subject, and the phone held sideways
is the cabinet card held in the hand.

Suggested laws for the doc (the "three things to hold onto" convention):
1. **One frame at a time.** Never a grid of thumbnails, never two frames visible.
   The animation lives in the transition, not in the layout.
2. **It is a photograph mounted on a card, not a full-bleed image.** The mount
   (margins, rules, captions) is the composition; the photo never touches the
   viewport edge.
3. **Nothing moves unless a hand moves it.** No autoplay, no ambient animation.
   Tap = one frame. Swipe = the gallop. Still by default.

## Concrete decisions to bake into the BRANDING.md

### 1. Frames: source, storage, format

- **Source**: the Wikimedia Commons high-resolution scan of the 1878 *The Horse in
  Motion / Sallie Gardner at a Gallop* cabinet card (Library of Congress scan;
  e.g. Commons file "Sallie Gardner at a Gallop" / "The Horse in Motion"). Public
  domain (1878, author died 1904) — state this in the doc, and require a visible
  credit line on the page.
- **Stored locally in `horse/`** — never hotlinked. GitHub Pages serves it; Commons
  hotlinking is unreliable and against their guidance.
- **Format: one horizontal sprite strip**, `horse/frames.jpg` — all frames side by
  side at identical dimensions, registered so the horse doesn't jitter between
  frames. One HTTP request, zero flicker between slides, and flipbook playback is
  just stepping `background-position`. Each "slide" and the playback layer use the
  same image with a different offset.
- **Frame count: nominally 12** (the card presents the sequence as a numbered run;
  the doc must instruct the page builder to *verify N against the actual downloaded
  scan* — use every usable frame on the card, adjust ids/captions to match, and
  drop any frame that is not the horse in motion, per the historical card).
- **Asset pipeline** (documented in BRANDING.md for the page builder): download the
  scan, crop each frame to a common rect, register on the horse, normalize to a
  common size (target ≥ 800px wide per frame — accept the scan's real limit; the
  albumen softness is period-correct), assemble the strip left-to-right in sequence
  order, mild contrast/sepia normalization so frames match, save as quality ~80
  JPEG. Total file well under ~1.5MB.

### 2. Every frame is a link: hash + `:target`, no JS required

- Ids `#horse-f01` … `#horse-fNN` (site-prefixed per the contract — ids resolve
  document-wide in the built page). Each frame's URL is `/#horse-f07` on the
  combined page and `/horse/#horse-f07` standalone — shareable, back/forward
  navigable for free.
- Slides are absolutely-positioned stacked layers inside a `.stage` that fills the
  wrapper. Visibility is pure CSS:
  - default (no hash / foreign hash): frame 1 visible;
  - `#site-horse .frame:target` visible, and
    `#site-horse .stage:has(.frame:target) .frame` hidden otherwise —
    `:has(...)` with no commas inside, per the contract; scope the `:has` argument
    to the site's own frames so another site's hash can never blank the stage.
- Because the shell pins the page to `100%`/`overflow: hidden` and slides are
  stacked in place, `:target` navigation causes no scroll jump. The site itself
  must not contain a scroll container (it fits the viewport; that's the design).

### 3. Tap left/right = prev/next: CSS-only anchors

The classic CSS-slideshow pattern: **each slide carries its own two anchors** —
full-height left half `<a href="#horse-f06">` (back) and right half
`<a href="#horse-f08">` (forward) — so the visible slide's own links are the hit
areas and no JS is needed to know "current frame". Wrap around: frame N's next is
frame 1, frame 1's prev is frame N (the gallop loops). Anchors get
`aria-label="Previous frame"` / `"Next frame"`; hit areas inset slightly from the
screen edges (iOS edge-swipe-back zone). A subtle affordance is allowed (faint
chevron or none — the doc should pick: none; the convention of tapping sides is
the interaction, discoverable by the caption "tap · swipe" hint line).

### 4. Swipe = flipbook playback (JS enhancement only)

- JS is the standard registry function
  `(window.SITES = window.SITES || {})['horse'] = function (root) { ... }` with
  pointer listeners (`pointerdown/move/up/cancel`) **only on the `.stage` element
  inside `root`** — never `window`/`document`. Standalone boot script lines at the
  end of `horse/index.html`'s body per the contract.
- **Scrub + momentum**: while the finger drags horizontally, a playback layer (same
  sprite, `background-position` stepped by JS) advances one frame per ~20–30px of
  travel — swipe left runs the horse forward, right runs it backward, like thumbing
  a flipbook. On release with velocity, frames keep stepping and decelerate over
  ~0.5–1s. When playback settles, commit the landing frame to the URL by
  programmatically clicking that frame's existing anchor
  (`root.querySelector('a[href="#horse-fNN"]').click()`) — navigation without any
  `window.location` handling, and `:target` CSS takes back over.
- **Tap vs swipe disambiguation**: movement under ~10px within the gesture = let
  the anchor click through; beyond that, suppress the click (click handler on the
  stage checking a "moved" flag). `touch-action: none` on the stage so the browser
  doesn't claim the horizontal gesture.
- Page must be **fully functional with JS absent**: tap navigation, every frame
  URL, captions — all CSS/HTML. Swipe is the only JS feature.
- `prefers-reduced-motion`: momentum playback is skipped (release lands immediately
  on the nearest frame); scrubbing is user-driven and stays.

### 5. Typography: classic serif

- **One family: EB Garamond** (old-style, period-appropriate for a 19th-century
  card imprint), loaded via `@import` at the very top of `style.css` with every
  `;` in the URL percent-encoded as `%3B` (build.js statement-splitter rule) —
  e.g. `ital,wght@0,400%3B0,500%3B1,400`. Fallback stack: Georgia,
  'Times New Roman', serif. No sans-serif anywhere. No `@font-face` needed (if the
  doc adds one, its font-family name must be `horse-`-prefixed per the contract).
- Voice/typographic registers, cabinet-card style:
  - **Title line**: letterspaced caps (tracking ~0.18em), modest size — an
    imprint, not a hero banner (the photograph is the hero).
  - **Caption/credit lines**: small caps-style (uppercase, tracked) and italic for
    the descriptive line, exactly like Victorian card letterpress; interpunct `·`
    separators.
  - **Frame number**: roman numerals (`PLATE · VII of XII`) — updated per slide in
    plain HTML (each slide owns its caption; no JS counter needed).
- Doc should specify a small step scale (micro/caption/title) with minimum 11px
  readable sizes; the viewport is only ~320–440px tall.

### 6. Palette: album gray + albumen sepia

Token set sampled from the artifact, not invented web colors, e.g.:
- `--mount` warm album gray (≈ `#AEA694` family) — the card ground, largest area;
- `--mount-shade` / `--mount-lit` for a faint paper vignette;
- `--albumen` deep sepia brown (≈ `#3B2F23`) — the photograph's darks and the
  ruled border lines;
- `--ink` near-black warm ink (≈ `#26201A`) — all type;
- `--highlight` cream (≈ `#E8E0CE`) — sparingly.
The doc must include the house-style **measured WCAG contrast table** (ink on
mount, etc.) and the rule that type sits only on the mount, never on the
photograph. Frames render with a mild CSS `filter: sepia()`/contrast normalization
if the source scan is neutral gray. No pure white, no pure black, no color accent —
the page is monochrome warm; if a screenshot reads "web beige card UI" rather than
"scanned albumen print," add grain/vignette, not color.

### 7. Layout: mobile landscape, the card in the hand

- Design targets ~568–950px wide × ~320–440px tall (mobile landscape slot);
  standalone at `/horse/` must degrade gracefully at other sizes (the card centers
  in the viewport; the mount absorbs extra space).
- Composition: full-viewport mount; photograph centered, height-capped (~68–75% of
  viewport height, `aspect-ratio` from the real frame crop), thin double rule
  around the photo; title imprint above; caption + plate-number + identity line
  below. Everything horizontally centered — symmetric, like the card (deliberate
  contrast to liquid's asymmetry law; each direction states its own law).
- No internal scrolling; the whole composition fits the viewport (contract: built
  shell is `overflow: hidden`, wrapper `height: 100%`).

### 8. Identity content (this is still forrestalmasi.com)

Follow the repo pattern (marble/liquid both carry it): the card's letterpress is
Forrest's imprint —
- Title: `FORREST ALMASI` (the "photographer's" imprint), sub-line
  `SOFTWARE · DEVELOPER` in the credit style;
- Contact links as imprint lines: GitHub `@malls`, Twitter `@forrestalmasi`,
  Email `_@forrestalmasi.com` — small tracked caps, part of the caption block,
  real `<a>`s distinct from the tap zones (they sit in the caption band, below the
  tap-zone anchors' area, or on top with higher z-index — doc must pin this:
  caption band is outside the stage's tap anchors);
- Mandatory credit line: `AFTER EADWEARD MUYBRIDGE · "THE HORSE IN MOTION" · 1878`
  (public domain).

### 9. Motion rules

Only two motions exist: the frame swap (instant — a flipbook cut, **no**
crossfade/slide transitions; dissolves would kill the persistence-of-vision
illusion) and the swipe playback (§4). No ambient animation, no autoplay, no hover
effects (touch device), no parallax. If any `@keyframes` is used, its name is
`horse-`-prefixed.

### 10. Build-contract landmines to restate in the doc's "Page application"

- Files: `horse/index.html` + `horse/style.css` (+ `horse/script.js`); site head is
  standalone-only; build extracts body, prefixes CSS to `#site-horse`.
- All ids `horse-`-prefixed; `@import` at top of style.css with `%3B`; no commas
  inside functional pseudo-classes (write `:has()` args comma-free, separate
  selectors otherwise); never set `display` on `html`/`body`; no `position: fixed`;
  no literal `</style>`/`</script>` sequences.
- JS: registry function only, `root.querySelector(All)` only, listeners inside
  `root` only, no `root.style` writes (root is `document` standalone).
- Sprite URL in CSS `url()` is a plain relative path — but note it must work both
  standalone (`/horse/`) and in the built root page (`/`): use an absolute path
  `/horse/frames.jpg` so both resolve (verify against how other sites reference
  assets; marble hotlinks, so this is the first local-asset site — the doc should
  state the absolute-path rule explicitly).
- Mapping: `sites.config.json` → `"mobile": { "landscape": "horse" }` (portrait and
  desktop buckets untouched; never remove `default`). Then `node build.js`, commit
  sources + config + rebuilt `index.html` together. (Page-gen task, not FA-17.)

## Structure the BRANDING.md should have

Mirror the house format: title + blockquote direction summary, then numbered
sections roughly: 1 The direction (with the three laws) · 2 The artifact & frames
(source, PD status, asset pipeline, sprite spec) · 3 Palette (+ contrast table)
· 4 Type · 5 The slideshow mechanics (:target scheme, tap anchors, URL-per-frame)
· 6 The flipbook (swipe JS spec) · 7 Layout (mobile landscape) · 8 Motion ·
9 What this is not (e.g. not a photo-gallery lightbox, not a Ken-Burns slideshow,
not sepia-Instagram nostalgia kitsch, not a loading-spinner GIF of the horse) ·
10 Page application + "The test".

"The test" (closing checklist) should include: every frame reachable by URL alone
with JS disabled; tapping right anywhere cycles all N frames and wraps; a fast
swipe visibly *gallops* the horse; no layout shift between frames (registered
sprite); type only on the mount; credit line present; nothing animates untouched.

## Acceptance criteria

1. `horse/BRANDING.md` exists and reads like a sibling of `marble/BRANDING.md` /
   `liquid/BRANDING.md` (laws, tokens, contrast table, code recipes, "what this is
   not", page application, the test).
2. All ten decision areas above are pinned concretely in the doc (frame source +
   local sprite, `:target` URL scheme with `horse-` ids, CSS-only tap anchors with
   wrap-around, JS-only-for-swipe flipbook spec, EB Garamond serif system, albumen
   palette with measured contrast, mobile-landscape layout, identity content +
   Muybridge credit, motion rules, build-contract restatement incl. absolute asset
   path and the mobile-landscape config mapping).
3. No page files or image assets are created in this task; no edits to
   `sites.config.json`, `build.js`, or root `index.html`.
4. The doc explicitly requires JS-free functionality for navigation and frame URLs,
   and instructs verification of the real frame count against the downloaded scan.

## Follow-up (out of scope here)

Implementation task: run the `brand-page` skill on `horse/BRANDING.md` (produces
the sprite + page files), map `"mobile": { "landscape": "horse" }`, `node build.js`,
verify standalone and in the built page (rotate a phone-size viewport), commit.

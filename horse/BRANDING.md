# Horse

> Design direction: **the 1878 Palo Alto cabinet card, made interactive** — Eadweard
> Muybridge's *The Horse in Motion*: Sallie Gardner, owned by Leland Stanford, running
> at a 1:40 gait over the Palo Alto track, 19th June 1878. The page IS the card: a warm
> album-gray mount, one sepia albumen photograph at a time, engraved serif captions.
> The viewer flips through the frames; a swipe makes the horse run — the card becomes
> the zoetrope it always wanted to be. Mobile landscape is the native orientation: a
> galloping horse is a landscape subject, and the phone held sideways is the cabinet
> card held in the hand.

## 1. The direction

This is a photographic artifact, not a photo gallery. Muybridge's card settled a bet
about whether all four hooves leave the ground; what it *invented* was cinema — a
sequence of instants that becomes motion only when a hand or a machine plays it. The
page honors both readings: at rest it is the still card, museum-calm; under a thumb it
is the first movie.

Three laws, because getting them wrong produces a carousel with a sepia filter instead
of the artifact:

1. **One frame at a time.** Never a grid of thumbnails, never two frames visible,
   never a filmstrip of the sequence. The animation lives in the *transition* between
   frames, not in the layout. Showing the whole sequence at once is the one thing the
   card could already do — the page exists to do the other thing.
2. **It is a photograph mounted on a card, not a full-bleed image.** The mount — its
   margins, its ruled border, its letterpress captions — is the composition. The
   photograph never touches the viewport edge. If the photo bleeds, the object is gone
   and what remains is a media viewer.
3. **Nothing moves unless a hand moves it.** No autoplay, no ambient animation, no
   attract loop. Tap = one frame. Swipe = the gallop. Still by default, every time,
   like the card in the drawer.

**Voice.** Victorian card letterpress — engraved, not typed. Tracked capitals,
interpunct separators, roman numerals, one italic descriptive line. Few words; the
photograph is the argument. No exclamation marks, no modern UI copy ("swipe to
explore!" is banned) — the one concession to instruction is a caption-styled hint
line: `TAP · SWIPE`.

---

## 2. The artifact and the frames

### Source and status

The image source is the Wikimedia Commons high-resolution scan of the 1878 cabinet
card — the Library of Congress scan filed as *Sallie Gardner at a Gallop* / *The
Horse in Motion*. Published 1878; Muybridge died 1904; the work is **public domain**
worldwide. Two obligations follow:

- The page carries a **visible credit line**:
  `AFTER EADWEARD MUYBRIDGE · "THE HORSE IN MOTION" · 1878`.
- The image is **stored locally in `horse/` — never hotlinked**. GitHub Pages serves
  it; hotlinking Commons is unreliable and against their guidance. This is the repo's
  first local-asset site: reference the file by **absolute path** (`/horse/frames.jpg`)
  so the URL resolves both standalone at `/horse/` and inside the built root page at
  `/` (see §10).

### The sprite strip

All frames ship as **one horizontal sprite strip**, `horse/frames.jpg`:

```
horse/frames.jpg
- N frames laid left-to-right in gallop order, every frame exactly W × H px
- W ≥ 800px per frame — accept the scan's real limit; albumen softness is
  period-correct, upscaling is not
- registered: the track rail (and the horse's torso) sit at the same y in
  every frame — zero jitter between frames
- mild contrast/sepia normalization so all frames match each other
- JPEG quality ~80; total file well under ~1.5MB
```

One HTTP request, zero flicker between slides, and flipbook playback is just stepping
`background-position`. Each slide and the JS playback layer (§6) use the *same* image
at a different offset — the frame you were looking at and the frame that starts
galloping are physically identical pixels.

**Frame count: nominally 12** — the card presents the sequence as a numbered run —
but the page builder must **verify N against the actual downloaded scan**: use every
usable frame on the card, adjust ids and captions to match the real count, and drop
any frame that is not the horse in motion (some printings of the card carry a
portrait vignette; it is not part of the gallop and does not ship).

### Asset pipeline (for the page builder)

1. Download the highest-resolution Commons/LoC scan of the card.
2. Crop each frame to a common rectangle; record the crop's aspect ratio — it becomes
   the CSS `aspect-ratio` of the photo (§7).
3. Register the crops on the horse and the track rail so nothing drifts frame to
   frame. Registration is the whole illusion: a 4px bounce between frames reads as a
   broken projector.
4. Normalize size (target ≥ 800px wide per frame), tone and contrast across frames.
5. Assemble left-to-right in sequence order; export JPEG q≈80; confirm ≤ ~1.5MB.
6. Count the usable frames. That number is N everywhere: ids, captions, roman
   numerals, the CSS `--n` token, the JS.

If the source scan is neutral gray, warm it in CSS rather than re-exporting:
`filter: sepia(0.28) contrast(1.04)` on the photo layer, tuned by eye against the
mount. The goal is albumen, not Instagram — see §9.

---

## 3. Palette: album gray and albumen sepia

Sampled from the artifact, not invented web colors. The card is monochrome warm —
**no pure white, no pure black, no color accent anywhere**. If a screenshot reads as
"web beige card UI" rather than "scanned albumen print," the fix is grain and
vignette, never color.

```css
:root {
	/* the card */
	--mount:       #AEA694;   /* warm album gray — the ground, largest area */
	--mount-lit:   #BCB4A2;   /* paper catching light; vignette center */
	--mount-shade: #9A927F;   /* paper falling off; vignette edge */

	/* the photograph */
	--albumen:     #3B2F23;   /* deep sepia brown — the print's darks and every ruled line */

	/* letterpress */
	--ink:         #26201A;   /* near-black warm ink — all type */

	/* rare light */
	--highlight:   #E8E0CE;   /* cream; sparingly, on dark grounds only */
}
```

### Contrast — measured (WCAG 2.1, computed)

| Ink | on Mount `#AEA694` | on Mount-lit `#BCB4A2` | on Mount-shade `#9A927F` | on Highlight `#E8E0CE` |
|---|---|---|---|---|
| Ink `#26201A` | **6.7** ✓ | **7.8** ✓ | **5.2** ✓ | **12.3** ✓ |
| Albumen `#3B2F23` | **5.4** ✓ | **6.3** ✓ | 4.2 — large only | **9.9** ✓ |
| Highlight `#E8E0CE` | 1.8 ✗ | 1.6 ✗ | 2.4 ✗ | — |

So: **`--ink` carries every word on the page**, and every word sits on the mount
family. `--albumen` draws rules, borders, and may carry large display letterforms on
the plain mount. `--highlight` never touches the mount — it exists only as a rare
accent on `--albumen`/`--ink` grounds (9.9–12.3 ✓), e.g. a plate numeral let into the
photo's dark border.

**The structural rule: type sits only on the mount, never on the photograph.** The
photograph's tonal range is unpredictable frame to frame; no caption, no numeral, no
link ever overlaps it. The caption band and title imprint are mount; the photo is
photo. This also keeps the contrast table honest — every measured pair above is a
solid ground.

**Paper, not panel.** The mount gets a faint radial vignette (`--mount-lit` center →
`--mount-shade` edges) and a whisper of grain (an `feTurbulence` data-URI tile at
≤ 0.08 opacity, `id` prefixed `horse-`) so it reads as albumen-era card stock rather
than a flat hex fill. Both are decorative; both are subtle enough that no one can
point at them.

---

## 4. Type: the card's letterpress

**One family: EB Garamond** — old-style, period-appropriate for a 19th-century card
imprint. Imported at the very top of `style.css`, every `;` in the URL
percent-encoded as `%3B` (build.js splits top-level statements on raw `;` without
string awareness — an unencoded `;` cuts the rule in half):

```css
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400%3B0,500%3B1,400&display=swap');

:root {
	--font-card: 'EB Garamond', Georgia, 'Times New Roman', serif;
}
```

No sans-serif anywhere on the page. No `@font-face` is needed; if one is ever added,
its font-family name must be `horse-`-prefixed per the authoring contract.

Three registers, cabinet-card style:

- **Title imprint** — the photographer's imprint, not a hero banner (the photograph
  is the hero). Uppercase, weight 500, tracking `0.18em`, modest size. Centered.
- **Caption/credit lines** — uppercase, weight 400, tracking `0.14em`, at caption
  size; the one *descriptive* line is italic sentence case, exactly like Victorian
  card letterpress. Interpunct `·` separators throughout.
- **Plate numeral** — roman numerals: `PLATE · VII of XII`. Each slide owns its
  caption in plain HTML, so the numeral updates with the frame **with no JS counter**
  — frame seven's markup says VII, and `:target` does the rest.

Scale — small steps, because the viewport is only ~320–440px tall; nothing a reader
needs drops below 11px computed:

```css
:root {
	--t-title:   clamp(1rem, 0.85rem + 1.2vw, 1.35rem);    /* the imprint */
	--t-caption: clamp(0.75rem, 0.7rem + 0.4vw, 0.85rem);  /* caption lines, ≥ 12px */
	--t-micro:   0.6875rem;                                /* 11px floor: hint line, credit */
}
```

No bold above weight 500, no letterspacing on the italic line, no text-shadow, no
text glow. Ink on paper is the entire effect.

---

## 5. The slideshow: every frame is a URL

Navigation is **pure CSS via `:target`** — the page is fully functional with JS
absent. This is a hard requirement, not a progressive-enhancement nicety: tap
navigation, every frame URL, and every caption work from HTML and CSS alone.

### Ids and URLs

Frames are `id="horse-f01"` … `id="horse-fNN"` — **site-prefixed**, because in the
built page every site shares one document and ids resolve document-wide; a bare
`#f07` will someday collide with another site. Each frame is therefore a shareable,
back/forward-navigable address for free:

```
standalone:  /horse/#horse-f07
combined:    /#horse-f07
```

### The stage

Slides are absolutely-positioned stacked layers inside a `.stage` that fills the
card's photo area. Visibility is CSS only:

```css
.frame { position: absolute; inset: 0; visibility: hidden; }

/* no hash, or a foreign site's hash: plate I shows */
.frame:first-of-type { visibility: visible; }

/* one of OUR frames is targeted: it alone shows */
.stage:has(.frame:target) .frame:first-of-type { visibility: hidden; }
.stage:has(.frame:target) .frame:target        { visibility: visible; }
```

Two contract points are load-bearing here. The `:has()` argument contains **no
commas** (build.js's prefixer breaks on commas inside functional pseudo-classes —
write separate selectors instead). And the `:has()` is **scoped to this stage's own
frames**, so another site's hash — which targets an element outside `.stage` — can
never blank the horse: the selector simply doesn't match and plate I stays up.

Because the built shell pins the document to `height: 100%; overflow: hidden` and the
slides are stacked in place, `:target` navigation causes **no scroll jump**. The site
itself must not contain a scroll container — the whole composition fits the viewport
(§7); that is the design, not a limitation.

### The sprite offsets

Every slide shows its frame by offsetting the one sprite:

```css
.photo {
	aspect-ratio: var(--frame-ar);          /* measured from the real crop, §2 */
	background-image: url('/horse/frames.jpg');   /* absolute path — §10 */
	background-repeat: no-repeat;
	background-size: calc(var(--n) * 100%) 100%;
	/* frame i of N: */
	background-position-x: calc((var(--i) - 1) / (var(--n) - 1) * 100%);
}
```

`--n` is set once on the stage; each slide sets its own `--i` (`style="--i: 7"` or a
per-frame class). Same image, different offset — switching frames repaints nothing
but position.

### Tap left / right = previous / next

The classic CSS-slideshow pattern: **each slide carries its own two anchors** — a
full-height left-half `<a href="#horse-f06">` (back) and right-half
`<a href="#horse-f08">` (forward) — so the visible slide's own links are the hit
areas, and no JS is ever needed to know the "current frame":

```html
<div class="frame" id="horse-f07" style="--i: 7">
	<div class="photo"></div>
	<a class="tap tap-prev" href="#horse-f06" aria-label="Previous frame"></a>
	<a class="tap tap-next" href="#horse-f08" aria-label="Next frame"></a>
</div>
```

- **Wrap around.** Frame N's next is frame 1; frame 1's prev is frame N. The gallop
  loops; there is no dead end and no disabled state.
- **Hit areas inset slightly from the screen edges** (~24px) — the iOS edge-swipe
  back gesture owns the outermost strip, and fighting it loses.
- **No chevrons, no dots, no arrows.** The affordance is the convention of tapping
  sides, made discoverable by the caption hint line `TAP · SWIPE` (§7). Any visible
  control chrome turns the card into a media player.

---

## 6. The flipbook: swipe is the only JS

JS adds exactly one thing: dragging the photo thumbs the flipbook. Everything else —
navigation, URLs, captions — already works without it (§5).

The file is the standard registry function, and the standalone boot lines sit at the
end of `horse/index.html`'s body per the contract:

```js
(window.SITES = window.SITES || {})['horse'] = function (root) {
	var stage = root.querySelector('.stage');
	if (!stage) return;
	var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	/* pointerdown / pointermove / pointerup / pointercancel — on stage ONLY */
};
```

```html
<script src="./script.js"></script>
<script>SITES['horse'](document);</script>
```

Pointer listeners attach **only to the `.stage` element inside `root`** — never
`window`, never `document`; in the combined page every site's JS runs on load, even
hidden. `root` is `document` standalone but a wrapper element in the build, so no
styles are ever written to `root` itself.

**Scrub.** On `pointerdown`, a playback layer — same sprite, `background-position`
stepped by JS — takes over from the current slide (found via
`stage.querySelector('.frame:target')`, falling back to the first frame; no
`window.location` reads). While the finger drags horizontally, the layer advances
**one frame per ~20–30px of travel** — swipe left runs the horse forward, right runs
it backward, like thumbing a flipbook. Frame steps are instant cuts; the persistence
of vision is the viewer's.

**Momentum.** On release with velocity, frames keep stepping and decelerate over
~0.5–1s — the gallop the card was always about. When playback settles, commit the
landing frame to the URL by programmatically clicking that frame's **existing
anchor**:

```js
var a = root.querySelector('a[href="#horse-f' + pad(landing) + '"]');
if (a) a.click();
```

Navigation without any location handling — the click walks through the same anchor a
finger would tap, the hash updates, and `:target` CSS takes back over. The playback
layer then hides and the stage is pure CSS again.

**Tap vs swipe.** Movement under ~10px within a gesture = a tap: let the anchor's
click through. Beyond ~10px = a swipe: suppress the click (a click handler on the
stage checks a "moved" flag). `touch-action: none` on the stage so the browser never
claims the horizontal gesture for scrolling.

**Reduced motion.** When `prefers-reduced-motion: reduce`, momentum playback is
skipped — release lands immediately on the nearest frame. Scrubbing stays: it is
user-driven, frame-for-finger, and stopping the instant the finger stops is exactly
what the preference asks for.

---

## 7. Layout: the card in the hand

This site targets the **mobile landscape** slot — designed at ~568–950px wide ×
~320–440px tall. Standalone at `/horse/` it must degrade gracefully at any size: the
card centers in the viewport and the mount absorbs the extra space; the photo is
height-capped so portrait and desktop viewers still see the whole card.

Composition, top to bottom — everything horizontally centered. **Symmetry is this
card's law** (the deliberate inverse of liquid's asymmetry law — each direction
states its own): a cabinet card is a formal, axial object, and off-center reads as
mis-mounted.

```
1  mount            full-viewport --mount, vignette + grain (§3)
2  title imprint    FORREST ALMASI · tracked caps, --t-title
                    SOFTWARE · DEVELOPER beneath, caption register
3  the photograph   centered; height ~68–75% of the viewport;
                    aspect-ratio from the real frame crop;
                    thin double rule around it: 1px --albumen, 2px mount gap,
                    1px --albumen — the mount's ruled border
                    [ = the .stage: slides, tap anchors, playback layer ]
4  caption band     PLATE · VII of XII            (per-slide, roman numerals)
                    "Sallie Gardner," owned by Leland Stanford; running at a
                    1:40 gait over the Palo Alto track, 19th June 1878   (italic)
                    GITHUB @MALLS · TWITTER @FORRESTALMASI · _@FORRESTALMASI.COM
                    AFTER EADWEARD MUYBRIDGE · "THE HORSE IN MOTION" · 1878
                    TAP · SWIPE                   (--t-micro, the one instruction)
```

- **No internal scrolling.** The whole composition fits the viewport; the built shell
  is `overflow: hidden` and the wrapper `height: 100%`, and this site simply obeys.
  If the caption band doesn't fit at 320px tall, tighten leading and drop the hint
  line before ever introducing a scroll container.
- **The caption band is outside the stage.** This is pinned deliberately: the
  identity links — GitHub `@malls`, Twitter `@forrestalmasi`, Email
  `_@forrestalmasi.com` — are real `<a>`s in the caption band, *below* the stage and
  therefore never underneath the tap-zone anchors. A visitor cannot miss the email
  and flip a frame instead. The links style as imprint lines (small tracked caps,
  `--ink`, underline on focus/hover only), not as buttons.
- **The photograph never touches the viewport edge** (law 2): the mount holds a
  minimum margin on all four sides at every size.

---

## 8. Motion: two motions exist

1. **The frame swap** — instant. A flipbook cut: `visibility` flips, nothing
   transitions. **No crossfade, no slide, no dissolve** — a dissolve between frames
   destroys the persistence-of-vision illusion that makes stepped frames read as
   motion. The cut IS the animation.
2. **The swipe playback** (§6) — frames stepping under a finger or under momentum.

That is the complete list. No ambient animation, no autoplay, no attract loop, no
hover effects (this is a touch viewport), no parallax, no Ken Burns drift, no
transition on anything. The page at rest is a still photograph of a still card.

If any `@keyframes` is ever needed, its name is `horse-`-prefixed per the contract.
Focus is visible and period-appropriate: `outline: 1px solid var(--ink);
outline-offset: 2px` — a ruled line, not a glow.

`prefers-reduced-motion` is already handled where it matters (§6: momentum off,
scrub stays); there is nothing else moving to reduce.

---

## 9. What this is not

| Not this | Because |
|---|---|
| A photo-gallery lightbox | Arrows, dots, thumbnails, a black overlay, a close button. The card has no chrome; the slide's own halves are the controls and the mount is the interface. |
| A Ken Burns slideshow | Pans, zooms and crossfades are the opposite move: they smear the frames together. Every transition here is a hard cut; the smoothness comes from the viewer's eye, not the CSS. |
| Sepia-Instagram nostalgia kitsch | Fake scratches, fake dust loops, torn-edge PNG frames, a vignette filter cranked to "old-timey." One real scan, one mild tone normalization, one whisper of grain. The artifact is genuinely 148 years old; it does not need a costume. |
| A loading-spinner GIF of the horse | The famous frames as an autoplaying loop. Autoplay is the one unforgivable move (law 3): the hand makes the horse run, or the horse stands. |
| A museum longform scroll essay | Scrolljacked chapters, parallax plates, a timeline. There is no scroll at all — the entire object fits the hand. |
| Skeuomorphic desk 3D | Wood-table backgrounds, page-curl flips, drop-shadowed "stacks of photos." The card is presented flat and frontal, like a scan, because it is one. |

Also out: color of any kind, pure `#000`/`#FFF`, sans-serif type, visible buttons,
frame counters rendered by JS, crossfades, autoplay, hover-dependent anything, and a
second image asset — the sprite is the only picture on the page.

---

## 10. Page application

`horse/index.html` renders this brief to the sub-site authoring contract in the root
`CLAUDE.md` (self-contained folder, wrapper `#site-horse`, JS as a `SITES['horse']`
registry function; regenerate with the `brand-page` skill).

**Files**: `horse/index.html` + `horse/style.css` + `horse/script.js` +
`horse/frames.jpg` (produced per §2's pipeline at page-generation time). The site's
`<head>` is standalone-only (own title, `robots noindex`); the build extracts the
body, strips script tags, prefixes every selector to `#site-horse`, and inlines the
JS.

**Structure**: mount → title imprint → double-ruled stage (N `:target` slides, each
with its two wrap-around tap anchors and its own caption numeral; one JS playback
layer) → caption band with the italic description, identity links, Muybridge credit,
and the `TAP · SWIPE` hint (§7).

**Build-contract specifics that bite hardest here:**

- **Every id is `horse-`-prefixed** — the frame ids (`horse-f01`…) above all, since
  the entire navigation scheme is ids resolved document-wide in the built page. Grain
  filter ids and any `@keyframes` names likewise.
- The one `@import` sits at the very top of `style.css` with `%3B` for every `;` in
  its URL (§4).
- **No commas inside functional pseudo-classes** — the `:has()` recipes in §5 are
  already comma-free; keep them that way, and write `a:hover` / `a:focus-visible`
  rules as separate selectors.
- **The sprite URL is absolute**: `url('/horse/frames.jpg')`. A relative path
  resolves against `/horse/` standalone but against `/` in the built root page and
  breaks one of the two. (Prior sites hotlink external images; this is the repo's
  first local asset — the absolute-path rule is new and non-negotiable.)
- Never set `display` on `html`/`body`; no `position: fixed`; no literal `</style>`
  in CSS or `</script>` in JS (the caption text contains no markup, but the JS builds
  anchor selectors — keep string literals clean).
- JS: registry function only; `root.querySelector(All)` only; listeners only on
  elements inside `root` (the stage); no writes to `root.style` (`root` is
  `document` standalone). Standalone boot lines at the end of the body (§6).
- No scroll container anywhere in the site — the composition fits the viewport and
  the shell is `overflow: hidden` (§5, §7).
- **Mapping** (page-generation task, not this document): `sites.config.json` →
  `"mobile": { "portrait": "random", "landscape": "horse" }` — the portrait slot and
  all desktop buckets untouched, and the `default` fallback never removed. Then
  `node build.js` and commit sources + config + the rebuilt `index.html` together.

**The test.** On a phone-size landscape viewport (and once more with JS disabled):
(1) with JS off, every frame is reachable by URL alone — `/horse/#horse-f07` shows
plate VII, back/forward walks the history; (2) tapping the right half anywhere cycles
through all N frames and wraps from XII to I without a dead end; (3) a fast swipe
visibly *gallops* the horse — frames strobe under the finger and coast to a stop, and
the URL ends on the landing frame; (4) flipping frames produces zero layout shift and
zero jitter — the track rail holds still, only the horse moves (the sprite is
registered); (5) not one word overlaps the photograph — all type is ink on mount;
(6) the Muybridge credit line is present and readable; (7) nothing on the page moves
until a hand moves it; and (8) squint: the screen reads as a scanned 1878 albumen
card, not a beige web page — if it reads beige-web, add grain and vignette, never
color.

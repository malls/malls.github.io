# iPhone

> Design direction: **iPhone OS 3 skeuomorphism** — the phone Apple shipped between 2008
> and 2010: iPhone 3G and 3GS, a 320×480 screen at 163 ppi, every pixel of chrome drawn
> by hand in the Forstall workshop. Gel buttons, pinstripes, engraved labels, a dock that
> reflects. The interface pretended to be a physical object, and it was completely
> serious about it.

## 1. The direction

Before flat design, every control on this screen was a thing: molded plastic, polished
glass, brushed metal, a yellow legal pad. Nothing was implied — depth was painted in,
one gradient and one 1-pixel line at a time, on a display too coarse for subtlety.

Three things to hold onto, because getting them wrong produces something that merely
looks glossy rather than something that looks like iPhone OS 3:

1. **The light hangs above the top of the screen, and it is painted in.** One implied
   source, directly overhead, for every object at once. Top edges catch a 1px highlight;
   bottom edges fall into a 1px shadow; specular shine lives in the upper half of every
   surface; engraved text shadows point the way the light says they must. There is no
   `backdrop-filter`, no soft ambient glow — if 2009 WebKit couldn't render it, Apple
   painted it, and so do we.
2. **Every control is a molded object.** The vocabulary is a four-layer sandwich: a 1px
   dark edge around the outside, a 1px white highlight inset at the top, a gloss layer
   over the fill, an etched label on top. Miss a layer and the object goes flat; flat is
   the one thing this page must never be. Pressed states change like hardware — instant,
   darker, no easing into being touched.
3. **The grid is metric and symmetry is the law.** 20px status bar, 44px bars and cells,
   57px icons, 10px gutters. Titles are centered, icon grids are uniform, the whole
   screen balances on its vertical axis. The other directions in this repo ban symmetry;
   this one is its inversion — SpringBoard does not do asymmetry, and neither do we.

**Voice.** Apple, 2009: plain, confident, quietly certain it is the future — which means
it never has to say so. Labels are Title Case and one word where possible ("General",
"Done"). Instructions are lowercase sentence fragments ("slide to unlock"). No
exclamation marks, no jokes in the chrome. The delight is in the object, not the copy.

---

## 2. Palette

Swatches are named for the objects they come from. Use the names in code and in
conversation.

### Structure

The grounds. This era used true black and true white — a 163 ppi LCD had no room for
tasteful off-blacks, and this vocabulary keeps its originals.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--lcd` | Backlight Black | `#0A0C10` | SpringBoard ground. The one concession: LCD black, faintly lit, because the backlight leaks. |
| `--cell` | Cell White | `#FFFFFF` | Table cells, sheets. True white — the era's paper. |
| `--ink` | Label Black | `#000000` | Cell text, body copy. True black, deliberately. |
| `--chrome-hi` | Bezel Chrome | `#F8F9FA` | Top stop of metallic gradients. |
| `--chrome-lo` | Bezel Chrome | `#8E9299` | Bottom stop of metallic gradients. |

### Bars and grounds

The blue-gray family that made Settings feel like an instrument panel.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--bar-hi` | Slate Sky | `#B2BCCC` | Top of the nav-bar gradient. |
| `--bar-lo` | Navbar Slate | `#6D84A2` | Bottom of the nav-bar gradient. |
| `--pinstripe` | Settings Putty | `#C6CCD4` | The pinstriped ground behind grouped tables. |
| `--groove` | Etched Slate | `#4C566C` | Section-header text, embossed into the putty. |
| `--hairline` | Group Hairline | `#A9ABAE` | The 1px border around a cell group. |
| `--seam` | Cell Seam | `#E0E0E0` | The 1px separator between cells. |

### Signals

| Token | Name | Hex | Role |
|---|---|---|---|
| `--select-hi` | Tap Blue | `#0B88EE` | Top of the selection-flood gradient. |
| `--select-lo` | Tap Blue | `#0353C4` | Bottom of the selection-flood gradient. |
| `--detail` | Detail Blue | `#385487` | Cell value text — the blue answer beside a black question. |
| `--badge` | Badge Red | `#C8261B` | The unread count. Nothing else is this color. |
| `--gel-green-hi` | Answer Green | `#8CD156` | Top of the affirmative gel gradient. |
| `--gel-green-lo` | Answer Green | `#2F7A16` | Bottom of the affirmative gel gradient. |

### Materials

The Notes legal pad — the only warm thing on the phone.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--pad` | Legal Pad | `#F8F5A9` | Notes paper. |
| `--pad-line` | Pad Rule | `#C9C48D` | The ruled lines, one per line of text. |
| `--pad-ink` | Pad Ink | `#3B3A25` | Marker Felt text on the pad. |

### Engraving inks

Because every letterform and every edge is lit, the alphas are tokens too.

```css
:root {
	--lcd:       #0A0C10;
	--cell:      #FFFFFF;
	--ink:       #000000;
	--chrome-hi: #F8F9FA;
	--chrome-lo: #8E9299;

	--bar-hi:    #B2BCCC;
	--bar-lo:    #6D84A2;
	--pinstripe: #C6CCD4;
	--groove:    #4C566C;
	--hairline:  #A9ABAE;
	--seam:      #E0E0E0;

	--select-hi: #0B88EE;
	--select-lo: #0353C4;
	--detail:    #385487;
	--badge:     #C8261B;
	--gel-green-hi: #8CD156;
	--gel-green-lo: #2F7A16;

	--pad:      #F8F5A9;
	--pad-line: #C9C48D;
	--pad-ink:  #3B3A25;

	/* engraving — every letterform carries exactly one of these */
	--letterpress: rgb(255 255 255 / 0.75); /* 0 1px under dark text on light grounds */
	--engrave:     rgb(0 0 0 / 0.45);       /* 0 -1px above white text on dark grounds */

	/* molding — the object sandwich */
	--edge:  rgb(0 0 0 / 0.40);             /* the 1px line around every molded object */
	--shine: rgb(255 255 255 / 0.60);       /* specular peak of every gloss layer */
}
```

### Contrast — the one hard rule

**Black carries paragraphs. White carries chrome. Every letterform is etched.**

Measured contrast on the grounds text actually sits on (WCAG 2.1, computed):

| Pair | Ratio |
|---|---|
| Label Black on Cell White | **21.0** ✓ |
| White on Backlight Black | **19.6** ✓ |
| Label Black on Settings Putty | **13.0** ✓ |
| Pad Ink on Legal Pad | **10.2** ✓ |
| Detail Blue on Cell White | **7.5** ✓ |
| Etched Slate on Cell White | **7.4** ✓ |
| White on Tap Blue `#0353C4` | **6.9** ✓ |
| White on Badge Red | **5.6** ✓ |
| White on Answer Green `#2F7A16` | **5.4** ✓ |
| Etched Slate on Settings Putty | **4.5** ✓ — exactly AA; body size or larger |
| White on Navbar Slate | 3.8 — bold ≥17px only |
| White on Tap Blue `#0B88EE` | 3.6 — bold ≥17px only |
| White on Slate Sky | 1.9 ✗ |

So: black type on white and putty, white type on black and on the signal colors. Type on
a **gradient** is measured against the gradient's lightest stop behind the text — which
is why bar titles and selected-cell text are always bold and at least 17px (large-text
3:1 clears Navbar Slate and Tap Blue's top half), and why small white type never sits on
a bar: the status bar's small type sits on near-black instead. Detail Blue is a value,
never a paragraph. Nothing colored ever sits on anything colored.

---

## 3. Surfaces

The core of this brief. Every recipe below is the four-layer sandwich from §1 in a
different material. Gradients with **hard stops are sanctioned here** — elsewhere in
this repo they are banned as edges; in this direction the razor-sharp gloss seam is the
signature.

### 3.1 The shine

The SpringBoard icon specular — an ellipse of light whose center hangs above the screen,
so its bottom boundary arcs downward across the object. The edge of the shine is **hard**
(a true hard stop), because the object is polished glass, not frosted.

```css
.iphone-shine {
	position: relative;
	overflow: hidden;           /* the shine must not poke past the corners */
}
.iphone-shine::after {
	content: '';
	position: absolute;
	inset: 0;
	border-radius: inherit;     /* clip the shine to the object's own corners */
	background-image: radial-gradient(
		140% 105% at 50% -50%,
		rgb(255 255 255 / 0.70) 0%,
		rgb(255 255 255 / 0.18) 99%,
		rgb(255 255 255 / 0) 100%
	);
	pointer-events: none;
}
```

Applies to icons, badges, and anything else "made of glass." One shine per object,
always in the upper half, always centered — the light does not move.

### 3.2 Gel

Buttons. A vertical color gradient under a white gloss layer that **breaks hard at 50%**
— the seam between the lit top half and the body of the gel. This hard break is what
separates a gel button from a soft plastic one; do not ease it.

```css
.iphone-gel {
	border: 1px solid var(--edge);
	border-radius: 8px;
	background-image:
		linear-gradient(
			rgb(255 255 255 / 0.55) 0%,
			rgb(255 255 255 / 0.18) 50%,
			rgb(255 255 255 / 0) 50%       /* the seam — a true hard stop */
		),
		linear-gradient(var(--gel-green-hi), var(--gel-green-lo));
	box-shadow:
		inset 0 1px 0 rgb(255 255 255 / 0.40),  /* lit inner top edge */
		0 1px 0 rgb(255 255 255 / 0.60);        /* the lip below, on light grounds */
	color: #FFF;
	font-weight: bold;
	text-shadow: 0 -1px 0 var(--engrave);
}
.iphone-gel:active {
	background-image:
		linear-gradient(rgb(0 0 0 / 0.18), rgb(0 0 0 / 0.06)),
		linear-gradient(
			rgb(255 255 255 / 0.55) 0%,
			rgb(255 255 255 / 0.18) 50%,
			rgb(255 255 255 / 0) 50%
		),
		linear-gradient(var(--gel-green-hi), var(--gel-green-lo));
}
```

Pressing darkens the whole object instantly — set no `transition` on `:active`.
Swap the bottom gradient's pair for a blue (`--select-hi/lo`) or slate (`--bar-hi/lo`)
gel. Layer order matters: in `background-image`, first listed paints on top.

### 3.3 Bars

Status bar, navigation bar, toolbars. Bars are brushed, not gel — a **smooth** vertical
gradient with a 1px inner highlight at the top and a 1px dark border below. No 50% seam;
that belongs to buttons.

```css
.iphone-bar {
	height: 44px;
	background-image: linear-gradient(var(--bar-hi), var(--bar-lo));
	box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.55);
	border-bottom: 1px solid #2D3642;
}
.iphone-status {
	height: 20px;
	background-image: linear-gradient(#484848, #000 45%);
	color: #FFF;
}
```

Bar titles: bold, 20px, centered, white, engraved (`text-shadow: 0 -1px 0 var(--engrave)`).
Bar buttons are small gels in the bar's own slate pair.

### 3.4 Pinstripe

The Settings ground. Vertical 1px stripes on putty, 7px period, barely there. It reads
as texture at arm's length and as machinery up close.

```css
.iphone-pinstripe {
	background-color: var(--pinstripe);
	background-image: repeating-linear-gradient(
		90deg,
		rgb(38 50 71 / 0.07) 0 1px,
		transparent 1px 7px
	);
}
```

Section headers sit directly on it: Etched Slate, bold, 17px, **letterpressed** —
`text-shadow: 0 1px 0 var(--letterpress)` — with 10px left inset.

### 3.5 Grouped tables

Content lives in cells. A group is a white rounded slab floating on the pinstripe;
cells stack inside it, separated by seams; tapping floods the cell with the Tap Blue
gradient. Cells are **opaque** — the pinstripe never shows through paper.

```css
.iphone-group {
	margin: 0 10px 17px;
	border: 1px solid var(--hairline);
	border-radius: 10px;
	background-color: var(--cell);
	overflow: hidden;                 /* clips cell corners and the selection flood */
}
.iphone-group .iphone-cell {
	display: flex;
	align-items: center;
	min-height: 44px;
	padding: 0 10px;
	color: var(--ink);
	font-weight: bold;
	font-size: 17px;
}
.iphone-group .iphone-cell + .iphone-cell {
	border-top: 1px solid var(--seam);
}
.iphone-group .iphone-cell:active {
	background-image: linear-gradient(var(--select-hi), var(--select-lo));
	color: #FFF;
	text-shadow: 0 -1px 0 rgb(0 0 0 / 0.30);
}
```

The disclosure chevron is drawn, not typed — two borders and a rotation:

```css
.iphone-chevron {
	width: 8px;
	height: 8px;
	margin-left: auto;
	border-top: 3px solid #9B9B9F;
	border-right: 3px solid #9B9B9F;
	transform: rotate(45deg);
}
.iphone-cell:active .iphone-chevron {
	border-color: #FFF;
}
```

Cell values (a username, an address) go in Detail Blue, regular weight, pushed to the
right edge. Question black, answer blue — that is the whole information design.

### 3.6 The dock

The reflective shelf. A metallic gradient with its own overhead sheen, and the icons
standing on it cast **reflections**: a flipped copy, faded out with a mask.

```css
.iphone-dock {
	position: absolute;
	left: 0; right: 0; bottom: 0;
	height: 92px;
	background-image:
		radial-gradient(140% 160% at 50% -40%, rgb(255 255 255 / 0.28), rgb(255 255 255 / 0) 60%),
		linear-gradient(rgb(126 138 154 / 0.75), rgb(36 42 50 / 0.92));
	border-top: 1px solid rgb(255 255 255 / 0.25);
}
.iphone-reflection {
	transform: scaleY(-1);
	opacity: 0.28;
	-webkit-mask-image: linear-gradient(to top, rgb(0 0 0 / 0.7) 0%, transparent 55%);
	        mask-image: linear-gradient(to top, rgb(0 0 0 / 0.7) 0%, transparent 55%);
	pointer-events: none;
}
```

The reflection is a decorative duplicate of the icon markup, `aria-hidden="true"`,
placed immediately below the real one. Ship both mask lines; if a browser drops the
mask, `opacity: 0.28` keeps the fallback from shouting.

### 3.7 The legal pad

Notes. Ruled paper where the rule spacing **equals the line height** — text sits on its
lines or the material breaks.

```css
.iphone-pad {
	background-color: var(--pad);
	background-image: repeating-linear-gradient(
		to bottom,
		transparent 0 27px,
		var(--pad-line) 27px 28px
	);
	color: var(--pad-ink);
	font-family: var(--font-pad);
	font-size: 17px;
	line-height: 28px;                /* one rule per line, no drift */
	padding: 0 12px 28px;
}
```

The pad is the one place Marker Felt appears and the one warm surface on the phone.
Use it for exactly one panel.

### 3.8 The badge

The unread count. A red gel pill with a hard white ring, hanging off an icon's top-right
corner.

```css
.iphone-badge {
	min-width: 14px;
	padding: 2px 5px;
	border: 2px solid #FFF;
	border-radius: 999px;
	background-image:
		radial-gradient(130% 100% at 50% -40%, rgb(255 255 255 / 0.55), rgb(255 255 255 / 0) 60%),
		linear-gradient(#EF7160, var(--badge));
	box-shadow: 0 1px 2px rgb(0 0 0 / 0.5);
	color: #FFF;
	font-size: 13px;
	font-weight: bold;
	text-align: center;
	text-shadow: 0 -1px 0 rgb(0 0 0 / 0.30);
}
```

The badge ring is the only 2px border in the vocabulary.

### 3.9 The molding gotchas

- **`border-radius: inherit` + `overflow: hidden` on every shined object.** A gloss
  `::after` without them pokes square corners past the rounded fill — the single most
  common way the illusion breaks.
- **`background-image` stacking order:** first listed paints on top. Gloss first, press
  overlay above gloss, base color last. Getting this backwards buries the shine.
- **The 50% seam is a true hard stop** (`… 50%, transparent 50%`). Soften it by even a
  few percent and gel turns into shrink-wrap.
- **One shadow direction per ground.** Dark ground → white text with `0 -1px` engrave.
  Light ground → dark text with `0 1px` letterpress. Never both on one surface, never a
  blurred glow, never a colored shadow.
- **Surfaces are opaque paint.** No `opacity` on cells, bars, or groups to fake
  translucency — nothing shows through a material except the three sanctioned
  translucents: the lock plate, the dock sheen, the reflections.
- **No `backdrop-filter`, no blur radius over 2px anywhere.** Depth is gradients and
  1px lines. A soft 20px drop shadow is from a different decade in both directions.
- **`background-clip: text` ships with its `-webkit-` prefix** and a solid `color`
  fallback (§7); `mask-image` likewise (§3.6).
- **1px means 1px.** No 0.5px hairlines (that is retina-era iOS 7 talk), no 2px chunk
  except the badge ring. Draw our own tap states and set
  `-webkit-tap-highlight-color: transparent` on the site root.

---

## 4. Type

No webfonts. The phone shipped with Helvetica — not Helvetica Neue, which arrived with
the Retina display a year later — and the system stack lands close enough everywhere.

```css
:root {
	--font-ui:  Helvetica, Arial, 'Liberation Sans', sans-serif;
	--font-pad: 'Marker Felt', 'Segoe Print', 'Comic Sans MS', cursive;
}
```

Do **not** put `system-ui` in the stack: on a modern Apple device it resolves to San
Francisco, the typeface of the flat era this direction predates.

The scale is fixed pixels from real UIKit metrics — this is a 320-point world and type
never breathed with the viewport:

```css
--t-label:   11px;  /* SpringBoard icon labels — bold */
--t-status:  12px;  /* status bar — bold */
--t-caption: 14px;  /* footers, timestamps — regular */
--t-body:    17px;  /* body copy, cell values, section headers */
--t-cell:    20px;  /* cell titles and bar titles — bold */
--t-clock:   58px;  /* the lock-screen clock — weight 300 */
```

- **Every letterform is etched** (§2): `0 1px 0 var(--letterpress)` under dark text on
  light grounds, `0 -1px 0 var(--engrave)` above white text on dark grounds. Zero blur.
  The one exception: SpringBoard icon labels get a true drop shadow —
  `text-shadow: 0 1px 1px rgb(0 0 0 / 0.8)` — because they float over the wallpaper
  rather than sitting in a material.
- **Bold is the default weight** for anything interactive or titular: labels, cell
  titles, bar titles, buttons, the status bar. Regular weight is for prose and values.
- **Labels are Title Case**, instructions are lowercase fragments ("slide to unlock").
- Default tracking everywhere. No italics, no letterspaced caps, no outlined type, no
  gradient-filled display type — the shimmer in §7 is the one sanctioned trick.

---

## 5. Shape, border and shadow

**Radii are a fixed vocabulary** — every corner on the page is one of these four:

```css
--r-key:  5px;    /* keyboard-key-scale small controls */
--r-btn:  8px;    /* gel buttons */
--r-cell: 10px;   /* cell groups and 57px icons */
--r-pill: 999px;  /* badges, the slider well and its thumb */
```

An arbitrary in-between radius (a 16px card, a 24px sheet) is the fastest way to fall
out of 2009. Icons are 57×57 with the 10px radius; if an icon renders at another size,
scale the radius proportionally (10/57 of the side).

**Borders are load-bearing.** Every molded object carries its 1px `--edge` line; groups
carry `--hairline`; bars carry their 1px dark bottom edge. This is the opposite of the
sibling directions — here a crisp 1px border is not a failure, it is the material's
mold line.

**Shadows are small, dark and crisp.** `0 1px 2px rgb(0 0 0 / 0.5)` under floating
objects (icons, badges); 1px inset highlights and shades inside them. Never gray, never
soft, never larger than 2px of blur, never sideways — the light is overhead (§1).

**Symmetry is correct.** Centered bar titles, uniform grids, equal gutters. Rotation is
banned except the jiggle (§7). The screen is an instrument, not a collage.

---

## 6. Layout and composition

The viewport **is** the screen. No drawn hardware bezel, no phone-within-a-phone — at
the mobile portrait breakpoint the visitor is already holding the device this direction
imitates. The page is a stack of chrome:

```
┌──────────────────────────┐
│ status bar          20px │   absolute, top
├──────────────────────────┤
│                          │
│  content region          │   the ONE scroll container
│  (plate, springboard,    │
│   groups, pad, slider)   │
│                          │
├──────────────────────────┤
│ dock                92px │   absolute, bottom
└──────────────────────────┘
```

Metrics, all fixed:

```css
--h-status: 20px;
--h-bar:    44px;   /* nav bars, toolbars */
--h-cell:   44px;   /* minimum cell and touch-target height — Apple HIG, 2008 */
--h-dock:   92px;
--icon:     57px;
--gutter:   10px;   /* screen-edge inset for groups and content */
--group-gap: 17px;  /* vertical gap between cell groups */
```

- **44px is the floor for anything tappable.** Links styled as cells, icons with their
  labels, bar buttons with their padding — nothing interactive is smaller.
- **SpringBoard is a 4-column grid** of 57px icons, gutters equalized by the grid, each
  icon centered above its 11px label. The grid centers in the region; on viewports wider
  than 320px the whitespace grows and the icons do not.
- **Everything centers on the vertical axis** — the grid, bar titles, the slider. Groups
  run full width minus the 10px gutters.
- **The content region is the page's only scroll container** (`overflow-y: auto`),
  sitting between the absolutely-positioned status bar and dock. The combined build pins
  the site wrapper to a non-scrolling viewport (§9), so the screen chrome holds still
  and only the content moves — exactly like the phone.

---

## 7. Motion

UIKit had one duration and it used it for everything: **300ms, ease-in-out**. Motion is
mechanical and purposeful — things slide and press; nothing floats, nothing fades in
on scroll.

- **Sheets slide.** A panel enters from the bottom edge over 300ms and leaves the same
  way. No opacity ramp — it is a physical card, not a ghost.
- **Presses are instant.** `:active` states (gel darkening, selection flood, icon dim
  via a `rgb(0 0 0 / 0.4)` overlay) apply with no transition and release with none.
- **The slide-to-unlock shimmer** — the one continuous animation on the page. A white
  gleam sweeps through gray text every ~2.6s:

  ```css
  .iphone-slide-label {
  	color: #7B7B7B;                       /* fallback when clip fails */
  	background-image: linear-gradient(
  		100deg,
  		#7B7B7B 40%, #FFFFFF 50%, #7B7B7B 60%
  	);
  	background-size: 200% 100%;
  	-webkit-background-clip: text;
  	background-clip: text;
  	-webkit-text-fill-color: transparent;
  	animation: iphone-shimmer 2.6s linear infinite;
  }
  @keyframes iphone-shimmer {
  	from { background-position: 180% 0; }
  	to   { background-position: -80% 0; }
  }
  ```

- **The jiggle is permitted once**, as an easter egg only (e.g. long-press arming the
  icons): `rotate(-2deg) ↔ rotate(2deg)`, 130ms, alternate, infinite, with a small
  random-feeling delay offset per icon. Never on by default.
- No parallax, no scroll-jacking, no reveal-on-scroll, no springy overshoot — inertia
  belonged to the scroll view, not the chrome.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

Reduced motion must leave the page composed: the shimmer label falls back to solid
`#7B7B7B` legibility, sheets appear in place, and nothing depends on animation to be
readable.

---

## 8. What this is not

The failure mode is rendering something adjacent and calling it iPhone OS 3:

| Not this | Because |
|---|---|
| iOS 7+ flat | Translucent blurs, hairlines, thin Helvetica Neue, borderless buttons. The exact thing this direction predates — one borderless text-button and the spell breaks. |
| iOS 5/6 late skeuomorphism | Linen, stitched leather, torn paper, Game Center felt, wood shelves. Richer materials, wrong years. OS 3 knows only plastic, glass, chrome and one legal pad. |
| Mac OS X Aqua | Shares pinstripes and gel, but candy lozenge buttons, traffic lights and brushed-metal windows are desktop chrome. This is the phone: denser, darker, black glass. |
| Frutiger Aero | Bubbles, grass, sky photography, glossy swooshes in space. Right gloss, wrong subject — OS 3 puts its shine on controls, never on landscapes. |
| Glassmorphism | `backdrop-filter` blur and see-through panels. OS 3 glass is opaque paint — the gloss is a gradient, and nothing shows through anything. |
| Neumorphism | Soft monochrome extrusion, two blurred shadows, no edges. OS 3 depth is high-contrast: hard 1px lines and a specular seam. |

Also out: webfonts, `system-ui`, blur radii over 2px, gray soft shadows, arbitrary
corner radii, thin type on gloss, flat single-color buttons, asymmetric layouts,
gradient text (outside the shimmer), emoji as icons, and any light source that is not
directly overhead.

---

## 9. Page application

`iphone/index.html` renders this brief, built to the sub-site authoring contract in the
root `CLAUDE.md` (self-contained folder, wrapper `#site-iphone`, JS as a
`SITES['iphone']` registry function). It is mapped to the **mobile portrait** slot in
`sites.config.json` (`"mobile": { "portrait": "iphone" }`) — the visitor holds a phone
and the page hands them a 2009 one.

**Structure**, top to bottom of the screen stack (§6):

- **Status bar.** 20px, near-black gradient. Carrier reads `malls`, the time reads
  `9:41` (fixed — the keynote time), and a signal fan plus battery are drawn as tiny
  CSS/SVG shapes. All at `--t-status`, bold, white.
- **Lock plate hero.** A translucent black band (one of the three sanctioned
  translucents, §3.9) with 1px top and bottom highlight rims, directly under the status
  bar: `Forrest Almasi` at `--t-clock` weight 300, white, engraved; `software developer`
  beneath at `--t-caption`. This is the lock-screen clock plate wearing a name.
- **SpringBoard.** Backlight Black ground. A 4-column grid of 57px glossy icons (§3.1
  recipe: gradient base, hard-edged shine, 1px edge, 10px radius), each a real `<a>`
  with its 11px drop-shadowed label:
  - **GitHub** → `github.com/malls` — slate gel base, a drawn glyph (no trademark art;
    simple geometric marks in white).
  - **Twitter** → `@forrestalmasi` — Tap Blue base.
  - **Mail** → `mailto:_@forrestalmasi.com` — chrome base, carrying an `.iphone-badge`
    reading `1`.
  - **Notes** → opens the pad (below) — Legal Pad base with ruled lines.
- **The pad.** Tapping Notes slides up (300ms) a §3.7 legal-pad sheet holding the
  *What's up?* blurb in Marker Felt, one rule per line, under a slate §3.3 bar with a
  `Done` gel that slides it away. Pure `root`-scoped JS; with JS unavailable the pad
  renders open beneath the grid, so the content is never trapped.
- **Slide to unlock.** The footer, inside the scroll region: a recessed pill well
  (inset dark gradient, 1px lit bottom lip), a chrome gel thumb, and the §7 shimmer
  label reading `slide to say hi`. Dragging the thumb to the end — or just tapping it —
  fires the `mailto:`. The well is a real control, 44px tall.
- **The dock.** Pinned to the bottom edge (absolute, not fixed): the §3.6 shelf carrying
  GitHub, Twitter and Mail duplicates with `aria-hidden` reflections.

**Build-contract specifics for this direction:**

- **No `@import` at all** — the entire direction is system fonts, so `style.css` starts
  with `:root` and stays off the network.
- Every `id` and every `@keyframes` name is prefixed `iphone-` (`iphone-shimmer`,
  `iphone-jiggle`) — all sites share one document in the built page.
- **No `position: fixed`.** Status bar and dock are `position: absolute` inside the
  wrapper; the wrapper is the `height: 100%` screen and the content region between them
  is the one `overflow-y: auto` scroll container (§6). Written as `body { … }` rules in
  `iphone/style.css`, which the build rewrites onto `#site-iphone`.
- JS boots as `(window.SITES = window.SITES || {})['iphone'] = function (root) { … }`,
  queries only through `root.querySelector(All)`, attaches listeners only to elements
  inside `root` (the slider drags via pointer events on the well, not on `document`),
  and never styles `root` itself. Standalone boot at the end of the site's own body:
  `<script src="./script.js"></script><script>SITES['iphone'](document);</script>`.
- No commas inside functional pseudo-classes — write separate selectors.
- Ship `-webkit-` prefixes for `background-clip: text` and `mask-image`; both have
  no-op-safe fallbacks (§3.6, §7).

**The test.** Every molded surface carries all four sandwich layers — 1px `--edge`, 1px
top highlight, a gloss layer, an etched label. All light is overhead: no shadow or
highlight anywhere points left, right or up. Every corner radius is one of the four in
§5; every shadow's blur is ≤ 2px; every text-shadow offset is `0 ±1px`. Everything
tappable is ≥ 44px. Nothing is translucent except the lock plate, the dock sheen and
the reflections — and nothing scrolls except the content region.

The mechanical half is scriptable: walk the computed styles and assert
`border-radius ∈ {0, 5, 8, 10, pill}`, every `box-shadow` blur ≤ 2px, every
`text-shadow` offset exactly `(0, ±1px)`, and no `backdrop-filter` anywhere. Anything
that fails has drifted out of 2009.

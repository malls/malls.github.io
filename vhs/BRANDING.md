# VHS

> Design direction: **the TV/VCR combo** — the mid-90s 13-inch combination unit: a
> curved-glass mono tube and a top-loading tape deck molded into one charcoal plastic
> cabinet, wheeled into classrooms and bolted to motel dressers. Blue on-screen display,
> a clock that blinks `12:00` because nobody ever set it, and a picture that was never
> quite clear. The user's concept, honored in full: a UI of a TV with a built-in VCR;
> fast-forward to navigate; a hazy overlay on the screen contents, which will be videos
> added later; skeuomorphic. Rendered seriously, in CSS, the way `iphone/` renders 2009.

## 1. The direction

This machine was the least glamorous object in consumer electronics and the most
trusted. It had no interface metaphors because it *was* the interface: physical buttons
that clunked, a tape that whirred, an on-screen display in one font, one size, one blue.
Navigation was linear because tape is linear — you did not browse a VHS cassette, you
shuttled through it, watching the counter spin.

Three things to hold onto, because getting them wrong produces a retro-themed web page
rather than a television:

1. **The page is the appliance, not a page.** Everything visible is molded charcoal
   plastic, curved glass, or the phosphor glow behind the glass. No cards, no nav bar,
   no footer, no browser idiom of any kind — if a surface is not part of the cabinet or
   part of the picture, it does not exist. Skeuomorphism is played completely straight:
   the machine has a model number, silkscreened labels, vent slots that cool nothing.
   The one light source hangs above the cabinet; every molded edge answers to it.
2. **Fast-forward is the only navigation.** No scrolling, no menu, no links between
   "pages". The content is segments recorded in sequence on one tape, and the deck's
   transport controls — `REW ◀◀`, `PLAY ▶`, `FF ▶▶`, `STOP ■` — are the entire site
   navigation. Moving between segments plays a shuttle effect (picture tears, counter
   spins, OSD announces `FF ▶▶`); arriving snaps to clean `PLAY`. Arrow keys are
   transport too. The viewer never scrolls this television; they operate it.
3. **Everything on the screen is behind the haze.** One codified overlay stack —
   scanlines, chroma misconvergence, a roving tracking band, static, glass vignette
   and glare — sits above *all* screen content, always: the OSD, the placeholder
   cards, and every video that arrives later. Content never renders crisp; a crisp
   screen is this direction's flat design, the single fastest way to break the object.
   The haze exists only inside the glass — the cabinet around it is matte and sharp.

**Voice.** Two registers, both deadpan. On the screen, the machine speaks OSD: ALL CAPS,
terse, one blocky font, the vocabulary of a service menu (`PLAY`, `STOP`, `NO SIGNAL`,
`SP`, `CH 03`). On the cabinet, it speaks silkscreen: small condensed caps, factual
(`VHS`, `HQ`, `4-HEAD`, a model number). Nothing anywhere winks, apologizes, or says
"retro" — the machine does not know it is old, because for the machine it is 1996.

---

## 2. Palette

Two families that never mix: the **cabinet** (what the object is made of) and the
**screen** (what the tube emits). Cabinet colors are reflective and matte; screen colors
glow. A screen color on the cabinet, or a cabinet color inside the glass, is a
continuity error. Swatches are named for what they are in the machine; use the names in
code and in conversation.

### The cabinet

| Token | Name | Hex | Role |
|---|---|---|---|
| `--shell` | Molded Charcoal | `#2B2B30` | The cabinet plastic. Every bezel and fascia starts here. |
| `--shell-hi` | Overhead Sheen | `#4A4A52` | Top stop of molded gradients — the ceiling light on plastic. |
| `--shell-deep` | Vent Shadow | `#141416` | Recesses, vent slots, the gap around the cassette flap. |
| `--deck` | Deck Black | `#1C1C1F` | The VCR fascia — one step blacker than the shell, like the real ones. |
| `--silver` | Silkscreen Silver | `#C9CBD1` | Printed cabinet labels, button legends, the model number. |
| `--rec` | Record Red | `#FF4545` | The record dot and its label. Nothing else is red. |

### The displays

The fluorescent well below the tape slot. It is the only part of the cabinet that glows.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--led-well` | Display Well | `#050607` | The dead-black glass the digits float in. |
| `--led` | Clock Green | `#3DF07A` | The clock. Blinks `12:00` until the end of time. |
| `--amber` | Counter Amber | `#FFB020` | The tape counter digits. |

### The screen

| Token | Name | Hex | Role |
|---|---|---|---|
| `--tube` | Tube Black | `#0A0A12` | The powered-on-but-empty phosphor. Never `#000` — the tube leaks. |
| `--osd-blue` | VCR Blue | `#0000AA` | The blue. Ground of every OSD card, menu, and `NO SIGNAL` screen. |
| `--osd-deep` | Tube Vignette | `#000058` | Where VCR Blue falls off toward the glass corners. |
| `--osd-white` | Phosphor White | `#F2F2FA` | All OSD text. Blooms — see §3. |
| `--static-hi` | Static Grey | `#9B9BA1` | The bright grain of dead air. Texture, never a letterform. |
| `--static-lo` | Static Shadow | `#3A3A40` | The dark grain of dead air. |
| `--scrim` | OSD Plate | `rgb(4 4 22 / 0.82)` | The translucent plate under any OSD text that sits over video or static. |

```css
:root {
	--shell:      #2B2B30;
	--shell-hi:   #4A4A52;
	--shell-deep: #141416;
	--deck:       #1C1C1F;
	--silver:     #C9CBD1;
	--rec:        #FF4545;

	--led-well:   #050607;
	--led:        #3DF07A;
	--amber:      #FFB020;

	--tube:       #0A0A12;
	--osd-blue:   #0000AA;
	--osd-deep:   #000058;
	--osd-white:  #F2F2FA;
	--static-hi:  #9B9BA1;
	--static-lo:  #3A3A40;
	--scrim:      rgb(4 4 22 / 0.82);
}
```

> **Build note.** These land under `#site-vhs` after the root build (`:root` is rewritten
> to the site wrapper), so the tokens are scoped to this site and cannot collide with
> another direction's `--shell`. Unprefixed token names are fine; everything else —
> classes, ids, keyframes — carries the `vhs-` prefix (§9).

### Contrast — the one hard rule

**Anything a visitor must read is Phosphor White OSD type — big, blocky, ALL CAPS — on
VCR Blue or on the OSD Plate. Never thin type, and never bare type over static or
video.** The OSD only ever had one white and it survived composite video, RF cables and
thirty rental replays; it survives the haze stack the same way: size, weight, and a
solid ground.

Measured against the grounds text actually sits on (WCAG 2.1, computed):

| Pair | Ratio |
|---|---|
| Phosphor White on Tube Black | **17.7** ✓ |
| Phosphor White on Tube Vignette | **16.5** ✓ |
| Phosphor White on VCR Blue | **11.9** ✓ |
| Phosphor White on OSD Plate over a pure-white video frame (worst case, composites to `#313140`) | **11.4** ✓ |
| Clock Green on Display Well | **13.5** ✓ |
| Counter Amber on Display Well | **11.1** ✓ |
| Silkscreen Silver on Deck Black | **10.5** ✓ |
| Silkscreen Silver on Molded Charcoal | **8.7** ✓ |
| Record Red on Deck Black | **5.0** ✓ — the dot's label only |
| Static Grey on VCR Blue | 4.8 — texture, never carries text anyway |
| VCR Blue on Tube Black | 1.5 ✗ — a ground, never a letterform |

The ratios above are measured pre-haze, and no single number can be measured through
moving static — so the structural rule stands in for the number, exactly as the plate
rule does in `slop/`: **every layer of the haze stack has a hard opacity cap (§5), OSD
body text never renders below its size floor (§3), and OSD text over anything that is
not flat VCR Blue sits on the OSD Plate.** The plate's worst case — composited over a
pure-white video frame — still measures 11.4, which is the whole point of it. Where
legibility is sacred (§6, the links), all three mechanisms apply at once.

---

## 3. Type

Two faces: the tube's and the cabinet's. One webfont. The `@import` sits at the very
top of `style.css` (a head `<link>` does not survive the build):

```css
/* This URL happens to contain no raw ";" — but if it is ever extended with weights or
   a second family, every ";" inside it must be percent-encoded as "%3B". build.js
   splits top-level statements on a raw ";" without string awareness and would cut the
   rule in half. */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
```

| Font | Token | Role |
|---|---|---|
| VT323 | `--font-osd` | Everything the tube emits: OSD status, menu cards, the name, the links. Also the display-well digits — the same pixel grid reads as fluorescent segments in the well. One weight, which is accurate. |
| Arial Narrow / system | `--font-panel` | Everything printed on plastic: button legends, `VHS HQ`, the model number. Condensed caps, letterspaced, never large. |

```css
:root {
	--font-osd:   'VT323', 'Courier New', monospace;
	--font-panel: 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif;
}
```

### Scale

The screen region is the type's world, so on-screen type is sized in container-query
units against it (`.vhs-screen { container-type: inline-size; }`); cabinet silkscreen is
fixed pixels, because printed labels do not reflow:

```css
:root {
	--t-ident:     13cqi;              /* the name — the biggest thing the tube ever says */
	--t-osd:       max(5.5cqi, 19px);  /* OSD status line, menu rows, links */
	--t-osd-small: max(3.8cqi, 14px);  /* the counter readout, OSD footnotes — the floor */
	--t-clock:     22px;               /* the display well digits */
	--t-panel:     12px;               /* button legends, silkscreen — bold, +0.08em tracking */
}
```

- **The OSD is ALL CAPS.** The real generator had no lowercase; neither does this
  screen. Lowercase appears only in the email address, which is data, not display.
- **Phosphor bloom is the OSD's engraving.** Every on-screen letterform carries the
  same two shadows — a centered white bloom and a one-notch chroma misconvergence:

  ```css
  .vhs-osd-text {
  	font-family: var(--font-osd);
  	color: var(--osd-white);
  	text-transform: uppercase;
  	text-shadow:
  		0 0 0.14em rgb(242 242 250 / 0.50),   /* bloom */
  		-0.04em 0 rgb(255 45 85 / 0.28),      /* red ghost, left */
  		0.04em  0 rgb(0 229 255 / 0.28);      /* cyan ghost, right */
  }
  ```

  This is the one sanctioned glow on the page and the per-glyph half of the haze (§5).
  The display-well digits get their own single bloom in their own color
  (`0 0 6px rgb(61 240 122 / 0.6)`) and no chroma ghosts — LEDs do not misconverge.
- **Silkscreen never blooms.** Cabinet labels are flat `--silver`, bold, uppercase,
  `letter-spacing: 0.08em`, no shadow — ink on plastic reflects, it does not emit.
- No italics, no weights the fonts do not have, no letterspacing on the OSD (the
  generator advanced one cell per glyph and so does VT323).

---

## 4. The cabinet

The physical object, drawn with the same overhead-light discipline as `iphone/`: one
implied source above the machine, top edges lit, bottom edges shadowed, every recipe a
gradient plus a 1px edge sandwich. The difference is the material — this is matte
injection-molded plastic, so highlights are broad and dull, never a hard specular seam.

### 4.1 Molded plastic — `.vhs-molded`

The base material. Fill, a soft top-lit gradient, a dark mold line, a 1px lit top edge
and a 1px shadowed bottom edge:

```css
.vhs-molded {
	background-color: var(--shell);
	background-image: linear-gradient(rgb(255 255 255 / 0.07), rgb(0 0 0 / 0.18));
	border: 1px solid #0E0E10;
	border-radius: 10px;
	box-shadow:
		inset 0 1px 0 rgb(255 255 255 / 0.10),
		inset 0 -1px 0 rgb(0 0 0 / 0.45);
}
```

Recessed areas (the display well's surround, the cassette slot) invert the sandwich:
dark on top, lit lip below — a hole under an overhead light.

### 4.2 The tube glass — `.vhs-tube`

The screen opening. Curvature is faked with three honest moves: elliptical corner
rounding, an inset bezel shadow, and the §5 glare layer's off-center highlight. No 3D
transforms — the tube bulges because the light says so.

```css
.vhs-tube {
	position: relative;
	background-color: var(--tube);
	border-radius: 5% / 7%;
	border: 2px solid #0B0B0D;
	box-shadow:
		inset 0 0 0 1px rgb(255 255 255 / 0.04),
		inset 0 10px 30px rgb(0 0 0 / 0.55),
		0 1px 0 rgb(255 255 255 / 0.06);
	overflow: hidden;              /* the picture, the OSD and the haze all clip to the glass */
	aspect-ratio: 4 / 3;
}
```

`overflow: hidden` here is load-bearing: the tracking band travels past the top and
bottom edges, the shuttle effect skews the picture off-axis, and none of it may escape
the glass.

### 4.3 Vents and the speaker grille — `.vhs-grille`

Molded slots, drawn as a repeating gradient. Texture at arm's length, machinery up
close — and they cool nothing, which is accurate:

```css
.vhs-grille {
	background-image: repeating-linear-gradient(
		to bottom,
		rgb(0 0 0 / 0.55) 0 2px,
		rgb(255 255 255 / 0.05) 2px 3px,
		transparent 3px 7px
	);
}
```

### 4.4 Transport buttons — `.vhs-btn`

The site's entire navigation, so they are real `<button>` elements, ≥ 44px tall, with
their function silkscreened on or under them. A button is a plastic key standing 2px
proud of the fascia; pressing it seats it — **instantly, with no transition**, because
a tact switch does not ease:

```css
.vhs-btn {
	min-width: 56px;
	min-height: 44px;
	background-color: var(--deck);
	background-image: linear-gradient(rgb(255 255 255 / 0.08), rgb(0 0 0 / 0.25));
	border: 1px solid #0A0A0C;
	border-radius: 4px;
	box-shadow:
		inset 0 1px 0 rgb(255 255 255 / 0.12),
		0 2px 0 #000;
	color: var(--silver);
	font-family: var(--font-panel);
	font-size: var(--t-panel);
	font-weight: bold;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}
.vhs-btn:active {
	transform: translateY(2px);
	background-image: linear-gradient(rgb(0 0 0 / 0.25), rgb(0 0 0 / 0.10));
	box-shadow:
		inset 0 1px 0 rgb(255 255 255 / 0.05),
		inset 0 2px 4px rgb(0 0 0 / 0.5),
		0 0 0 #000;
}
```

Transport glyphs (`◀◀` `▶` `▶▶` `■`) are drawn in the button face at `--t-panel` scale
in `--silver`; they are Unicode geometric characters, not emoji, and not images. The
record dot is a `--rec` circle with `box-shadow: 0 0 5px rgb(255 69 69 / 0.55)` — the
second and last glow on the cabinet — labeled `REC` in silver.

### 4.5 The display well — `.vhs-display`

The fluorescent readout below the deck: clock left, tape counter right, both in
`--font-osd` on Display Well black.

```css
.vhs-display {
	background-color: var(--led-well);
	border: 1px solid #000;
	border-radius: 3px;
	box-shadow:
		inset 0 2px 6px rgb(0 0 0 / 0.8),
		inset 0 -1px 0 rgb(255 255 255 / 0.04);
	color: var(--led);
	font-family: var(--font-osd);
	font-size: var(--t-clock);
	text-shadow: 0 0 6px rgb(61 240 122 / 0.6);
	padding: 2px 12px;
}
.vhs-clock   { animation: vhs-blink 1s steps(1) infinite; }
.vhs-counter { color: var(--amber); text-shadow: 0 0 6px rgb(255 176 32 / 0.55); }
```

The clock reads `12:00` and blinks (§7). It is never set. The counter reads a tape
position (`0:00:00` at the first segment) and spins during shuttle.

### 4.6 The cassette slot

A `--shell-deep` recess spanning the deck fascia, with a 1px lit bottom lip (inverted
sandwich, §4.1), a centered `VHS` wordmark in silkscreen, and the flap: a slightly
lighter `--shell` bar sitting in the recess with its own top highlight. Decorative,
inert, and mandatory — a VCR without a mouth is a cable box.

### 4.7 The molding gotchas

- **One light, overhead, always.** Every `inset 0 1px` highlight is white-ish and on
  top; every `inset 0 -1px` shade is black and on the bottom. A left-lit button breaks
  the object exactly the way it breaks `iphone/`.
- **Matte means no hard gloss seam.** The 50% hard-stop gel shine belongs to `iphone/`;
  here every plastic gradient is smooth. The only hard-edged light on this page is the
  glass glare (§5), and it is on glass.
- **Recesses invert the sandwich.** Dark top edge, lit bottom lip. Get this backwards
  and holes become bumps.
- **Glows are enumerated.** OSD bloom, LED digits, the record dot. A glowing button
  legend or a glowing bezel is from a gamer peripheral, not a television.
- **No `transition` on `:active`**, anywhere. Mechanical switches are instant both
  directions.
- **1px means 1px** on mold lines and edge lights; the tube bezel's 2px border is the
  one exception, because glass sits in a thicker gasket.

---

## 5. The haze stack

The signature section. Everything the tube shows passes through this stack — the OSD
cards now, the videos later. The stack is built once, as absolutely-positioned layers
filling `.vhs-tube`, and content slots in *under* it; adding a `<video>` must never
require touching a haze layer.

Codified layer order, bottom to top. It does not change:

```
0  content        the segment: video slot + OSD card (§6)
1  chroma fringe  per-glyph ghosts (§3) + a faint red/cyan edge wash
2  scanlines      .vhs-scanlines
3  tracking band  .vhs-tracking — the roving distortion strip
4  static         .vhs-static — the noise field
5  vignette       .vhs-glass — phosphor falloff into the corners
6  glare          .vhs-glass — the room reflected in the glass
```

Every layer from 1 up is `pointer-events: none` — the haze is optical, and a click on
the picture must land on the link under it. Layers 5 and 6 share one element.

### 5.1 Chroma fringe

The per-glyph half already lives in `.vhs-osd-text` (§3). The full-screen half is a
single faint wash that pulls the picture's left edge red and right edge cyan, the way
a misconverged tube did:

```css
.vhs-fringe {
	position: absolute;
	inset: 0;
	background-image: linear-gradient(
		90deg,
		rgb(255 45 85 / 0.05),
		transparent 30%,
		transparent 70%,
		rgb(0 229 255 / 0.05)
	);
	mix-blend-mode: screen;
	pointer-events: none;
}
```

> **Gotcha: `mix-blend-mode` requires `body { isolation: isolate }`** in this site's
> CSS (the build maps it onto the wrapper). Without it, blend layers composite against
> whatever sibling site happens to be behind the wrapper in the built page — the
> `marble/` precedent, restated here because it will silently look correct standalone.

### 5.2 Scanlines — `.vhs-scanlines`

```css
.vhs-scanlines {
	position: absolute;
	inset: 0;
	background-image: repeating-linear-gradient(
		to bottom,
		rgb(0 0 0 / 0.22) 0 1px,
		transparent 1px 3px
	);
	pointer-events: none;
}
```

**Cap: the dark line never exceeds `0.25` alpha.** At `0.3` the OSD starts to shimmer
illegibly; at `0.22` it reads as a tube.

### 5.3 The tracking band — `.vhs-tracking`

The horizontal distortion strip that crawls up the picture forever — the signature
motion of the whole direction (§7). A blurred bright/dark smear, 6% of the screen tall,
parked above the glass and translated the full height of the tube:

```css
.vhs-tracking {
	position: absolute;
	inset: -8% 0 auto 0;
	height: 6%;
	background-image: linear-gradient(
		to bottom,
		transparent,
		rgb(255 255 255 / 0.10) 30%,
		rgb(155 155 161 / 0.20) 50%,
		rgb(0 0 0 / 0.28) 55%,
		transparent
	);
	filter: blur(1px);
	animation: vhs-track 11s linear infinite;
	pointer-events: none;
}
@keyframes vhs-track {
	to { transform: translateY(1900%); }
	/* 1900% of a 6%-tall band ≈ 114% of the tube — fully off the bottom edge */
}
```

**Caps: one band, ≤ 0.28 peak alpha, ≥ 8s per pass.** Two bands or a fast pass turns
weather into malfunction, and malfunction is a different page.

### 5.4 Static — `.vhs-static`

A tiled `feTurbulence` grain, held far below visibility-threat level. The filter id is
`vhs-`-prefixed even inside its own data-URI document — the prefix rule (§9) is
followed everywhere so nobody has to remember the exception:

```css
.vhs-static {
	position: absolute;
	inset: 0;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='vhs-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23vhs-noise)'/%3E%3C/svg%3E");
	background-size: 160px 160px;
	opacity: 0.07;
	animation: vhs-grain 0.5s steps(5) infinite;
	pointer-events: none;
}
@keyframes vhs-grain {
	0%   { background-position: 0 0; }
	20%  { background-position: -34px 22px; }
	40%  { background-position: 18px -40px; }
	60%  { background-position: -46px -14px; }
	80%  { background-position: 30px 36px; }
	100% { background-position: 0 0; }
}
```

**Cap: `0.07` at rest, `0.35` only during the shuttle flash (§6) and the `NO SIGNAL`
screen — where static *is* the content and gets a full-opacity `.vhs-static` of its
own on the content layer, not a louder haze.**

### 5.5 Vignette and glare — `.vhs-glass`

One element, two radial gradients: the phosphor falling off into the corners, and the
room's one window reflected top-left in the curved glass. The glare's inner edge is
hard — glass, not fog:

```css
.vhs-glass {
	position: absolute;
	inset: 0;
	border-radius: inherit;
	background-image:
		radial-gradient(120% 90% at 22% 10%,
			rgb(255 255 255 / 0.13),
			rgb(255 255 255 / 0.04) 28%,
			transparent 45%),
		radial-gradient(140% 120% at 50% 50%,
			transparent 58%,
			rgb(0 0 0 / 0.45) 100%);
	pointer-events: none;
}
```

**Caps: glare peak ≤ 0.15, vignette edge ≤ 0.5, and `border-radius: inherit` is
mandatory** — square glare corners poking past the rounded glass is this direction's
version of the un-clipped gloss layer.

### 5.6 The haze contract

- The stack sits above **all** content, always. No element ever renders above layer 6.
  There is no "clean mode", no hover that lifts the haze, no crisp screenshot state.
- The alpha caps in §§5.2–5.5 are part of the §2 contrast contract. Loosening one
  requires re-measuring the OSD Plate worst case.
- The haze lives only inside `.vhs-tube`. One scanline on the cabinet and the object
  is a texture pack, not a television.

---

## 6. The tape library

What is on the tape: three recordings, in fixed order, navigated only by transport.

| # | Segment | Counter | Screen contents |
|---|---|---|---|
| 1 | `IDENT` | `0:00:00` | The name — `FORREST ALMASI` at `--t-ident`, `SOFTWARE DEVELOPER` under it at `--t-osd` — as OSD over the segment's video slot. |
| 2 | `CONTACTS` | `0:04:12` | The links menu, pure VCR Blue. **No video slot ever** — see the sacred rule below. |
| 3 | `MEMO` | `0:09:47` | The *What's up?* blurb as OSD lines over the segment's video slot. |

Each segment is one element holding two layers, both under the haze: a **video slot**
(layer 0a — a `<video>` when the file exists, its stand-in otherwise) and an **OSD
card** (layer 0b — real DOM text in `.vhs-osd-text`). Name, title, links and blurb live
in the DOM, always. **Text content is never inside a video file** — a video is scenery
behind the OSD, and the page must say everything it has to say with every video
missing.

### Transport semantics

- **`FF ▶▶`** — next segment. **`REW ◀◀`** — previous. Both play the shuttle: ~450ms of
  `vhs-shuttle` skew on the content layer, `.vhs-static` flashed to `0.35`, the counter
  spinning to the target value, the OSD status reading `FF ▶▶` or `REW ◀◀`. Then clean
  `PLAY` on the new segment. At the ends of the tape the button does nothing and the
  OSD does not apologize.
- **`PLAY ▶`** — returns to the current segment from `STOP`. **`STOP ■`** — the VCR
  Blue idle screen: `STOP` top-left, the `MALLSVISION` wordmark centered, counter
  holding. Stop is a real place on this machine, not an error.
- **OSD chrome on every segment:** status word top-left, counter top-right, both at
  `--t-osd-small` — the smallest sanctioned OSD size — on `--scrim` plates when over a
  video slot.
- **Keyboard:** the TV is one focusable region (`tabindex="0"` on the cabinet element,
  a visible focus treatment on the tube bezel); `ArrowRight` = FF, `ArrowLeft` = REW,
  the buttons themselves are native `<button>`s and need no extra wiring. The listener
  is attached to the cabinet element inside `root` — never to `window` or `document`
  (§9).

### The no-JS baseline

JS is genuinely required for transport — so, unlike `slop/` and `marble/`, this brief
specs the fallback rather than the abstinence. **With scripts absent, the page is
complete:** all three segments render stacked in tape order inside the tube, the screen
region becomes the one scroll container (`overflow-y: auto` on the tube's content
area — the *page* still never scrolls), and every link works. The JS boot adds a
`vhs-js` class to the screen element (an element inside `root` — never to `root`
itself); only under `.vhs-js` do segments become absolutely-positioned single-view
"playback". Transport buttons render in both modes — without JS they are the honest
kind of broken, like a deck that is unplugged.

### The degradation rule

Mandatory, and it mirrors `slop/` §7 exactly:

- **Video files arrive later**, at **absolute** paths — `/vhs/ident.mp4`,
  `/vhs/memo.mp4`, posters at `/vhs/ident.jpg`, `/vhs/memo.jpg` — never relative
  (`./ident.mp4` resolves against the built root page and 404s).
- **Until a file exists — and whenever it is missing — its slot shows its
  purpose-built stand-in**, declared in the same stack: `IDENT`'s slot idles as a VCR
  Blue field with `--osd-deep` corner falloff; `MEMO`'s slot idles as the `NO SIGNAL`
  screen — full-opacity static (§5.4) with `NO SIGNAL` in `.vhs-osd-text` on a
  `--scrim` plate. The `<video>` element, when added, is simply layered over the
  stand-in with `object-fit: cover`; a failed load exposes the stand-in again.
- **No JS detection of missing files, no `onerror` swaps.** HTML and CSS layering
  only. The page must read fully composed, on-brand, and complete with **zero** video
  files present — that is its shipping state.
- **No layout may depend on a video's dimensions** (slots are `absolute, inset: 0`
  inside the 4:3 tube) **and no text may depend on a video for contrast** (§2's plate
  rule already guarantees this).
- Test by renaming the files away: the television loses home movies, not structure.

**The sacred rule:** the `CONTACTS` segment never gets a video slot. Links sit on flat
VCR Blue — measured, not composited — under the haze like everything else, at
`--t-osd`, as real `<a>` elements ≥ 44px tall, spelled correctly, reachable by Tab with
a visible OSD-style focus state (a `▶` cursor glyph and an underline, both Phosphor
White). The joke stops at the door of anything a visitor needs.

---

## 7. Motion

Five sanctioned effects. Everything else holds still — a television has exactly one
moving part and it is the picture.

| Effect | Keyframes | Timing | Notes |
|---|---|---|---|
| Tracking band | `vhs-track` | 11s linear infinite | §5.3. The direction's heartbeat. |
| Static grain | `vhs-grain` | 0.5s steps(5) infinite | §5.4. `steps`, never smooth — noise does not tween. |
| Clock blink | `vhs-blink` | 1s steps(1) infinite | The `12:00`. Rests **visible** (`0%–49%` on). |
| FF/REW shuttle | `vhs-shuttle` | 450ms, JS-toggled class, once per press | The only motion tied to input. |
| Power-on | `vhs-poweron` | 320ms, once, on load | Optional: the picture expands from a bright horizontal line. Runs once and never again. |

```css
@keyframes vhs-blink {
	0%, 49%   { opacity: 1; }
	50%, 100% { opacity: 0.12; }
}
@keyframes vhs-shuttle {
	0%   { transform: translateX(0) skewX(0); filter: none; }
	30%  { transform: translateX(-3%) skewX(-6deg); filter: saturate(0.4) contrast(1.4); }
	70%  { transform: translateX(2%) skewX(4deg); filter: saturate(0.3) contrast(1.6); }
	100% { transform: translateX(0) skewX(0); filter: none; }
}
@keyframes vhs-poweron {
	0%   { transform: scaleY(0.004); filter: brightness(4); }
	60%  { transform: scaleY(0.004); filter: brightness(4); }
	100% { transform: scaleY(1); filter: none; }
}
```

All keyframe names are `vhs-`-prefixed — the combined build shares one document and an
unprefixed `blink` will collide with another site's. No parallax, no hover
choreography, no scroll-triggered anything (there is no scroll). The shuttle animates
`transform`/`filter` on the content layer only — never the haze layers, which do not
care what the tape is doing.

The reduced-motion block is mandatory, and the static state must be a composed frame —
tracking band parked, grain frozen, clock resting lit, shuttle replaced by an instant
cut with the OSD status still updating:

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
	.vhs-tracking { top: 72%; }        /* parked low, faint, visible — wear, not motion */
}
```

Every animation above is built so its first frame *is* the composed frame: the clock's
`0%` is lit, the band's `0%` sits at its parked inset, the grain's `0%` is a full
noise field. Nothing on this page depends on motion to be readable or operable — FF
still navigates, it just cuts.

---

## 8. What this is not

The failure modes are all adjacent and all fatal:

| Not this | Because |
|---|---|
| Vaporwave / synthwave | Neon grids, sunsets, Roman busts — the *ironic memory* of this machine. This page is the machine, sincerely, with no pink-teal and no bibliography. The only neon here is a clock that cannot tell time. |
| A glitch-art demo | Datamosh, RGB-split scroll effects, glitch-on-hover. The haze is period-accurate *wear*, capped and constant; it never performs, intensifies for effect, or responds to the mouse. Malfunction as spectacle is a different page. |
| A streaming service | Thumbnails, carousels, a play-button overlay, "Up next". Tape is linear and this UI is proud of it — three recordings, one order, no browsing. |
| `iphone/` next door | The repo's other skeuomorphism, and the nearest miss: 2009's gloss-gel and hard specular seams versus 1996's matte charcoal and phosphor glow. Different decade, different materials — a gel button on this fascia is a continuity error. |
| A YouTube embed page | An `<iframe>` with someone else's chrome inside the tube. The founding decision: the television is built, not embedded, and every pixel of chrome — OSD, counter, buttons — is this page's own. |
| A green-phosphor terminal | Hacker-movie CRT: green monospace prose, cursor blink, command lines. Shares the tube, not the register — this screen speaks four-word OSD status lines over a picture, it does not print. |
| A Winamp-style media skin | Chrome-plated player widgets, EQ sliders, a playlist. That is software pretending to be hardware *controls*; this is hardware, whole — cabinet, glass, dust and all. |

Also out: any un-hazed screen state (§5.6), glows beyond the enumerated three (§4.7),
eased button presses, a second tracking band, film-grain over the *cabinet*, emoji as
transport icons, a settable clock, and any caption that explains the joke — no "best
viewed in 1996", no tracking-slider gag. The machine plays it straight or it does not
work.

---

## 9. Page application

`vhs/index.html` renders this brief as one appliance, built to the sub-site authoring
contract in the root `CLAUDE.md` (self-contained folder, wrapper `#site-vhs`, JS as a
`SITES['vhs']` registry function). The cabinet fills the wrapper height and centers on
a near-black room ground (`#0B0A09` — the den with the lights off); a mid-desktop
width bucket suits the 4:3 object, but the `sites.config.json` mapping is decided at
page-build time, not here.

**Structure**, top to bottom of the cabinet:

- **The bezel.** `.vhs-molded` frame around the tube; top rail carries the brand badge
  — `MALLSVISION` in silkscreen caps — and the model number `FA-96` on the right.
  Grille columns (§4.3) flank the tube on wide viewports and fold under it on narrow.
- **The tube** (§4.2), holding the haze stack (§5) over the tape library (§6):
  - Segment 1 `IDENT` — the name and title as OSD over the `/vhs/ident.mp4` slot
    (VCR Blue stand-in until the file lands).
  - Segment 2 `CONTACTS` — the sacred menu on flat VCR Blue: `GITHUB — @MALLS` →
    `github.com/malls`, `TWITTER — @FORRESTALMASI` → `twitter.com/forrestalmasi`,
    `EMAIL — _@forrestalmasi.com` → `mailto:_@forrestalmasi.com`. Real `<a>` rows,
    ≥ 44px, `--t-osd`, Phosphor White, correct spelling, `▶` focus cursor. The one
    part of the tape built entirely for the reader.
  - Segment 3 `MEMO` — the blurb as OSD lines over the `/vhs/memo.mp4` slot
    (`NO SIGNAL` stand-in until the file lands).
  - OSD status and counter chrome on every segment; `STOP` idle screen per §6.
- **The deck fascia.** `--deck` band below the tube: cassette slot and flap (§4.6)
  with the `VHS` wordmark, then the control row — `REW ◀◀` `PLAY ▶` `FF ▶▶` `STOP ■`
  buttons (§4.4), the record dot with `REC`, and the display well (§4.5) with the
  blinking `12:00` and the amber counter.
- **The plinth.** A final molded rail with vent slots and nothing else. Machines end
  in plastic, not in a footer.

**Build-contract specifics for this direction**, stated in full so the page generator
needs nothing outside this file:

- The single `@import` (§3) sits at the **very top** of `style.css`. Its URL currently
  contains no raw `;`, but any `;` ever added to it must be percent-encoded `%3B` —
  the build's statement splitter is not string-aware and a raw semicolon cuts the rule
  in half. Only `@import`/`@media`/`@supports`/`@keyframes`/`@font-face` at-rules.
- Every `id` in markup and inline/data-URI SVG is prefixed `vhs-` (`vhs-noise`, §5.4);
  every `@keyframes` name is prefixed `vhs-` (`vhs-track`, `vhs-grain`, `vhs-blink`,
  `vhs-shuttle`, `vhs-poweron`); any custom `font-family` name would be too — all
  sites share one document in the built page, and ids/filters/keyframes resolve
  document-wide.
- No commas inside functional pseudo-classes — write `#site-vhs a:hover` and
  `#site-vhs a:focus-visible` as separate selectors, never `:is(a, b)`.
- No literal `</style>` sequence in CSS, no literal `</script>` in JS.
- Never set `display` on `html`/`body`; never set the same property differently on
  `html` vs `body` (both map to the wrapper). `body { height: 100%; isolation:
  isolate; }` — the isolation is required by the §5.1 blend layer.
- **No `position: fixed` anywhere.** The cabinet is laid out in the wrapper; all haze
  and OSD chrome is `position: absolute` inside `.vhs-tube`.
- **The combined shell does not scroll, and neither does this television.** FF
  navigation replaces scrolling entirely under JS; the only `overflow-y: auto` on the
  page is the tube's content area in the no-JS stacked baseline, or a single segment
  whose OSD text exceeds the glass. The page body never scrolls in any mode.
- All video and poster URLs are absolute (`/vhs/…`), never relative (§6).
- JS is exactly one registry function —
  `(window.SITES = window.SITES || {})['vhs'] = function (root) { … }` — querying only
  via `root.querySelector(All)`, listeners only on elements inside `root` (the
  keyboard transport listens on the focusable cabinet element, §6 — never on
  `window`/`document`), and never writing styles or classes to `root` itself (`root`
  is `document` standalone and `Document` has no `.style`; the `vhs-js` state class
  goes on the screen element). Standalone boot at the end of the site's own body:
  `<script src="./script.js"></script><script>SITES['vhs'](document);</script>`.

**The test.** Checkable, not vibeable:

- Zero video files present: every segment shows its stand-in, `MEMO` reads
  `NO SIGNAL`, and the page is fully composed — no broken layout, no empty box, no
  console-visible fetch for a missing file triggered by JS.
- Disable JS: all three segments render stacked and readable inside the tube, the
  tube's content area scrolls, all three links click. Nothing else on the page
  scrolls in either mode, at any width.
- All screen text is Phosphor White `--font-osd` ALL CAPS at ≥ `--t-osd-small`, on
  VCR Blue or a `--scrim` plate — inspect every OSD element's computed ground. No
  letterform anywhere in Static Grey, VCR Blue, or any haze tint.
- The haze: scanline alpha ≤ 0.25, resting static opacity ≤ 0.07, one tracking band
  at ≥ 8s per pass, every haze layer `pointer-events: none`, and no element rendering
  above the glass layer. Clicking a link *through* the haze works.
- Transport: `FF ▶▶` and `REW ◀◀` step the segments with shuttle + counter + OSD
  feedback; `ArrowRight`/`ArrowLeft` do the same with focus on the cabinet; `STOP ■`
  shows the idle screen; buttons are ≥ 44px, `:active` states have no transition.
- The links block: three real `<a>` elements, correct spelling, ≥ 44px targets,
  ≥ 4.5:1 measured contrast (flat VCR Blue ground — 11.9 per §2), keyboard-reachable
  with a visible focus state, never over a video slot.
- With `prefers-reduced-motion`: clock rests lit, tracking band parked visible at
  72%, grain frozen, FF cuts instantly — and the page is a composed frame, not a
  degraded one.
- The cabinet: every molded edge lit from above (no left/right/bottom highlights),
  no glow outside the OSD, the LED digits and the record dot, and not one scanline
  outside the glass.

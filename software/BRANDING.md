# Software

> Design direction: **Innovative Communication, 1987** — the record sleeves of the German
> electronic duo Software (Peter Mergener / Michael Weisser), where the cover art was not
> illustration but *scientific visualisation*: raytraced quadrics, Mandelbrot marbling and
> lab-rendered chrome, printed on white card with Helvetica set around it.

Reference: *Past · Present · Future Vol. 2* (IC, 1987) — computer graphics by **Franke/Helbig**.
Herbert W. Franke was one of the founders of computer art; the sibling sleeves credit
**MAPART/Peitgen** (Heinz-Otto Peitgen, of the Mandelbrot set), **Nelson Max**,
**Yoichiro Kawaguchi** and **Abel Image Research**. That provenance is the whole brief. These
covers were made by mathematicians and graphics researchers who had access to a frame buffer
and treated an LP jacket as somewhere to publish a render.

---

## 1. The direction

Two objects, in tension, on one page: **an inert sheet of paper** and **a hyperreal render
sitting on it**. Neither contaminates the other. The paper is dead flat — no gradient, no
shadow, no texture beyond its own tooth. The render is glossy, lit, volumetric, impossible.
The whole aesthetic lives in that seam.

Three laws. Get these wrong and the output is a synthwave poster, which is the wrong decade
and the wrong intent.

1. **The page is a printed sleeve, not a screen.** The artwork is a *plate*: a bounded panel,
   inset with a hairline keyline, floating in generous white margin. Type never sits on the
   render; it sits on the paper beside it. There is no full-bleed, no hero image, no
   background-image behind the words. §6 is the grid this implies.
2. **Every rendered form is a quadric cut by a plane.** Sphere, ellipsoid, torus, cylinder,
   cone — and then sliced. The signature move of the reference is a gold sphere cut into
   three horizontal segments that are then *displaced* sideways, showing black lacquer cut
   faces and one hairline of specular white at each cut. Nothing on the plate is a rectangle,
   a rounded rectangle, or an organic blob. §5 makes this checkable.
3. **One hard light, no ambient.** A small blown specular hotspot at a fixed position, a fast
   Phong falloff, a terminator that goes nearly black, and one dim warm bounce from the ground
   plane. No soft studio lighting, no ambient occlusion, no depth of field, no four-point rig.
   1987 raytracers could not do those things and their absence is the period signature.

**Voice.** Deadpan technical German-catalogue English. Compound nouns joined with hyphens —
*Chip-Meditation*, *Beam-Scape*, *Electronic-Universe* — which is Software's own typographic
tic and this site's naming convention for every link (§4). Middots between list items. Never
ironic, never nostalgic, never winking: the sleeve believes completely in the future it is
rendering. Title Case in display type, sentence case in prose, no exclamation marks.

---

## 2. Palette

Two palettes that never mix. **Paper colours carry language. Plate colours carry light.** A
plate colour never sets type; a paper colour never appears inside a render.

### Paper

| Token | Name | Hex | Role |
|---|---|---|---|
| `--sleeve` | Card White | `#F2EFE9` | The ground. Warm, never `#FFF` — this is stock, not a screen. |
| `--mount` | Mount Grey | `#E7E2D8` | The plate's mount, and the only other flat area permitted. |
| `--ink` | Ink | `#111014` | All primary type. Near-black with a blue cast, never `#000`. |
| `--ink-2` | Ink Light | `#5A5651` | Captions, tracklist detail, the credit line. |
| `--keyline` | Keyline | `#1A1820` | Hairline rules and the plate border. Nothing else. |

### Plate

The render. **Never as a flat fill and never behind type** — these exist inside gradient
ramps, and only inside the plate's bounds.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--coral` | Coral Field | `#E4576E` | The airbrushed sky, upper field. |
| `--rose` | Rose Deep | `#C8506B` | Sky, lower field, toward the horizon. |
| `--magenta` | Magenta Shade | `#A83C6E` | Where the sky darkens behind a form. |
| `--violet` | Violet | `#6B4C9A` | The secondary ellipsoids. |
| `--indigo` | Indigo | `#3E2A63` | Their shaded side, and the ground plane. |
| `--amber-hi` | Amber Hot | `#FFE9A8` | The gold specular, just inside the white core. |
| `--amber` | Amber | `#F0A322` | The lit face of anodised gold. |
| `--amber-lo` | Amber Deep | `#8A3B08` | Where gold turns toward its terminator. |
| `--chrome-hi` | Chrome Hot | `#E4EDF5` | Reflective blue-white highlight. |
| `--chrome` | Chrome | `#7E9BB8` | The body of a reflective form. |
| `--chrome-lo` | Chrome Deep | `#3C4E63` | Its shaded side. |
| `--lacquer` | Lacquer | `#0B0A10` | The cut faces of a sliced solid, and its rim. |
| `--void` | Void | `#16121C` | The bottom of the plate, under the ground plane. |
| `--spec` | Specular | `#FFFFFF` | The hotspot core and every cut hairline. Pure white is correct here only. |

```css
:root {
	/* paper — the only colours allowed to carry type */
	--sleeve:  #F2EFE9;
	--mount:   #E7E2D8;
	--ink:     #111014;
	--ink-2:   #5A5651;
	--keyline: #1A1820;

	/* plate — render only, inside gradient ramps, never behind type */
	--coral:     #E4576E;
	--rose:      #C8506B;
	--magenta:   #A83C6E;
	--violet:    #6B4C9A;
	--indigo:    #3E2A63;
	--amber-hi:  #FFE9A8;
	--amber:     #F0A322;
	--amber-lo:  #8A3B08;
	--chrome-hi: #E4EDF5;
	--chrome:    #7E9BB8;
	--chrome-lo: #3C4E63;
	--lacquer:   #0B0A10;
	--void:      #16121C;
	--spec:      #FFFFFF;

	/* print films */
	--dot:   rgb(17 16 20 / 0.5);   /* halftone dot ink */
	--tooth: rgb(17 16 20 / 0.05);  /* paper grain, multiply */
}
```

### Contrast — the hard rule

**Ink carries everything a reader needs. Ink Light carries captions. No plate colour ever
carries type.** WCAG 2.1 ratios, computed against Card White `#F2EFE9`:

| Colour | vs Card White `#F2EFE9` | Verdict |
|---|---|---|
| Ink `#111014` | **16.5** | ✓ everything |
| Ink Light `#5A5651` | **6.4** | ✓ body and captions |
| Indigo `#3E2A63` | **10.7** | ✓ but reserved for the plate |
| Amber Deep `#8A3B08` | **6.8** | ✓ but reserved for the plate |
| Coral Field `#E4576E` | 3.1 | ✗ body — large display only, and even then don't |
| Chrome `#7E9BB8` | 2.5 | ✗ never type |

Inside the plate the only type permitted is white on Lacquer `#0B0A10` (**19.7** ✓) — used at
most once, for a serial-number style micro-label etched into a cut face. Everything else the
plate wants to say, it says on the paper next to it.

There is no dark mode. A record sleeve does not have a dark mode. Do not add
`prefers-color-scheme` inversion; the white card is the design.

---

## 3. The plate

The core of the brief: how to render 1987 CGI in CSS gradients. Every recipe below assumes one
light, fixed at **34% / 26%** of each form's box. That number is a constant across the whole
plate — every specular on the page must agree on where the sun is, or the render collapses into
a sticker sheet.

### 3.1 The quadric shading ramp

The workhorse. A sphere is a radial gradient with a *hot, tight* core and a long fall to a
near-black terminator, plus a second dim wide radial in the opposite quadrant — the bounce off
the ground plane. That bounce is what separates a raytraced sphere from a circle with a
gradient in it.

```css
.software-q {
	border-radius: 50%;
	background-repeat: no-repeat;
}

.software-q-gold {
	background-color: var(--amber-lo);
	background-image:
		/* bounce — dim, wide, warm, opposite the key */
		radial-gradient(circle at 70% 84%, rgb(255 186 96 / 0.5) 0%, rgb(255 186 96 / 0) 44%),
		/* key — hot core, fast falloff, near-black terminator */
		radial-gradient(circle at 34% 26%,
			var(--spec)     0%,
			var(--amber-hi) 5%,
			var(--amber)    19%,
			#C2680C         42%,
			var(--amber-lo) 64%,
			#2E1204         86%,
			#150800         100%);
}

.software-q-chrome {
	background-color: var(--chrome-lo);
	background-image:
		radial-gradient(circle at 70% 84%, rgb(200 220 240 / 0.4) 0%, rgb(200 220 240 / 0) 42%),
		radial-gradient(circle at 34% 26%,
			var(--spec)      0%,
			var(--chrome-hi) 6%,
			var(--chrome)    26%,
			#55708C          52%,
			var(--chrome-lo) 74%,
			#1B2534          100%);
}
```

Tuning rules:

- **The specular core is ≤6% of the radius.** Wider and it reads as a soft studio light. The
  jump from `--spec` to the first colour is the one place on the plate a fast stop is correct.
- **The terminator reaches ≥90% darkness by 86%.** A sphere that stays bright at its edge is a
  ball of paint.
- **Bounce alpha ≤0.55, radius ≥40%.** It is a suggestion of a floor, not a second light.
- Chrome gets a **horizon band** as well — see §3.4.

### 3.2 The slice

The signature. A solid is cut by one or more horizontal planes, and the segments are displaced
sideways. Build it as **separate stacked elements**, not a clip on one element — the reference
displaces them, and the displacement is the point.

Each segment is a squashed ellipse (a quadric's cross-section is always an ellipse), gets the
same ramp from §3.1, and carries the cut faces in its own `box-shadow`:

```css
.software-seg {
	position: absolute;
	border-radius: 50%;             /* every segment: 0 or 50%, never between — see §5 */
	box-shadow:
		inset 0  2px 0 0 rgb(255 255 255 / 0.75),   /* the lit cut edge, 2px, hairline-hard */
		inset 0  6px 10px -4px var(--lacquer),      /* the cut face falling into shadow */
		inset 0 -8px 14px -6px rgb(0 0 0 / 0.8);    /* the underside of the segment */
}
```

- **Three or four segments** to a sliced form. Two reads as an accident, five as a stack of
  plates.
- **Displace each segment by 3–9% of its own width**, alternating direction, so the stack
  shears. Vertical gaps between segments are `0` to `1.5%` — they are cuts, not spacing.
- **Segment heights are unequal.** A cap, a wide lens, a shallow bowl.
- **The lit cut edge is always the same 1–2px white** on every segment on the plate. It is the
  one straight-ish line the render is allowed, and it is what tells the eye "this is a cut
  plane, not a shadow."

### 3.3 The ground plane and horizon

A raytraced scene from this era always shows its floor. The plate's lower third is a plane
receding to a horizon; forms sit on it and smear a reflection down into it.

```css
.software-ground {
	background-image:
		/* the reflection pool directly under the main form */
		radial-gradient(60% 22% at 42% 4%, rgb(240 163 34 / 0.35), rgb(240 163 34 / 0) 72%),
		/* the plane itself, receding */
		linear-gradient(to bottom, var(--indigo) 0%, #241844 34%, var(--void) 100%);
}
```

The horizon is a **1px `--keyline`-dark line at ≤0.5 alpha**, not a hard colour change, and the
sky meets it with a compressed gradient (three stops in the last 8%) so the atmosphere thickens
into it. Above the horizon the sky is airbrush: `--coral` → `--rose` → `--magenta`, at least
five stops, no stop closer than 6% to its neighbour except at the horizon.

### 3.4 Reflections

The one honest cheat available. Any chrome form carries a **horizon band** — a linear gradient
strip across its middle where sky meets ground in its own reflection:

```css
.software-q-chrome::after {
	content: '';
	position: absolute;
	inset: 0;
	border-radius: 50%;
	background-image: linear-gradient(to bottom,
		rgb(228 87 110 / 0)    30%,
		rgb(228 87 110 / 0.55) 46%,
		rgb(255 255 255 / 0.7) 50%,
		rgb(62 42 99 / 0.6)    54%,
		rgb(62 42 99 / 0)      72%);
	mix-blend-mode: screen;
}
```

Every chrome form's horizon band sits at the **same vertical fraction** — they are reflecting
the same world. Two chrome objects with horizons at different heights is the fastest way to
make the plate read as collage.

### 3.5 The fractal inset

The Peitgen credit, honoured once. Exactly **one** small region on the plate — a cut face, or
the interior of a slice — carries marbled fractal texture: layered offset conic gradients
blended so the banding curls back on itself.

```css
.software-fractal {
	background-image:
		conic-gradient(from 200deg at 38% 44%, #F0A322, #C8506B, #3E2A63, #7E9BB8, #F0A322),
		conic-gradient(from 20deg  at 62% 58%, #0B0A10, #E4576E, #FFE9A8, #6B4C9A, #0B0A10),
		radial-gradient(circle at 46% 50%, #FFFFFF 0%, #0B0A10 62%);
	background-blend-mode: overlay, hard-light, normal;
	filter: contrast(1.6) saturate(1.25);
}
```

Rules: one per page, never larger than ~8% of the plate's area, always clipped inside a
quadric or a cut face — never a free-floating rectangle of texture.

### 3.6 Print, not screen

Two overlays, both only over the plate, never over the paper:

**Halftone.** The plate is a printed reproduction of a render, so it carries a rosette:

```css
.software-halftone {
	background-image: radial-gradient(circle at 50% 50%, var(--dot) 0.55px, transparent 0.65px);
	background-size: 3px 3px;
	transform: rotate(15deg) scale(1.25);   /* the screen angle; scale covers the rotated corners */
	mix-blend-mode: multiply;
	opacity: 0.09;
	pointer-events: none;
}
```

`0.06–0.12` opacity. Above that it is a dot-screen effect; below it does nothing. It also
dithers away the banding that these long gradient ramps produce on 8-bit displays, which is
the real reason it is not optional.

**Paper tooth.** Over the entire sleeve — plate and margin alike — at the top of the stack:

```css
.software-tooth {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='software-tooth-f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23software-tooth-f)' opacity='0.5'/%3E%3C/svg%3E");
	background-size: 120px 120px;
	mix-blend-mode: multiply;
	opacity: 0.06;
	pointer-events: none;
}
```

**Banned print effects:** ring wear, sleeve creases, torn corners, coffee rings, tape hiss
texture, scan curl, drop shadows imitating a photographed object. This is a mint copy under
flat light. Distress belongs to a different, lazier aesthetic.

**Registration.** One permitted flourish: the plate keyline may carry a ≤0.4px cyan/magenta
misregistration (`box-shadow: 0.4px 0 0 rgb(0 174 239 / .35), -0.4px 0 0 rgb(236 0 140 / .35)`).
Never on type — misregistered text reads as a broken font, not as offset litho.

---

## 4. Type

Helvetica, and genuinely Helvetica-shaped. The sleeve is Swiss typography wrapped around a
German render.

```css
/* Inter is the cross-platform stand-in for Neue Haas Grotesk; the ";" between weights is
   percent-encoded because build.js splits top-level statements on a raw ";". */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400%3B500%3B700&display=swap');

:root {
	--font-sleeve: 'Helvetica Neue', Helvetica, 'Inter', Arial, 'Liberation Sans', sans-serif;
	--font-micro:  ui-monospace, 'SF Mono', Menlo, 'Roboto Mono', monospace;
}
```

One family for everything. No serif, no display face, no second font — a 1987 IC sleeve had a
Letraset sheet of Helvetica and nothing else.

- **Wordmark.** Weight 700, uppercase, tracking `0.08em`, optically kerned, and **letterspaced
  to fill the type column exactly** — it is the widest element on the page and it sets that
  column's width. Never on the plate, never coloured, never with a shadow.
- **The middot line.** Three or four words joined by spaced middots: `Past · Present · Future`.
  Weight 400, tracking `0.04em`, `--ink`. This is the sleeve's rhythm device and it appears
  exactly twice — once under the wordmark, once in the bottom caption.
- **The edition marker.** `VOL 2.` — weight 700, on its own line, with real air above and
  below. Small, but the second-loudest thing on the page.
- **The list.** Centred column, weight 400, `--ink`, one item per line, tight leading (`1.35`),
  and **every item is a hyphenated compound**: `Code-Repository`, `Micro-Blog`,
  `Direct-Contact`. This is the strongest single carrier of the reference and it is not
  negotiable — an unhyphenated `Contact` in that column breaks the whole conceit.
- **Captions.** `--ink-2`, weight 400, ~11–12px, tracking `0.02em`. The line above the list
  ("The best …") and the "plus / N previously unreleased tracks" tail are captions.
- **The bottom rule.** Centred, `--ink-2`, ~10px, tracking `0.12em`, bracketed by middots:
  `· released and unreleased energy ·`.
- **Micro.** Mono, 9–10px, uppercase, tracking `0.14em`, `--ink-2` — catalogue number, year,
  label line. Decorative micro takes `aria-hidden="true"`; anything a reader needs stays at
  11px minimum in `--ink`.

Banned: italics, all-caps body copy, text shadows of any kind, outlined or gradient-filled
type, chrome lettering, type over the plate, type that follows a path, drop caps.

Scale, ratio ≈ 1.33, fluid. This is a *quiet* type scale — the render is the loud thing:

```css
--t-micro: clamp(0.56rem, 0.54rem + 0.08vw, 0.64rem);
--t-xs:    clamp(0.68rem, 0.66rem + 0.1vw,  0.78rem);
--t-sm:    clamp(0.8rem,  0.77rem + 0.14vw, 0.92rem);
--t-md:    clamp(0.98rem, 0.93rem + 0.22vw, 1.15rem);
--t-lg:    clamp(1.3rem,  1.15rem + 0.6vw,  1.7rem);
--t-xl:    clamp(1.9rem,  1.5rem + 1.6vw,   2.9rem);
```

The wordmark is `--t-xl` at most. If display type is bigger than that, the sleeve has become a
poster.

---

## 5. Shape and edge

**The law: `border-radius` is `0` or `50%`. There is nothing in between.**

A `border-radius: 12px` panel is neither a printed element nor a rendered solid — it is a 2015
web card, and it is the single fastest way to destroy this direction. Paper things have square
corners cut by a guillotine. Rendered things are conic sections. Pick one.

Corollaries:

- **Every straight line on the page is a hairline.** `0.5px`–`1px`, `--keyline`, at full
  opacity or none. No 2px rules, no thick borders, no `outline`, no divider that is a
  background-coloured `<div>`.
- **The plate has a keyline and a margin.** A 1px `--keyline` border, with the render inset
  from it by `--mount` (a 6–10px reveal), the way a plate is mounted on card.
- **Rules are structural, not decorative.** A hairline exists to bound the plate or to separate
  the list from its caption. There is no rule under the wordmark, no rule around the type
  column.
- **The paper is orthogonal; the render is diagonal.** Type, keylines, margins and the plate
  are all on the same right-angled grid, perfectly aligned. Inside the plate nothing is level:
  the ellipsoids are rotated 8–22°, the segment stack shears, the composition runs on a
  diagonal from lower-left to upper-right. That contrast is the composition.
- **No shadows on paper elements.** Not on the plate, not on the type, not on hover. The only
  shadows in the design are `inset` and they live inside rendered solids.
- **No `clip-path` on rendered solids** — it clips `box-shadow`, and the inset shadows in §3.2
  are what draw the cut faces. Use `border-radius: 50%` on a correctly-proportioned box, or
  stack segments.

---

## 6. Layout

The sleeve is a **square**, centred, with equal margins, on the card ground. Inside it, a
two-column division taken directly from the reference:

```
┌─ sleeve (aspect-ratio 1 / 1) ─────────────────────────┐
│                                                       │
│   ┌───────────────────┐          WORDMARK             │
│   │                   │                               │
│   │   plate           │      Past · Present · Future   │
│   │   (keyline +      │                               │
│   │    mount +        │            VOL 2.             │
│   │    render)        │                               │
│   │                   │      caption line             │
│   │                   │        Compound-One           │
│   │                   │        Compound-Two           │
│   └───────────────────┘        Compound-Three         │
│                                                       │
│                                         ▪ label mark  │
│              · bottom caption rule ·                  │
└───────────────────────────────────────────────────────┘
```

- **Plate ~52–56% of the sleeve width**, taller than wide (roughly `5 / 6`), pinned left, its
  top and bottom insets unequal — more room below than above.
- **Type column ~34%**, right, its contents **centred within the column**, ragged in the way
  centred Helvetica is. The whole column is optically centred against the plate's vertical
  mass, not its geometric middle.
- **Vertical rhythm.** Wordmark → `--s-4` → middot line → `--s-3` → edition → `--s-4` → caption
  → `--s-2` → list → `--s-3` → tail caption. Nothing floats; every gap comes from the scale.
- **The label mark** sits bottom-right of the type column: a small geometric device with two
  lines of mono micro under it. Draw it in CSS or inline SVG — no image file, and do **not**
  reproduce the actual Innovative Communication logo. Make a plausible sibling: a hairline
  delta or a stack of chevrons in `--ink`, ~24px wide.
- **The bottom caption** is centred across the *whole sleeve*, not the type column — it is the
  one element that ignores the two-column split.

```css
--s-1: 0.4rem; --s-2: 0.75rem; --s-3: 1.25rem; --s-4: 2rem; --s-5: 3.25rem;
```

**Fitting the shell.** The built page does not scroll (`html, body { overflow: hidden }`,
wrapper at `height: 100%`). The sleeve must therefore *fit*: size it
`width: min(92vw, 92svh, 1040px)` with `aspect-ratio: 1 / 1` and centre it, so the square
is bounded by the shorter viewport axis. Nothing on this page owns a scroll container, and
nothing overflows — if the content does not fit, the type scale shrinks, the plate does not
crop.

**Responsive.** Below the sleeve's comfortable square, the two columns stack: plate on top at
full column width (now wider than tall, ~`4 / 3`), type block beneath, still centred. The
segment count on the sliced form drops from four to three, the fractal inset is dropped, and
the halftone `background-size` stays at `3px` — it is a print screen, it does not scale with
the layout.

---

## 7. Motion

This is a printed object. It should be **almost entirely still**, and every motion that does
exist must have a reason inside the fiction.

- **The render reveal.** On first paint the plate draws itself top-to-bottom in a single
  scanline wipe — a 1987 raytracer writing rows into a frame buffer. One pass, `~900ms`,
  `linear` (a raytracer has no easing), via a `mask-image` linear gradient whose stop position
  animates. It runs once and never again. This is the direction's one flourish; do not add a
  second.
- **The specular orbit.** The `34% / 26%` hotspot drifts by ±3% over 60–90s, `ease-in-out`,
  `alternate`, `infinite` — animated on a `--software-lx` / `--software-ly` custom property
  pair, or on a `transform: translate()` of a highlight pseudo-element. Every form on the plate
  reads the *same* pair, so the light moves as one light. The motion should be barely
  perceptible; if you can see it happening, halve it.
- **Hover on a list item.** The item's text goes from `--ink-2` weight 400 to `--ink` weight
  500, and a hairline `--keyline` underline draws in from the centre over `180ms`
  `cubic-bezier(.2,.6,.2,1)`. Optionally the corresponding form on the plate raises its
  specular. No colour change, no scale, no shadow, no background fill.
- **Focus.** `:focus-visible` gets a 1px `--keyline` outline offset 3px — square, hairline,
  consistent with §5. Write `a:hover` and `a:focus-visible` as separate selectors; no commas
  inside functional pseudo-classes (build contract).

Banned: parallax, scroll animation, fade-in-on-load, typewriter effects, floating/bobbing
objects, rotating 3D, cursor trails, marquees, anything that loops in under 20s.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

Under reduced motion the plate is simply *already rendered* — the mask sits at 100%, the
specular sits at its base `34% / 26%`. The static state is the finished frame, never frame zero.

---

## 8. What this is not

Software got reissued in the 2010s by a vaporwave label, and the internet has been mislabelling
these sleeves ever since. The failure modes below are all "adjacent decade, wrong idea."

| Not this | Because |
|---|---|
| **Vaporwave** | Pink-and-teal, Windows 95 chrome, Japanese katakana, Roman busts, glitch, irony. Software's sleeves are sincere scientific illustration. The reissue label is not the aesthetic. |
| **Synthwave / outrun** | Purple horizon grid, chrome-outlined type, a sun with scanlines, neon glow, Ferraris. Wrong palette, wrong light model, and it is 2011 cosplaying 1984. There is no glow anywhere in this direction. |
| **Modern 3D-render landing page** | Blender/Spline soft-studio blobs, iridescent chrome, soft area lights, ambient occlusion, depth of field, a `border-radius: 24px` card underneath. This is the single most likely wrong output. 1987 raytracing has one hard light and no soft anything. |
| **Frutiger Aero / Y2K aqua** | Daylit, glossy, bubbly, translucent — and it is what the sibling `liquid/` already is. This direction is matte paper with one hard render on it. |
| **Distressed lo-fi vinyl** | Ring wear, creases, tape saturation, dust and scratches. A mint promo copy under flat light. |
| **Memphis** | Also 1980s, also a sibling site (`memphis/`), and the exact opposite: flat, playful, patterned, no light source. |
| **Corporate gradient orb** | A big soft blurred circle behind centred marketing copy. Missing the keyline, the paper, the slice and the ground plane — i.e. everything. |

Also out: full-bleed artwork, type on the render, drop shadows, rounded rectangles, dark mode,
emoji, gradients on text, glow, blur (there is no `filter: blur()` on this page at all), and any
second light source.

---

## 9. Page application

`software/index.html` renders this brief, built to the sub-site authoring contract in the root
`CLAUDE.md` (self-contained folder, wrapper `#site-software`, optional
`SITES['software']` registry function).

**Structure**, in DOM order:

- **Sleeve.** The square container (§6), `--sleeve` ground, centred, with the paper tooth
  overlay as its last child.
- **Plate.** 1px `--keyline` border, `--mount` reveal, then the render, `overflow: hidden`:
  - **Sky** — five-stop airbrush `--coral` → `--rose` → `--magenta`, compressing into the
    horizon.
  - **Ground plane** (§3.3) with the reflection pool.
  - **The sliced gold form** — the hero. Four segments (§3.2), sheared, centre-left, occupying
    ~60% of the plate height. Its middle segment's cut face carries the one fractal inset
    (§3.5).
  - **Two violet ellipsoids** behind it, upper-right, rotated 14° and −9°, at different scales.
  - **One chrome form** overlapping the gold at lower-right, carrying the horizon band (§3.4)
    at the same vertical fraction the scene's horizon sits at.
  - **Halftone** over the plate only (§3.6).
- **Type column**, all `--font-sleeve`, all centred:
  - **Wordmark** — `FORREST ALMASI`, weight 700, uppercase, letterspaced to the column width.
  - **Middot line** — `Past · Present · Future`.
  - **Edition** — `VOL 2.`
  - **Caption** — `The best links from the LP's` in `--ink-2`.
  - **The list** — the site's links as hyphenated compounds, one per line, centred:
    - `Code-Repository` → `https://github.com/malls`
    - `Micro-Blog` → `https://twitter.com/forrestalmasi`
    - `Direct-Contact` → `mailto:_@forrestalmasi.com`
  - **Tail caption** — `plus` on its own line, then
    `one previously unreleased track` in `--ink-2`, linking to whatever the site's current
    "what's up" line is. If there is nothing to link, the tail caption is dropped rather than
    faked.
  - **Label mark** — the CSS delta device (§6) with two mono micro lines beneath it:
    `INNOVATIVE-COMMUNICATION` is **not** used; write `FORRESTALMASI.COM` and a catalogue-style
    string such as `IC · 0700` (the viewport bucket, doubling as a catalogue number).
- **Bottom caption** — centred across the sleeve: `· released and unreleased energy ·` in
  `--ink-2` micro. This line is a direct quotation of the reference and should stay verbatim.
- **Paper tooth** over everything (§3.6).

**Build-contract specifics:**

- **Every `id` is prefixed `software-`** (`software-tooth-f`, `software-reveal`) — all sites
  share one document in the built `index.html` and `url(#…)` resolves document-wide.
- `@keyframes` names prefixed `software-`; custom properties used for the light are
  `--software-lx` / `--software-ly` so they cannot collide with another site's tokens.
- The one `@import` sits at the very top of `style.css` with its `;` percent-encoded as `%3B`
  (§4). A head `<link>` will not survive the build.
- **No image files.** Everything here is gradients and inline SVG data URIs, so there is no
  local asset to path. If that ever changes, the asset lives in `software/` and is referenced
  relatively (`url('./x.png')`) per the contract.
- No `position: fixed`. No `display` set on `html`/`body`. No commas inside functional
  pseudo-classes. No literal `</style>` in the CSS.
- The site sets `isolation: isolate` (written as `body { isolation: isolate }`, which the build
  rewrites onto `#site-software`) so the `multiply` and `screen` layers cannot reach the sites
  painted around it in the combined page.
- The page **does not scroll** and does not need to — see §6.

**Viewport bucket.** Already mapped: `"700": "software"` in `sites.config.json`, i.e.
**700–799px** — a narrow desktop window, between `liquid` (600) and `random` (800). Design the
square sleeve for that width first: at 700px the sleeve is ~644px on a side, so the type column
is only ~220px wide and the wordmark must fit `FORREST ALMASI` at `--t-lg`, not `--t-xl`. Check
the type scale there before checking it anywhere else.

Note that the bucket mapping already exists while `software/index.html` is still empty, so
`node build.js` currently fails with `no <body>…</body> found in software/index.html`. The
build stays red until the page is generated from this brief.

**The test.** At every breakpoint:

1. **No computed `border-radius` on any element is other than `0px` or `50%`.** Scriptable:
   walk every element, read `getComputedStyle(el).borderRadius`, assert each value is `0px` or
   a `%` equal to 50. Anything else is a web card that snuck in.
2. **No element has a non-inset `box-shadow`, no element has `filter: blur()`, and no element
   has `text-shadow`.** Also scriptable, also non-negotiable. The single permitted exception is
   the plate keyline's ≤0.4px registration offset (§3.6) — allow-list that one element by
   class and assert on everything else.
3. **Every specular hotspot on the plate is at the same position**, and every chrome horizon
   band at the same vertical fraction — one light, one world.
4. By eye: the type sits entirely on paper, the sleeve is square and fully visible without
   scrolling, and at least three distinct materials are legible in the render — anodised gold,
   lacquer, chrome.

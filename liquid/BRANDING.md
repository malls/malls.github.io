# Liquid

> Design direction: **Y2K aqua** — the moment between 1998 and 2003 when every interface
> decided it wanted to be made of water. Apple's Aqua, Winamp skins, chrome MP3 rips,
> imported drum-and-bass flyers. Screens got a light source and started dripping.

## 1. The direction

This is not a metaphor. Surfaces here are **wet**: lit from somewhere off-canvas, slightly
transparent, blurred at the edges, pooling instead of stacking. Light does not fall on the
page — it comes up through it.

Three things to hold onto, because getting them wrong produces something that merely looks
*translucent* rather than something that looks **liquid**:

1. **Nothing has an edge.** Not a corner, not a border, not a divider, not a section
   boundary. Every boundary is a curve, a blur, a mask feather, or a radius so large the
   shape reads as a droplet. One `border: 1px solid` and the whole illusion drains out.
   This is the law; §5 is its enforcement.
2. **There is exactly one light source.** A single blown-out white bloom, off-centre, near
   the top. Every highlight, every specular rim, every blob's bright side answers to it.
   Two light sources and the page reads as a gradient soup rather than a lit volume.
3. **Depth is layered transparency, not shadow.** Things are in front of each other because
   you can see *through* them to what is behind, not because they cast a shadow. The z-ladder
   in §6 is the composition.

**Voice.** Low, unhurried, slightly submerged. Short sentences with air around them. Never
technical-excited, never exclamatory — the surface is already doing the performing. Lowercase
in display type; sentence case in prose.

---

## 2. Palette

Nocturnal and blue. Named for what the colour is doing, not for a hue.

### Field

The ground stack. These are never flat — they exist to be interpolated between.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--abyss` | Trench Black | `#05070F` | Deepest ground. Blue-black, never `#000`. |
| `--deep` | Deep Water | `#101C4E` | Mid ground. Where the field settles at the bottom. |
| `--sapphire` | Sapphire Core | `#1B3FD8` | The electric blue. The saturated heart of the field. |
| `--azure` | Pool Azure | `#3D7BFF` | Lit water. The transition into the bloom. |

### Luminous

The light. Only these carry type.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--aqua` | Chlorine | `#6FD8FF` | Cool highlight, hairline contours, small UI type. |
| `--mercury` | Mercury | `#E8F0FF` | Liquid metal white. Body copy, blob fills. |
| `--bloom` | Blowout | `#FFFFFF` | The hot core of the light source and display type. Pure white is correct here. |

### Oil slick

Iridescence. **Gradient-only** — these never appear as a flat fill, never as type, never as
a solid shape. They exist inside conic and linear sweeps at low opacity, the way petrol sits
on a puddle.

| Token | Name | Hex |
|---|---|---|
| `--slick-rose` | Petrol Rose | `#FF7BD5` |
| `--slick-lilac` | Petrol Lilac | `#A98CFF` |
| `--slick-mint` | Petrol Mint | `#7CFFD4` |
| `--slick-gold` | Petrol Gold | `#FFD98A` |

### Films

Because nothing is opaque, the alphas are tokens too. Reach for these before writing a raw
`rgb(255 255 255 / …)`.

```css
:root {
	--abyss:    #05070F;
	--deep:     #101C4E;
	--sapphire: #1B3FD8;
	--azure:    #3D7BFF;

	--aqua:     #6FD8FF;
	--mercury:  #E8F0FF;
	--bloom:    #FFFFFF;

	--slick-rose:  #FF7BD5;
	--slick-lilac: #A98CFF;
	--slick-mint:  #7CFFD4;
	--slick-gold:  #FFD98A;

	/* films — translucent white, thinnest to thickest */
	--film-1: rgb(255 255 255 / 0.04);   /* barely there; large panels */
	--film-2: rgb(255 255 255 / 0.08);   /* default glass fill */
	--film-3: rgb(255 255 255 / 0.14);   /* hover state, small chips */
	--film-4: rgb(255 255 255 / 0.24);   /* pressed, or the lit top edge of a panel */
	--rim:    rgb(255 255 255 / 0.55);   /* the meniscus — a 1px inset highlight, never a border */
	--shade:  rgb(5 7 15 / 0.45);        /* the underside; used inset, never as a drop shadow */
}
```

### Contrast — the one hard rule

**Bloom and Mercury carry language. Aqua carries labels. Everything else carries light.**

Measured against the two grounds text will actually sit on (WCAG 2.1, computed):

| Colour | vs Trench Black `#05070F` | vs Deep Water `#101C4E` | vs Sapphire Core `#1B3FD8` |
|---|---|---|---|
| Blowout `#FFFFFF` | **20.1** ✓ | **16.2** ✓ | **7.6** ✓ |
| Mercury `#E8F0FF` | **17.6** ✓ | **14.2** ✓ | **6.7** ✓ |
| Chlorine `#6FD8FF` | **12.4** ✓ | **10.0** ✓ | 4.7 — large only |
| Pool Azure `#3D7BFF` | **5.2** ✓ | 4.2 — large only | 1.6 ✗ |
| Sapphire Core `#1B3FD8` | 2.6 ✗ | 2.1 ✗ | — |

So: Bloom or Mercury for anything anyone has to read. Aqua for micro-labels and contours.
Azure at display sizes only, and only over the darkest part of the field. Sapphire is a
light, not a letterform.

**The transparency caveat.** These numbers assume the text sits directly on the ground. Type
over a translucent panel over a *gradient* has no single measurable contrast. The fix is
structural, not a number: any text on glass gets its own local darkening beneath it — a
radial `--shade` wash inside the panel, or a `text-shadow: 0 2px 18px rgb(5 7 15 / .6)`
holding it apart from whatever drifts underneath. Check the worst frame of the animation,
not the first.

---

## 3. Surfaces: blur and transparency

The core of this brief. A surface here is a **stack**: a translucent fill, a blur of what's
behind it, a lit top edge, a shaded bottom, and a soft outer glow. Miss a layer and it reads
as a flat semi-transparent rectangle — which is a dashboard, not a liquid.

Blur is a scale, not a value. Pick the rung, don't invent numbers:

```css
:root {
	--blur-film:  8px;    /* chips, pills, small controls */
	--blur-glass: 24px;   /* panels */
	--blur-deep:  64px;   /* field shapes, blobs seen through the water */
	--blur-bloom: 140px;  /* the light source itself */
}
```

> **Do not ship surface recipes as custom properties.** `var()` inside a custom property
> resolves at computed-value time **on the element where the property is declared** — a
> `--glass-fill` declared on `:root` bakes in `:root`'s `--film-2` and inherits down already
> resolved, so overriding `--film-2` on a descendant changes nothing. Declare
> `background-image` and `box-shadow` directly in the utility class; the `var()` then lives on
> the element that carries the class, where the override is visible.

### 3.1 Glass

The workhorse. Every panel, card and link chip on the page is this.

```css
.wet-glass {
	background-color: var(--film-2);
	background-image: linear-gradient(
		to bottom,
		rgb(255 255 255 / 0.16) 0%,
		rgb(255 255 255 / 0.03) 42%,
		rgb(255 255 255 / 0.00) 70%,
		rgb(120 170 255 / 0.06) 100%
	);
	-webkit-backdrop-filter: blur(var(--blur-glass)) saturate(180%);
	backdrop-filter: blur(var(--blur-glass)) saturate(180%);
	border-radius: var(--r-blob-a);   /* never a uniform radius — see §5.1 */
	box-shadow:
		inset 0 1px 0 0 var(--rim),                    /* the meniscus — lit top edge */
		inset 0 -18px 32px -24px var(--shade),          /* the underside */
		0 24px 60px -30px rgb(5 7 15 / 0.7),            /* the pool it sits in */
		0 0 80px -20px rgb(61 123 255 / 0.35);          /* the glow it gives off */
}
```

`saturate(180%)` is not optional — blur alone greys out the field behind the panel and the
glass goes cloudy instead of wet. Push saturation back up and the blue comes through.

### 3.2 Bloom

The light source, and the single most important element on the page. A radial gradient with
a **smooth falloff to zero alpha** — no hard stop anywhere in the ramp.

```css
.bloom {
	background-image: radial-gradient(
		circle at 50% 50%,
		rgb(255 255 255 / 0.95) 0%,
		rgb(210 232 255 / 0.65) 14%,
		rgb(61 123 255 / 0.38) 34%,
		rgb(27 63 216 / 0.16) 58%,
		rgb(5 7 15 / 0.00) 78%
	);
	filter: blur(var(--blur-bloom));
	border-radius: 50%;
	pointer-events: none;
}
```

One per page at full strength. Secondary blooms exist but run at ≤30% opacity and take their
hue from the field, not from white — they are reflections of the first, not new suns.

### 3.3 Mercury (the metaball blobs)

The white puddles from the reference: separate shapes that **fuse** when they get close. This
is the SVG goo filter — Gaussian blur to smear the shapes together, then an alpha ramp to snap
the smear back into a hard-but-curved silhouette.

Put the filter in the site's body markup (ids must be prefixed, see §9):

```html
<svg class="liquid-defs" width="0" height="0" aria-hidden="true" focusable="false">
	<defs>
		<filter id="liquid-goo">
			<feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b"/>
			<feColorMatrix in="b" type="matrix"
				values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo"/>
			<feBlend in="SourceGraphic" in2="goo"/>
		</filter>
	</defs>
</svg>
```

```css
.mercury-pool { filter: url(#liquid-goo); }

.mercury-pool > * {
	position: absolute;
	background-color: var(--mercury);
	background-image: linear-gradient(140deg, var(--bloom) 0%, var(--mercury) 45%, #A9C6F0 100%);
	border-radius: var(--r-blob-c);
}
```

Tuning: `stdDeviation` sets how far apart two blobs still fuse (~1.5× the gap). The alpha row
`0 0 0 20 -9` sets how tight the resulting edge is — lower the multiplier for a softer, wetter
merge; raise it and the shapes go crisp, which is wrong here. Keep the pool to **4–7 children**;
the filter is a full-surface raster op and the cost is in the box's area, not the child count,
so keep the container tight around the cluster.

### 3.4 Oil slick

Iridescence. Sits *over* something else, blended, at low opacity — a film on the water.

```css
.oil-slick {
	background-image: conic-gradient(
		from 210deg at 50% 50%,
		var(--slick-lilac) 0deg,
		var(--slick-mint)  70deg,
		var(--slick-gold)  130deg,
		var(--slick-rose)  200deg,
		var(--slick-lilac) 285deg,
		var(--slick-mint)  360deg
	);
	filter: blur(var(--blur-deep)) saturate(140%);
	mix-blend-mode: screen;
	opacity: 0.35;
	pointer-events: none;
}
```

Never above `0.4` opacity, never unblurred, never more than one per screen. Iridescence is a
seasoning; the page is blue.

### 3.5 Caustics

Pool-bottom light. Overlapping soft radials at long, unequal animation periods so the pattern
never visibly repeats.

```css
.caustics {
	background-image:
		radial-gradient(60% 40% at 22% 28%, rgb(111 216 255 / 0.22), transparent 70%),
		radial-gradient(45% 55% at 74% 46%, rgb(61 123 255 / 0.20), transparent 72%),
		radial-gradient(70% 35% at 48% 78%, rgb(232 240 255 / 0.14), transparent 68%);
	filter: blur(40px);
	mix-blend-mode: screen;
	pointer-events: none;
}
```

### 3.6 Contour

The hairlines from the reference — the **only** lines permitted on this page, and every one of
them is a curve. Thin, low-alpha, drifting across everything.

```css
.contour {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Cg fill='none' stroke='%23E8F0FF' stroke-width='0.8' opacity='0.5'%3E%3Cpath d='M-20 118 C 120 40 240 190 380 120 S 560 30 620 96'/%3E%3Cpath d='M-20 210 C 90 300 210 150 330 226 S 520 300 620 214'/%3E%3Cpath d='M-20 322 C 140 250 260 380 400 306 S 540 240 620 330'/%3E%3Cellipse cx='300' cy='214' rx='196' ry='58' transform='rotate(-11 300 214)'/%3E%3Cellipse cx='352' cy='196' rx='128' ry='34' transform='rotate(-19 352 196)'/%3E%3C/g%3E%3C/svg%3E");
	background-size: cover;
	background-repeat: no-repeat;
	mix-blend-mode: screen;
	opacity: 0.6;
	pointer-events: none;
}
```

Rules: `stroke-width` between `0.6` and `1.2` at render scale — thicker and it stops being a
contour and starts being a border. Curves only; no `<line>`, no straight `L` commands, no
polygons. They cross the composition edge to edge and are clipped by the viewport, never
tucked neatly inside a box.

### 3.7 Grain

**Not optional.** Large soft gradients band into visible steps on 8-bit displays, and this
whole page is large soft gradients. A faint noise layer over the top dithers the ramps away.

```css
.grain {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='liquid-grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23liquid-grain)' opacity='0.55'/%3E%3C/svg%3E");
	background-size: 140px 140px;
	mix-blend-mode: overlay;
	opacity: 0.14;
	pointer-events: none;
}
```

Sits at the top of the z-ladder, over everything including type. `0.10–0.18` opacity; above
that it reads as a dirty screen rather than film.

### 3.8 The blur gotchas

Every one of these has cost someone an afternoon.

- **`backdrop-filter` needs a Backdrop Root, and ancestors destroy it.** Any ancestor with
  `filter`, `opacity < 1`, `mask`, or `mix-blend-mode` becomes the backdrop root, and the
  child's blur then samples *nothing*. If a glass panel renders as an empty tinted box, look
  up the tree for an animated `opacity` — that is almost always the cause. Animate a wrapper's
  transform instead, or move the opacity onto a sibling.
- **Ship `-webkit-backdrop-filter` alongside every `backdrop-filter`.** Always, both lines.
- **`filter: blur()` makes the element a containing block for `position: fixed` descendants.**
  On this page that mostly means: **do not use `position: fixed` at all.** Use an absolutely
  positioned full-height field element inside the site wrapper.
- **Blur bleeds past the box.** An element with `filter: blur(140px)` paints ~3× its stated
  radius outside its own bounds and will push out a horizontal scrollbar. Every blurred
  decorative layer lives inside a wrapper with `overflow: clip` (`clip`, not `hidden` — it
  doesn't create a scroll container).
- **Cap live backdrop layers at three on screen.** `backdrop-filter` re-rasterises its
  backdrop every frame. Field-level softness should come from pre-blurred giant gradients,
  which cost nothing to composite; reserve real backdrop blur for the few panels where you
  actually need the field to distort behind them.
- **`mix-blend-mode` blends against the nearest stacking context.** In the combined build every
  site shares one document, so the site root sets `isolation: isolate` — otherwise a `screen`
  layer here reaches through and lights up whatever is painted below it.
- **Never animate `filter` or `backdrop-filter` values.** Animate `opacity` and `transform` on
  an already-blurred layer. Animating the blur radius re-renders the filter each frame and
  drops the page to single-digit fps.

---

## 4. Type

One webfont, imported at the top of `style.css` (a head `<link>` will not survive the build):

```css
/* The ";" between weights is percent-encoded on purpose — build.js splits top-level
   statements on a raw ";" without string awareness and would cut this rule in half. */
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500%3B800&display=swap');

:root {
	--font-display: 'M PLUS Rounded 1c', 'Arial Rounded MT Bold', 'Hiragino Maru Gothic ProN', system-ui, sans-serif;
	--font-body:    'M PLUS Rounded 1c', system-ui, -apple-system, 'Helvetica Neue', sans-serif;
	--font-micro:   ui-monospace, 'SF Mono', 'Roboto Mono', Menlo, monospace;
}
```

The display face is chosen for one reason: **fully rounded terminals**. A letterform with a
flat cut stem is a straight edge, and §5 does not make an exception for type.

- **Display** — weight 800, always **lowercase**, tracking `-0.03em`, leading `0.85`, enormous.
  Lines are set tight enough that descenders and ascenders nearly touch, so the word reads as
  one poured mass. Adjacent lines may overlap by a few pixels.
- **The wet glow** is what makes display type belong to this page. Layered soft shadows, no
  hard offset, no stroke:
  ```css
  .display {
  	color: var(--bloom);
  	text-shadow:
  		0 0 2px  rgb(255 255 255 / 0.9),
  		0 0 18px rgb(160 200 255 / 0.75),
  		0 0 60px rgb(61 123 255 / 0.55),
  		0 6px 40px rgb(5 7 15 / 0.5);
  }
  ```
- **Body** — weight 500, leading `1.7`, measure capped at `56ch`, Mercury not pure white. Prose
  is the one calm thing on the page; it does not glow, it does not rotate, it does not tilt.
- **Micro** — 10–11px mono, uppercase, tracking `0.1em`, Aqua at `0.55` opacity, set in dense
  justified blocks the way the reference does. This is **texture**. If a micro block is filler
  rather than content it takes `aria-hidden="true"`; anything a reader actually needs stays at
  11px minimum and full contrast, in `--aqua` or `--mercury`.
- No italics. No all-caps display. No letterspaced headlines. No hard text shadows. No outlined
  or stroked type.

Scale, ratio ≈ 1.4, fluid:

```css
--t-micro: clamp(0.62rem, 0.6rem + 0.1vw,  0.7rem);
--t-xs:    clamp(0.78rem, 0.75rem + 0.15vw, 0.88rem);
--t-sm:    clamp(0.92rem, 0.88rem + 0.2vw,  1.05rem);
--t-md:    clamp(1.05rem, 1rem + 0.35vw,    1.3rem);
--t-lg:    clamp(1.6rem,  1.3rem + 1.2vw,   2.6rem);
--t-xl:    clamp(2.6rem,  1.9rem + 3.2vw,   5rem);
--t-2xl:   clamp(3.6rem,  2rem + 8vw,       10rem);
```

---

## 5. Shape, edge and asymmetry

**The law: no straight lines, no hard edges, no symmetry.** Everything below is how that
gets enforced.

### 5.1 A rounded rectangle is still a rectangle

This is the rule that gets missed. `border-radius: 44px` on a card softens four corners and
leaves four **straight runs** — top, bottom, left, right. It is a rectangle wearing a radius.
A radius floor does not fix this; only geometry does.

**The pair rule.** An edge is fully curved only when the two radii meeting on it sum to 100%
of that edge's length. So every visible surface uses the eight-value percentage form, with
all four pairs summing to 100:

```css
/* top:    58 + 42 = 100      right:  30 + 70 = 100
   bottom: 54 + 46 = 100      left:   36 + 64 = 100     → not one straight millimetre */
border-radius: 58% 42% 46% 54% / 36% 30% 70% 64%;
```

Split each pair **unevenly**. An even split (`50% 50% … / 50% 50% …`) is a perfect ellipse —
it satisfies "no straight lines" and violates "no symmetry" in the same stroke. The
lopsidedness is what makes it a droplet rather than a lozenge.

```css
--r-blob-a: 58% 42% 46% 54% / 36% 30% 70% 64%;   /* panels */
--r-blob-b: 44% 56% 62% 38% / 55% 45% 55% 45%;
--r-blob-c: 63% 37% 41% 59% / 38% 62% 38% 62%;
--r-pebble: 56% 44% 52% 48% / 62% 58% 42% 38%;   /* small controls */
```

**No two elements share a radius.** Vary the numbers per element the way a puddle varies —
that is the entire point.

**The padding consequence.** A blob's usable area is its inscribed rectangle, not its box.
Content inside one needs roughly 10–14% padding on every side or it will cross the curve.
That cost is real and it is the price of the rule: budget for it in the type scale rather
than shaving the radius back toward a rectangle.

**`clip-path` is not the answer.** It looks like the obvious tool and it ruins the page:
`clip-path` clips `box-shadow` too, and box-shadow is what draws the meniscus, the underside
and the glow. A clipped panel is a flat silhouette. Stay on `border-radius`.

### 5.2 Nothing is symmetrical

Symmetry is stillness, and this page is liquid. Concretely:

- **Nothing is centred.** No `margin: 0 auto`, no `text-align: center`, no centred column.
  Content sits left of the axis; the light sits right of it. Balance is by weight, never by
  mirroring.
- **Page margins are unequal** — the left inset runs roughly twice the right.
- **No two blocks share an edge.** Each is indented differently, a staircase rather than a
  column rule, and no block is the same width as the one above it.
- **Repeated elements are staggered.** Three chips in a row sit at three different vertical
  offsets and carry three different radii.
- **Even the light is off-axis and not round** — the bloom's width and height differ.

Two straight things survive, and only because they are unavoidable: the baseline a line of
text sits on, and the edge of the viewport. Everything you draw yourself curves.

### 5.3 Rims, edges, feathering

**Rims, not borders.** `border: 1px solid` is banned outright — it draws a hard, uniform,
unlit line around a wet object. A surface's edge is described by light instead:

```css
box-shadow: inset 0 1px 0 0 var(--rim);          /* lit top */
box-shadow: inset 0 -1px 0 0 rgb(5 7 15 / 0.35); /* shaded bottom */
```

Where a genuine outline is unavoidable, it is a gradient border via
`border-image: linear-gradient(…) 1` or a masked pseudo-element — bright where the light hits,
vanishing where it doesn't. Never uniform.

**Dividers are curves.** No `<hr>`, no `border-top`, no `1px` rule. A section break is a
contour path (§3.6), a falloff in the field's gradient, or nothing at all.

**Feather anything that gets clipped.** If a layer has to end, it fades out — it does not stop:

```css
-webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%);
        mask-image: linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%);
```

Images and media get the same treatment: a radial mask feather plus a blob radius, never a
rectangular crop.

**Hard stops are edges too.** A gradient stop that jumps from one colour to the next at a
single position draws a visible line. Every stop in every gradient on this page has a ramp.

---

## 6. Layout and composition

The page is **one continuous field**, not a stack of bands. There are no section boundaries —
content floats at different depths in the same body of water, and regions separate by the
field getting darker or the light getting further away.

**The z-ladder.** Composition is this order, bottom to top. It does not change.

```
0  field        the base gradient — abyss → deep → sapphire, full bleed
1  bloom        the light source (§3.2)
2  caustics     drifting pool light (§3.5)
3  oil slick    one iridescent film (§3.4)
4  mercury      the metaball cluster (§3.3)
5  contour      hairline curves (§3.6)
6  glass        panels and link chips (§3.1)
7  type         display and body
8  grain        over everything (§3.7)
```

- **Off-axis, never centred.** Content sits in a column pinned left of the axis with the
  bloom opposite it, and each block inside that column starts at a different indent (§5.2).
  Composition balances light against text — weight against weight, never left against right.
- **Overlap freely.** Blobs pass behind and in front of type. A glass panel's corner may sit
  over the edge of the mercury cluster. Because everything is transparent, overlap adds
  information rather than hiding it — this is the opposite of an opaque layout, where overlap
  is a mistake.
- **Full bleed, no gutters at the edge of the field.** The blurred layers extend well past the
  viewport on every side, inside a wrapper with `overflow-x: clip`.
- **Breathing room around type.** The field is busy; the text is not. Give every text block far
  more surrounding space than feels necessary — a minimum of `--s-5` above and below.

```css
--s-1: 0.5rem; --s-2: 1rem; --s-3: 1.75rem; --s-4: 3rem; --s-5: 5rem; --s-6: 8rem;
```

**Responsive.** On narrow viewports blur radii shrink by roughly a third (a 140px bloom on a
390px screen is just a white wash), the mercury cluster drops to 3–4 blobs, and the oil slick
is dropped entirely. Display type keeps its scale — it is allowed to run off the edges. Nothing
scrolls horizontally at 320px.

---

## 7. Motion

Everything drifts. There is no snap, no step, no bounce, no reveal. If an animation has a
beginning and an end that a viewer can perceive, it is wrong — motion here is tidal.

- **Slow and unequal.** Periods between 18s and 60s, `ease-in-out`, `infinite`, `alternate`.
  Give every animated layer a *different, non-multiple* period (23s, 31s, 47s) so the
  composition never visibly loops.
- **Blobs morph.** Animate `border-radius` between two organic sets plus a small
  `translate`/`scale`. This is the one property whose animation cost is acceptable.
- **The bloom breathes.** `opacity` `0.85 ↔ 1` and `scale` `1 ↔ 1.08` over ~30s.
- **Contours drift** across the composition on `transform: translate3d()` over 45–60s.
- **Hover makes things wetter**, never brighter-and-flatter: raise the fill from `--film-2` to
  `--film-3`, strengthen the rim, and scale `1.02` on
  `cubic-bezier(.22, 1.2, .36, 1)` over 420ms so it swells rather than pops.
- **Pointer bloom.** A soft radial highlight follows the cursor inside the field. Under the
  build contract the listener attaches to an element **inside `root`** — never `document` or
  `window`, since every site's JS runs in the combined page even while hidden:

  ```js
  (window.SITES = window.SITES || {})['liquid'] = function (root) {
  	var field = root.querySelector('.field');
  	if (!field) return;
  	field.addEventListener('pointermove', function (e) {
  		var r = field.getBoundingClientRect();
  		field.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
  		field.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  	});
  };
  ```

  The CSS reads `--mx` / `--my` in a radial-gradient position and defaults them to `50% 35%`
  so the page is complete without a pointer at all.
- No parallax, no scroll-jacking, no reveal-on-scroll, no typewriter effects, no cursor trails.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

Reduced motion must leave the page **beautiful, not broken** — every animated layer's static
state is its most composed frame, not frame zero.

---

## 8. What this is not

The failure mode here is rendering something adjacent and calling it liquid:

| Not this | Because |
|---|---|
| Corporate glassmorphism | 12px-radius rectangles with a flat 10% white fill and a 1px white border, on a photo. Straight edges, uniform rim, no light source. This is the single most likely wrong output. |
| Frutiger Aero | The daylit cousin — sunlit green-blue, photographic leaves, bubbles, glossy 3D icons, Segoe UI. Liquid is nocturnal, abstract and blue. |
| Vaporwave | Pink-teal, perspective grids, chrome lettering, Roman busts, irony. Liquid is sincere and has no horizon. |
| Aqua skeuomorphism | Candy-striped pinstripes, lozenge buttons with hard specular pills, grey chrome window frames. Right decade, wrong idea — that is glossy plastic, this is water. |
| Neumorphism | Soft, yes — but opaque, matte and monochrome-grey, lit by two shadows on a solid ground. Nothing is transparent. |
| Y2K kitsch | Sparkle GIFs, star cursors, Comic Sans, marquee tags. Nostalgia as a joke. This direction plays it straight. |

Also out: hard 1px borders, square or small-radius corners, flat opaque fills, grey drop
shadows, straight dividers, rectangular image crops, dark-on-light type, sharp hard-stop
gradients, emoji as decoration, and any light source other than the one.

---

## 9. Page application

`liquid/index.html` renders this brief, built to the sub-site authoring contract in the root
`CLAUDE.md` (self-contained folder, wrapper `#site-liquid`, JS as a `SITES['liquid']` registry
function).

**Structure**, bottom to top of the z-ladder:

- **Field.** Full-bleed `abyss → deep → sapphire` gradient, darkest at the bottom, inside a
  wrapper with `overflow-x: clip`. Carries the pointer-bloom radial at `--mx`/`--my`.
- **Bloom.** One, upper-right of centre, hanging past the top edge, at `--blur-bloom`.
  Breathing over ~30s.
- **Caustics + one oil slick**, both blended `screen`, low opacity, drifting on long periods.
- **Mercury cluster.** Five goo-fused blobs (§3.3) across the upper-middle, overlapping the
  headline, morphing on unequal periods.
- **Contours.** Two overlaid `.contour` layers at different scales and drift speeds, crossing
  edge to edge.
- **Hero.** `forrest almasi` at `--t-2xl`, lowercase, weight 800, leading `0.85`, with the wet
  glow. `software developer` beneath it in Mercury at `--t-sm`, tracking `0.14em`. A serial-
  number micro string sits top-left in mono Aqua, `aria-hidden`, the way the reference does.
- **Intro.** One `.wet-glass` panel on `--r-blob-a` — a genuine blob, padded ~12% so the
  copy clears the curve — holding *What's up?* and the one-line blurb in Mercury at
  `--t-md`. Local `--shade` wash behind the text. Indented off the hero, narrower than it.
- **Elsewhere.** Three pebble link chips (`--blur-film`) — GitHub `@malls`, Twitter
  `@forrestalmasi`, Email `_@forrestalmasi.com` — each on its own radius and its own
  vertical offset, so the row reads as three stones dropped rather than a segmented control.
  Hover swells them and thickens the film.
- **Footer.** A dense justified micro block in mono Aqua at `0.5` opacity, feathered out at the
  bottom with a mask gradient, contact line readable at full contrast at 11px.
- **Grain** over the entire page.

**Build-contract specifics for this direction** — these bite harder here than for a flatter
site:

- The site root sets `isolation: isolate` (written as `body { isolation: isolate }` in
  `liquid/style.css`; the build rewrites it onto `#site-liquid`) so `mix-blend-mode` layers
  cannot reach other sites in the combined page.
- **Every SVG `id` is prefixed `liquid-`** (`liquid-goo`, `liquid-grain`). All sites share one
  document in the built `index.html`, and `filter: url(#goo)` resolves against the whole
  document — an unprefixed id will silently bind to another site's filter.
- `@keyframes` names are prefixed `liquid-` for the same reason; the one `@import` sits at the
  very top of `style.css`, with its `;` percent-encoded (§4).
- The combined shell pins every wrapper to `height: 100%` with `overflow: hidden` on the
  document — **the built page does not scroll**. Liquid owns its own scroll container, so the
  field, the light and the grain hold still while only the content column moves.
- No `position: fixed` anywhere (§3.8). No `display` set on `html`/`body`.
- No commas inside functional pseudo-classes — write `#site-liquid a:hover` and
  `#site-liquid a:focus-visible` as separate selectors.

**The test.** At least three distinct blur rungs, at least four translucent layers, exactly one
primary light source, and — checked at every breakpoint — **not one straight line, not one
hard corner, and nothing centred anywhere on the page.**

The first two are mechanical enough to check by script rather than by eye: read every visible
surface's computed `border-radius`, expand the shorthand, and assert that each edge's two
radii sum to 100%. Anything that fails is a rectangle in disguise. Then assert no element's
computed `margin-left` equals its `margin-right`, and that no two blocks share a left edge.

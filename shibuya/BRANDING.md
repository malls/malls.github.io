# Shibuya

> Design direction: **Shibuya at night** — street level, Tokyo, some hour after the last
> Yamanote train. A near-black sky, wet asphalt, and every building face tiled floor to
> roof with independently lit signs, each one a different business shouting in its own
> colour. Not "neon city" as a mood — the specific optical fact of standing in the canyon,
> looking up — and straight down the street.

## 1. The direction

The street does not have a design system. An izakaya's red lantern hangs a metre from a
pharmacy's green cross, which hangs under a karaoke box's magenta fascia, and none of them
were told about the others. What holds it together is not agreement between the signs —
it is the night behind them, the stacking logic of the buildings, and the physics of gas
in a glass tube. The page works the same way: the ground is dark because it is *night*,
and everything legible on it is a light source.

Three things to hold onto, because getting them wrong produces something that merely looks
*dark-with-accents* rather than something that looks **Shibuya**:

1. **The dark is the canvas, not a theme.** Nothing here is "dark mode" — the ground is
   night air and it stays near black everywhere. Signs do not sit *on* the dark; they
   punch *through* it. A grey card with coloured text is a dashboard, not a street.
2. **Every sign is somebody else's sign.** Adjacent signs never share a colour, a type
   treatment, or an alignment — each is an independent business. Coherence comes from the
   *street* — the dark, the stacking, the glow physics — never from the signs agreeing
   with each other. This is what separates dense from messy.
3. **Vertical is the default reading direction.** Japanese signage runs top to bottom
   down the building edge; the tall thin stack of projecting signs (袖看板) is the core
   compositional unit. Horizontal text is the exception — a marquee, a ticker — not the
   rule.

**Voice.** Short, declarative, a little wry. Signage copy, not marketing copy — a sign
says 営業中 and nothing else. Never exclamatory; the light is already doing the shouting.

---

## 2. Palette

Grounds are named for what the surface is. Neons are named for the businesses whose signs
actually carry these colours. Use the names in code and in conversation.

### Grounds

Never pure black — night air over a city is blue. Three rungs, dark to less dark.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--night` | Night Air | `#0A0A12` | The sky and the street. Default ground. |
| `--asphalt` | Wet Asphalt | `#15151F` | Mid ground — street level, faintly reflective. |
| `--board` | Signboard | `#1D1D2B` | The lightest surface: a sign's unlit backing panel. |

### Neons

The light-emitting seven. A composition uses most of them — that is the point — but never
two of the same hue side by side (§3.5).

| Token | Name | Hex | Role |
|---|---|---|---|
| `--izakaya` | Izakaya Lantern | `#FF5C33` | Red-orange. Chōchin lantern, yakitori smoke. |
| `--kusuri` | Pharmacy Green | `#2EE58A` | The green cross; discount-drugstore fascia. |
| `--karaoke` | Karaoke Magenta | `#FF3D9E` | Karaoke-box pink. Gets the one hue-cycling sign (§8). |
| `--konbini` | Konbini Cyan | `#35D6FF` | Convenience-store cool. Open all night. |
| `--densha` | Signal Blue | `#3D7BFF` | Transit and vending-machine blue. **The one weak neon** — see the rule. |
| `--nama` | Beer Yellow | `#FFC933` | 生ビール and taxi lamps. Highest-luminance neon. |
| `--paper` | Paper Lantern | `#F5F1E6` | Warm off-white. Prose, and washi surfaces. |

```css
:root {
	--night:   #0A0A12;
	--asphalt: #15151F;
	--board:   #1D1D2B;

	--izakaya: #FF5C33;
	--kusuri:  #2EE58A;
	--karaoke: #FF3D9E;
	--konbini: #35D6FF;
	--densha:  #3D7BFF;
	--nama:    #FFC933;
	--paper:   #F5F1E6;

	/* tube — the white-hot core of a lit neon tube. Real neon reads near-white at the
	   glass and coloured in the halo; every glow recipe in §3.2 is built on this. */
	--tube: rgb(255 255 255 / 0.92);

	/* films — the little light the dark is allowed to hold */
	--film-1: rgb(255 255 255 / 0.04);   /* wall texture, mounting hardware */
	--film-2: rgb(255 255 255 / 0.08);   /* the lit top edge of a board */
	--wet:    rgb(255 255 255 / 0.06);   /* asphalt reflection streaks */
}
```

### Contrast — the one hard rule

**Type is either a light or on a light — never a colour on a colour.**

Text on this page is one of exactly three things: (a) a neon colour on a night ground —
light-emitting type, gets a glow; (b) Night ink on a solid neon panel — surface-carried
type, the backlit konbini fascia; or (c) Paper on anything dark. Measured against all
three grounds (WCAG 2.1, computed):

| Colour | vs Night `#0A0A12` | vs Asphalt `#15151F` | vs Board `#1D1D2B` |
|---|---|---|---|
| Paper Lantern `#F5F1E6` | **17.5** ✓ | **16.1** ✓ | **14.7** ✓ |
| Beer Yellow `#FFC933` | **12.8** ✓ | **11.8** ✓ | **10.8** ✓ |
| Pharmacy Green `#2EE58A` | **11.9** ✓ | **11.0** ✓ | **10.0** ✓ |
| Konbini Cyan `#35D6FF` | **11.5** ✓ | **10.5** ✓ | **9.7** ✓ |
| Izakaya Lantern `#FF5C33` | **6.4** ✓ | **5.9** ✓ | **5.4** ✓ |
| Karaoke Magenta `#FF3D9E` | **6.0** ✓ | **5.5** ✓ | **5.1** ✓ |
| Signal Blue `#3D7BFF` | **5.1** ✓ | **4.7** ✓ | 4.3 — large only |

Contrast is symmetric, so the first column doubles as the table for Night ink on a lit
panel: dark type on a solid neon ground is legal on every neon, 5.1 to 12.8. That is the
backlit-panel mode, and it is the calmest way to carry a paragraph.

Two consequences, non-negotiable:

- **Never neon on neon.** Karaoke Magenta on Konbini Cyan is 1.9:1 — that is a moiré,
  not a message. Adjacent signs differ in hue precisely so their *grounds* stay dark
  between them.
- **Signal Blue never carries small text on Board.** Display sizes only, or move it to
  Night. It earns its place as the one neon that reads deep instead of loud.

**The glow caveat.** `text-shadow` glow adds no measurable contrast — the measured pair
is the letterform colour against the ground, full stop. A halo makes type *feel*
brighter while the letterform stays exactly as legible or illegible as it was. Check
every pairing with the glow disabled; if it fails bare, it fails lit.

---

## 3. The signage system

The core of this brief. Memphis fills surfaces; liquid wets them; Shibuya **mounts
signs**. Every element on the page is a sign of some species — a tube-lit board, a
backlit panel, a lantern — mounted on the dark, throwing its light on the wall behind
it. Every recipe below is a complete utility class.

### 3.1 The sign stack

The compositional unit: a tall thin column of stacked sign boards running down a
"building edge", read top to bottom.

```css
.stack {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.5rem;              /* thin — the dark reads through as mortar, not as field */
	width: max-content;
}

.sign {
	writing-mode: vertical-rl;
	text-orientation: mixed;   /* Latin rotates 90° with the flow, like romaji on a real sign */
	line-height: 1.9;          /* in vertical flow this is the column's horizontal gauge */
	padding-block: 0.5em;      /* logical: pads the visual left/right of the board */
	padding-inline: 0.9em;     /* logical: pads the visual top/bottom — the reading axis */
	letter-spacing: 0.12em;
}

.sign-upright {
	text-orientation: upright; /* CJK-only or initialism signs: glyphs stand, one per row */
	letter-spacing: 0.35em;
}
```

The gotchas, each of which has produced a broken sign:

- **`text-orientation` does nothing without `writing-mode`.** It is a modifier on
  vertical flow, not a way to get vertical flow. No `writing-mode: vertical-rl`, no
  effect, silently.
- **Logical properties flip.** In `vertical-rl` the *inline* axis is vertical:
  `inline-size` is the sign's height, `padding-inline` pads top and bottom,
  `margin-block` moves it sideways. Pad with logical properties or the box breaks the
  moment anyone adjusts it thinking in horizontal terms.
- **Vertical text still needs `line-height`.** It does not become meaningless — it
  becomes the gauge between vertical columns, i.e. the sign's width. A multi-column
  vertical sign with default leading reads as a picket fence.
- **`mixed` is the default choice, `upright` the exception.** Real edge signs rotate
  their romaji; `upright` Latin (one letter per row) is for short init­ialisms — "BAR",
  "CD" — and nothing longer.

### 3.2 Neon tube glow

The recipe that makes or breaks the direction. Real neon is near-white at the tube;
the colour lives in the halo the gas throws on the air. So the letterform is a
white-hot core tinted toward the hue, and **the hue goes in the shadows, not the
fill**. Radii are in `em` so one class serves every size — glow scales with the tube.

```css
.neon {
	text-shadow:
		0 0 0.02em var(--tube),      /* the glass */
		0 0 0.14em var(--hue),       /* the gas */
		0 0 0.40em var(--hue),       /* the halo */
		0 0 1.10em var(--halo);      /* the air */
}

.neon-izakaya { color: #FFEFE9; --hue: #FF5C33; --halo: rgb(255 92 51 / 0.40); }
.neon-kusuri  { color: #EAFFF4; --hue: #2EE58A; --halo: rgb(46 229 138 / 0.40); }
.neon-karaoke { color: #FFEDF6; --hue: #FF3D9E; --halo: rgb(255 61 158 / 0.40); }
.neon-konbini { color: #EBFAFF; --hue: #35D6FF; --halo: rgb(53 214 255 / 0.40); }
.neon-densha  { color: #EDF3FF; --hue: #3D7BFF; --halo: rgb(61 123 255 / 0.45); }
.neon-nama    { color: #FFF9E8; --hue: #FFC933; --halo: rgb(255 201 51 / 0.40); }
```

Every core measures above 17:1 on Night (computed — worst is `#FFEDF6` at 17.6), which
is why tube-glow type is legible in *any* hue, including Signal Blue: the letterform is
the tube, and the tube is white. The contrast table in §2 governs type set flat in a
neon hex — labels, links, anything without the tube treatment.

The box variant, for tube-outlined boards — a bent glass tube running the perimeter:

```css
.tube-box {
	border: 2px solid var(--hue);
	border-radius: 6px;                              /* the radius of bent glass — the max on this page */
	box-shadow:
		inset 0 0 0 1px rgb(255 255 255 / 0.55),     /* white-hot inner edge of the tube */
		inset 0 0 0.8em var(--halo),                 /* gas light falling inward */
		0 0 0.5em var(--hue),                        /* halo */
		0 0 2em var(--halo);                         /* air */
}
```

Set `--hue`/`--halo` with the same `.neon-*` classes, or directly on the element.

### 3.3 Sign-board surfaces

Three species. Adjacent signs in a stack are never the same species (§3.5).

**Tube-outline sign** — dark board, glowing border, glowing type. The workhorse.

```css
.board-tube {
	background-color: var(--board);
	background-image: linear-gradient(to bottom, var(--film-2) 0%, rgb(255 255 255 / 0) 45%);
	border: 2px solid var(--hue);
	border-radius: 6px;
	box-shadow:
		0 0 0 2px var(--night),                       /* the mounting gap — dark air between sign and wall */
		inset 0 0 0 1px rgb(255 255 255 / 0.55),
		0 0 0.5em var(--halo),
		0 0 70px 12px var(--wash);                    /* the light it throws on the wall behind it */
}
```

**Backlit panel** — solid neon ground, Night ink, the konbini fascia. Where paragraphs
live. No tube, no glowing type; the whole surface is the lamp.

```css
.board-panel {
	background-color: var(--nama);
	background-image: linear-gradient(to bottom, rgb(255 255 255 / 0.18) 0%, rgb(255 255 255 / 0) 40%);
	color: var(--night);
	border-radius: 2px;
	box-shadow:
		0 0 0 2px var(--night),
		0 0 24px rgb(255 201 51 / 0.45),
		0 0 90px 16px rgb(255 201 51 / 0.14);
}
```

**Paper lantern** — Paper ground, warm glow, and the one soft rounded element this
direction allows. Small: a footer, a date, a 営業中.

```css
.lantern {
	background-color: var(--paper);
	background-image: linear-gradient(to bottom, rgb(255 255 255 / 0.5) 0%, rgb(255 160 80 / 0.18) 100%);
	color: var(--night);
	border-radius: 999px;
	padding: 0.4em 1.1em;
	box-shadow:
		0 0 18px rgb(255 180 90 / 0.5),
		0 0 60px 8px rgb(255 160 80 / 0.16);
}
```

The `--wash` in `.board-tube` is per-sign — a low-alpha version of the sign's hue,
e.g. `--wash: rgb(53 214 255 / 0.12)` on a Konbini board. It matters more than it
looks like it should: the wall wash is what makes the dark read as *air* holding light,
not vacuum. A sign without one is a sticker.

### 3.4 The street glow wash

Light pollution: huge, pre-blurred, low-alpha radials rising from behind the sign
stacks onto Night. At most three; this is ambience, not a light-source competition.

```css
.street-glow {
	position: absolute;
	inset: 0;
	background-image:
		radial-gradient(42% 30% at 16% 90%, rgb(255 61 158 / 0.10), transparent 70%),
		radial-gradient(50% 34% at 82% 94%, rgb(53 214 255 / 0.08), transparent 72%),
		radial-gradient(34% 26% at 52% 82%, rgb(255 201 51 / 0.07), transparent 68%);
	pointer-events: none;
}
```

Gradients here are pre-blurred by their own falloff and cost nothing to composite.
This layer never blends (`mix-blend-mode` stays off it); it is painted air, not an
effect.

### 3.5 Using signs

- **Adjacent signs never share a hue.** Not in a stack, not across a gap. Two magenta
  signs touching means one business bought two signs, and that is not this street.
- **A stack mixes species** — three to five signs, at least three of the species in
  §3.3, sizes unequal.
- **At most one animated sign per stack** (§8). A stack where everything moves is a
  slot machine.
- **The dark stays between things.** Gaps are thin (`--s-1`–`--s-2`); the night reads
  through as mortar lines, never as empty field.

---

## 4. Type

The signs are Japanese, so the stack must be. Default to the system JP gothics — every
target OS ships one, and zero download beats any webfont:

```css
:root {
	--font-sign:  'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', Meiryo, system-ui, sans-serif;
	--font-body:  'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', Meiryo, system-ui, sans-serif;
	--font-micro: ui-monospace, 'SF Mono', 'Roboto Mono', Menlo, monospace;
}
```

If the system stack genuinely is not enough, one import maximum, at the very top of
`style.css` — and know that Noto Sans JP is a multi-megabyte family:

```css
/* The ";" between weights is percent-encoded on purpose — build.js splits top-level
   statements on a raw ";" without string awareness and would cut this rule in half. */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500%3B900&display=swap');
```

- **Sign type** — weight 800–900, wide tracking on vertical runs (`0.12em`–`0.35em`),
  set in the tube-glow recipe or as panel ink. Vertical display type sizes against the
  **viewport height**, because that is its long axis:
  ```css
  --t-sign: clamp(1.6rem, 9vh, 4.5rem);
  ```
- **Body** — weight 500, leading `1.7`, measure capped at `56ch`, Paper on Board or
  Night ink on a backlit panel. Prose is the one calm surface on the street; it does
  not glow.
- **Micro** — 10–11px mono, uppercase, tracking `0.1em`, for tickers and sign labels
  (OPEN · 24H · B1F). Texture when decorative, `aria-hidden="true"` when it is.
- **Decorative Japanese takes `aria-hidden="true"` and `lang="ja"`.** 渋谷, 居酒屋,
  カラオケ, 営業中 are set dressing — real signage vocabulary in real gothic faces.
  Anything a reader actually needs is in the content language, at full contrast, and
  never only vertical.

Scale, ratio ≈ 1.35, fluid:

```css
--t-micro: clamp(0.62rem, 0.6rem + 0.1vw,  0.7rem);
--t-xs:    clamp(0.78rem, 0.75rem + 0.15vw, 0.88rem);
--t-sm:    clamp(0.92rem, 0.88rem + 0.2vw,  1.05rem);
--t-md:    clamp(1.05rem, 1rem + 0.35vw,    1.3rem);
--t-lg:    clamp(1.55rem, 1.3rem + 1.1vw,   2.4rem);
--t-xl:    clamp(2.4rem,  1.8rem + 3vw,     4.6rem);
```

Banned: italics (neon tubes do not slant); ultra-light weights (a thin tube reads
fine, thin *type* on dark halates away); outlined type without the glow (an unlit sign
is a closed shop); letterspaced lowercase Latin in vertical flow (rotated and tracked
is unreadable, pick one).

---

## 5. Shape, surface and glow hardware

This direction is **rectilinear** — the anti-liquid. Signs are boards: hard rectangles,
cut corners, bolted on.

**Radius** runs from zero to the bend of a glass tube, and no further:

```css
--r-board: 2px;    /* panel corners — sheared, not soft */
--r-tube:  6px;    /* tube outlines — the radius of bent glass. The maximum. */
--r-full:  999px;  /* the lantern, and only the lantern */
```

A `border-radius: 12px` card is the most out-of-vocabulary thing that can appear on
this page. Softness here comes from light falloff, never from geometry.

**Mounting.** Every sign shows its hardware:

- The **mounting gap** — `box-shadow: 0 0 0 2px var(--night)` — a ring of night
  between the sign and whatever is behind it. Signs hang; they are not printed on.
- **Bracket marks**, sparingly: a 2px `--film-1` rule extending from a sign's edge
  toward its stack's spine. One or two per stack, not on every sign.

**Glow is the only shadow.** There are no grey drop shadows and no hard offset blocks
anywhere — a sign's "shadow" is the coloured light it throws (`--halo`, `--wash`).
An element that needs separating from the dark gets brighter, not shadowed.

**Layering order of a lit sign**, inside out: board fill → top-lit gradient → tube
(border + inset white edge) → halo → wall wash. Skip the inset white edge and the
tube reads as a coloured border on a widget; skip the wash and the sign floats in
vacuum. The full stack is what §3.3's recipes encode.

---

## 6. Layout and composition

The page is a street, not a document. Composition is **the canyon — two walls of
scenery converging on the centre (§7) — behind 2–4 near-layer readable sign-stack
columns of unequal width plus one horizontal marquee band** — building edges around an
intersection, seen from the middle of the road.

- **Asymmetric always.** Stacks reach different heights; no two stacks align to the
  same top edge; the marquee crosses at neither the top nor the middle.
- **No dead space.** The dark is *between* things — thin mortar lines of night — never
  wide empty fields around them. A composition with a big calm margin is a gallery,
  not a street.
- **Except the prose.** The actual readable content gets one wider, calmer panel (the
  backlit species). The street is dense; the letter home is legible.
- **Scroll ownership.** The combined build pins `html, body { height: 100%; overflow:
  hidden }` — the built page does not scroll, and a dense vertical direction *will*
  overflow. Shibuya owns its scroll:

  ```css
  .street {
  	height: 100%;
  	overflow-y: auto;
  	overflow-x: clip;
  }
  ```

  The street-glow wash *and the canyon scene* (§7) live on non-scrolling sibling
  layers behind `.street` — canyon behind, wash above it. The wash may instead ride
  `position: sticky` inside the scroll container; the canyon may not (§7.3) — and
  neither is ever **`position: fixed`** (§10).

Spacing scale — signs use the small end, the prose panel the large:

```css
--s-1: 0.5rem; --s-2: 1rem; --s-3: 1.5rem; --s-4: 2.5rem; --s-5: 4rem;
```

**Responsive.** On narrow viewports stacks reduce to one or two columns, glow radii
shrink (they are in `em`; drop the type scale and they follow), and the marquee stays.
Nothing scrolls horizontally at 320px — a stack that cannot fit gets narrower, not
clipped.

---

## 7. Depth — the canyon

The street has an *ahead*. Left and right, two building faces packed with signage run
away from you and converge on a single point, dead centre of the viewport, where the
light of every far sign smears into haze. This section is the geometry of that shot,
and the three distances it is drawn at.

### 7.1 The scene — one point, two walls

Two walls, one point. The request for this construction says "two-point perspective";
the street disagrees. Two vanishing points is what you get standing on a *corner*,
watching a building's edge with each face receding its own way. This page stands in
the middle of the road and looks straight down it — a **one-point** construction:
both walls converge on the *same* central vanishing point. The "two" the eye counts
are walls, not points.

One parent owns `perspective`, with `perspective-origin` at viewport centre. Both
walls are its direct children, so they share that single vanishing point — the shared
parent is what makes the convergence geometrically true. Two separate `perspective`
values would mean two vanishing points: the corner shot, banned. Each wall is a plane
hinged on its own viewport edge and rotated toward the other.

```css
.canyon {
	position: absolute;
	inset: 0;
	overflow: clip;                /* rotated walls overhang the box — clip, never scroll */
	perspective: 900px;            /* tune 700–1200px: shorter = deeper street */
	perspective-origin: 50% 50%;   /* THE vanishing point: dead centre of the viewport */
	pointer-events: none;          /* scenery takes no clicks */
}

.canyon-wall {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 62%;                    /* wall run before rotation; overlap at centre is fine — it converges */
}
.canyon-wall-left  { left: 0;  transform-origin: left center;  transform: rotateY(58deg); }
.canyon-wall-right { right: 0; transform-origin: right center; transform: rotateY(-58deg); }

.canyon-end {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 38vmin;
	height: 30vmin;
	transform: translate(-50%, -50%);
	background-image: radial-gradient(closest-side, rgb(150 160 210 / 0.10), transparent 70%);
}
```

- **`transform-origin` on the outer edge** pins the near end of each wall to the
  viewport edge; the far end recedes toward the centre on its own. No positioning
  arithmetic — the hinge does the work.
- **No `transform-style: preserve-3d`, anywhere.** The 3D tree is exactly one level
  deep — perspective parent → rotated plane — and it stops there. Everything on a
  wall is flat paint *on* the plane; perspective foreshortens it automatically along
  the wall's run. This is a decision, not an omission: §7.3 lists the properties
  that silently flatten deeper trees.
- **`.canyon-end` is the terminus.** A small low-alpha radial haze centred on the
  perspective-origin — the mixed light of every far sign, which averages out to a
  desaturated blue-violet. The street ends in sign-haze, never in sky.

### 7.2 The three depth layers

Three named distances carry the falloff. Near has no class — it is the unfiltered,
unrotated default, and that is the point: the layer you read is the layer nothing has
been done to.

```css
/* near — the kerb. Where you stand; everything readable. No class: near is the
   unfiltered, unrotated default. */

.depth-mid {  /* across the street — the walls' main run */
	filter: brightness(0.78) saturate(0.85);
}

.depth-far {  /* down the block — the last stretch before the haze */
	filter: brightness(0.55) saturate(0.7) blur(1.5px);
}
```

| Layer | Where | Scale | Light | Blur | Density |
|---|---|---|---|---|---|
| **near** — the kerb | flat, in `.street` | 1 — real size | full §3.2 glow | none | sparse — the few signs you stand under |
| **mid** — across the street | on the walls, nearer half | foreshortened by the geometry | dimmed ~0.78, desaturated | none | the bulk of the signage |
| **far** — down the block | on the walls, far half, plus faked-scale flats | geometry, plus `scale()` for extra distance | dimmed ~0.55 | 1.5px | densest — micro signs packed toward the haze |

- **Glow attenuation is free.** `filter: brightness()` dims the letterform *and* its
  `text-shadow` halo together — which is exactly what air does to a distant sign. No
  per-layer re-derivation of the §3.2 recipes: far neon is the same recipe seen
  through more air. Far signs may also swap the full recipe for a cheap
  approximation — a glowing dash, a lit rectangle — because at that distance a sign
  is a light, not a message.
- **Density inverts with distance.** Near is sparse, far is packed: a real street
  shows more signs per degree the further down it you look. Far texture can be tiny
  `--film`/hue marks, not full boards.
- **Real 3D vs faked scale — the decision.** The walls are real 3D — `rotateY` under
  the shared perspective is what buys true convergence — and depth *along* a wall is
  free: foreshortening from the geometry plus the atmospheric filters above.
  Anything deeper than the walls — extra distant blocks, the haze — is **faked with
  `scale()` on flat elements**, never `translateZ` chains. The reason: a
  `preserve-3d` chain is flattened by `overflow` other than `visible`, by `filter`,
  by `opacity` below 1, by `clip-path`, `mask`, `mix-blend-mode`, and
  `isolation: isolate` — and this brief load-bearingly uses three of those
  (`.street` scrolls, depth needs `filter`, §10 allows `body { isolation: isolate }`).
  A one-level 3D tree cannot be flattened by accident; a deep one will be.

### 7.3 Rules and gotchas

1. **Depth is scenery. Readable stays near.** Everything on a wall or behind a depth
   filter is `aria-hidden="true"` set dressing, exempt from §2 only because nobody
   is asked to read it — the brightness filter will drag it below 4.5:1, and that is
   the point: far light is dim. Anything a reader needs lives on the near layer,
   unrotated and unfiltered, measured against §2 with glows off. A readable sign on
   a rotated wall is a failure, not a flourish. One more reason the readable layer
   is flat: browsers rasterise 3D-transformed text, so wall type is slightly soft
   even before the blur.
2. **Bare tube type still needs night behind it.** Near-layer `.neon` type set
   directly on the ground now has scenery behind it. The depth dimming keeps the
   walls near Board luminance, but check: if a wall's glow creeps behind readable
   bare type, dim the wall or mount the type on a board — never move the reading to
   the wall.
3. **The scene does not scroll and does not move.** It is a non-scrolling sibling
   *behind* `.street`, exactly like the §3.4 wash — order, back to front: night →
   canyon → street-glow → `.street`. Put the scene inside the scroll container and
   the buildings scroll past you; you are standing still — the street scrolls its
   signs, not its architecture. The §8 bans stand: no parallax, no scroll-driven
   camera, no dolly. A static scene is reduced-motion-safe by construction, and the
   blur+rotate rasterisation is paid once.
4. **Animated signs stay near.** Flicker, buzz, chase and the hue cycle (§8) never
   sit on a depth-filtered layer — animating inside a filtered, 3D-transformed
   subtree re-rasterises the whole plane every frame.
5. **The flattening list.** `preserve-3d` is silently defeated by `overflow` other
   than `visible`, `filter`, `opacity < 1`, `clip-path`, `mask`, `mix-blend-mode`,
   `isolation: isolate`, and `contain: paint`. Resolution: this system never needs
   `preserve-3d`, so §10's `body { isolation: isolate }` and the walls coexist —
   isolation sits on the site root, the perspective is established *inside* it on
   `.canyon`, and flattening only bites between a `preserve-3d` parent and its
   grandchildren, which this construction does not have. Corollary: never put a
   depth `filter` on `.canyon` itself — a filter on the perspective parent
   rasterises the whole scene through one filter and kills the per-layer falloff.
6. **`overflow: clip` on `.canyon`.** A rotated plane's bounding box overhangs the
   viewport; clip it at the scene, or the 320px no-horizontal-scroll test fails.
7. **Responsive.** Below ~700px the canyon simplifies: the walls narrow their run
   and/or the far band collapses into the terminal haze. The vanishing point stays
   centred, and the scene never causes horizontal scroll — the clip guarantees it.

---

## 8. Motion

Electric, not organic — the anti-liquid again. Everything here is on/off, PWM, mains
hum. Nothing eases, nothing drifts, nothing breathes.

**Flicker** — one dying tube per page, maximum. Real flicker is aperiodic, so the
percentages are irregular and the holds unequal. Everything else is steady: a street
of flickering signs is a horror film, not Shibuya.

```css
@keyframes shibuya-flicker {
	0%   { opacity: 1; }
	7%   { opacity: 1; }
	8%   { opacity: 0.55; }
	9%   { opacity: 1; }
	13%  { opacity: 0.62; }
	14%  { opacity: 1; }
	41%  { opacity: 1; }
	42%  { opacity: 0.55; }
	45%  { opacity: 1; }
	78%  { opacity: 1; }
	79%  { opacity: 0.7; }
	80%  { opacity: 1; }
	100% { opacity: 1; }
}
.sign-dying { animation: shibuya-flicker 7.3s steps(1, end) infinite; }
```

Photosensitivity is a hard constraint, not a preference: the opacity floor stays at
`0.55` (the sign dims, it never blacks out) and the dips average well under three per
second — count them per cycle before shipping.

**Buzz** — sub-pixel jitter on at most one element. Barely there:

```css
@keyframes shibuya-buzz {
	0%   { transform: translateX(0); }
	50%  { transform: translateX(0.4px); }
	100% { transform: translateX(0); }
}
.sign-buzz { animation: shibuya-buzz 0.09s steps(2, end) infinite; }
```

**Chase lights** — bulbs stepping around a border. Shifting a repeating gradient by
exactly one period loops seamlessly; `steps(8)` makes it bulbs instead of a smear:

```css
.sign-chase {
	background-image:
		repeating-linear-gradient(90deg, var(--nama) 0 8px, transparent 8px 16px),
		repeating-linear-gradient(90deg, var(--nama) 0 8px, transparent 8px 16px),
		repeating-linear-gradient(0deg,  var(--nama) 0 8px, transparent 8px 16px),
		repeating-linear-gradient(0deg,  var(--nama) 0 8px, transparent 8px 16px);
	background-size: 100% 3px, 100% 3px, 3px 100%, 3px 100%;
	background-position: 0 0, 0 100%, 0 0, 100% 0;
	background-repeat: no-repeat;
	animation: shibuya-chase 1.4s steps(8) infinite;
}
@keyframes shibuya-chase {
	to { background-position: 16px 0, -16px 100%, 0 -16px, 100% 16px; }
}
```

**Marquee** — one horizontal ticker band. Content duplicated once inside the track so
`-50%` lands on an identical frame:

```css
.marquee { overflow: clip; white-space: nowrap; }
.marquee-track {
	display: inline-flex;
	animation: shibuya-marquee 21s linear infinite;
}
@keyframes shibuya-marquee {
	to { transform: translateX(-50%); }
}
```

**Hue cycle** — exactly one karaoke sign, slow: `animation: shibuya-hue 43s linear
infinite;` with `@keyframes shibuya-hue { to { filter: hue-rotate(360deg); } }`. One
small sign only — `filter` animation re-rasterises every frame, and this is the single
place that cost is paid.

**Periods are unequal** — 7.3s, 0.09s, 1.4s, 21s, 43s — non-multiples, so nothing on
the street ever beats in sync.

**Hover** — signs light *up*, as if you stepped closer: raise `--halo` alpha and widen
nothing. `transition: text-shadow 180ms steps(2, end)` — light switches, it does not
fade.

```css
.sign-link:hover { --halo: rgb(255 201 51 / 0.7); }
.sign-link:focus-visible { --halo: rgb(255 201 51 / 0.7); }
```

**Reduced motion.** The generic block, plus the shibuya rule: a stopped sign is
**steady-lit**, never dark. Flicker, buzz, chase and marquee halt on their most
composed frame — the shop stays open, the electricity just behaves.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
	.sign-dying { animation: none; opacity: 1; }
	.sign-buzz { animation: none; }
	.marquee-track { animation: none; }
}
```

No parallax, no scroll-jacking, no reveal-on-scroll, no glitch effects, no cursor
trails.

---

## 9. What this is not

The failure mode is rendering something adjacent and calling it Shibuya:

| Not this | Because |
|---|---|
| Cyberpunk / Blade Runner | Rain-soaked dystopia, holograms, teal-orange grading, decay as aesthetic. Shibuya at night is *cheerful commerce* — the signs sell beer and karaoke, not existential dread. No smog gradients, no glitch. |
| Vaporwave | Pink-teal sunsets, perspective grids, Roman busts, irony. This is a real place photographed straight, not a mood about a fake one. |
| Synthwave / outrun | Horizon grids, chrome script, a sun with scanlines. Synthwave's vanishing point sits on an open horizon line under a chrome sun, on a glowing grid; ours is buried in sign-haze — the buildings converge, ground and sky never meet, and nothing here is a grid. |
| Generic neon UI / gamer RGB | A dark dashboard with one accent glow and rounded cards. Shibuya has seven competing light sources and zero soft chrome. |
| Tokyo-kitsch orientalism | Torii gates, cherry blossoms, faux-brush "wonton" Latin type. The Japanese here is real signage vocabulary in real gothic faces, or it is absent. |

Also out: pure `#000` ground, coloured type on coloured grounds, uniform sign sizes,
symmetric layouts, glassmorphism blur panels, grey drop shadows, gradients as
decoration — light glows, surfaces do not. And now that the street has depth: no Star
Wars crawl (`rotateX` prose receding to a point), no tunnel or vortex fly-throughs,
no scroll-driven camera moves, and no readable text on rotated planes.

---

## 10. Page application

`shibuya/index.html` renders this brief, built to the sub-site authoring contract in
the root `CLAUDE.md` (self-contained folder, wrapper `#site-shibuya`, JS as a
`SITES['shibuya']` registry function).

**Structure**, back to front:

- **Night.** Full-bleed `--night` ground. The bottom of everything.
- **Canyon scene (§7).** `aria-hidden` scenery on a non-scrolling layer: two walls
  carrying the mid and far depth bands of decorative signage, `.canyon-end` haze at
  the centre.
- **Street-glow wash (§3.4).** Its own non-scrolling layer, above the canyon.
- **The street — the near layer.** The scrolling `.street` container (§6) over all of
  it — the built shell does not scroll, so shibuya scrolls itself. Every item below
  rides in it: flat, unfiltered, near.
- **Hero stack.** The tallest column: `forrest almasi` running vertically in
  `.neon-karaoke` tube glow at `--t-sign`, with decorative signs above and below —
  渋谷 upright in `.neon-konbini`, a small 営業中 lantern — all decorative JP marked
  `aria-hidden="true" lang="ja"`.
- **Marquee band.** `software developer` on the ticker (§8), micro mono, crossing the
  street off-centre.
- **The letter home.** One Beer Yellow `.board-panel` holding *What's up?* and the
  blurb in Night ink at `--t-md` — the calm readable panel, 12.8:1 without a single
  glow.
- **Three link signs.** GitHub `@malls`, Twitter `@forrestalmasi`, Email
  `_@forrestalmasi.com` — three different species in three different hues at three
  different vertical offsets: a `.board-tube` in Pharmacy Green, a small backlit
  panel in Konbini Cyan, a tube-box in Izakaya Lantern. Hover lights each one up.
- **One dying sign.** A single decorative `.sign-dying` somewhere mid-street. One.
- **Footer.** A small paper lantern with the contact line, Night ink, full contrast.

**Build-contract specifics for this direction:**

- **Every `id`, `@keyframes` name, and custom font-family is prefixed `shibuya-`**
  (`shibuya-flicker`, `shibuya-marquee`, `shibuya-chase`, `shibuya-buzz`,
  `shibuya-hue`). All sites share one document in the built page; an unprefixed name
  silently binds to another site's.
- The one optional `@import` sits at the very top of `style.css`, `;` encoded as
  `%3B` (§4). Only `@import`/`@media`/`@supports`/`@keyframes`/`@font-face` at-rules.
- CSS is written standalone — the build rewrites `html`/`body`/`:root` to
  `#site-shibuya` and prefixes everything else. Never set `display` on `html`/`body`;
  no literal `</style>` in CSS or `</script>` in JS.
- **No commas inside functional pseudo-classes** — `:is(a, b)` is banned by the
  build; write separate selectors, as §8's hover pair does.
- **No `position: fixed`** — the wash and canyon layers are absolutely positioned
  siblings of the scroll container (the wash may alternatively be `sticky` inside
  it), with `pointer-events: none` — scenery takes no clicks.
- **The canyon scene adds no new `@keyframes` and no ids.** It is entirely
  class-based (`.canyon`, `.canyon-wall`, `.canyon-wall-left`, `.canyon-wall-right`,
  `.canyon-end`, `.depth-mid`, `.depth-far`) — there is nothing to prefix. That is
  by construction, not by oversight; do not "fix" it.
- If any `mix-blend-mode` is used (it should not be needed — the glow system is
  plain paint), the site root sets `isolation: isolate`, written as
  `body { isolation: isolate }` for the build to rewrite.
- JS is optional — flicker, chase and marquee are pure CSS. If used (a staggered
  "lights come on" power-up at load is the one worth having):

  ```js
  (window.SITES = window.SITES || {})['shibuya'] = function (root) {
  	var signs = root.querySelectorAll('.sign');
  	signs.forEach(function (s, i) {
  		s.style.transitionDelay = (i * 90) + 'ms';
  		s.classList.add('lit');
  	});
  };
  ```

  Queries via `root` only, listeners only on elements inside `root`, no
  `window`/`document` handlers, no styles written to `root` itself (`root` is the
  `document` standalone — `Document` has no `.style`). Standalone boot at the end of
  the site's own body:
  `<script src="./script.js"></script><script>SITES['shibuya'](document);</script>`.

**The test.** All seven neons present; at least four distinct sign species; at least
three vertical-writing runs; exactly one flickering element and it never dips below
`0.55` opacity; no colour-on-colour type anywhere; every text/ground pairing passes
the §2 table **with glows disabled**; exactly one vanishing point, dead centre, both
walls converging on it; everything on a wall or behind a depth filter is
`aria-hidden`; every *readable* element is flat, unfiltered, near-layer, and passes
§2 with glows off; the scene is static — no parallax — and unchanged under reduced
motion, which also leaves every sign steady-lit; and nothing scrolls horizontally at
320px, the rotated walls included.

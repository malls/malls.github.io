# Memphis

> Design direction: **Memphis Milano**, the Milanese collective Ettore Sottsass founded on
> 11 December 1980 and dissolved in 1987. Named for the Bob Dylan record stuck on repeat
> that night — *Stuck Inside of Mobile with the Memphis Blues Again*.

## 1. The direction

Memphis took cheap industrial materials — plastic laminate, terrazzo, celluloid, neon —
and refused to apologise for them. A bookshelf stood on a splayed pink leg. A teapot did
not pour well. The point was never function; the point was that an object could be loud,
funny, and completely serious about it at the same time.

Three things to hold onto, because getting them wrong produces something that merely looks
80s rather than something that looks Memphis:

1. **It is black-and-white first.** The squiggle print, the hairline grid, the ink outline
   — these carry the identity. Colour is dropped into that structure. A page that is all
   pastel and no ink is not Memphis, it is a nursery.
2. **Pattern is a material, not a decoration.** Sottsass had Abet Laminati print *Bacterio*
   so he could build furniture out of the pattern itself. Surfaces here are filled, not
   tinted. Solid colour is the exception, reserved for when a shape needs to sit still.
3. **The geometry collides.** Circle against triangle against half-round, none of them
   agreeing on a baseline. Asymmetry is deliberate and load-bearing.

**Voice.** Declarative, deadpan, short. States things rather than pitching them. Never
exclamatory — the layout is already shouting, so the copy does not have to.

---

## 2. Palette

Swatches are named for the objects they come from. Use the names in code and in conversation.

### Structure

These two do the work. Every composition contains both.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--ink` | Bacterio Black | `#1A1A1A` | Outlines, rules, type, every pattern stroke. Warm off-black — never `#000`. |
| `--paper` | Casablanca Cream | `#FAF7F2` | Default ground. Laminate white, never `#FFF`. |

### Primaries

The loud six. A composition uses two or three of these, not six.

| Token | Name | Hex | Note |
|---|---|---|---|
| `--pink` | Carlton Pink | `#F0369A` | The signature. Bubblegum, not rose. |
| `--cyan` | Kristall Cyan | `#22C1D6` | Pool-tile blue-green. |
| `--yellow` | Tahiti Yellow | `#FFC800` | Sunflower. Highest-luminance primary — good under ink type. |
| `--tomato` | Super Red | `#F04E37` | Orange-leaning red, after Martine Bedin's *Super* lamp. |
| `--cobalt` | First Blue | `#2D4EC8` | The one dark primary. Carries Paper type. |
| `--green` | Bel Air Green | `#00A868` | Kelly green, after Peter Shire's chair. |

### Secondaries

Laminate pastels. Grounds and infill — they sit behind the primaries, never compete.

| Token | Name | Hex | Note |
|---|---|---|---|
| `--lilac` | Spugnato Lilac | `#9B7EDE` | The bridge between pink and cobalt. |
| `--peach` | Tawaraya Peach | `#FFB899` | Warm ground. |
| `--mint` | Sowden Mint | `#A9E8D4` | Cool ground. |
| `--powder` | Du Pasquier Powder | `#9FD8F2` | Sky. Pairs with tomato. |
| `--sand` | Terrazzo Sand | `#D9D5CC` | The neutral. Terrazzo chip ground, panel fills. |

```css
:root {
	--ink:    #1A1A1A;
	--paper:  #FAF7F2;

	--pink:   #F0369A;
	--cyan:   #22C1D6;
	--yellow: #FFC800;
	--tomato: #F04E37;
	--cobalt: #2D4EC8;
	--green:  #00A868;

	--lilac:  #9B7EDE;
	--peach:  #FFB899;
	--mint:   #A9E8D4;
	--powder: #9FD8F2;
	--sand:   #D9D5CC;
}
```

### Contrast — the one hard rule

**Only Ink and Paper carry text. The palette carries shape.**

This is both the authentic reading of Memphis and what keeps the page legible. Measured
contrast against the two structural colours (WCAG 2.1, computed):

| Ground | vs Ink `#1A1A1A` | vs Paper `#FAF7F2` |
|---|---|---|
| Casablanca Cream | **15.8** ✓ | — |
| Tahiti Yellow | **11.0** ✓ | 1.4 ✗ |
| Tawaraya Peach | **10.2** ✓ | 1.7 ✗ |
| Kristall Cyan | **7.9** ✓ | 1.9 ✗ |
| Bel Air Green | **5.5** ✓ | 2.5 ✗ |
| Spugnato Lilac | **5.2** ✓ | 2.7 ✗ |
| Super Red | **4.8** ✓ | 3.4 — large only |
| Carlton Pink | **4.6** ✓ | 3.4 — large only |
| First Blue | 2.5 ✗ | **6.4** ✓ |

So: ink type on everything, **except** on First Blue, which is the only swatch that takes
Paper type. Mint, Powder and Sand are pale enough to behave like Cream.

Never set coloured type on a coloured ground. Pink on cyan is 1.7:1 — it is a texture, not
a sentence.

---

## 3. Fill patterns

The core of this brief. Surfaces are **filled**, not tinted. Solid colour is used sparingly
and deliberately — for a shape that needs to hold still next to something busy.

**Every pattern is a utility class.** Apply the class, then set `--pat-ink`, `--pat-ground`
and `--pat-scale` on the same element to re-colour and re-scale it:

```css
.hero-panel {
	--pat-ink: var(--pink);
	--pat-ground: var(--yellow);
	--pat-scale: 18px;
}
```

> **Do not ship patterns as custom properties.** It is the obvious move and it does not
> work. `var()` inside a custom property is substituted at computed-value time **on the
> element where the property is declared** — so a `--pat-stripe` declared on `:root` bakes
> in `:root`'s `--pat-ink` and inherits down already-resolved. Overriding `--pat-ink` on a
> descendant changes nothing. Declaring `background-image` directly in a class puts the
> `var()` on the element that has the class, where the override is visible. This was caught
> by a sunburst that rendered black instead of yellow.

Organic patterns (Bacterio, terrazzo, confetti, wave) are SVG data URIs. They bake Ink into
the stroke and take their ground from `background-color`, so they answer to `--pat-ground`
but not to `--pat-ink`.

All are self-contained — data URIs only, no network requests, no image files.

Every pattern honours `--pat-scale` except Fan, which is angular and scales with its own
box. Scale is a design decision: a card gets a fine grid, a full-bleed panel gets a coarse
one. The default is the mobile value; §3.4 covers coarsening it with the viewport.

```css
:root {
	--pat-ink:    var(--ink);
	--pat-ground: var(--paper);
	--pat-scale:  16px;
	--pat-weight: 2px;   /* line patterns: grid, rule */
}
```

### 3.1 Gradient patterns

Single-declaration fills. Cheapest to render and the ones you will reach for most.

```css
/* Candy stripe — 45°, equal bands. The workhorse. */
.pat-stripe {
	background-image: repeating-linear-gradient(
		45deg,
		var(--pat-ink) 0 var(--pat-scale),
		var(--pat-ground) var(--pat-scale) calc(var(--pat-scale) * 2)
	);
}

/* Awning — vertical, wide ground / narrow ink. Calmer; good behind text. */
.pat-awning {
	background-image: repeating-linear-gradient(
		90deg,
		var(--pat-ink) 0 calc(var(--pat-scale) / 3),
		var(--pat-ground) calc(var(--pat-scale) / 3) var(--pat-scale)
	);
}

/* Shark tooth — hard diagonal split, tiles into a row of triangles. */
.pat-teeth {
	background-image: repeating-linear-gradient(
		-45deg,
		var(--pat-ink) 0 25%,
		var(--pat-ground) 25% 50%
	);
}

/* Fan — radiating wedges. Sunburst behind a hero shape. */
.pat-fan {
	background-image: repeating-conic-gradient(
		from 0deg,
		var(--pat-ink) 0deg 15deg,
		var(--pat-ground) 15deg 30deg
	);
}

/* Halo — concentric rings from a corner. */
.pat-halo {
	background-image: repeating-radial-gradient(
		circle at 0% 100%,
		var(--pat-ink) 0 var(--pat-scale),
		var(--pat-ground) var(--pat-scale) calc(var(--pat-scale) * 2)
	);
}
```

### 3.2 Multi-layer patterns

```css
/* Du Pasquier grid — hairline ink grid. The most useful pattern in the set:
   it reads as structure rather than noise, so text can sit directly on it. */
.pat-grid {
	background-color: var(--pat-ground);
	background-image:
		linear-gradient(to right,  var(--pat-ink) 0 var(--pat-weight), transparent var(--pat-weight)),
		linear-gradient(to bottom, var(--pat-ink) 0 var(--pat-weight), transparent var(--pat-weight));
	background-size: var(--pat-scale) var(--pat-scale);
}

/* Half-drop dots — offset rows, not a square lattice. Confetti, not polka. */
.pat-dots {
	background-color: var(--pat-ground);
	background-image:
		radial-gradient(circle, var(--pat-ink) 22%, transparent 23%),
		radial-gradient(circle, var(--pat-ink) 22%, transparent 23%);
	background-size: var(--pat-scale) var(--pat-scale);
	background-position: 0 0, calc(var(--pat-scale) / 2) calc(var(--pat-scale) / 2);
}

/* Checkerboard — skew it slightly in use; a true square check reads as a kitchen floor. */
.pat-check {
	background-color: var(--pat-ground);
	background-image:
		linear-gradient(45deg, var(--pat-ink) 25%, transparent 25% 75%, var(--pat-ink) 75%),
		linear-gradient(45deg, var(--pat-ink) 25%, transparent 25% 75%, var(--pat-ink) 75%);
	background-size: var(--pat-scale) var(--pat-scale);
	background-position: 0 0, calc(var(--pat-scale) / 2) calc(var(--pat-scale) / 2);
}

/* Zigzag — chevron field. Coarse scale only; below ~20px it turns to mush. */
.pat-zigzag {
	background-color: var(--pat-ground);
	background-image:
		linear-gradient(135deg, var(--pat-ink) 25%, transparent 25%),
		linear-gradient(225deg, var(--pat-ink) 25%, transparent 25%),
		linear-gradient(45deg,  var(--pat-ink) 25%, transparent 25%),
		linear-gradient(315deg, var(--pat-ink) 25%, transparent 25%);
	background-size: var(--pat-scale) var(--pat-scale);
	background-position:
		calc(var(--pat-scale) / 2) 0, calc(var(--pat-scale) / 2) 0,
		0 0, 0 0;
}
```

### 3.3 SVG data-URI patterns

Organic marks that gradients cannot draw. `%3C` `%3E` `%23` are percent-encoded so strict
URL parsers accept them — do not un-encode when copying.

**Bacterio** — Sottsass, 1978. Scattered ink bacteria on white. The single most
recognisable Memphis surface. Ground comes from `background-color`, so it works on any
swatch; on Cream it is the original.

```css
.pat-bacterio {
	background-color: var(--pat-ground);
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%231A1A1A' stroke-linecap='round'%3E%3Cpath stroke-width='7' d='M10 30c12-17 31-11 33 4 2 12-13 18-21 11-6-5-2-15 6-13'/%3E%3Cpath stroke-width='5' d='M63 11c11-4 19 7 12 14-6 6-17 3-16-6'/%3E%3Cpath stroke-width='6' d='M105 25c-7-13 11-21 19-10 7 10-3 21-12 17'/%3E%3Cpath stroke-width='4' d='M139 45c8 2 10 13 2 16-8 3-14-6-8-12'/%3E%3Cpath stroke-width='7' d='M19 67c15-11 30 4 21 17-8 11-26 6-26-7'/%3E%3Cpath stroke-width='5' d='M66 57c13-6 23 9 12 18-9 8-21 0-19-10'/%3E%3Cpath stroke-width='6' d='M113 66c10-9 23 2 17 14-6 10-20 7-22-4'/%3E%3Cpath stroke-width='4' d='M147 93c6 7 0 17-8 13-7-4-4-14 3-14'/%3E%3Cpath stroke-width='7' d='M13 107c17-13 34 2 25 17-8 13-30 6-30-9'/%3E%3Cpath stroke-width='5' d='M65 113c15-2 21 13 8 19-11 5-21-4-17-14'/%3E%3Cpath stroke-width='6' d='M109 119c13-7 23 6 15 16-8 9-22 2-21-9'/%3E%3Cpath stroke-width='4' d='M41 143c9-6 19 2 13 10-6 6-17 0-15-8'/%3E%3Cpath stroke-width='5' d='M93 147c10 0 15 11 4 14-9 2-14-9-6-13'/%3E%3C/g%3E%3C/svg%3E");
	background-size: calc(var(--pat-scale) * 7) calc(var(--pat-scale) * 7);
}
```

**Terrazzo** — angular chips on Sand. The one pattern that carries its own colours; it does
not respond to `--pat-ink`. Use it as a calm ground under loud shapes.

```css
.pat-terrazzo {
	background-color: var(--sand);
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg%3E%3Cpolygon points='14,18 34,10 40,30 22,36' fill='%23F0369A'/%3E%3Cpolygon points='60,12 73,20 62,29' fill='%2322C1D6'/%3E%3Cpolygon points='96,14 118,20 112,38 94,32' fill='%23FFC800'/%3E%3Cpolygon points='134,50 149,61 136,71' fill='%231A1A1A'/%3E%3Cpolygon points='120,42 131,38 135,50' fill='%239B7EDE'/%3E%3Cpolygon points='18,58 38,54 44,72 24,78' fill='%232D4EC8'/%3E%3Cpolygon points='70,50 90,60 78,79 62,66' fill='%23F04E37'/%3E%3Cpolygon points='104,72 117,77 112,89 102,84' fill='%2300A868'/%3E%3Cpolygon points='58,82 69,86 64,96' fill='%231A1A1A'/%3E%3Cpolygon points='8,96 26,90 34,109 14,116' fill='%23FFC800'/%3E%3Cpolygon points='52,101 74,109 66,127 48,118' fill='%239B7EDE'/%3E%3Cpolygon points='96,109 111,113 106,127 92,122' fill='%2322C1D6'/%3E%3Cpolygon points='130,100 152,111 142,127 126,116' fill='%23F0369A'/%3E%3Cpolygon points='26,133 46,139 40,155 24,148' fill='%231A1A1A'/%3E%3Cpolygon points='78,137 95,145 84,157 72,151' fill='%23F04E37'/%3E%3Cpolygon points='116,141 133,147 126,158' fill='%232D4EC8'/%3E%3C/g%3E%3C/svg%3E");
	background-size: calc(var(--pat-scale) * 7) calc(var(--pat-scale) * 7);
}
```

**Confetti** — mixed primitives scattered: dot, triangle, bar, cross. Sparser than Bacterio;
use where a surface needs incident rather than texture.

```css
.pat-confetti {
	background-color: var(--pat-ground);
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='22' cy='18' r='6' fill='%23F0369A'/%3E%3Cpolygon points='60,10 70,28 50,28' fill='%23FFC800'/%3E%3Crect x='92' y='14' width='18' height='6' rx='3' fill='%2322C1D6' transform='rotate(-20 101 17)'/%3E%3Cpath d='M14 58h18M23 49v18' stroke='%232D4EC8' stroke-width='5' stroke-linecap='round'/%3E%3Ccircle cx='72' cy='62' r='7' fill='%2300A868'/%3E%3Cpolygon points='106,52 116,70 96,70' fill='%23F04E37'/%3E%3Crect x='34' y='92' width='20' height='7' rx='3.5' fill='%239B7EDE' transform='rotate(28 44 95)'/%3E%3Ccircle cx='90' cy='100' r='6' fill='%23FFC800'/%3E%3Cpath d='M6 96h16M14 88v16' stroke='%231A1A1A' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E");
	background-size: calc(var(--pat-scale) * 5) calc(var(--pat-scale) * 5);
}
```

**Wave rule** — the squiggle, as a repeating horizontal band. Use it as a divider or a
thick underline, never as a full-surface fill.

```css
.pat-wave {
	background-color: transparent;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='40' viewBox='0 0 60 40'%3E%3Cpath d='M0 20 q15 -14 30 0 t30 0' fill='none' stroke='%231A1A1A' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E");
	background-repeat: repeat-x;
	background-size: 60px 20px;
	height: 20px;
}
```

### 3.4 Using patterns

- **One pattern per surface.** Two patterns touching is a collision; three is noise.
- **Adjacent surfaces alternate.** Patterned block, then flat block, then patterned. A page
  that is patterned edge to edge has no rhythm.
- **Text sits on flat colour or on `.pat-grid`.** Every other pattern is too busy behind a
  paragraph. If a headline must sit on a pattern, give it a solid ink or paper plate behind it.
- **Coarsen with viewport.** Bump `--pat-scale` from `16px` on mobile to `28px` on wide
  screens; a fixed scale looks thin on a large display and clogged on a phone.
- **Respect `prefers-reduced-motion` for anything animated**, including scrolling patterns
  (§7).

---

## 4. Type

No webfonts. The 1981 originals were set in geometric sans — Futura, Avant Garde — so use
the system stack that lands nearest and let it degrade gracefully.

```css
--font-display: Futura, 'Century Gothic', 'Avant Garde', 'Trebuchet MS', system-ui, sans-serif;
--font-body:    'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif;
```

- **Display** — heavy weight, tight tracking (`-0.02em`), set in ALL CAPS or sentence case,
  never title case. Sizes are `clamp()`-fluid and large: the smallest display size on a
  phone should still feel too big.
- **Body** — normal weight, generous leading (`1.6`), measure capped at `62ch`.
- **Rotation is allowed on display type only**, and only at `-4deg` to `4deg`. Body copy
  stays level — a tilted paragraph is unreadable, not playful.
- No italics. No letterspaced small caps. No text shadows.

Scale, geometric, ratio ≈ 1.33:

```css
--t-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.85rem);
--t-sm: clamp(0.9rem,  0.86rem + 0.2vw,  1rem);
--t-md: clamp(1.05rem, 1rem + 0.3vw,     1.25rem);
--t-lg: clamp(1.5rem,  1.3rem + 1vw,     2.25rem);
--t-xl: clamp(2.25rem, 1.8rem + 2.5vw,   4rem);
--t-2xl: clamp(3rem,   2rem + 6vw,       7.5rem);
```

---

## 5. Shape, border and shadow

**Primitives.** Circle, half-round, triangle, hard rectangle, quarter-arc, stepped
ziggurat, cone, squiggle. Compose from these; do not invent smooth blobby shapes — that is
a different decade.

**Radius** is bimodal and there is no middle:

```css
--r-none: 0;      /* rectangles are hard-cornered, always */
--r-full: 999px;  /* pills and circles are fully round */
```

A `border-radius: 8px` rounded rectangle is the single most out-of-vocabulary thing that
can appear on this page.

**Border.** Everything structural gets an ink outline. It is what holds the colour apart.

```css
--bd: 3px solid var(--ink);
--bd-thick: 5px solid var(--ink);
```

**Shadow** is a hard offset ink block. Never blurred, never soft, never grey.

```css
--sh:    5px 5px 0 var(--ink);
--sh-lg: 10px 10px 0 var(--ink);
--sh-color: 8px 8px 0 var(--cyan);  /* offset in a swatch instead of ink, sparingly */
```

**Legs.** The Memphis signature move — objects stand on visible supports. A card can sit on
two short coloured bars, offset so it looks slightly unstable. Use once or twice per page,
not on every element.

---

## 6. Layout and composition

- **Asymmetric by default.** Nothing is centred unless centring is the joke. Content sits
  off-axis; a hero headline starts at 8% from the left and the image block hangs past the
  right edge.
- **Deliberate collision.** Elements overlap by 10–30px with negative margins. The overlap
  should look decided, not accidental — always the same shape on top.
- **Off-grid accents.** The content column is a real grid; the decorative shapes ignore it.
  Position accents absolutely against a `position: relative` section wrapper.
- **Full bleed, no gaps.** Patterned bands run edge to edge. There is never white space
  between sections — sections butt directly, separated by a colour or pattern change or a
  `.pat-wave` rule.
- **Bands.** The page is a vertical stack of full-width bands, each with its own ground.
  Adjacent bands never share a ground colour.

Spacing scale (used for rhythm inside bands; the collisions break it on purpose):

```css
--s-1: 0.5rem; --s-2: 1rem; --s-3: 1.5rem; --s-4: 2.5rem; --s-5: 4rem; --s-6: 6.5rem;
```

Responsive: on narrow viewports, collisions reduce to ~8px and rotations halve. The body
must never scroll horizontally — decorative shapes that hang off-canvas belong inside a
wrapper with `overflow-x: clip`.

---

## 7. Motion

Memphis objects are static, so motion is used sparingly and mechanically — nothing eases
in gently, nothing fades.

- **Snap, don't glide.** `transition: transform 120ms steps(3, end)` or
  `cubic-bezier(.2, .9, .3, 1.4)` with a slight overshoot.
- **Hover** nudges an element 3px toward its shadow and shrinks the shadow to match, as if
  it were pressed.
- **Idle bob** on at most one decorative shape: `translateY(-6px)` and back over 3s.
- **Pattern drift** is permitted on one full-bleed band — animate `background-position` by
  exactly one tile over 20s, linear, infinite. It must loop seamlessly.
- No parallax, no scroll-jacking, no reveal-on-scroll fades.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

---

## 8. What this is not

The most common failure is rendering something adjacent and calling it Memphis:

| Not this | Because |
|---|---|
| Vaporwave / synthwave | Purple-teal gradients, chrome, grids to a horizon. Memphis has no gradients and no perspective. |
| Miami Vice pastel | Right decade, wrong idea — soft, atmospheric, no ink, no pattern. |
| Corporate confetti | Pastel dots on white with rounded cards and drop shadows. This is a SaaS onboarding screen. |
| Bauhaus | Shares the primitives, but Bauhaus is rational and reduced. Memphis is the parody of that. |
| Neon on black | Memphis grounds are pale — cream, sand, pastel. Dark mode is not in this vocabulary. |

Also out: gradients used for depth, blurred shadows, uniform 8px radii, muted or
desaturated palettes, glassmorphism, emoji as decoration, more than three patterns visible
at once.

---

## 9. Page application

`memphis/index.html` renders this brief. Concretely:

- **Ground:** Casablanca Cream. Full bleed, no white gaps anywhere.
- **Hero band:** oversized display name at `--t-2xl`, rotated `-3deg`, ink on cream, with a
  `.pat-fan` circle in Tahiti Yellow behind it hanging off the left edge and a Carlton Pink
  half-round colliding from the right. A `.pat-wave` rule closes the band.
- **Intro band:** First Blue ground, Paper body copy at `--t-md`, measure capped. The only
  place Paper type appears.
- **Links / work band:** `.pat-grid` ground in ink-on-cream at `--pat-scale: 28px`. Each
  item is a hard-cornered card with `--bd` and `--sh`, ground alternating through the
  primaries, ink type. One card stands on two Bel Air Green legs. Hover presses the card
  toward its shadow.
- **Accent band:** full-bleed `.pat-bacterio` on cream, with a single flat Super Red
  rectangle plated over it carrying a short line of ink display type.
- **Footer:** `.pat-terrazzo`, ink type, small. Contact line and nothing else.

At least six swatches and at least four distinct fill patterns must appear on the page.
Every band's ground differs from its neighbours'. Nothing scrolls horizontally at 320px.

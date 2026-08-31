# Isomorphic

> Design direction: **a kid's play-town rug, lifted off the floor.** The reference is a
> printed classroom road rug — grass-green ground, black roads with yellow dashed
> centrelines, a blue river, a rail line, and a dozen squat buildings each wearing a red
> sign band that says exactly what it is: TRAIN STATION, HOSPITAL, LIBRARY, POLICE,
> AIRPORT. The rug draws its buildings flat. This direction re-projects that town into
> forced isometric so it stands up as a solid toy you can look across.

*(The folder is spelled `isomorphic`. The projection is isometric — specifically 2:1
dimetric. The pun is load-bearing for exactly one directory name and nothing else.)*

## 1. The direction

A play rug is a navigation surface for people who cannot read a menu. Everything on it is
a place, every place is a labelled object, and the label is painted on the thing itself.
That is the entire interaction model here: **the site is a town, and its links are
buildings with their names on them.**

Three laws, because getting them wrong produces something that merely looks *3D-ish*
rather than something that looks **isometric**:

1. **Parallel projection. There is no vanishing point.** A building at the back of the
   plot is drawn exactly the same size as one at the front. The word `perspective` never
   appears in the stylesheet, and neither does `rotate3d`, `perspective-origin`, or a
   camera of any kind. Adding perspective is the single most likely wrong output — it
   turns a toy town into an architectural render in one line.
2. **One camera, forever.** Every surface in the world is built from three transforms and
   only three (§3.1). Every angle on the finished page is 0°, 90°, or ±26.565°. One
   element drawn at a fourth angle and the town stops being a place and becomes a
   collection of shapes.
3. **It is printed, not rendered.** Flat fills, three fixed tones per volume, hard ink
   outlines, hard-edged shadows. No gradients on faces, no blur, no ambient occlusion, no
   glow. The rug came off a 625 DPI printer; the page should look like it could too.

And the affordance law, which is really a fourth: **a labelled building is a link; an
unlabelled prop does nothing.** Trees, traffic lights, the level crossing, the parked car —
scenery, never clickable, never hoverable. If a visitor learns the rule once at the top of
the plot it holds everywhere, which is the only reason a town works as a navigation bar.

**Voice.** Signage. Nouns, uppercase, one word where one word will do — GITHUB, EMAIL,
LIBRARY. The prose that exists (in the legend, §9) is plain, present tense and friendly
without being cute: this is a rug for a classroom, not a mascot. No exclamation marks. The
page is already cheerful; the copy does not have to be.

---

## 2. Palette

Printed-rug colour: saturated, opaque, unembarrassed. Named for the thing on the rug.

### Ground

The plot itself. These are the largest areas on the page, so they are the ones that decide
whether it reads as a toy or as a dashboard.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--grass` | Playfield Green | `#3E9B4A` | Default ground. The colour of the whole plot. |
| `--moss` | Hedge Green | `#2C7A38` | Hedges, tree canopies, the darker ground band. |
| `--asphalt` | Blacktop | `#191C21` | Roads. Warm near-black, never `#000`. |
| `--walk` | Sidewalk Grey | `#C9C6BC` | Pavement, kerbs, the parking apron. |
| `--water` | River Blue | `#1E4FC8` | The river and the pond. Cobalt, not navy. |
| `--dirt` | Lot Brown | `#8A5A3B` | The construction lot, the rail bed. |

### Built

Walls, roofs, awnings. A building uses one body colour and one roof colour. Two, not five.

| Token | Name | Hex | Note |
|---|---|---|---|
| `--chalk` | Wall Cream | `#F6F2E7` | Default wall. Printed white, never `#FFF`. |
| `--brick` | Barn Red | `#D33A2C` | Roofs, brick walls, the mailbox. |
| `--cobalt` | Roof Blue | `#2E6FD8` | The other roof. Also carries chalk type. |
| `--sun` | Window Yellow | `#FFC72C` | Lit windows, road centrelines, the focus ring. |
| `--tangerine` | Awning Orange | `#F2761B` | Awnings, the crane, the slide. Used sparingly. |

### Ink and sign

The identity. The rug is a black-outlined print with red signs; so is this.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--ink` | Outline Black | `#14171B` | Every silhouette edge, every outline, all dark type. |
| `--sign` | Sign Red | `#E03127` | The sign band. Only ever a sign band. |
| `--paint` | Sign White | `#FFFFFF` | Lettering on the sign band. Pure white is correct here. |

```css
:root {
	--grass:     #3E9B4A;
	--moss:      #2C7A38;
	--asphalt:   #191C21;
	--walk:      #C9C6BC;
	--water:     #1E4FC8;
	--dirt:      #8A5A3B;

	--chalk:     #F6F2E7;
	--brick:     #D33A2C;
	--cobalt:    #2E6FD8;
	--sun:       #FFC72C;
	--tangerine: #F2761B;

	--ink:       #14171B;
	--sign:      #E03127;
	--paint:     #FFFFFF;

	/* the shading model — see below */
	--shade-side:  16%;
	--shade-front: 34%;
	--cast:        rgb(20 23 27 / 0.22);
}
```

### The shading triplet

Every volume ships as **three tones of one colour**, never as three colours. The light is
fixed high and to the screen-left and never moves:

| Face | Tone | Why |
|---|---|---|
| Top / roof | the base colour, 100% | Faces the light square on. |
| Left wall (screen-left, the lit side) | base mixed `16%` with `--ink` | Angled away. |
| Right wall (screen-right, the shaded side) | base mixed `34%` with `--ink` | Angled further. |

```css
.iso-box {
	--face-top:   var(--body);
	--face-left:  color-mix(in oklab, var(--body), var(--ink) var(--shade-side));
	--face-right: color-mix(in oklab, var(--body), var(--ink) var(--shade-front));
}
```

> Declare that triplet **on the box, not on `:root`.** `var()` inside a custom property
> resolves at computed-value time on the element where the property is declared — a
> `--face-left` written on `:root` bakes in `:root`'s `--body` and inherits down already
> resolved, so setting `--body: var(--brick)` on a building would change nothing. Same trap
> the liquid direction documents for its surface recipes; it bites identically here.

Faces are **flat**. A gradient across a wall means a curved surface or a moving light, and
this world has neither. The only permitted departure is a window grid, which is a repeating
hard-stop pattern, not a ramp.

### Contrast — the one hard rule

**Ink carries type on the pale fills. Sign White carries type on the saturated ones.
Nothing else carries type at all.**

Measured (WCAG 2.1, computed) against the fills type actually lands on:

| Colour | on `--chalk` | on `--sun` | on `--walk` | on `--grass` | on `--sign` | on `--cobalt` | on `--asphalt` |
|---|---|---|---|---|---|---|---|
| Ink `#14171B` | **16.1** ✓ | **11.5** ✓ | **10.5** ✓ | **5.1** ✓ | 4.0 — large only | 3.8 — large only | 1.1 ✗ |
| Sign White `#FFFFFF` | 1.1 ✗ | 1.6 ✗ | 1.7 ✗ | 3.5 — large only | **4.5** ✓ | **4.8** ✓ | **17.1** ✓ |
| Window Yellow `#FFC72C` | 1.4 ✗ | — | 1.1 ✗ | 2.3 ✗ | 2.9 ✗ | 3.1 — large only | **11.0** ✓ |

The shading model shifts these, and only ever in the safe direction for white: on the
shaded right wall, Sign White on Sign Red rises from 4.5 to ≈8.5. Ink on the pale walls
falls but survives — on the darkest tone, ink on chalk ≈6.9, on sun ≈5.1, on walk ≈4.7. So
the working rule holds on every face: **ink on chalk/sun/walk, white on sign/cobalt/brick/
asphalt, and no type at all on grass, water or dirt.**

---

## 3. Geometry — the projection

This is the section that matters. Everything else in the brief is decoration on top of it.

### 3.1 The camera

**2:1 dimetric, not true 30° isometric.** True isometric squashes the vertical by
`cos(54.736°)` and puts world axes at 30° from horizontal; 2:1 dimetric puts them at
`atan(0.5) = 26.565°`. Choose dimetric, because at 26.565° a diagonal advances exactly two
pixels across for every one down — every edge in the town lands on whole pixels and nothing
shimmers. It is also what every isometric game means when it says isometric.

Three transforms. There are no others.

```css
/* the ground plane, and every roof: a square becomes a 2:1 rhombus */
transform: scaleY(0.5) rotate(45deg);

/* the screen-left wall — its top edge falls to the right */
transform: skewY(26.565deg);

/* the screen-right wall — its top edge rises to the right */
transform: skewY(-26.565deg);
```

Two consequences worth internalising:

- **Vertical stays vertical.** World height maps straight up the screen with no
  foreshortening, so a wall's vertical edges are plumb and its height in pixels *is* its
  height. Storeys are countable.
- **A circle on the ground is a 2:1 axis-aligned ellipse.** So a round pond, a roundabout
  or a tree canopy needs no transform at all: a `width: W; height: calc(W / 2);
  border-radius: 50%` div is already correctly projected.

### 3.2 The grid

One unit, one scale. `--tile` is the **screen width** of a single ground rhombus; its
screen height is exactly half that.

```css
#site-isomorphic .plot {
	--tile:   clamp(44px, 9vw, 104px);      /* rhombus width on screen */
	--half:   calc(var(--tile) / 2);
	--quart:  calc(var(--tile) / 4);
	--sq:     calc(var(--tile) / 1.4142136); /* the pre-transform square's side */
	--storey: calc(var(--tile) * 0.28);      /* one floor */
	position: relative;
}

/* anything standing on the grid: column --c, row --r, lifted --z */
#site-isomorphic .cell {
	position: absolute;
	width: var(--tile);
	height: var(--half);
	left: calc((var(--c) - var(--r)) * var(--half));
	top:  calc((var(--c) + var(--r)) * var(--quart) - var(--z, 0px));
}
```

That is the whole placement system: **column and row in, screen position out.** Nothing on
the page is positioned by hand-tuned pixels; every dimension is a multiple of `--tile` or
`--storey`. A plot `C` columns by `R` rows measures `(C + R) × --tile / 2` wide and
`(C + R) × --tile / 4` tall, plus the height of its tallest building.

Keep `--tile` a multiple of 4 at every breakpoint so half- and quarter-tiles stay on whole
pixels. `clamp()` will not honour that on its own — round it in the two or three places
that matter (`--tile: 88px` at desktop, `56px` at mobile) rather than trusting `9vw`.

### 3.3 A box

Every building is one anchor holding three faces and a shadow. The origin bookkeeping is a
one-time job — do it once, here, and never think about it again.

```html
<a class="cell iso-box" href="https://github.com/malls"
   style="--c: 1; --r: 1; --w: 2; --d: 2; --floors: 6; --body: var(--chalk);">
	<i class="shadow" aria-hidden="true"></i>
	<i class="face face--left"><b class="sign">GitHub</b></i>
	<i class="face face--right" aria-hidden="true"></i>
	<i class="face face--top"   aria-hidden="true"></i>
</a>
```

```css
#site-isomorphic .iso-box {
	--wall: calc(var(--floors) * var(--storey));
	pointer-events: none;                     /* see §3.6 */
}

#site-isomorphic .face {
	position: absolute;
	pointer-events: auto;
	box-shadow: inset 0 0 0 2px var(--ink);   /* the outline, and the seam fix */
}

/* roof: the square, rotated flat, then lifted by the wall height */
#site-isomorphic .face--top {
	left: 50%;
	top: 50%;
	width: var(--sq);
	height: var(--sq);
	background: var(--face-top);
	transform: translate(-50%, calc(-50% - var(--wall))) scaleY(0.5) rotate(45deg);
}

/* screen-left wall: hangs from the left vertex down to the bottom vertex */
#site-isomorphic .face--left {
	left: 0;
	top: calc(50% - var(--wall));
	width: var(--half);
	height: var(--wall);
	background: var(--face-left);
	transform-origin: 0 0;
	transform: skewY(26.565deg);
}

/* screen-right wall: hangs from the bottom vertex up to the right vertex */
#site-isomorphic .face--right {
	left: 50%;
	top: calc(100% - var(--wall));
	width: var(--half);
	height: var(--wall);
	background: var(--face-right);
	transform-origin: 0 0;
	transform: skewY(-26.565deg);
}
```

Multi-tile footprints (`--w` columns by `--d` rows) scale the same skeleton: the roof square
grows to `calc(var(--sq) * ...)` per axis, and the two walls widen to `--w` and `--d`
half-tiles respectively. Heights snap to `--storey` — **no building is 3.4 floors tall.**

### 3.4 Depth

**DOM order is depth.** There is no z-buffer; the painter's algorithm is the whole
technique. Emit cells sorted back-to-front by `--c + --r` ascending. Where two cells tie
they cannot overlap unless one is tall, in which case the taller goes last.

For a multi-tile footprint, sort by its **front-most** tile — `max(c + r)` over the
footprint — not by its origin.

`z-index` inside the plot is a trap, not a fix. Setting it on one building re-orders it
against every sibling in the stacking context and will punch a tower through a hillside.
If you truly need it (a prop that must sit between two faces of the same box), set it on
*every* cell as `z-index: calc(var(--c) + var(--r))` so the two systems agree, and never
mix the two approaches.

### 3.5 Shadow

One light, fixed, high on the screen-left. Every shadow therefore falls down and to the
screen-right, and every shadow is a **flat ink parallelogram on the ground plane** —
`--cast` at 22%, hard edges, no blur, no spread. A blurred shadow is a render; a hard one
is a print.

```css
#site-isomorphic .shadow {
	position: absolute;
	inset: 0;
	background: var(--cast);
	transform: translate(calc(var(--wall) * 0.35), calc(var(--wall) * 0.175));
	clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
```

The offset keeps the 2:1 ratio (`0.35 : 0.175`), so the shadow slides along a world axis
rather than drifting off-camera. Every shadow in town uses the same coefficients.

### 3.6 The isometric gotchas

Each of these has cost someone an afternoon.

- **Rectangular hit areas eat neighbours.** A CSS transform *does* transform the hit region,
  so a skewed face is clickable as its parallelogram — good. But the anchor wrapping it is
  untransformed, and its rectangular box overlaps the buildings behind it. Hence
  `pointer-events: none` on the box and `auto` on the faces. Without this, the front row of
  the town swallows clicks meant for the back row.
- **`preserve-3d` is fragile — prefer the 2D route above.** A `filter`, `opacity < 1`,
  `overflow` other than visible, `clip-path`, `mask` or `mix-blend-mode` on a
  `transform-style: preserve-3d` element (or on its ancestors) forces flattening, and the
  scene collapses. Real 3D buys nothing here — there is no camera motion — and costs you
  every one of those properties. Build with skews.
- **Sub-pixel seams.** Adjacent faces meeting at a shared edge show a one-pixel hairline of
  whatever is behind them. The `inset 0 0 0 2px var(--ink)` outline on every face hides it
  and doubles as the rug's ink line; joints read heavier than silhouette edges, which is
  what a printed rug does anyway.
- **Never animate `left` / `top`.** They are laid out from `--c` / `--r`; animating them
  triggers layout for the whole plot every frame. Animate `translate` on the cell instead.
- **Never `scale()` type.** A skewed label is correct (it is painted on a wall); a scaled
  label is blurry. Change `font-size`, never the transform.
- **No `position: fixed` anywhere.** Any transformed ancestor becomes its containing block,
  so a fixed element inside the plot will not be fixed to the viewport. There is nothing on
  this page that needs it.
- **The plot bleeds.** Back-row buildings stick up past the top of the grid and shadows
  spill past the right. The scene wrapper takes generous padding and `overflow: clip`
  (`clip`, not `hidden` — it makes no scroll container).
- **Budget the moving parts.** Six or fewer animated cells. Everything else is a static
  composite and costs nothing.

---

## 4. Type

One `@import`, at the very top of `style.css` — a head `<link>` does not survive the build:

```css
@import url('https://fonts.googleapis.com/css2?family=Bungee&family=Archivo:wght@500;700&display=swap');

:root {
	--font-sign: 'Bungee', 'Alfa Slab One', Impact, 'Haettenschweiler', sans-serif;
	--font-body: 'Archivo', system-ui, -apple-system, 'Helvetica Neue', sans-serif;
}
```

Bungee is a signage face — it was drawn for exactly this job, chunky and uppercase-first
with no lowercase ambitions. Archivo does the reading.

- **Signs** — Bungee, uppercase, tracking `0.02em`, white on the sign band, with a hard ink
  edge (`-webkit-text-stroke: 1px var(--ink)` or four 1px offset text-shadows — never a
  blurred one). One word where possible. This is the only display type in town.
- **Painted on, not floating.** A sign lives **inside** its wall face and inherits the
  face's skew, so it leans with the building. The band is a rectangle in the wall's local
  space, which projects to a parallelogram — correct, and exactly what the rug does.
  Absolutely no billboarding: nothing on this page turns to face the viewer (§5).
- **Legend prose** — Archivo 500, leading `1.6`, measure capped at `52ch`, ink on chalk.
  The one calm surface. Unprojected (§9), because a map's legend is not part of the map.
- **Micro** — Archivo 700, 10–11px, uppercase, tracking `0.12em`, ink at `0.65` on walk
  grey. Kerb markings, the plot's grid ticks, the legend key. If it is texture rather than
  content it takes `aria-hidden="true"`; anything a reader needs stays at 11px minimum and
  full contrast.
- No italics (a slanted letterform fights the projection's slant and both lose). No thin
  weights. No lowercase on signs. No soft or coloured text shadows.

Scale, ratio ≈ 1.4:

```css
--t-micro: clamp(0.62rem, 0.6rem + 0.1vw,   0.7rem);
--t-xs:    clamp(0.75rem, 0.72rem + 0.15vw, 0.86rem);
--t-sm:    clamp(0.9rem,  0.86rem + 0.2vw,  1.02rem);
--t-md:    clamp(1.05rem, 1rem + 0.3vw,     1.25rem);
--t-sign:  clamp(0.72rem, 0.5rem + 0.9vw,   1.4rem);   /* derives from --tile in feel */
--t-lg:    clamp(1.5rem,  1.2rem + 1.4vw,   2.4rem);
```

Sign type is sized against `--tile`, not against the viewport, so a sign always fits its
wall. If the word does not fit, the building gets wider — the type does not get smaller.

---

## 5. Surface and edge

**Flat fill, ink outline, hard edge.** That is the entire surface vocabulary.

- **Outline everything.** Every face carries `inset 0 0 0 2px var(--ink)`. Props drawn as
  SVG carry `stroke: var(--ink); stroke-width: 2; stroke-linejoin: miter`. The ink line is
  the identity; a face without one looks like a chart segment.
- **`border-radius: 0`** on every projected surface. Roundness in this world comes from
  drawing a round thing, not from softening a square one — and a round thing on the ground
  is the 2:1 ellipse from §3.1.
- **Nothing is billboarded.** If a prop cannot be built from the three transforms, it is
  drawn **already in projection** as inline SVG — the vector art is authored isometric, so
  it obeys the camera without needing a transform. Trees, the water tower, the crane, the
  level crossing all work this way. Nothing ever rotates to face the viewer.
- **Windows are a pattern, not a decal.** A repeating hard-stop `linear-gradient` on the
  wall face, in `--sun` on the body colour, inheriting the face's skew for free:
  ```css
  background-image:
  	repeating-linear-gradient(to bottom,
  		var(--ink) 0 2px, transparent 2px calc(var(--storey) - 8px),
  		var(--sun) calc(var(--storey) - 8px) var(--storey)),
  	repeating-linear-gradient(to right,
  		transparent 0 18%, var(--sun) 18% 42%, transparent 42% 50%);
  background-blend-mode: multiply;
  ```
  The vertical ramp lays a lit band per storey, the horizontal one cuts it into bays; the
  result is a countable window grid that skews with its wall for free.
  Hard stops only — a soft stop is a gradient, and gradients are §2's problem.
- **Roads** are ground-plane cells: `--asphalt` fill with a dashed `--sun` centreline drawn
  as a repeating hard-stop gradient *before* the tile transform, so the dashes foreshorten
  correctly with the surface instead of sitting on top of it.
- **No blur, anywhere.** No `filter: blur`, no soft `box-shadow`, no `backdrop-filter`, no
  glow on hover, no vignette. The one shadow recipe is §3.5 and it has hard edges.
- **Focus is a ring that obeys the camera.** `outline` is drawn in the element's local space
  and then transformed, so `outline: 3px solid var(--sun)` on a face follows the skew and
  traces the true isometric silhouette. Pair it with the lift from §7 so focus and hover
  read the same. Never a rectangular ring around the wrapper.

---

## 6. Layout and composition

The page is **one plot** — a square grid of tiles, centred, with the legend card beside or
below it. There are no sections, no bands, no scroll narrative. You arrive, you see the
town, you pick a building.

- **Nine by nine.** Big enough for a road cross, four quadrants and real scenery; small
  enough to hold in one screen at any width. Roads run the full length of column 4 and row
  4, dividing the plot into four blocks with a junction in the middle.
- **The tallest thing is the most important thing.** GitHub is a six-storey tower and the
  only object over four floors; the eye lands on it before it reads a single sign. Height is
  the hierarchy — there is no other emphasis mechanism in town.
- **Front-left is nearest.** The bottom vertex of the plot is the closest corner to the
  viewer. Put nothing important in the back corner, where a tall neighbour can occlude it.
- **Density is uneven on purpose.** Two crowded blocks, one sparse, one nearly empty with
  the river running through it. A perfectly regular grid of buildings reads as a chart.
- **Props never touch signs.** A tree may overlap a wall, never a sign band. Check this at
  every breakpoint — occlusion is a function of `--tile`, so it changes as the plot scales.

```css
--s-1: 0.5rem; --s-2: 1rem; --s-3: 1.75rem; --s-4: 3rem; --s-5: 5rem;
```

**Responsive.** The plot scales through `--tile` only — never through a `transform: scale()`
on the scene, which blurs the ink lines and the sign type. Below roughly 700px the plot
sheds its outer ring of pure scenery (never a labelled building) and drops from 9×9 to 7×7;
below 420px, to 5×5 with `--tile: 56px`, and the legend moves beneath the plot. All five
signs stay legible at 320px and nothing scrolls horizontally.

---

## 7. Motion

**The town moves. The camera never does.** No orbit, no drift, no parallax on scroll, no
tilt-on-pointer. The moment the camera moves this stops being a printed rug.

Motion here **snaps** — this is the opposite of a soft direction. Short durations, crisp
easing, a small overshoot.

- **Hover and focus lift.** The building rises by `calc(var(--storey) / 2)` on
  `translateY`, and its ground shadow slides *further* out along the same 2:1 vector — the
  two together read as height, where either alone reads as a glitch. 140ms,
  `cubic-bezier(.2, .9, .3, 1.3)`. Nothing changes colour, nothing glows.
- **Ambient life, on long unequal periods** (17s, 23s, 31s — nothing a multiple of anything
  else, so the loop never becomes visible): a car sliding along the road on a 2:1 vector,
  the level-crossing light blinking, the crane rotating a few degrees about the vertical,
  a flag. Six moving cells maximum.
- **Nothing enters.** No reveal-on-scroll, no staggered build-in, no bounce-in on load. The
  town is already there when you arrive — that is the point of a rug.
- **Movement along a road is a translate on a world axis**, so the ratio is always 2:1:
  `translate(calc(var(--d) * 2), var(--d))`. Anything moving at another ratio is walking
  through the air.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

Reduced motion must leave the page **complete, not frozen mid-step**: every animated cell's
static state is a composed frame — the car parked at the kerb, the crane square to the lot,
the crossing light dark.

---

## 8. What this is not

The failure mode is rendering something adjacent and calling it isometric:

| Not this | Because |
|---|---|
| A perspective 3D render | One `perspective: 800px` and the town gets a vanishing point, near buildings grow, and the whole illusion becomes a camera. This is the most likely wrong output by a wide margin. |
| A three.js / WebGL scene | Real geometry, real lights, orbit controls, a loading state. This is CSS boxes on a static camera and weighs nothing. |
| A pixel-art tileset | Dithering, 1px sprite grids, scaled-up nearest-neighbour bitmaps, a retro-game frame. Ours is vector-crisp print, not 1994. |
| *Monument Valley* / impossible geometry | Pastel gradients, Escher joins, elegant emptiness. This town is loud, primary and completely legible. |
| Corporate "isometric" stock illustration | Purple-blue gradients on every face, soft ambient occlusion, tiny faceless people, floating rounded slabs. Gradients and soft shadows are the tell. |
| Skeuomorphic 3D-ish UI | Bevels, drop shadows and inner glows on ordinary rectangles. Depth by decoration rather than by projection. |
| A flat top-down map | The rug itself, unlifted. Roads and labels seen from directly above, no walls, no height. Half the reference, none of the direction. |

Also out: `perspective` in any form, blurred shadows, gradients on faces, `border-radius` on
projected surfaces, billboarded labels, angles other than 0/90/±26.565°, buildings that
float free of the ground plane, hover glows, emoji as props, and any second light source.

---

## 9. Page application

`isomorphic/index.html` renders this brief, built to the sub-site authoring contract in the
root `CLAUDE.md` (self-contained folder, wrapper `#site-isomorphic`, JS as a
`SITES['isomorphic']` registry function).

### The plot

A 9×9 grid, columns and rows `0…8`. Blacktop runs the full length of column 4 and row 4,
meeting at a junction at `(4,4)`. A rail line crosses row 0 with a level crossing where it
meets the road. The river cuts the back-right corner. Cells are emitted back-to-front by
`c + r`.

### The buildings — every one a link, every one signed

| Sign | Cell `(c,r)` | Footprint | Floors | Body / roof | Destination |
|---|---|---|---|---|---|
| `GITHUB` | (1,1) | 2×2 | 6 | chalk / cobalt | `https://github.com/malls` |
| `LINKEDIN` | (6,1) | 1×2 | 4 | cobalt / chalk | LinkedIn profile |
| `TWITTER` | (1,6) | 1×1 | 3 + antenna | tangerine / chalk | `https://twitter.com/forrestalmasi` |
| `EMAIL` | (6,6) | 2×1 | 2 | chalk / brick | `mailto:_@forrestalmasi.com` |
| `RESUME` | (7,3) | 1×1 | 2 | sun / brick | résumé (drop the building if there is no link) |

Each is a single `<a>` with an accessible name that is the destination word — `GitHub`, not
"GitHub building". The sign band sits on whichever wall faces the road, preferring the lit
screen-left face. Hover and focus lift the box (§7).

Tab order follows DOM order, which is depth order — back of the plot to front. That is a
coherent spatial sequence, so leave it alone rather than fighting it with `tabindex`. The
plot container takes `role="navigation"` and `aria-label="Site"`; every non-interactive
face and prop takes `aria-hidden="true"`.

### The props — scenery, never clickable

Trees at the four corners and scattered through the sparse block; the **water tower** at
(7,7) with `FORREST ALMASI` painted around its tank; a roadside sign at (3,5) reading
`SOFTWARE DEVELOPER`; a parked car and one moving car; the level crossing at (4,0); traffic
lights at the junction; a parking apron in `--walk` with `--sun` bay markings at (7,2); the
river and a small pond. All `aria-hidden`, all `pointer-events: none`.

The name goes on the water tower because that is where a small town puts its name, and it
keeps the one piece of unavoidable branding inside the world instead of floating above it.

### The legend

**Exactly one unprojected element is permitted on this page, and this is it.** A flat card
at the bottom-left, styled as a printed map legend — chalk ground, 2px ink border, Bungee
caption, Archivo prose — holding *What's up?*, the one-line blurb, and a small key
(a green rhombus for grass, a black bar for road, a red band for "this one is a link").
The key is what teaches the affordance law in §1 without a sentence of instruction.

It is honest for the legend to break the projection: a legend belongs to the map, not to
the territory. Nothing else gets that exemption.

### Build-contract specifics for this direction

- CSS is authored standalone; the single `@import` sits at the very top of `style.css`.
  The build rewrites `html` / `body` / `:root` onto `#site-isomorphic` and prefixes
  everything else — so never set `display` on `html` or `body`, and never set the same
  property differently on the two.
- **Every `@keyframes` name and every SVG `id` is prefixed `isomorphic-`** (`isomorphic-car`,
  `isomorphic-blink`, `isomorphic-tree`). All sites share one document in the built
  `index.html`, and `url(#id)` resolves document-wide — an unprefixed id silently binds to
  another site's.
- No commas inside functional pseudo-classes: write `#site-isomorphic .face:hover` and
  `#site-isomorphic .face:focus-visible` as separate selectors.
- No `position: fixed` (§3.6). JS attaches listeners only to elements inside `root`; every
  site's JS runs on load in the combined page, even while hidden.
- Because the plot is a fixed grid, the site is complete with **no JS at all** — the moving
  cells are CSS animations. Any `SITES['isomorphic']` function is a progressive enhancement
  and the town must be fully navigable without it.

### The test

1. Hold a straightedge to a screenshot: every angle is 0°, 90°, or 26.565°. No exceptions,
   including type, shadows, and the moving car's path.
2. Search the stylesheet for `perspective`, `blur` and `rotate3d`: nothing. Search for
   `border-radius`: only on ground ellipses (§3.1), never on a wall or a roof.
3. Every clickable thing has a sign. Nothing without a sign responds to a pointer.
4. Read the DOM top to bottom: it runs strictly back to front.
5. At 320px: no horizontal scroll, all signs legible, the tower still the tallest thing.

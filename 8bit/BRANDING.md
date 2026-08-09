# 8bit

> Design direction: **an arcade action-adventure, one quarter deep.** The reference is
> the top-down screen of an NES-era Zelda — a walled overworld room drawn in fat
> saturated pixels on a near-black cabinet — crossed with the front glass of the machine
> it runs in: high-score gold, phosphor white, attract-mode text blinking at nobody.
> The page is not *themed like* a game. The page **is the game screen**: the visitor
> steers a hero sprite around a tiled level with the arrow keys, and the site's links
> are doors. Stand on a threshold, press **Up**, and you walk through.

## 1. The direction

Three laws, because getting them wrong produces something that merely looks *retro*
rather than something that looks **8-bit**:

1. **The grid is the law.** Everything — tiles, sprites, type, the HUD, the spaces
   between them — sits on a fixed logical-pixel grid, integer-scaled to the viewport.
   There is exactly one pixel size on screen. A CSS hairline next to a fat sprite pixel
   ("mixels") is the single most likely wrong output; it breaks the fiction that this
   image came out of a 256-wide framebuffer.
2. **The palette is hardware.** Colours are flat, saturated, and few — NES-quantized
   hexes, listed in §2 and nothing else. No gradients, no alpha blending, no blur, no
   glow, no anti-aliasing. Shading is a second flat tone of the same material, drawn as
   pixels, never as an effect.
3. **Motion is stepped.** Nothing eases, fades, or glides. Sprites animate in 2–4 hard
   frames; text blinks square-wave; movement is tile-by-tile. If a transition curve is
   perceptible, it is wrong — the machine has no in-between frames.

And the affordance law, which is really a fourth: **a door is a link; scenery is
scenery.** Every destination is a labelled structure with a dark doorway. Bushes,
rocks, water, critters — decoration, never clickable. The visitor learns the rule once
and it holds everywhere. The game is a control scheme, never a gate: every door is also
a real anchor that works by click, tap, or Tab+Enter with the game ignored entirely.

**Voice.** Attract mode. ALL CAPS, terse, imperative, third person absent: PRESS START,
ENTER, 1 PLAYER. High-score-table register — words are expensive at 8 pixels a letter,
so sentences are three words long. At most one coin-op joke per page (INSERT COIN is
the ceiling). No exclamation marks; the blinking is the exclamation.

---

## 2. Palette

NES-quantized, named for what the colour does in an arcade. Flat fills only — every
colour is opaque, and no colour appears that is not in this table.

### Cabinet

The machine around the game. The largest area on the page.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--void` | Cabinet Black | `#0A0A12` | The bezel — everything outside the screen, and the darkest ink inside it. Blue-black, never `#000`. |
| `--navy` | Dungeon Navy | `#14143C` | Doorway dark, sign plates, wall shadow, the HUD's second ground. |

### Terrain

The level. These colour large runs of tiles, so they decide whether the screen reads
as a place.

| Token | Name | Hex | Note |
|---|---|---|---|
| `--grass` | Overworld Green | `#00A844` | Default ground. |
| `--bush` | Hedge Green | `#007028` | Bushes, tree tops, grass shading. |
| `--sand` | Path Tan | `#F0BC5C` | Paths, bridge planks, sand. |
| `--dirt` | Canyon Brown | `#B85C14` | Rocks, cliffs, fence posts, path shading. |
| `--water` | Zora Blue | `#0058F8` | Water base. |
| `--deep` | Deep Water | `#0000A8` | Water shading, the second shimmer frame. |
| `--stone` | Dungeon Grey | `#7C7C7C` | Walls, statues, the door structures. |

### Actors

Sprites and the HUD. Small areas, loud colours.

| Token | Name | Hex | Note |
|---|---|---|---|
| `--hero` | Tunic Green | `#58D854` | The player character. Appears nowhere else. |
| `--skin` | Sprite Peach | `#FCA860` | Faces and hands. |
| `--coin` | Coin Gold | `#F8B800` | The title, the score, pickups. The signature accent. |
| `--heart` | Heart Red | `#F83800` | The life meter, one roof. |
| `--magenta` | Insert-Coin Magenta | `#E40058` | One critter, one accent. Sparingly. |
| `--ghost` | Ghost Cyan | `#00E8D8` | HUD labels and the context prompt. |
| `--hud` | Phosphor White | `#FCFCFC` | Body text, sign lettering. NES white, never `#FFF`. |

```css
:root {
	--void:    #0A0A12;
	--navy:    #14143C;

	--grass:   #00A844;
	--bush:    #007028;
	--sand:    #F0BC5C;
	--dirt:    #B85C14;
	--water:   #0058F8;
	--deep:    #0000A8;
	--stone:   #7C7C7C;

	--hero:    #58D854;
	--skin:    #FCA860;
	--coin:    #F8B800;
	--heart:   #F83800;
	--magenta: #E40058;
	--ghost:   #00E8D8;
	--hud:     #FCFCFC;

	/* the grid — §3. JS sets --px to an integer; the default renders without JS. */
	--px:   2px;
	--tile: calc(var(--px) * 16);
}
```

### Contrast — the one hard rule

**Type is only ever Phosphor White, Coin Gold, or Ghost Cyan, and it only ever sits on
Cabinet Black or Dungeon Navy.** Everything else in the palette is a sprite colour, not
a letterform. Terrain never carries text — a label over the level sits on its own navy
plate, the way a sign sprite would.

Measured against the two grounds text may sit on (WCAG 2.1, computed):

| Colour | vs Cabinet Black `#0A0A12` | vs Dungeon Navy `#14143C` |
|---|---|---|
| Phosphor White `#FCFCFC` | **19.2** ✓ | **17.1** ✓ |
| Ghost Cyan `#00E8D8` | **12.7** ✓ | **11.3** ✓ |
| Coin Gold `#F8B800` | **11.1** ✓ | **9.9** ✓ |
| Path Tan `#F0BC5C` | 11.3 — sprite only | 10.1 — sprite only |
| Tunic Green `#58D854` | 10.7 — sprite only | 9.5 — sprite only |
| Heart Red `#F83800` | 5.2 ✗ | 4.6 ✗ |
| Dungeon Grey `#7C7C7C` | 4.7 ✗ | 4.2 ✗ |
| Insert-Coin Magenta `#E40058` | 4.2 ✗ | 3.7 ✗ |
| Zora Blue `#0058F8` | 3.5 ✗ | 3.1 ✗ |

The one exception: the wordmark may be Coin Gold with a Cabinet Black hard shadow
offset 2 logical pixels down-right — the classic title-screen treatment. The shadow is
a solid second copy, never a blur.

---

## 3. The pixel system

The core of this brief. The page renders a **256×224 logical screen** — a 3-tile
(48px) HUD over a 16×11-tile (256×176) playfield — scaled up by one integer factor
and centred in the void like a cabinet's glass.

### 3.1 One pixel, one unit

Every dimension on the page is a multiple of `--px`. Tiles are `--tile` (16 logical
px). Sprites live on the tile grid; the half-tile (8 logical px) is the smallest
layout offset that exists. There are **no** other units: no raw `px` values in layout,
no `1px` borders, no percentages on anything visible, no sub-pixel positions ever.

```css
/* the stage is the screen; everything inside is calc(var(--px) * n) */
.stage {
	width:  calc(var(--px) * 256);
	height: calc(var(--px) * 224);
	background: var(--grass);
	image-rendering: pixelated;
}
```

Integer scaling is JS's one layout job (§9): observe the stage's container with a
`ResizeObserver`, set `--px` to `max(1, floor(min(w / 256, h / 224)))` pixels **on the
stage element** — never on `root`. Leftover space is bezel: flat `--void`.

### 3.2 Drawing pixels

Two sanctioned techniques, both self-contained, both crisp at any integer scale:

- **Tiles** — SVG data-URIs with `shape-rendering='crispEdges'`, drawn on a 16×16
  viewBox, repeated via `background-size: var(--tile) var(--tile)`. Terrain rows are
  single divs with a repeating tile background.
- **Sprites** — box-shadow pixel art: a `calc(var(--px))`-square element whose
  `box-shadow` list places one hard shadow per pixel, offsets in `var(--px)` units.
  Frame changes swap the shadow list (via a class or `@keyframes` with `steps()`).

Either way, an asset is authored once on the 16×16 grid and scales with `--px` for
free. Never mix a raster image that wasn't drawn on the grid, and never let the
browser smooth anything: `image-rendering: pixelated` on every drawn surface.

### 3.3 Shading is paint, not effects

A volume gets at most two tones: base and shade (`--grass`/`--bush`,
`--sand`/`--dirt`, `--water`/`--deep`, `--stone`/`--navy`). The shade is drawn as
pixels inside the asset — a dark south-east edge, a checkered dither band where two
tones meet. `box-shadow` blur radius is always `0`. `opacity` is always `1`. The
single permitted translucency on the whole page: one optional scanline overlay across
the stage at `opacity ≤ 0.08`, and it must be removable without anything else changing.

---

## 4. Type

One webfont, imported at the top of `style.css` (a head `<link>` will not survive the
build; the URL contains no raw `;` — single weight — so it needs no escaping):

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

:root {
	--font-game: 'Press Start 2P', 'Courier New', monospace;
}
```

Press Start 2P is an 8×8 bitmap face; it *is* the pixel grid, which is why it is the
only font on the page.

- **Sizes are multiples of 8 logical pixels**: `calc(var(--px) * 8)` for HUD text,
  labels and prose; `* 16` for section headings; `* 24` or `* 32` for the wordmark.
  Any other size lands the glyph grid off the pixel grid and produces mixels in type.
- **ALL CAPS everywhere.** `line-height` in whole pixels — `calc(var(--px) * 16)` for
  8px text. `letter-spacing: 0`; the face carries its own spacing.
- One weight exists. No bold, no italic, no text-shadow except the wordmark's hard
  2-pixel offset (§2). Prose is short by decree: the font is loud and wide, and three
  lines of it is a wall.
- Anything longer than a label (the intro blurb) is Phosphor White 8px text on a navy
  plate, max ~34 characters per line, centred like an NPC dialogue box.

---

## 5. Sprites and tiles

The asset vocabulary. Everything on screen comes from this list; adding scenery means
adding to this list, not importing clip art.

**Terrain tiles:** grass (flat `--grass` with sparse `--bush` pixel tufts), bush
(clickable-looking but not clickable — round `--bush` blob with `--grass` ground),
rock (`--stone` on `--dirt`), path (`--sand` with `--dirt` speckle), water
(`--water` with `--deep` wave pixels, 2-frame shimmer), bridge (`--sand` planks over
water), wall (the room border — `--stone` blocks with `--navy` mortar, Zelda-dungeon
style).

**Structures — the links.** Each is 3 tiles wide × 2 tall on the top wall, with a
1-tile dark doorway (`--navy`, reading as an opening) at its centre and a sign plate
above or beside it — `--navy` plate, `--hud` 8px lettering:

| Structure | Label | Destination |
|---|---|---|
| Stone gate, `--stone` blocks, `--coin` keystone | `GITHUB` | `https://github.com/malls` |
| Bird-statue shrine, `--water`/`--deep` statue | `TWITTER` | `https://twitter.com/forrestalmasi` |
| Post office, `--heart` roof, `--hud` envelope sign | `EMAIL` | `mailto:_@forrestalmasi.com` |
| Stone gate, `--water`/`--deep` banners | `LINKEDIN` | `https://www.linkedin.com/in/forrestalmasi` |
| Dice hut, `--sand` walls, two `--hud` dice signs | `RANDOM` | `/random/` |
| Terminal gate, `--stone` blocks, `--ghost` screens | `SOFTWARE` | `/software/` |

The cave mouth — a dark opening in a rock face on the east screen — is an internal
passage between rooms, **not a link**. New assets for the added rooms: the rock face
tile, the cave mouth, the dungeon floor, the old-man sprite, the 2-frame fire, and
the dialogue plate.

**Hero:** one 16×16 sprite, `--hero` tunic, `--skin` face, `--void` outline pixels.
Four facings (up/down/left/right), 2 walk frames each. Down-facing frame 1 is the
idle.

**Props (never interactive):** signpost, fence, one `--magenta` critter wandering a
short fixed loop, three `--heart` hearts and a `--coin` coin counter in the HUD.

Every sprite reads at 16×16 against its ground — if it needs a caption to be
recognised, redraw it (the sign plates are labels for *destinations*, not legends for
bad sprites).

---

## 6. The level and the controls

The interaction spec. This is what the direction exists to serve.

### 6.1 The rooms

The world is three 16×11 rooms — an overworld west screen, an overworld east screen,
and a dungeon — with exactly one on screen at a time. No scrolling, no camera: walking
through a gap in a wall, or entering or leaving the cave, swaps the whole frame
instantly (§7). Each room is a 16×11 tile map authored as an ASCII grid in
`script.js` — **one artifact drives both rendering and collision**:

```
Legend:  #  wall (solid)       G T E L R S  doorways (links)
         .  grass/floor        =  path            %  bush (solid)
         ~  water (solid)      B  bridge          r  rock (solid)
         C  cave mouth (solid; Up enters, NOT a link)
         X  wall-gap exit      D  dungeon exit    f  fire (solid)
         O  old man (solid)    n  dialogue plate (solid)
```

**Room 1 — overworld west** (spawn 8,9; gap east):

```
################
##G####T####E###
#..............#
#.%%..r....%%..#
#..............X
#~~~~~~B~~~~~~~#
#~~~~~~B~~~~~~~#
#......=....r..#
#..%...=...%%..#
#...%..=.......#
################
```

**Room 2 — overworld east** (three doors; cave mouth in the rock face; gap west):

```
################
##L####R####S###
#..............#
#.%%.....rrrrr.#
X........rrCrr.#
#..%.......=...#
#....~~~~......#
#....~~~~..%%..#
#..r.......%...#
#..............#
################
```

**Room 3 — the dungeon** (about-me plate; exit south):

```
################
################
#..............#
#...f..O..f....#
#..............#
#..nnnnnnnnnn..#
#..nnnnnnnnnn..#
#..nnnnnnnnnn..#
#..nnnnnnnnnn..#
#..............#
########D#######
```

The maps above are normative in shape, not in every tile: the generator may rearrange
scenery, but each room must keep a solid one-tile wall border and enough solid tiles
that reaching a door takes a few deliberate turns — a stroll, not a maze, and never a
dead end. Room 1 keeps its three doorways on the top wall with clear thresholds, at
least one water feature with a bridge, and its wall gap east. Room 2 keeps its three
doorways, the cave mouth in a rock face, and its wall gap west. The dungeon keeps the
dialogue plate, the fires and the old man, and its south exit.

### 6.2 Moving

- **Arrow keys move the hero** (WASD as silent aliases). Movement is tile-by-tile:
  one keypress, one 16-pixel step, animated over ~128ms in 2 hard frames
  (`steps(2)`). Holding a key repeats steps. Two axes held resolves to the most
  recently pressed.
- **Tap to turn:** a press toward a solid tile turns the hero to face it without
  moving — classic, and it makes the collision feel like geometry instead of failure.
- Solid tiles (`#`, `%`, `~`, `r`, structure bodies) block. The critter does not
  block and does not harm; nothing on this page can hurt the player or end the game.
  There is no game over, no score to lose, no timer.

### 6.3 Doors

- Each doorway tile is a **real `<a>` element** positioned on the grid — `G`, `T`,
  `E` in the map. Native behaviour is fully preserved: pointer click or tap follows
  the link, the anchors sit in tab order, Enter activates them, and the whole site
  works with the game never touched.
- The **threshold** is the tile directly south of a doorway. When the hero stands on
  it, the HUD prompt switches from movement hints to `↑ ENTER GITHUB` (cyan,
  blinking) and the doorway lights: its `--navy` opening gains 2–3 `--coin` pixels.
- **Up on the threshold enters:** the hero steps a half-tile into the doorway
  (2 frames), holds one beat (~200ms), then the anchor's `.click()` fires so the
  browser handles navigation natively — `mailto:` included. No `window.location`, no
  `window.open`.
- Walking off the threshold reverts prompt and doorway. Nothing auto-triggers on
  arrival; entering is always the explicit Up press.
- The **cave mouth** uses the same threshold + Up mechanic as a door but is **not an
  anchor** — a door is a link; the cave is a stairwell between rooms. Nothing
  auto-triggers; Up is always explicit. The one exception is walk-through wall gaps
  (`X`/`D`): an open gap is floor, not a door — stepping onto it swaps rooms.

### 6.4 Focus, and the build contract

The authoring contract bans `window`/`document` listeners, which is not a limitation
here — it is the correct design:

- The stage is a `tabindex="0"` element inside `root`; the `keydown` listener lives
  **on the stage**, with `preventDefault()` on arrows so the page never scrolls out
  from under the game. In the combined build every site's JS runs even while hidden;
  keying input to the focused stage scopes it for free.
- Until the stage has focus, the HUD prompt blinks `PRESS START — CLICK OR TAB`.
  Clicking anywhere on the stage focuses it (and does nothing else); `focus` swaps
  the prompt to `ARROWS MOVE · ↑ ENTERS`. On `blur`, back to PRESS START. Never
  steal focus on load.
- The stage's focus ring is diegetic: a 1-logical-pixel `--coin` outline drawn as an
  inset box-shadow ring around the screen — visible, on-palette, on-grid.
- **Coarse pointers** get an on-screen D-pad: four `<button>`s inside `root`,
  bottom-right of the bezel, driving the same step function — plus doors remain
  plain tappable links, which is the real mobile path.

---

## 7. Motion

The machine has 60 frames a second and uses about 8 of them.

- **Everything animates in `steps()`.** Walk cycle 2 frames, water shimmer 2 frames
  (a `--water`/`--deep` palette swap), coin spin 4 frames, critter waddle 2 frames.
  Frame rate ~8fps — durations in multiples of 125ms.
- **Text blinks square-wave:** the prompt toggles at 530ms via `steps(1)` on
  `visibility` — the NES cursor cadence. Never an opacity fade.
- **No `transition` property anywhere on the page.** State changes (doorway
  lighting, prompt swap, D-pad press, room swaps between the three screens) are
  instant frame swaps.
- **No easing curves, no parallax, no screen shake, no scroll effects, no cursor
  trails.** The camera does not exist; the screen does not move.
- Idle animation budget: water, the critter, the blinking prompt, the dungeon fires
  (2-frame flicker), the coin counter ticking up once per second while focused. That
  is all. An 8-bit screen is mostly still — stillness is what makes the blink read.

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

Under reduced motion the prompt rests **visible**, the water rests on its base frame,
and hero steps land instantly — the game stays fully playable, minus the flicker.

---

## 8. What this is not

The failure mode is rendering something adjacent and calling it 8-bit:

| Not this | Because |
|---|---|
| 16-bit lushness | SNES gradients, parallax clouds, 200 colours, translucency. This palette has 16 entries and no alpha. |
| Mixels | Fat sprite pixels next to CSS hairlines, half-pixel offsets, smooth-scaled art. One logical pixel exists on this page. |
| CRT cosplay | Barrel distortion, RGB fringing, bloom, heavy vignettes. One faint scanline layer is the entire concession — the reference is a sharp arcade monitor, not a dying one. |
| Game Boy | Four shades of pea green. Wrong hardware, wrong mood — this page is saturated and dark-cabinet, not handheld and grey. |
| Vaporwave / synthwave | Neon grids to a horizon, chrome type, magenta-on-teal glow. That is the 80s remembered through the 2010s; this is the 80s hardware itself. |
| Arcade-*themed* web design | Rounded cards and drop shadows with a pixel font sprinkled on top. If any element could survive on a normal website unchanged, it is out of vocabulary. |
| A punishing game | Enemies, damage, death screens, anything that delays or blocks a visitor from a link. The game is the *chrome*; the links are the content. |

Also out: gradients of any kind, blurred or grey shadows, border-radius above `0`,
anti-aliased edges, opacity below 1 (scanlines excepted), free-angle rotation,
sub-tile sprite positions, more than one pixel scale, autoplaying audio (any audio,
in fact — the cabinet is on mute), and emoji as decoration.

---

## 9. Page application

`8bit/index.html` renders this brief, built to the sub-site authoring contract in the
root `CLAUDE.md` (self-contained folder, wrapper `#site-8bit`, JS as a
`SITES['8bit']` registry function).

**Structure:**

- **Bezel.** Full-viewport flat `--void` centring the stage — the cabinet around the
  glass. The optional scanline overlay sits over the stage only.
- **HUD** (top 48 logical px of the stage, on `--void`): wordmark `FORREST ALMASI`
  in Coin Gold 16px with the hard 2-pixel shadow; `SOFTWARE DEVELOPER` in Phosphor
  White 8px beneath it; right-aligned: three Heart Red hearts and a gold coin
  counter. Bottom HUD line: the context prompt in Ghost Cyan 8px
  (`PRESS START — CLICK OR TAB` → `ARROWS MOVE · ↑ ENTERS` → `↑ ENTER GITHUB`).
- **Playfield** (256×176): one of the three rooms from §6.1 at a time — the west
  overworld (GITHUB gate, TWITTER shrine, EMAIL post office, water with a bridge,
  the hero spawned on the path near the bottom, one magenta critter on a fixed
  loop), the east overworld (LINKEDIN gate, RANDOM hut, SOFTWARE gate, the rock
  face with the cave mouth), and the dungeon (the about-me dialogue plate, two
  fires, the old man). Wall gaps and the cave swap between them.
- **Doors** are real anchors with visible sign plates; `aria-label`s spell out the
  destination (`GitHub — github.com/malls`). A visually-hidden `<nav>` before the
  stage explains the game to screen-reader and keyboard users and lists all six
  destinations as plain links.
- **D-pad** for coarse pointers, in the bezel, drawn to the same pixel grid.

**Build-contract specifics for this direction** — these bite harder here than for a
static site:

- **CSS identifiers cannot start with a digit.** `#8bit-goo` is an invalid CSS
  selector and `@keyframes 8bit-walk` is invalid CSS, so this site's ids, keyframe
  names and any custom names use the **`eightbit-` prefix** (`eightbit-walk`,
  `eightbit-blink`). This honours the contract's real requirement — document-wide
  uniqueness in the combined build — while staying parseable.
- The `keydown`/`focus`/`blur` listeners live on the stage element inside `root`;
  the D-pad buttons are elements inside `root`; there are **no** `window` or
  `document` handlers of any kind (§6.4). `root` itself is never styled.
- Integer scale via `ResizeObserver` on the stage's container (an element inside
  `root`), writing `--px` onto the stage. The CSS default `--px: 2px` must render a
  complete, correct screen before a single line of JS runs — JS adds play; it does
  not add the page.
- The whole screen fits the viewport by construction (integer downscale to 1×
  minimum), so the site never scrolls and never owns a scroll container.
- The one `@import` (Press Start 2P) sits at the very top of `style.css`; the URL
  contains no raw `;`. No commas inside functional pseudo-classes — write
  `#site-8bit .door:hover` and `#site-8bit .door:focus-visible` as separate
  selectors.
- Standalone boot at the end of the site's own body, per contract:
  `SITES['8bit'](document)`.

**The test.** Zoom to any integer scale and count: one pixel size everywhere, no
colour outside §2's sixteen, no curve, no blur, no fade. Unplug the keyboard and
every link still works with a mouse; unplug the mouse and Tab+Enter still works;
unplug JS and the room still renders with three working labelled links. Then plug the
keyboard back in, walk the hero to the post office, press Up — and the mail client
opens, because a door is a link and always was.

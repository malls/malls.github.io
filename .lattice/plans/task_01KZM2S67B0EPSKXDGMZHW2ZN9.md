# FA-28: 8bit: add level 2 (east screen, more link-doors) + cave dungeon with about-me

Complexity: mid. All work is inside `8bit/` plus a rebuild of the root `index.html`
and a BRANDING.md update. Implementer must obey the sub-site authoring contract in
root `CLAUDE.md` and the design laws in `8bit/BRANDING.md` (read both first).

## 1. Architecture decision: three static `.room` elements, one visible

**Chosen:** per-room markup. `8bit/index.html` gets three sibling room divs inside
`.stage` — `.room.room-1` (existing overworld), `.room.room-2` (east overworld),
`.room.room-3` (dungeon). The stage carries `data-level="1"` hardcoded in the HTML;
JS swaps it. CSS:

```css
.room { display: none; }
.stage[data-level='1'] .room-1 { display: block; }
.stage[data-level='2'] .room-2 { display: block; }
.stage[data-level='3'] .room-3 { display: block; }
```

(Separate selectors, no `:is()`, per contract. Build prefixing handles the rest.)

**Why not re-render one room from JS:** the CSS-default page must render complete
before any JS runs (BRANDING §9), doors must be real anchors present in HTML, and
static markup keeps all six links in the document for the no-JS/AT story. Rejected
re-rendering.

**No-JS story (decided):** without JS the stage keeps `data-level="1"`, so level 1
renders with its three working doors (GITHUB/TWITTER/EMAIL). Rooms 2/3 are
`display: none` — their anchors exist but are not tabbable/level-swappable without
JS. To keep every destination reachable for AT and no-JS users regardless, the
visually-hidden `.sr` block becomes a `<nav>` with a real link list (§6 below).
That is the reachability guarantee; the hidden-room doors are the in-game path.

**Hero moves out of the room.** The hero must exist in whichever room is active, so
it moves from inside `.room` to a new sibling overlay `<div class="field"
aria-hidden="true">` placed after the three rooms: same geometry as `.room`
(absolute, top `calc(var(--px) * 48)`, 256×176 logical), `z-index: 5`,
`pointer-events: none` (so door clicks pass through), transparent background. Hero
keeps its inline start position `left: tile*8; top: tile*9`. The critter stays
inside `.room-1` (auto-hidden on other levels). `.scan`/`.ring`/HUD unchanged.

## 2. The three maps (authoritative — put these verbatim in script.js)

Legend (extends existing): `#` wall · `.` grass/floor · `%` bush · `~` water ·
`B` bridge · `r` rock · `=` path — plus new: `L` LinkedIn door · `R` Random door ·
`S` Software door · `C` cave mouth (solid; Up-enterable, NOT an anchor) ·
`X` level-exit gap (walk onto it to swap rooms) · `D` dungeon exit (same) ·
`f` fire (solid prop) · `O` old man (solid prop) · `n` dialog plate (solid).
Walkable stays `WALK = '.=B'`; `X`/`D` are handled explicitly before the walk
check; everything else blocks (tap-to-turn).

**Level 1** — only change from today's map: row 4 gains the east gap `X` at (15,4).
Everything else byte-identical to the current `MAP`:

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

**Level 2** (new; doors L@(2,1), R@(7,1), S@(12,1); rock face rows 3–4 cols 9–13
with cave mouth C@(11,4), threshold path tile at (11,5); west gap X@(0,4); pond
rows 6–7 cols 5–8):

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

**Level 3, dungeon** (fires f@(4,3),(10,3); old man O@(7,3); dialog plate `n` rows
5–8 cols 3–12; exit D@(8,10); hero enters at (8,9) facing up):

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

All rows are exactly 16 chars, 11 rows each (verify with the sanity script, §9).

## 3. Transitions (spec)

Room swaps are **instant frame swaps** — no scrolling, no camera, no transition
curve (BRANDING §7). Data tables in script.js:

```js
var MAPS = { 1: [/* level 1 */], 2: [/* level 2 */], 3: [/* dungeon */] };
var level = 1, MAP = MAPS[level];
var EXITS = {
    '1:15,4': { level: 2, x: 1,  y: 4, face: 'right', label: '> GO EAST' },
    '2:0,4':  { level: 1, x: 14, y: 4, face: 'left',  label: '< GO WEST' },
    '3:8,10': { level: 2, x: 11, y: 5, face: 'down',  label: 'v LEAVE CAVE' }
};
var CAVE_DEST = { level: 3, x: 8, y: 9, face: 'up' };
```

- **Walk-through exits (X/D):** in `move(dir)`, after the door check and before the
  `WALK` check, look up `EXITS[level + ':' + tx + ',' + ty]`. If found: perform the
  normal step animation onto that tile (half-step, then settle at `reduced ? 0 :
  64`ms), and in the settle callback call `warp(exit)` instead of just settling.
  Do NOT clear `held` — holding right through the gap keeps walking in level 2.
- **`warp(dest)`:** `level = dest.level; MAP = MAPS[level];
  stage.setAttribute('data-level', String(level)); px = dest.x; py = dest.y;`
  set hero `data-face` to `dest.face`, `data-frame` to `0`, `setPos(hero, px*16,
  py*16)`, `moving = false; entering = false;` then `threshold()`.
- **Cave (C) — decided: NOT an anchor.** A door is a link; the cave is an internal
  passage (a stairwell), so it is scenery-with-behavior. It mirrors door mechanics:
  standing on the threshold tile directly south of `C` lights the cave mouth and
  prompts `^ ENTER CAVE`; pressing Up runs `caveEnter()` — same shape as `enter()`
  (set `entering`, clear `held`, face up frame 1, half-step up) but after the
  `reduced ? 0 : 200`ms beat it calls `warp(CAVE_DEST)` instead of `.click()`.
- Dungeon spawn (8,9) is directly north of `D`, so `v LEAVE CAVE` blinks on
  arrival — the way out is visible immediately.

## 4. script.js changes (beyond §3)

- `DOORS` becomes `{ G:'GITHUB', T:'TWITTER', E:'EMAIL', L:'LINKEDIN', R:'RANDOM',
  S:'SOFTWARE' }`. The existing `doors` collection (`querySelectorAll('.door')` +
  `data-door`) already picks up all six anchors across rooms. Add
  `var cave = root.querySelector('.cave');`.
- `threshold()` rewrite, in priority order:
  1. North tile is a door letter → light that door (existing loop), prompt
     `'^ ENTER ' + DOORS[letter]`, blinking.
  2. North tile is `C` → `cave.classList.add('lit')`, prompt `^ ENTER CAVE`,
     blinking. (Always `toggle('lit', t === 'C')` on the cave, mirroring doors.)
  3. Else scan the 4 neighbours `(px±1,py),(px,py±1)` for an `EXITS` key on the
     current level → prompt that exit's `label`, blinking.
  4. Else existing focused/unfocused prompts unchanged
     (`ARROWS MOVE - UP ENTERS` / `PRESS START - CLICK OR TAB`).
- `move()`: door check now also catches `t === 'C' && dir === 'up'` → `caveEnter()`.
- Critter: level-1 only (decided; no per-level critters). Its interval body gains
  `if (level !== 1) return;` as the first line and reads `MAPS[1]` instead of `MAP`.
  The element stays in `.room-1` so it is hidden on other levels anyway.
- No new listeners anywhere; everything stays on `stage`/elements inside `root`.
  No `window`/`document` handlers. D-pad and ResizeObserver untouched.

## 5. index.html changes

- `.stage` gains `data-level="1"` and its `aria-label` becomes: `"Playable level.
  Arrow keys move the hero; up at a door follows its link; gaps in the walls lead
  to more screens."`
- Wrap the existing room content in `<div class="room room-1">`; move `.hero` out
  into `<div class="field" aria-hidden="true">…hero…</div>` placed after the three
  rooms (§1). Critter stays in room-1. Add to room-1, after the wall strips:
  `<span class="tile gap-e" style="left: calc(var(--tile) * 15); top:
  calc(var(--tile) * 4);"></span>` (the east opening, drawn over the wall strip —
  strips have no z-index, DOM order wins, so gap tiles come after strips).
- **`.room.room-2`:** same five wall strips; west gap `.tile.gap-w` at (0,4);
  `.strip.rockface` at left tile*9, top tile*3, width 5 tiles, height 2 tiles;
  `<span class="cave" style="left: calc(var(--tile) * 11); top: calc(var(--tile) *
  4);"></span>` (a span, not an anchor); `.strip.pond` at left tile*5, top tile*6,
  4×2 tiles; bush tiles at (2,3),(3,3),(3,5),(11,7),(12,7),(11,8); rock tile at
  (3,8); three gates reusing the `.gate`/`.plate`/`.door` pattern at left tile*1,
  tile*6, tile*11:
  - `gate-linkedin`, plate `LINKEDIN`, `<a class="door" data-door="L"
    href="https://www.linkedin.com/in/forrestalmasi"
    aria-label="LinkedIn — linkedin.com/in/forrestalmasi">`
  - `gate-random`, plate `RANDOM`, `<a class="door" data-door="R" href="/random/"
    aria-label="Random — another version of this site">`
  - `gate-software`, plate `SOFTWARE`, `<a class="door" data-door="S"
    href="/software/" aria-label="Software — another version of this site">`
  (Root-absolute hrefs are correct here: `/random/` and `/software/` are sibling
  sub-sites on the same domain; the build's URL rewriting is CSS-only and HTML
  hrefs are untouched.)
- **`.room.room-3` (dungeon):** wall strips including `.wall-r1` (row 1 is solid
  wall — no gates); south opening `.tile.gap-s` at (8,10) drawn after the strips;
  fires `<span class="fire" aria-hidden="true">` at (4,3) and (10,3); old man
  `<span class="oldman" aria-hidden="true">` at (7,3); the dialog plate:

  ```html
  <p class="about">FORREST ALMASI<br>SOFTWARE DEVELOPER<br>HE WRITES CODE.<br>THIS IS HIS SITE.</p>
  ```

  That copy is final — ALL CAPS, attract-mode, verifiable facts only, longest line
  18 chars (≤34).

## 6. Screen-reader / no-JS block (replaces the current `.sr` paragraph)

```html
<nav class="sr" aria-label="Site links">
	<p>Forrest Almasi, software developer. This page is a small game across three
		screens: click the screen, move the hero with the arrow keys, walk to a door
		and press up to follow its link. A gap in the right wall leads to a second
		screen; the cave there leads to a room about Forrest; every doorway is an
		ordinary link. All destinations:</p>
	<ul>
		<li><a href="https://github.com/malls">GitHub</a></li>
		<li><a href="https://twitter.com/forrestalmasi">Twitter</a></li>
		<li><a href="mailto:_@forrestalmasi.com">Email</a></li>
		<li><a href="https://www.linkedin.com/in/forrestalmasi">LinkedIn</a></li>
		<li><a href="/random/">Random — another version of this site</a></li>
		<li><a href="/software/">Software — another version of this site</a></li>
	</ul>
</nav>
```

Keep the existing `.sr` off-screen CSS (it already hides this). Known, accepted
tradeoff: sighted keyboard users tab through six invisible link stops before the
stage; that is the standard skip-content pattern cost and guarantees every
destination is reachable with no JS and from any level.

## 7. style.css changes

All colors from the existing 16-token palette only; every position/size in
`calc(var(--px|--tile) * n)`; SVG data-URI tiles with `crispEdges` on a 16×16
viewBox (gates 48×32), matching the existing assets; no transitions; new keyframe
names prefixed `eightbit-`. No ids are introduced (classes only).

- Room visibility rules from §1. Move the grass background from `.room` to a rule
  shared by `.room-1` and `.room-2` (two separate selectors); `.room-3` floor:
  `--void` base tile with sparse `--navy` block/grid pixels (dark cavern floor, so
  the navy plate and fires read against it). Dungeon walls reuse the existing
  stone/navy wall tile classes as-is.
- `.field`: geometry of `.room`, `z-index: 5`, `pointer-events: none`.
- `.gap-e` / `.gap-w`: grass tile with a 2-logical-px `--navy` shade band along top
  and bottom edges (the cut ends of the wall). `.gap-s`: `--navy` base with
  `--void` horizontal stair bands (stairs out).
- `.rockface` tile: `--dirt` base, `--stone` blocky mountain texture, a few
  `--void` crack pixels (kin to `.rock`, inverted emphasis). `.cave`: one tile,
  `--void`/`--navy` opening with a `--stone` rim; give it the same `::after`
  coin-pixel treatment as `.door::after` and a `.cave.lit::after { display:
  block; }` rule (no hover/focus rules — it is not interactive).
- `.pond`: reuse the river water art and the existing `eightbit-shimmer` animation.
- Gates (48×32 SVGs, same construction as existing three):
  - `.gate-linkedin`: `--stone` gate, `--navy` mortar, `--water`/`--deep` banner
    blocks flanking the doorway.
  - `.gate-random`: `--sand` hut, `--dirt` frame, two `--hud` dice faces with
    `--void` pips flanking the doorway (mirrors the email envelopes composition).
  - `.gate-software`: `--stone` gate, `--ghost` terminal-screen blocks with
    `--void` frames flanking the doorway.
- `.fire`: 16×16 sprite, `--heart` flame body, `--coin` inner flame, transparent
  ground; 2-frame flicker via new `@keyframes eightbit-flicker` (background-image
  swap, `steps(1, end)`, duration a multiple of 125ms, e.g. 0.5s). The global
  reduced-motion rule already parks it on one frame.
- `.oldman`: 16×16 sprite, `--dirt` robe, `--skin` face/hands, `--hud` beard,
  `--void` outline pixels. Static — no animation.
- `.about`: absolute at left tile*3, top tile*5, width tile*10, height tile*4;
  `background: var(--navy)`; `box-shadow: inset 0 0 0 var(--px) var(--stone)`
  (same ring as `.plate`); `color: var(--hud)`; `font-size: calc(var(--px) * 8)`;
  `line-height: calc(var(--px) * 16)`; `text-align: center`; `margin: 0`;
  `z-index: 2`. Four lines × 16px line-height = exactly 4 tiles.

## 8. BRANDING.md updates (exact sections — do NOT regenerate the page)

**Warning to implementer:** editing `8bit/BRANDING.md` may fire a PostToolUse hook
suggesting the `brand-page` skill regenerate `index.html`. You ARE the
regeneration — ignore the suggestion; never wholesale-regenerate or overwrite the
existing hand-built page.

- **§5, structures table:** add three rows — LINKEDIN →
  `https://www.linkedin.com/in/forrestalmasi`, RANDOM → `/random/`, SOFTWARE →
  `/software/` — and a short paragraph after the table: the cave mouth (dark
  opening in a rock face) is an internal passage, not a link; new assets: rock
  face, cave mouth, dungeon floor, old-man sprite, 2-frame fire, dialog plate.
- **§6.1:** retitle "The room" → "The rooms". State the world is three 16×11
  rooms — overworld east/west plus a dungeon — one on screen at a time, swapped by
  walking through a wall gap or entering/leaving the cave; the swap is an instant
  frame swap, no scrolling, no camera. Include all three maps from §2 of this plan
  with the extended legend (`L R S C X D f O n`). Keep the "normative in shape,
  not in every tile" caveat, extended: level 1 keeps its wall gap east, level 2
  keeps three doors + cave + gap west, the dungeon keeps the plate, the props, and
  the south exit.
- **§6.3:** add a bullet: the cave mouth uses the same threshold + Up mechanic as
  doors but is NOT an anchor — a door is a link; the cave is a stairwell between
  rooms. Nothing auto-triggers; Up is always explicit (walk-through wall gaps are
  the one exception: an open gap is floor, not a door).
- **§7:** add room swaps to the instant-frame-swap list; add the dungeon fire
  (2-frame flicker) to the idle animation budget.
- **§9:** update the playfield bullet to mention the three rooms, and the
  visually-hidden note bullet to say it is a nav listing all six links.

## 9. Verification

1. Sanity script (scratchpad, throwaway — not committed): parse the three MAP
   arrays out of `8bit/script.js` (or re-declare them) and assert 11 rows × 16
   chars each; assert door letters {G,T,E,L,R,S} match the `data-door` attributes
   in `8bit/index.html`; assert every `EXITS` destination tile is walkable in the
   target map and every X/D tile has a walkable approach neighbour.
2. `node build.js` succeeds; grep built `index.html` for `#site-8bit .room-2`,
   `data-door="L"`, `eightbit-flicker`, and confirm no unprefixed selectors leak.
3. `python3 -m http.server` from repo root: check `/8bit/` standalone — arrow-walk
   right wall gap → level 2; each of LINKEDIN/RANDOM/SOFTWARE by click, by
   Up-at-threshold, and by Tab+Enter; cave Up → dungeon with about text; walk onto
   D → back to level 2 at the cave threshold; walk onto west X → level 1. Check
   root `/` at a 1200–1299px viewport behaves the same. Confirm no-JS (disable JS
   or comment the boot script mentally): level 1 renders with three working doors.

## 10. Acceptance criteria

1. Standalone `/8bit/` works end to end: right-wall gap → level 2; the three new
   doors work by click AND Up-at-threshold AND Tab+Enter; cave Up-entry → dungeon
   shows the about-me plate; dungeon south exit → level 2; west gap → level 1.
2. `node build.js` succeeds and the built root page at 1200–1299px works the same.
3. No colors outside the 16-token palette; no `transition`/easing anywhere; one
   pixel size (`--px` multiples only); all new keyframes/names `eightbit-`
   prefixed; no `window`/`document` listeners; no commas in functional
   pseudo-classes; cave is not an `<a>`; all six doors are real `<a>`s.
4. `prefers-reduced-motion`: game fully playable, prompts rest visible, fires and
   water rest on one frame, warps instant.
5. `.sr` block updated per §6 — all six destinations listed as real links.
6. BRANDING.md updated exactly per §8; existing page not regenerated.

## 11. Implementation steps

1. `lattice status task_01KZM2S67B0EPSKXDGMZHW2ZN9 in_progress --actor agent:<id>`
   (orchestrator does this before spawning the implementer).
2. Edit `8bit/index.html` per §5–§6.
3. Edit `8bit/style.css` per §7.
4. Edit `8bit/script.js` per §2–§4.
5. Edit `8bit/BRANDING.md` per §8 (ignore any regenerate-page hook suggestion).
6. Run the §9 sanity script; run `node build.js`; verify standalone + built pages
   over a local http server.
7. **Commit 1 — pre-existing FA-27 memphis work, exactly as found (do not touch or
   revert it):** `git add memphis/style.css index.html
   .lattice/events/task_01KZKVRNX9AZPW22TVJ7JEEZ6Q.jsonl
   .lattice/plans/task_01KZKVRNX9AZPW22TVJ7JEEZ6Q.md
   .lattice/tasks/task_01KZKVRNX9AZPW22TVJ7JEEZ6Q.json
   .lattice/events/_lifecycle.jsonl .lattice/ids.json` then commit with message
   `FA-27: memphis scroll container fix` ending with the trailer
   `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`. (index.html here is
   the pre-FA-28 build output containing the memphis change; the shared lattice
   files are append-only and committed as they stand — do not try to split them.)
   Note this happens BEFORE staging any 8bit work; do step 7 before `node
   build.js` rewrites index.html in step 6 — i.e., actual order: sanity script →
   commit 1 → `node build.js` → verify → commit 2.
8. **Commit 2 — FA-28:** `git add 8bit/ index.html` plus the FA-28 lattice files
   (`.lattice/tasks|plans|events/task_01KZM2S67B0EPSKXDGMZHW2ZN9.*`,
   `.lattice/events/_lifecycle.jsonl`, `.lattice/ids.json`). Message starts
   `FA-28: ` (e.g. `FA-28: 8bit level 2 + about-me cave dungeon`), same co-author
   trailer. Commit on the current branch; do not push.
9. `lattice status … review --actor agent:<id>` (orchestrator), then the review
   sub-agent runs per project workflow.

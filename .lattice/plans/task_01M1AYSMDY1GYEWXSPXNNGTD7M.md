# Plan — FA-29: Make shibuya more realistic (denser, more physical street scene)

Complexity: medium. All changes are static paint — no new animations, no JS changes.

## What "more realistic" concretely means

The current page is a faithful but *sparse* render of shibuya/BRANDING.md. Standing in
the real canyon you see: building faces tiled floor-to-roof with signage, floor slabs
and window grids behind the signs, storefront light pooling at street level, a wet road
smearing every hue upward at your feet, and signage density *increasing* toward the
haze. The page currently has: 2 stacks × 3 signs per mid band, bare asphalt walls with
one faint floor-line gradient, a single `--wet` linear gradient, and 3 columns of
abstract bulbs in the far band.

Five moves, each judged against BRANDING.md:

### 1. Much denser mid-band wall signage — IN
§7.2's table says mid is "the bulk of the signage" and "density inverts with distance";
§6 says "no dead space — the dark is between things, never wide empty fields."
- Go from 2 wallstacks per mid band to **4 per wall**, each with 4–6 items (mix of
  existing `.wsign`, `.wpanel`, plus two new cheap species below).
- New cheap scenery species (class-based, no ids, no keyframes — §10 says the canyon
  adds none, keep it that way):
  - `.wtube` — a mid-distance tube-outline mini board: `--board` fill, 2px `--hue`
    border, small halo box-shadow. The cheap half of §3.3's `.board-tube` (skip
    `--wash`/inset white edge at this distance — §7.2 allows approximations).
  - `.wlantern` — a tiny paper-lantern dot (`--paper` ground, `--r-full`, warm halo).
    Real streets have chōchin at mid distance; one or two per wall, no more (the
    lantern is "the one soft rounded element", §3.3 — scarce even as scenery).
- Vary sizes (§3.5 "sizes unequal"), stagger every stack's top offset (§6 "no two
  stacks align to the same top edge"), and hand-check hue adjacency: **no two
  adjacent items in a stack, and no two horizontally neighbouring items across
  stacks, share a hue** (§3.5). This is the fiddly part — lay out the hue sequence
  per stack on paper (7 hues available) before writing markup.
- All of it stays inside `aria-hidden="true"` walls, JP strings get `lang="ja"`
  (§4, §7.3 rule 1). Real signage vocabulary only — 食堂, 麻雀, 銭湯, ラーメン,
  クリーニング, 不動産, 金券, ビル names like 渋谷ビル 3F — no kitsch (§9).

### 2. Building fabric — floors, windows, storefront spill — IN
§2's films exist precisely for this ("wall texture, mounting hardware"); §7.3 keeps it
all scenery. The wall today is a flat `--asphalt` plane with one repeating floor line.
- **Window fabric as background layers, not elements** (performance: one paint, zero
  DOM). On `.canyon-wall`, layer:
  - the existing depth-fade gradient (keep, top layer);
  - a floor-slab repeating gradient (existing, tighten rhythm to ~9vh);
  - a **vertical mullion** repeating gradient (`--film-1`, thin, every ~6vw) — with
    the floor lines this implies a window grid at `--film-1` alpha. This is building
    fabric, not a §9 "synthwave grid": it's not glowing, not on the ground, not a
    horizon — it's 4% white on asphalt, the structure signs bolt onto.
  - Keep total background-image list within the build contract (plain gradients,
    no at-rules involved).
- **A few lit windows** — one absolutely-positioned element per wall (`.wall-windows`)
  carrying 4–6 small `radial-gradient`/`linear-gradient` window rectangles in dim warm
  tints (e.g. `rgb(255 200 140 / 0.10–0.18)`) via multiple background positions on one
  element. Interior light, someone still up — cheap, physical, characterful. These are
  lights, so §9's "light glows, surfaces do not" is satisfied.
- **Storefront spill at wall bases**: a bottom-anchored gradient layer per wall (can
  ride the same `.wall-windows` element or the wall's own background list): 2–3
  low-alpha hue pools rising ~12–18% from the wall base (e.g. izakaya orange on the
  left wall base, konbini cyan on the right) — the light of ground-floor shops. Alphas
  in the 0.06–0.14 range so the wall stays near Board luminance (§7.3 rule 2 — wall
  glow must not creep behind readable near-layer bare tube type; check the hero
  `forrest almasi` against its backdrop after this lands).

### 3. Wet road plane with reflection streaks — IN (the headline move)
`--wet` exists for exactly this (§2: "asphalt reflection streaks") and is currently
used once. Two coordinated pieces:
- **A real ground plane in the canyon**: add `.canyon-road`, a third direct child of
  `.canyon` — same one perspective parent, so it converges on the same single central
  vanishing point (§7.1's construction stays one-point; the rule is against a *second
  perspective value*, not a third plane). Hinged on the viewport bottom edge:
  `position: absolute; left: -20%; right: -20%; bottom: 0; height: ~55%;
  transform-origin: center bottom; transform: rotateX(~62deg);` (tune so its far edge
  dies into `.canyon-end`'s haze). Painted, back to front:
  - `--asphalt` base with a darkening gradient toward the far edge (air, §7.2);
  - **vertical reflection streaks**: a `repeating-linear-gradient(90deg, --wet …)`
    with irregular widths, plus 4–6 positioned low-alpha hue smears
    (`linear-gradient(to top, rgb(<hue> / 0.10), transparent)` at background positions
    roughly under the wall sign clusters — magenta/orange smears left, cyan/yellow
    right). Perspective foreshortens the streaks toward the centre for free.
  - **No cross lines, ever** — vertical streaks only. A lit ground grid is §9's
    synthwave ban; wet asphalt streaks are the specific optical fact we want.
  - The plane is scenery: inside the `aria-hidden` canyon, `pointer-events: none`
    inherited, clipped by `.canyon`'s `overflow: clip` (§7.3 rule 6 keeps 320px safe).
  - Give it its own mild dimming (`filter: brightness(…)`) if needed — but **never a
    filter on `.canyon` itself** (§7.3 rule 5 corollary).
- **Near-ground wash**: strengthen the existing bottom `--wet` gradient in
  `.street-glow` and add up-fading hue streak gradients in its `background-image` list
  (linear gradients only — §3.4 caps *radials* at three and we're already at three;
  don't add a fourth radial). This ties the near layer's feet to the wet road behind it.

### 4. Denser, more varied far band — IN
§7.2: far is "densest — micro signs packed toward the haze… tiny --film/hue marks, not
full boards"; "at that distance a sign is a light, not a message."
- Grow each far band from 3 to **4–5 wallstacks**, each with 7–9 marks. Add two new
  mark shapes beside `.bulb`/`.bulb-wide`: `.bulb-dot` (a ~1vmin square lamp) and
  `.bulb-col` (a thin tall strip — a distant edge-sign stack read as one light). All
  are `background-color: var(--hue)` + small halo; reuse the `.neon-*` custom-property
  classes for hue variety.
- Add one **deeper faked band** per wall: `.band-deep`, `transform: scale(0.6)` (§7.2:
  extra distance is faked with `scale()` on flat elements, never `translateZ`), inside
  the existing `.depth-far` filter subtree so it inherits dim+blur — a last clutter of
  8–12 tiny marks dissolving into `.canyon-end`. No new filter tier needed (avoid a
  fourth named depth; the brief defines three).
- Slightly enlarge/warm `.canyon-end` haze so the denser far light plausibly feeds it.

### 5. Sky band / power lines — OUT (judged against the brief)
- **Sky**: §7.1 — "The street ends in sign-haze, never in sky." Walls stay full
  height; no sky band.
- **Power lines**: real Tokyo fabric, but drawing a believable catenary needs either a
  large border-radius arc (collides with §5's radius vocabulary: 0 / 2px / 6px / the
  lantern only) or SVG clutter for a marginal gain; a straight `--film-1` line reads
  as a bug, not a wire. Skipped; note it in the review comment as considered-and-cut.

### Also deliberately NOT changing
- The near layer (hero, marquee, letter, links, footer): §7.2 — "near is sparse — the
  few signs you stand under." Realism comes from the scenery, not from crowding the
  readable layer. No new near signs.
- Motion budget: **zero new animations**. Wall signage stays static (§7.3 rule 4:
  animated signs never sit on a depth-filtered layer; §3.4/§8 budgets already spent).
  The one `.sign-dying`, one `.sign-cycle`, one marquee, one chase remain the only
  moving things.
- `script.js`: unchanged. `.pow` stays near-layer-only; scenery does not power up
  (animating inside the filtered 3D subtree re-rasterises the plane — §7.3 rule 4).

## Files that change

| File | Change |
|---|---|
| `shibuya/index.html` | Canyon markup: denser mid bands (4 stacks/wall), new `.canyon-road` element, denser far bands + `.band-deep`, `.wall-windows` elements. Near layer untouched. |
| `shibuya/style.css` | New classes: `.canyon-road`, `.wtube`, `.wlantern`, `.wall-windows`, `.bulb-dot`, `.bulb-col`, `.band-deep`; enriched `.canyon-wall` background lists; `.street-glow` streak additions; responsive updates. |
| `index.html` (root) | Regenerated by `node build.js` — never hand-edited. |

## Build-contract cautions (root CLAUDE.md + BRANDING §10)

- All new CSS is class-based: **no new ids, no new `@keyframes`** (nothing to prefix —
  by construction, per §10).
- No commas inside functional pseudo-classes; write separate selectors.
- Only `@media` at-rules added (inside the existing blocks where possible). No
  `@import` (the no-webfont decision stands). No literal `</style>`.
- Don't set `display` on `html`/`body`; no `position: fixed` anywhere; scenery keeps
  `pointer-events: none`.
- No local assets — everything is gradients and box-shadows, so no `url()` rewriting
  concerns.
- Run `node build.js` and commit `shibuya/*` **together with** the rebuilt root
  `index.html`.

## Performance cautions

- Everything added is static paint. The `.depth-far` blur + wall rotation rasterise
  once (§7.3 rule 3); adding content there costs a one-time raster, not per-frame work.
- Prefer multi-layer `background-image` on one element over many DOM nodes (windows,
  streaks, spill). Target: canyon DOM grows by roughly 60–90 elements total, no more.
- `.canyon-road` is a large rotated plane — one extra composited layer, static. Keep
  its gradients simple; no blur filter on it unless visually necessary.

## Responsive plan (≤700px)

- Far band is currently `display: none` below 700px — keep; `.band-deep` hides with
  it. Mid bands drop to 2–3 stacks (hide the extra stacks with a class, e.g.
  `.wallstack-wide { display: none }` under the media query — commas in plain selector
  lists are fine, just not inside functional pseudo-classes).
- `.canyon-road` stays (it's cheap and it's the realism win) but shortens its height;
  verify it never causes horizontal scroll at 320px (it's clipped by `.canyon`).
- Re-verify 320px: no horizontal scroll, walls clipped, street content wraps.

## Acceptance criteria

1. **§10 test checklist passes in full**: all seven neons present; ≥4 sign species;
   ≥3 vertical-writing runs; exactly one flickering element, floor 0.55; no
   colour-on-colour type; every readable pairing passes §2 with glows off; exactly one
   vanishing point, dead centre, both walls (and now the road) converging on it;
   everything on a wall / behind a depth filter is `aria-hidden`; every readable
   element flat, unfiltered, near; scene static — no parallax, unchanged under reduced
   motion; every sign steady-lit under reduced motion; no horizontal scroll at 320px.
2. **Hue adjacency audit**: no two adjacent scenery signs share a hue, within stacks
   and across neighbouring stacks (§3.5).
3. **Zero new animations, ids, or keyframes**; `script.js` byte-identical.
4. The scene visibly reads denser/more physical: packed mid walls, window fabric,
   storefront spill, wet road with hue streaks, far clutter feeding the haze —
   compare standalone page before/after at ~1280px and ~375px.
5. Hero bare-tube type still has near-night behind it (§7.3 rule 2) — if the left
   wall's spill brightens the hero backdrop, dim the spill, not the hero.
6. `node build.js` run; standalone `shibuya/index.html` (via `python3 -m http.server`
   or `file://`) and the built root `index.html` both render correctly; rebuilt root
   `index.html` committed with the source changes.
7. Reduced-motion check: scene identical (it's static by construction).

## Implementation order

1. `.canyon-road` + street-glow streaks (biggest single realism win; verify geometry).
2. Wall fabric (backgrounds + `.wall-windows` + storefront spill).
3. Mid-band densification (new species, hue-adjacency layout).
4. Far-band densification + `.band-deep` + `.canyon-end` tune.
5. Responsive pass (700px, 320px), reduced-motion check.
6. `node build.js`, verify standalone + built, commit all together.

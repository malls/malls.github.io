# FA-19: shibuya/BRANDING.md: add street-canyon perspective + 3 depth layers vanishing to center

Amendment to `shibuya/BRANDING.md` (FA-13's deliverable, commits 317ab19/d009d87).
**Edit, don't rewrite.** Scope is the branding document only — no changes to
`shibuya/index.html`, `style.css`, or `script.js` under this task (page regeneration
is downstream work; the `brand-page` skill hook may fire on the edit — that is
expected and out of this task's scope to hand-manage).

## Intent

The street becomes a canyon seen head-on: left and right walls of dense vertical
signage converging on a single vanishing point at the center of the viewport, with
three named depth layers carrying scale, brightness, and blur falloff.

**Terminology, handled honestly (required by the task comment).** The user asked for
"two-point perspective." A head-on street canyon is a **one-point** construction:
both walls converge on the *same* central vanishing point; the "two" the eye counts
are walls, not points. Two-point is what you get standing at a corner looking at a
building's edge — not this shot. The new section must say this plainly, in the
brief's wry voice (e.g. "Two walls, one point. The request said two-point; the
street disagrees — you get two vanishing points by standing on a corner, and this
page stands in the middle of the road."). Do not silently rename; reconcile on the
page.

## Placement and renumbering

Insert **one new top-level section after current §6 (Layout and composition)**:

> `## 7. Depth — the canyon`

Perspective is composition-scale, not a sign recipe, so it belongs beside §6, not
inside §3. Subsequent sections renumber: Motion 7→**8**, What this is not 8→**9**,
Page application 9→**10**.

**Cross-reference fixes (verified by grep; re-grep `§[0-9]` after editing):**

| Line (pre-edit) | Current | Becomes |
|---|---|---|
| 62 | "the one hue-cycling sign (§7)" | (§8) |
| 312 | "At most one animated sign per stack (§7)" | (§8) |
| 435 | "never `position: fixed` (§9)" | (§10) |
| 599 | "on the ticker (§7)" | (§8) |
| 623 | "as §7's hover pair does" | as §8's |

Unaffected refs (§2, §3.x, §4, §6) stay. The new section will itself be referenced
from §6 and §10 (add those pointers, see below).

## Content of new §7 "Depth — the canyon"

Follow the house pattern: short framing prose, complete copy-pasteable utility
classes, then a bulleted gotcha list. Three subsections.

### 7.1 The scene — one point, two walls

Framing prose: the one-point/two-wall reconciliation above, plus the construction:
one parent owns `perspective` with `perspective-origin` at viewport center, so every
transformed child shares the single central vanishing point. The walls are two
planes rotated toward each other, hinged on the viewport edges.

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
```

Key facts the prose must state:

- Both walls are direct children of the one `.canyon`; a shared parent perspective
  is what makes the convergence geometrically true. Two separate `perspective`
  values would give two vanishing points — the corner shot, banned.
- `transform-origin` on the outer edge pins the near end of each wall to the
  viewport edge; the far end recedes to the centre on its own.
- **No `transform-style: preserve-3d` anywhere.** The 3D tree is exactly one level
  deep: perspective parent → rotated plane. Everything on a wall is flat paint *on*
  the plane; perspective foreshortens it automatically along the wall's run. This
  is a decision, not an omission — see gotchas.
- A `.canyon-end` element: the vanishing-point terminus, a small low-alpha radial
  haze (mixed light of every far sign — desaturated blue-violet, e.g.
  `radial-gradient(closest-side, rgb(150 160 210 / 0.10), transparent 70%)`)
  centred on the perspective-origin. The street ends in sign-haze, never in sky.

### 7.2 The three depth layers

Named layers as complete utility classes (house style: recipes hard-code values in
their section; the §2 palette `:root` block is **not** touched — no new palette
tokens, no hex changes, no contrast-table recomputation):

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

Layer character table (prose or a small table), covering per-layer:

| Layer | Where | Scale | Light | Blur | Density |
|---|---|---|---|---|---|
| **near** (the kerb) | flat, in `.street` | 1 — real size | full §3.2 glow | none | sparse — the few signs you stand under |
| **mid** (across the street) | on the walls, nearer half | foreshortened by geometry | dimmed ~0.78, desaturated | none | the bulk of the signage |
| **far** (down the block) | on the walls, far half + faked-scale flats | geometry + `scale(...)` for extra distance | dimmed ~0.55 | 1.5px | densest — micro signs packed toward the haze |

Points the subsection must make:

- **Glow attenuation is free.** `filter: brightness()` dims the letterform *and*
  its `text-shadow` halo together — which is exactly what air does to a distant
  sign. No per-layer re-derivation of §3.2 recipes; far neon is the same recipe
  seen through more air. Far-layer signs may also swap full recipes for cheap
  approximations (a glowing dash, a lit rectangle) — at that distance a sign is a
  light, not a message.
- **Density inverts with distance.** Near is sparse, far is packed: a real street
  shows more signs per degree the further you look. Far texture can be tiny
  `--film`/hue marks, not full boards.
- **Real 3D vs faked scale — the decision:** the walls are real 3D (rotateY under
  the shared perspective; that's what buys true convergence), and depth *along* a
  wall is free foreshortening plus the atmospheric filters above. Anything deeper
  than the walls (extra distant blocks, the haze) is **faked with `scale()` on
  flat elements** — never `translateZ` chains. Justification to state: preserve-3d
  chains are flattened by `overflow ≠ visible`, `filter`, `opacity < 1`,
  `clip-path`, `mask`, `mix-blend-mode`, and `isolation: isolate` — and this brief
  load-bearingly uses three of those (`.street` scrolls, depth needs `filter`, §10
  allows `body { isolation: isolate }`). A one-level 3D tree cannot be flattened
  by accident; a deep one will be.

### 7.3 Rules and gotchas

The stated rules (each is an acceptance-criterion item):

1. **Depth is scenery. Readable stays near.** Everything on a wall or behind a
   depth filter is `aria-hidden="true"` set dressing and is *exempt* from §2 only
   because nobody is asked to read it — the brightness filter will drag it below
   4.5:1 and that is the point: far light is dim. Anything a reader needs lives on
   the near layer — unrotated, unfiltered, measured against §2 with glows off. A
   readable sign on a rotated wall is a failure, not a flourish. (Reinforce with
   the rendering fact: browsers rasterize 3D-transformed text — wall type is
   slightly soft even before the blur. One more reason the readable layer is flat.)
2. **Bare tube type still needs night behind it.** Near-layer `.neon` type set
   directly on the ground now has scenery behind it. The depth dimming keeps walls
   near-Board luminance, but check: if a wall's glow creeps behind readable bare
   type, dim the wall or mount the type on a board — never move the reading to the
   wall.
3. **The scene does not scroll and does not move.** It is a non-scrolling sibling
   *behind* `.street`, exactly like the §3.4 wash (order back-to-front: night →
   canyon → street-glow → `.street`). Putting the scene inside the scroll
   container would scroll the buildings past you — you are standing still; the
   street scrolls its signs, not its architecture. The motion section's bans
   stand: **no parallax**, no scroll-driven camera, no dolly. A static scene is
   reduced-motion-safe by construction, and blur+rotate rasterization is paid once.
4. **Animated signs stay near.** Flicker/buzz/chase/hue-cycle (§8) never sit on a
   depth-filtered layer — animating inside a filtered, 3D-transformed subtree
   re-rasterizes the whole plane per frame.
5. **Preserve-3d flattening list** (the gotcha block): name the flatteners
   (overflow, filter, opacity<1, clip-path, mask, mix-blend-mode,
   isolation:isolate, contain:paint) and the resolution: this system never needs
   preserve-3d, so `body { isolation: isolate }` (§10) and the walls coexist —
   isolation sits on the site root, the perspective is established *inside* it on
   `.canyon`, and flattening only bites between a preserve-3d parent and its
   grandchildren, which this construction doesn't have. Also: never put a depth
   `filter` on `.canyon` itself — filter on the perspective parent rasterizes the
   whole scene through one filter and kills per-layer falloff.
6. **`overflow: clip` on `.canyon`** — rotated planes' bounding boxes overhang the
   viewport; clip them at the scene, or the 320px no-horizontal-scroll test fails.
7. **Responsive:** below ~700px the canyon simplifies — walls narrow their run
   and/or the far band collapses into the terminal haze; the vanishing point stays
   centred; the scene never causes horizontal scroll (the clip guarantees it).

## Surgical edits outside the new section

- **Header blockquote (lines 3–7):** "standing in the canyon and looking up" →
  extend by one clause so the head-on axis exists, e.g. "standing in the canyon,
  looking up — and straight down the street." Minimal touch, keep voice.
- **§1:** no structural change; optional one-clause acknowledgement that the
  street now has an *ahead*, only if it reads naturally. Skippable.
- **§6 Layout and composition:**
  - Reframe the opening composition sentence: composition is now **the canyon (two
    walls of scenery converging on the centre, §7) behind 2–4 near-layer readable
    sign-stack columns plus the marquee band**. The existing asymmetry / no-dead-
    space / prose-panel / scroll-ownership rules all stand unchanged.
  - Extend the scroll-ownership bullet's last paragraph: the street-glow wash *and
    the canyon scene* live on non-scrolling sibling layers behind `.street`
    (canyon behind, wash above it), still never `position: fixed` → ref becomes
    (§10).
- **§8 → §9 "What this is not":**
  - **Rewrite the synthwave row's second sentence** — "No horizon exists here —
    you are inside the canyon looking up" is now wrong as written. New distinction:
    synthwave's vanishing point sits on an open horizon line under a chrome sun,
    on a glowing grid; ours is buried in sign-haze — buildings converge, ground
    and sky never meet, and nothing is a grid.
  - **Add to the "Also out" closing list:** Star Wars crawl (rotateX prose
    receding to a point), tunnel/vortex fly-throughs, scroll-driven camera moves,
    and readable text on rotated planes.
- **§9 → §10 Page application:**
  - Rewrite "Structure, back to front" as ground layers then content: Night
    ground → **canyon scene** (aria-hidden: two walls carrying mid + far depth
    bands of decorative signage, `.canyon-end` haze at the centre) → street-glow
    wash (§3.4) → scrolling `.street` **(the near layer)** holding the existing
    hero stack / marquee / letter home / link signs / dying sign / footer items
    unchanged, now explicitly labelled near-layer.
  - Build-contract bullets: add that the scene introduces **no new `@keyframes`,
    no ids** (nothing new to prefix — all class-based; state it so nobody "fixes"
    it), scene layers are absolutely positioned siblings (`position: fixed` still
    banned), `pointer-events: none` on scenery.
  - **Extend "The test":** exactly one vanishing point, dead centre, both walls
    converging on it; everything on a wall or depth filter is `aria-hidden`;
    every *readable* element is flat, unfiltered, near-layer, and passes §2 with
    glows off; the scene is static (no parallax) and unchanged under reduced
    motion; no horizontal scroll at 320px *including* the rotated walls.
- **Do not touch:** §2 palette hexes, both contrast tables, §3 recipes, §4 type,
  §5 hardware, motion recipes in §7→§8 — the amendment adds; it does not
  recompute.

## Acceptance criteria

1. New "## 7. Depth — the canyon" section exists with copy-pasteable CSS for
   `.canyon`, `.canyon-wall(-left/-right)`, `.depth-mid`, `.depth-far`,
   `.canyon-end`; near documented as the unfiltered default.
2. One-point vs two-point reconciled explicitly, in-voice.
3. Three depth layers named and specified: scale, brightness, blur, density, and
   glow attenuation per layer.
4. Preserve-3d flatteners documented, with the isolation/scroll/filter coexistence
   resolved (one-level 3D tree; isolation on root; no filter on the perspective
   parent).
5. Contrast rule explicitly extended to depth: readable = near/flat/unfiltered,
   passes §2 glow-off; wall content aria-hidden and exempt. Existing contrast
   tables and palette hexes byte-identical.
6. Scene/scroll relationship stated: non-scrolling sibling behind `.street`, no
   parallax, reduced-motion-safe, `overflow: clip`.
7. §6 composition and §10 page application composed through the canyon + near
   layer; §9 gains the new failure modes; synthwave row corrected.
8. Sections renumbered 7→8, 8→9, 9→10 and **all five** cross-refs updated (lines
   62, 312, 435, 599, 623 pre-edit); `grep '§[0-9]'` shows no dangling refs.
9. Voice, formatting (tabs in CSS, table style, bold-lead bullets) match the
   sibling sections; all example CSS is build-contract-legal (no `:is(a,b)`
   commas, no new keyframes/ids, no `position: fixed`).

# Plan — FA-10: Write 8bit/BRANDING.md

## Scope

Author `8bit/BRANDING.md` only. Generating `8bit/index.html` from it (via the
`brand-page` skill) and mapping a viewport bucket in `sites.config.json` is a
follow-up task, matching the FA-5/FA-6 and FA-7/FA-8 precedent.

## Direction (decided)

**NES-era arcade action-adventure** — a top-down, single-screen Zelda-style level.
The page *is* the game screen: the visitor moves a hero sprite with the arrow keys
across a tiled overworld room; the outbound links (GitHub, Twitter, Email — the
canonical three used by liquid/random) are doors/structures on the map, and
pressing **Up** while standing on a door's threshold activates the link.

## Document structure (house style, matching memphis/liquid/isomorphic)

1. The direction — three laws (fixed pixel grid / hardware palette discipline /
   stepped motion, no easing) + the affordance law (labeled door = link) + voice.
2. Palette — NES-quantized hexes with arcade-referent names, CSS tokens, and the
   contrast hard rule (only Phosphor White and Coin Gold carry type, on dark
   grounds only) with a computed WCAG table.
3. The pixel system — logical 256×240 NES screen (16×11-tile playfield + HUD),
   16px tiles, integer scaling, `image-rendering: pixelated`, sprite/tile
   authoring techniques (SVG data-URI with `crispEdges`, box-shadow pixel grids).
4. Type — Press Start 2P via `@import`, sizes on the 8px grid, uppercase.
5. Sprites & tiles — the asset vocabulary (hero, doors, terrain, props).
6. The level & controls — the interaction spec: grid-stepped 4-direction
   movement, collision map, doors as real `<a>` elements, Up-to-enter,
   pointer/touch and keyboard-focus fallbacks, build-contract-safe key handling
   (listener on a focusable stage inside `root`, never window/document).
7. Motion — `steps()` only, 2-frame cycles, square-wave blink, palette-swap
   shimmer, reduced-motion rules.
8. What this is not — 16-bit lushness, mixels, Game Boy monochrome, vaporwave,
   smooth tweens, CRT kitsch.
9. Page application — the concrete level for `8bit/index.html` plus
   build-contract specifics.

## Build-contract gotchas to bake in (§9)

- CSS identifiers cannot start with a digit: `#8bit-x` selectors and
  `@keyframes 8bit-walk` are invalid CSS. All ids, keyframe names, and custom
  font names use the `eightbit-` prefix instead (document-wide uniqueness is the
  contract's intent).
- Key events: no `window`/`document` listeners — the game stage is a
  `tabindex="0"` element inside `root` carrying its own `keydown` handler with
  `preventDefault()` on arrows; a blinking "PRESS START" prompt until focused.
  This also naturally scopes input when all sites' JS runs in the combined page.
- Links must be real anchors (click/tap and Tab+Enter work without the game).
- Single non-scrolling screen; integer scale computed against an element inside
  `root` (never style `root` itself).
- `@import` URL for Press Start 2P contains no raw `;` (single weight).

## Acceptance criteria

- `8bit/BRANDING.md` exists, follows the house section format, and contains:
  named palette tokens as a `:root` block, a computed contrast table with a hard
  rule, the full gameplay/interaction spec from the task description (arrow-key
  movement, Up on a door follows the link), motion rules, anti-goals, and a §9
  concrete enough for the brand-page generator to build from without guessing.
- All guidance is compatible with the sub-site authoring contract in root
  CLAUDE.md (no violations of the CSS/JS/markup rules).

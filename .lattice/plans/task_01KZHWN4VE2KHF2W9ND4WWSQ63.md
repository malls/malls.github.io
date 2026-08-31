# FA-12: Generate 8bit/index.html from 8bit/BRANDING.md (brand-page)

Run the `brand-page` skill on the `8bit` directory (triggered by the PostToolUse
hook after FA-10 wrote the brief). The brief's §9 "Page application" is the
detailed spec; the skill generates `8bit/index.html` + `8bit/style.css` +
`8bit/script.js` to the sub-site authoring contract in root CLAUDE.md.

Key constraints carried from the brief: `eightbit-` prefix for ids/keyframes
(CSS idents can't start with a digit), key listeners on a `tabindex="0"` stage
inside `root` only, `--px` integer scaling via ResizeObserver with a working
no-JS default, doors as real anchors, Press Start 2P via `@import` at top of
style.css.

Out of scope: mapping a viewport bucket in `sites.config.json` and running
`node build.js` — no existing brand direction (memphis/liquid/isomorphic) is
currently mapped, so bucket assignment is the human's call.

Acceptance: `8bit/index.html` standalone-previewable at `/8bit/`; renders the
HUD + 16×11 room with three labelled working door links without JS; arrow-key
play works per BRANDING.md §6; contract-clean per CLAUDE.md.

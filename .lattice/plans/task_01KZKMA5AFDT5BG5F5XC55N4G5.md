# FA-26: software/: generate index.html + style.css from BRANDING.md (brand-page); unbreak node build.js at bucket 700

## Scope

Generate `software/index.html` + `software/style.css` from `software/BRANDING.md`.
No `script.js` (nothing on the page needs JS). Do not touch `sites.config.json`
(`"700": "software"` is already mapped by another agent) or the root `index.html`
by hand — run `node build.js` instead.

## Approach

Per the root CLAUDE.md sub-site authoring contract, NOT the brand-page skill's
"inline everything" line — that predates the build step. Siblings (`vhs/`,
`liquid/`) are `index.html` + external `./style.css`; build.js *requires*
`<name>/style.css`.

Head: match siblings exactly — title, charset, viewport, description,
`robots noindex`, `<link rel=stylesheet href="./style.css">`. OG/Twitter meta
lives only in `template.html`. Tab-indented markup.

### Key technical decisions

- **`container-type: inline-size` on the sleeve, all type sized in `cqi`.** The
  built shell never scrolls, so the square sleeve is bounded by the shorter
  viewport axis and type must scale with *the sleeve*, not the viewport. `cqi`
  units need only `container-type` — no `@container` rule, which build.js would
  reject as an unsupported at-rule. Readable text gets a `max(11px, …)` floor.
- **Specular orbit via `background-position` on an oversized (`110%`)
  background**, not an animated gradient stop — shifts the entire shading ramp
  (key, bounce and terminator together) so the light reads as one light moving.
  Custom-property animation is unavailable: `@property` is not an allowed
  at-rule.
- **Render reveal via a `--mount` bar translating down**, not a `mask-position`
  animation — cheaper, no vendor-prefix pair, and `forwards` fill lands on the
  revealed state under `prefers-reduced-motion`.
- **Segments are separate absolutely-positioned ellipses**, displaced sideways,
  with the cut faces drawn as `inset` box-shadows (brief §3.2). Not `clip-path`,
  which would clip those shadows.
- `ellipse at 34% 26%` rather than `circle at` for squashed segments so the ramp
  stretches with the form; `circle` only on the round chrome sphere.

### Brief conflict to resolve

§4 sets the list in `--ink`; §7's hover says `--ink-2` → `--ink`. §4 governs
colour (and is the better contrast), so the list rests at `--ink` and hover
carries weight 400→500 plus the centre-out hairline underline only.

### Brief instruction taken literally

§9's tail caption ("plus / one previously unreleased track") is dropped — the
brief says to drop it rather than fake it when there is nothing real to link,
and there is nothing. The role line moves into the label mark as
`SOFTWARE-DEVELOPER`, which is truthful and keeps the hyphenated-compound tic.

## Acceptance criteria

- `node build.js` succeeds (currently red: `no <body> found in software/index.html`).
- Standalone `/software/` and the built root page at 700–799px both render the
  sleeve correctly; nothing scrolls, nothing overflows horizontally.
- Brief compliance, checkable: every computed `border-radius` is `0px` or `50%`;
  no `filter: blur()`, no `text-shadow`, no non-inset `box-shadow` except the
  plate keyline's registration offset; one specular position shared by every
  form on the plate.
- Contract compliance: ids and `@keyframes` prefixed `software-`; single
  `@import` first with `;` as `%3B`; no head `<link>` to a font; no
  `position: fixed`; no `display` on `html`/`body`; `isolation: isolate`; only
  allowed at-rules; no local assets.
- Only `software/index.html`, `software/style.css` and the rebuilt root
  `index.html` change.

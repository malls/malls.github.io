---
name: brand-page
description: Generate or regenerate a design direction's index.html from its BRANDING.md. Use when a BRANDING.md under a direction folder (memphis/, liquid/, random/, or any sibling) is created or edited, when asked to "rebuild the brand page", "regenerate memphis", "make the liquid page match the branding", or when a hook reports that a BRANDING.md changed.
---

# brand-page

Each top-level folder in this repo is a **design direction** for the site. The folder's
`BRANDING.md` is the brief; the folder's `index.html` is the rendering of that brief.
This skill turns one into the other.

`BRANDING.md` is the source of truth. `index.html` is a build output you rewrite freely.
Never edit `BRANDING.md` to match the page — that is backwards.

## 1. Resolve the target directory

In order of preference:

- An explicit argument (`/brand-page memphis`).
- The path a hook reported as changed — take its parent directory.
- If neither: list the folders containing a non-empty `BRANDING.md` and ask which one.
  Do not guess, and do not regenerate all of them on a bare invocation.

## 2. Read the brief

Read `<dir>/BRANDING.md` in full.

**If it is empty or has no substantive content, stop.** Say the brief is empty and that
there is nothing to render. An empty file must never produce a plausible-looking generic
page — that would launder an absence of direction into something that reads as decided.

If the brief is thin but real (a few adjectives, a palette, a font), that is enough —
build from it and say plainly which choices you filled in yourself.

## 3. Learn the house conventions

Before writing, read:

- The root `index.html` — the established head block: `<!DOCTYPE html>`, `lang="en"`,
  `charset` + `viewport` meta, description meta, the full OG/Twitter card set, canonical
  link. Markup is **tab-indented**.
- Any sibling direction's `index.html` that already exists, for shape and structure.
- `<dir>/index.html` itself if it already exists — see step 5.

Match the surrounding style. The generated page should not be identifiable as generated.

## 4. Write `<dir>/index.html`

Constraints:

- **Self-contained.** Inline `<style>` and any `<script>` directly in the file. No build
  step, no bundler, no external stylesheet. The root site uses external `style.css` /
  `script.js`; direction folders deliberately do not, so each one can be judged in
  isolation and reviewed as a single-file diff.
- **No external requests** unless `BRANDING.md` explicitly names a webfont or asset. The
  root page loads one CDN font; do not assume a direction wants the same. Prefer system
  font stacks otherwise.
- **Responsive.** Relative units, flexbox/grid, `max-width: 100%` on media. The body must
  never scroll horizontally. This site is checked on mobile — see the `fix mobile issues`
  commit.
- **Full-bleed.** The existing site contains no white gaps anywhere (commit
  `contain stuff to ensure no white anywhere`); background must cover the viewport.
- Carry over the head conventions from step 3, with title/description reflecting this
  direction. Keep absolute URLs pointing at `https://www.forrestalmasi.com`.
- Everything the brief specifies — palette, type, motion, layout, voice — must actually
  appear in the page. If the brief names five colors, five colors show up.

## 5. Regenerating over an existing page

If `<dir>/index.html` already exists, read it first and **preserve anything the brief does
not speak to**. Hand-tuned spacing, a favicon reference, an easing curve someone nudged —
if `BRANDING.md` is silent on it, keep it. Rewrite only what the brief actually governs.

If the brief has changed in a way that contradicts existing hand-tuning, follow the brief
and call out the override in your report.

## 6. Report

Two lines, no more:

- Which directory, and what the brief asked for.
- What changed in the page, plus any choice you made that the brief did not cover.

## Out of scope

- Do not commit or push. Leave the change in the working tree.
- Do not touch the root `index.html`, `style.css`, or `script.js`.
- Do not publish to claude.ai as a hosted Artifact — the deliverable is a file in this
  repo that GitHub Pages serves.
- Do not regenerate directions other than the target.

# FA-2 — /brand-page skill + BRANDING.md watcher hook

## Goal

`memphis/`, `liquid/`, `random/` are design directions for the site. Each holds a
`BRANDING.md` that describes its visual language. When one of those files is edited,
the corresponding `<dir>/index.html` should be regenerated to match.

Two deliverables:

1. **`/brand-page` skill** — reads `<dir>/BRANDING.md`, writes `<dir>/index.html`.
2. **PostToolUse hook** — fires on Edit/Write/MultiEdit against any `BRANDING.md`
   and injects context telling the agent to run the skill for that directory.

Decisions confirmed by Forrest (2026-08-08):
- Output is a real `index.html` in the repo (GitHub Pages deployable), **not** a
  claude.ai-hosted Artifact.
- Trigger is automatic via hook, not manual-only.

## Files

| Path | Purpose |
|------|---------|
| `.claude/skills/brand-page/SKILL.md` | The skill itself |
| `.claude/hooks/branding-changed.sh` | PostToolUse hook script |
| `.claude/settings.json` | Registers the hook (project-scoped, checked in) |

`.claude/settings.local.json` already exists and holds personal permissions — leave it
alone; the hook belongs in the shared `settings.json`.

## Skill design

Front matter: `name: brand-page`, description covering both the manual invocation and
the hook-driven path so it is discoverable either way.

Body instructs the agent to:
1. Resolve the target directory — from the argument, or from the path the hook reported.
   Refuse to guess if neither is present and more than one BRANDING.md is non-empty.
2. Read `<dir>/BRANDING.md`. If it is empty, stop and say so — an empty brief must not
   silently produce a generic page.
3. Read the sibling directions' `index.html` (if any) plus root `index.html` for the
   house conventions: `<!DOCTYPE html>`, `lang="en"`, charset + viewport meta, canonical
   link, OG/Twitter card block, tab-indented markup.
4. Write a **single self-contained** `<dir>/index.html` — inline `<style>`, inline
   `<script>`, no CDN fonts unless BRANDING.md names one, no build step. The root site
   uses external `style.css`/`script.js`; the direction folders stay self-contained so
   each can be judged in isolation and diffed as one file.
5. Preserve anything in the file the brief does not speak to, when regenerating over an
   existing page — do not drop hand-tuned tweaks that the brief is silent about.
6. Report what changed in one or two lines.

Explicit non-goals in the skill body: no committing, no touching root `index.html`, no
publishing to claude.ai.

## Hook design

`PostToolUse`, matcher `Edit|Write|MultiEdit`.

Script reads the hook JSON on stdin, pulls `tool_input.file_path`, and exits 0 silently
unless the basename is `BRANDING.md`. On a match it emits:

```json
{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"..."}}
```

where the context names the changed file and its directory and says to run the
`brand-page` skill for it.

Parsing: prefer `jq`, fall back to `python3`, fall back to a `sed` extraction — hooks
run in a login shell but PATH is not guaranteed to carry Homebrew. Any parse failure
exits 0 with no output; a broken watcher must never block an edit.

Guard against a regeneration loop: the hook matches only `BRANDING.md`, and the skill
writes only `index.html`, so writing the output cannot re-trigger the hook.

## Acceptance criteria

- [ ] `/brand-page memphis` is discoverable and regenerates `memphis/index.html` from a
      populated `memphis/BRANDING.md`.
- [ ] With an empty `BRANDING.md`, the skill stops and reports rather than inventing a page.
- [ ] Editing any `*/BRANDING.md` produces hook `additionalContext` naming that directory.
- [ ] Editing a non-BRANDING file produces no hook output and exit code 0.
- [ ] Hook script is executable and valid `sh` (`sh -n` clean).
- [ ] `.claude/settings.json` is valid JSON and does not disturb `settings.local.json`.

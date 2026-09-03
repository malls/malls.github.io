# Plan: FA-33 — Fix random site: root-based section queries + rebuild

**Complexity: low.** The task description is partially stale; this plan reflects the
verified state of the repo as of 2026-09-03 (planner: agent:claude-fable-5-planner).

## State change since the task was written (verified)

The task describes unresolved conflict markers in `random/script.js` and a diverged
origin. Both are gone:

- Commit `f42ddc1` ("no more conflict", author Forrest Almasi) removed the markers —
  but kept the **HEAD side** (`document.querySelectorAll` + uppercase strings), the
  opposite of the decision recorded in the task comment (keep the `>>>>>>> liquid`
  side, which queries via `root`).
- Commit `acddf87` ("build update") rebuilt `index.html` with that resolution.
- `master` == `origin/master` == `acddf87`. Working tree is clean apart from
  `.lattice/` files. `sites.config.json` is committed (500–800 → random,
  900–1100 → isomorphic, 1200–1600 → marble, far buckets for the rest,
  `default: random`). **No merge/divergence work remains. No conflict markers exist
  anywhere in the repo** (grepped, excluding `.git`/`.lattice`).

## The remaining bug (verified in built `index.html`)

`random/script.js` `init()` (lines 41–44) writes via
`document.querySelectorAll('section')[0..3]`. In the combined page these match the
first four `<section>`s **document-wide** — which belong to iphone (built lines
~5597, ~5651), liquid (~5870), and marble (~5983), not random (random's sections are
at ~6086–6090). Since every site's JS runs on load even while hidden, this:

1. leaves random's own sections textless (colored boxes, no "Forrest Almasi" text), and
2. injects random's text into iphone/liquid/marble markup.

This violates the authoring contract in CLAUDE.md ("Query only via
`root.querySelector(All)`"). Standalone `/random/` masks the bug because there
`root === document`.

## Steps (ordered)

1. **Preflight.** `git fetch origin` and confirm `master` == `origin/master` and the
   working tree is clean (`.lattice/` changes aside). If origin has moved or
   `sites.config.json` is dirty, stop and comment on FA-33 — do not merge blind; the
   divergence described in the task no longer exists and any new divergence is new
   information.
2. **Fix `random/script.js` `init()`** — apply the recorded decision, which the
   manual resolution inverted: replace the four `document.querySelectorAll(...)`
   lines (41–44) with the liquid-side lines **verbatim**:
   ```js
   root.querySelectorAll('section')[0].innerHTML = template('Forrest ') + '<br class="mobile-only">'  + template('Almasi');
   root.querySelectorAll('section')[1].innerHTML = template('i\'m a ') + '<br class="mobile-only">'  + template('developer');
   root.querySelectorAll('section')[2].innerHTML = template('what\'s up?');
   root.querySelectorAll('section')[3].innerHTML = template('email me');
   ```
   (Note: this restores lowercase text — random/style.css has no `text-transform`,
   so casing is visible. This is deliberate per the task decision; do not keep the
   uppercase strings.) Touch nothing else in the file; the module-scope
   `root.querySelectorAll('section')[3]` mailto listener at lines 36–38 is already
   correct.
3. **Sanity-check the file.** `node --check random/script.js`;
   `grep -n 'document\.' random/script.js` must return nothing;
   `grep -rn '<<<<<<<\|>>>>>>>' --exclude-dir=.git --exclude-dir=.lattice .` must
   return nothing.
4. **Rebuild.** `node build.js` — never hand-edit root `index.html`. Verify the
   built page: `grep -c 'document.querySelectorAll' index.html` → 0, and the four
   `root.querySelectorAll('section')` lines appear inside the random registry
   function.
5. **Verify in headless Chrome** via a local static server (so paths behave as in
   production), e.g. from repo root:
   `python3 -m http.server 8123` (background), then
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --screenshot=<scratchpad>/w850.png --window-size=850,900 http://localhost:8123/`
   - **850px** → random visible: five colored sections with "Forrest Almasi" /
     "i'm a developer" / "what's up?" / "email me" text.
   - **1750px** → unmapped bucket → `default` → random again, with text.
   - **950px** → isomorphic shows (sanity: bucket mapping still works, and its
     sections are no longer polluted with random's text).
   Additionally dump the DOM once
   (`--headless=new --dump-dom http://localhost:8123/`) and assert the injected
   letters live only inside `#site-random` (e.g. no `animated-letter` spans inside
   `#site-iphone`/`#site-liquid`/`#site-marble`). Kill the server when done.
6. **Also verify standalone** `/random/` still works (load
   `http://localhost:8123/random/` headless, screenshot or dump-dom shows the text) —
   `root === document` there, so the change must be a no-op standalone.
7. **Commit** `random/script.js` + rebuilt `index.html` together (do NOT commit
   `.lattice/` files in this commit; leave them for the orchestrator). Message shape:
   ```
   random: query sections via root, not document

   The manual conflict resolution in f42ddc1 kept the document-wide
   queries, so random's text was injected into iphone/liquid/marble
   sections in the built page and random's own sections stayed empty.
   Restore the root-based (liquid-side) queries per the sub-site
   authoring contract and rebuild index.html.

   Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
   ```
8. **Do NOT push.** The parent orchestrator pushes to origin/master after the review
   passes (user asked for the live site to be fixed, so the push is part of FA-33's
   completion — but it is the orchestrator's step, not the implementer's).
9. Move FA-33 to `review` (`--actor agent:claude-fable-5-impl`) and comment with
   what was done and where the screenshots are.

## Acceptance criteria

- `random/script.js` contains no `document.` queries; the four `init()` writes use
  `root.querySelectorAll('section')` with the lowercase liquid-side strings; file
  passes `node --check`.
- No conflict markers anywhere in the repo (built output included).
- `index.html` regenerated by `node build.js` (not hand-edited) and committed with
  the source change.
- Headless Chrome at 850px and 1750px shows random's colored sections **with text**;
  950px shows isomorphic; no random text inside other sites' wrappers in the DOM.
- Standalone `/random/` still renders its text.
- `master` remains in sync with `origin/master` at start; nothing pushed by the
  implementer.

## Notes for the reviewer

- The one judgment call: lowercase vs uppercase strings. The task decision
  ("keep the '>>>>>>> liquid' side verbatim") postdates the user's uppercase
  hand-resolution in the task record, and the parent orchestrator reconfirmed it in
  the planning brief. If the user later prefers uppercase, it is a two-minute
  follow-up — the load-bearing fix is `document` → `root`.
- The merge/push-reconciliation portion of the task title is already done
  (`f42ddc1`/`acddf87`, pushed); only the query fix + rebuild remain.

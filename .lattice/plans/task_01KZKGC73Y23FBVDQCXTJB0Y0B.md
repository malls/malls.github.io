# FA-23 — Plan: rewrite relative `url()` in site CSS at build time

**Complexity:** medium
**Branch:** `liquid` (current)

The diagnosis and the chosen fix are already settled in the task comment
(`lattice show FA-23`). Do **not** re-derive them or reopen the decision. This
plan says *how*.

One-line restatement: `build.js` inlines site CSS declaration bodies verbatim, so
`horse/style.css` had to hardcode a root-absolute `/horse/frames.jpg`, which is a
404 under `file://`. Teach the build to rewrite *relative* `url()` references to
site-folder-relative (`horse/frames.jpg`), then change the CSS to `./frames.jpg`.

---

## 0. Working-tree constraint (read this first)

The worktree is shared with other agents. `git status` shows many unrelated
dirty/untracked paths: `8bit/`, `iphone/`, `isomorphic/`, `liquid/`, `memphis/`,
`shibuya/`, `slop/`, `vhs/`, `agents.md`, `.claude/`, and other tasks'
`.lattice/` files.

- **Never `git add -A` / `git add .` / `git commit -a`.** Stage only this task's
  files by explicit path (list in §6).
- **Never revert, reset, or delete anything you did not create.** If you see
  unfamiliar changes, leave them alone.
- `build.js`, `index.html`, and `horse/**` are currently **clean** (committed at
  `697c9bf`). That is what makes the diff check in §5 meaningful — verify it
  still holds before you start: `git status --porcelain -- build.js index.html horse/`
  must print nothing.
- **`CLAUDE.md` is already dirty** with ~12 lines of uncommitted authoring-contract
  documentation left over from FA-20 (the `;`-in-`@import`, id-prefixing, `root.style`
  and scrolling bullets). Same section, same lineage, docs only. Handling: see §4.1.

---

## 1. `build.js` — the URL rewriter

File: `/Users/forrest/Code/malls.github.io/build.js`

### 1.1 Why the naive approach is wrong

`horse/style.css:46` contains a `data:image/svg+xml` URI whose **body contains the
literal substring `url(%23horse-grain)`**:

```
url("data:image/svg+xml,%3Csvg%20...%3Crect%20...%20filter='url(%23horse-grain)'%20opacity='0.06'/%3E%3C/svg%3E"),
```

A regex like `/url\(([^)]*)\)/g` stops at the `)` inside `url(%23horse-grain)` and
shreds the data URI. (`liquid/style.css:532` has the identical shape — it is not
in `sites.config.json` today, but the scanner is shared infrastructure and will
meet it.) The scanner **must** be string-aware.

### 1.2 New helpers

Add these above `transformStatements` (they use the existing `fail()`).

```js
// A url() target is rewritable only if it is a relative path inside the site
// folder. Everything with its own resolution rule is left alone.
function isRewritableUrl(u) {
	if (u === '') return false;
	if (u[0] === '#') return false;                          // SVG fragment: filter: url(#site-goo)
	if (u[0] === '/') return false;                          // root-absolute /x AND protocol-relative //cdn
	if (/^[a-zA-Z][a-zA-Z0-9+.\-]*:/.test(u)) return false;  // any scheme: http: https: data: mailto: …
	return true;
}

// Rewrite relative url() targets in site CSS from site-folder-relative (how the
// author writes them, so standalone /<site>/ works) to root-relative (how the
// built index.html at the repo root needs them). String-aware: a url( token that
// lives inside a quoted data: URI is part of that URI, not a nested url().
function rewriteUrls(css, site) {
	let out = '';
	let i = 0;
	for (;;) {
		const at = css.indexOf('url(', i);
		if (at === -1) { out += css.slice(i); return out; }
		out += css.slice(i, at + 4);            // everything up to and including "url("
		let j = at + 4;
		while (j < css.length && /\s/.test(css[j])) j++;
		const lead = css.slice(at + 4, j);      // whitespace after "url(", preserved
		const q = css[j];
		let value, tail, end;
		if (q === '"' || q === "'") {
			let k = j + 1;
			while (k < css.length && css[k] !== q) { if (css[k] === '\\') k++; k++; }
			if (k >= css.length) fail(site + '/style.css: unterminated string in url(');
			value = css.slice(j + 1, k);        // verbatim between the quotes
			tail = '';
			end = k + 1;                        // just past the closing quote
		} else {
			let k = j;
			while (k < css.length && css[k] !== ')') { if (css[k] === '\\') k++; k++; }
			if (k >= css.length) fail(site + '/style.css: unterminated url(');
			const raw = css.slice(j, k);
			value = raw.trimEnd();              // CSS forbids unescaped WS inside an unquoted url token
			tail = raw.slice(value.length);
			end = k;                            // leave the ')' for the next slice
		}
		const next = isRewritableUrl(value) ? site + '/' + value.replace(/^\.\//, '') : value;
		out += lead + (q === '"' || q === "'" ? q + next + q : next) + tail;
		i = end;
	}
}
```

Design notes the implementer must preserve:

- **Quoting style is preserved exactly** — `'` stays `'`, `"` stays `"`, unquoted
  stays unquoted. This keeps the diff in `index.html` to a single line (§5).
- **Whitespace is preserved** — `url( "./a.png" )` keeps both spaces. The
  whitespace between a closing quote and `)` is simply not consumed; the next
  loop iteration copies it verbatim.
- **Skip list, exhaustively:** `http://…`, `https://…`, protocol-relative `//…`,
  `data:…`, any other `scheme:` (the RFC 3986 scheme regex), root-absolute `/…`,
  and bare fragments `#…` (the documented `filter: url(#site-goo)` pattern — this
  one is load-bearing, `liquid/style.css:179` uses it).
- **Rewrite rule:** strip one leading `./`, then prefix `<site>/`. Nothing else.
- **`../` is intentionally handled by the same rule**: `../shared/x.png` becomes
  `horse/../shared/x.png`, which resolves to `/shared/x.png` from the repo root —
  the same place the standalone page resolves it to. Correct by construction; do
  not special-case it.
- **Known, accepted limitation:** a relative filename containing a `:` before the
  first `/` (e.g. `a:b.png`) would be read as a scheme and skipped. Do not add
  heuristics for it.
- `fail()` on an unterminated quote/paren rather than silently emitting garbage.

### 1.3 Where it hooks into `transformStatements`

`transformStatements` (build.js:115) has four branches. Apply the rewriter as
follows — **all four must be considered, and the choice for each stated in code
comments**:

| Branch | build.js line | Action |
|---|---|---|
| `@import` | 118–121 | **Do not rewrite.** By the authoring contract `@import` is for *external* resources only, and rewriting one would not help anyway (the imported sheet's own `url()`s never pass through this build). Leave the hoist path untouched. Add a one-line comment saying so. |
| `@media` / `@supports` | 122–130 | **No direct change needed** — the branch recurses through `transformStatements(splitStatements(inner), …)`, so nested plain rules get the plain-rule treatment automatically. Confirm this by test (§5.3 case 13), don't add a second rewrite here (double-prefixing risk). |
| `@keyframes` / `@font-face` | 131–134 | **Rewrite the whole statement string**: `out.push(rewriteUrls(st, site));`. `@font-face { src: url(…) }` is the obvious case; `@keyframes` are passed through verbatim today and a keyframe can legitimately animate `background-image: url(…)`, so they need it too. Preludes contain no `url(` tokens, so whole-statement rewriting is safe here. |
| plain rule | 138–147 | **Rewrite the declaration body only**: `out.push(scoped.join(', ') + ' {' + rewriteUrls(body, site) + '}');`. Deliberately *not* the selector list — selectors have no legitimate `url()`, and keeping the rewriter away from them removes any chance of mangling an attribute selector. |

Do **not** apply the rewriter once over the whole stylesheet in `transformCss` —
that would sweep in `@import`.

Ordering note (pre-existing, not in scope): `transformCss` strips `/* … */` with a
non-string-aware regex *before* splitting, so the rewriter always sees
comment-stripped text. A `/*` inside a data URI would already break the build
today; leave that alone.

### 1.4 Make the scanner testable

`build.js` currently ends with a bare `build();`. Change the tail to:

```js
if (require.main === module) build();

module.exports = { rewriteUrls, isRewritableUrl, transformCss };
```

`node build.js` behaves identically; the §5.3 unit check can now `require()` the
module without triggering a build. This is the only structural change to the file.

---

## 2. `horse/style.css`

File: `/Users/forrest/Code/malls.github.io/horse/style.css`, line 125.

```diff
-	background-image: url('/horse/frames.jpg');
+	background-image: url('./frames.jpg');
```

Single-quoted, to match the rest of the file. Nothing else in this file changes —
line 3's `@import` and line 46's grain data URI stay byte-identical.

---

## 3. `CLAUDE.md` — add the local-asset rule

File: `/Users/forrest/Code/malls.github.io/CLAUDE.md`, "Authoring contract for a
sub-site" section (starts line 220; the **CSS** bullet is lines 227–238 in the
current working-tree state, which already includes FA-20's uncommitted additions).

Insert a new top-level bullet immediately **after** the **CSS** bullet and
**before** the **Markup** bullet. Suggested wording (adjust prose, keep the
substance):

```markdown
- **Local assets**: images and fonts a site owns live *in the site folder* and are
  referenced **relatively** — `url('./frames.jpg')`, not `/site/frames.jpg` and not
  a hotlink. The build rewrites relative `url()` targets in `style.css` to
  `<name>/…` so the same source works standalone at `/<name>/`, in the built root
  page, and over both `http` and `file://`. Left untouched: `http(s):`,
  protocol-relative `//`, `data:` URIs, any other `scheme:`, root-absolute `/…`,
  and fragment refs (`filter: url(#<name>-goo)`) — so do **not** hand-write a
  root-absolute path expecting it to survive `file://`. `@import` URLs are *not*
  rewritten (they are for external resources only).
```

Keep the file's existing wrap width (~80 cols) and `-`-bullet style.

### 3.1 Handling the pre-existing dirty `CLAUDE.md`

Before committing, run `git diff CLAUDE.md`. If the pre-existing hunks are still
only the FA-20 authoring-contract documentation described in §0, commit
`CLAUDE.md` **whole** and say so in the commit body (one line: "sweeps in FA-20's
uncommitted authoring-contract doc lines"). Non-interactive partial staging is not
available and reverting a sibling agent's work is forbidden.

If the pre-existing diff has grown into unrelated territory, **stop**: move FA-23
to `needs_human` with a comment naming the conflict rather than committing
someone else's work.

---

## 4. `horse/BRANDING.md` — correct the absolute-path prescription

File: `/Users/forrest/Code/malls.github.io/horse/BRANDING.md`. Three places
currently prescribe the now-wrong absolute path. All three must be corrected;
keep the document's voice and its `§` cross-references.

1. **§ licensing bullet, lines 54–58** — currently:
   *"…This is the repo's first local-asset site: reference the file by **absolute
   path** (`/horse/frames.jpg`) so the URL resolves both standalone at `/horse/`
   and inside the built root page at `/` (see §10)."*
   Replace the second sentence with the relative-path rule: reference it
   **relatively** (`./frames.jpg`); the build rewrites relative `url()` targets to
   `horse/…`, so the one source resolves standalone, in the built root page, and
   over `file://` alike (see §10).

2. **§ "The sprite offsets" code block, line 260** — currently:
   ```css
   background-image: url('/horse/frames.jpg');   /* absolute path — §10 */
   ```
   →
   ```css
   background-image: url('./frames.jpg');   /* relative — the build rewrites it, §10 */
   ```

3. **§10 build-contract bullet, lines 467–470** — currently:
   *"**The sprite URL is absolute**: `url('/horse/frames.jpg')`. A relative path
   resolves against `/horse/` standalone but against `/` in the built root page and
   breaks one of the two. (Prior sites hotlink external images; this is the repo's
   first local asset — the absolute-path rule is new and non-negotiable.)"*
   This claim is now false and must be **rewritten**, not merely edited: the sprite
   URL is **relative** — `url('./frames.jpg')` — because `build.js` rewrites
   relative `url()` targets in site CSS to `horse/…`. State explicitly that a
   root-absolute path is *wrong* here: it only works when served from the domain
   root and 404s under `file://` (that was FA-23's bug).

Do not touch any other part of `BRANDING.md`, and do **not** regenerate
`horse/index.html` from it — the `brand-page` skill is not in scope for this task.

---

## 5. Verification (all of it, in this order)

Scratchpad:
`/private/tmp/claude-503/-Users-forrest-Code-malls-github-io/7e5a1f85-446e-4042-9d3f-8829425f83cd/scratchpad`
(referred to below as `$SCRATCH`). Use absolute paths — the shell cwd resets
between calls.

### 5.1 Build is clean and the emitted CSS is right

```bash
node /Users/forrest/Code/malls.github.io/build.js          # must exit 0
grep -n "frames.jpg" /Users/forrest/Code/malls.github.io/index.html
```

Expected: exactly one hit, inside the `#site-horse .photo` rule, reading
`background-image: url('horse/frames.jpg');` — single-quoted, no leading `./`,
no leading `/`.

### 5.2 The `index.html` diff contains ONLY that change

`build.js` is shared infrastructure; this is the collateral-damage gate.

```bash
git -C /Users/forrest/Code/malls.github.io diff --stat -- index.html
git -C /Users/forrest/Code/malls.github.io diff -- index.html
```

**Acceptance: the diff is exactly one `-`/`+` line pair**, and it is the `.photo`
`background-image`. Specifically confirm:

- the `#site-horse` grain `data:` URI line is **byte-identical** (does not appear
  in the diff at all) — this is the proof the scanner skipped the nested
  `url(%23horse-grain)`;
- the `@import` lines for `horse` (EB Garamond) and `random`
  (`fonts.cdnfonts.com`) are unchanged;
- **zero** `#site-random` lines appear in the diff.

Also sanity-check that no *other* site's CSS would be harmed. Only `random` and
`horse` are in `sites.config.json`, but grep the unbuilt folders for the patterns
the scanner must not touch and eyeball them:

```bash
grep -rn "url(" --include=style.css /Users/forrest/Code/malls.github.io | grep -v "^.*horse/"
```

(`8bit/` and `liquid/` are dense with `data:` URIs; `liquid/style.css:179` is a
`url(#liquid-goo)` fragment ref and `:532` is a data URI containing
`url(%23liquid-grain)`. Feed `liquid/style.css` and `8bit/style.css` through
`transformCss` in the §5.3 harness and assert the output's `url(` count and every
`data:` URI are unchanged — cheap insurance for future sites even though neither
is built today.)

Run `node build.js` a second time and confirm `git diff -- index.html` is
unchanged (idempotence / determinism).

### 5.3 Scanner unit check

Write a throwaway harness at `$SCRATCH/fa23_url_test.js` that
`require('/Users/forrest/Code/malls.github.io/build.js')` and asserts on
`rewriteUrls(input, 'horse')`. It must cover at minimum:

| # | input | expected |
|---|---|---|
| 1 | `url(./frames.jpg)` | `url(horse/frames.jpg)` |
| 2 | `url('./frames.jpg')` | `url('horse/frames.jpg')` |
| 3 | `url("frames.jpg")` | `url("horse/frames.jpg")` |
| 4 | `url( "./a.png" )` | `url( "horse/a.png" )` — spaces preserved |
| 5 | `url(#horse-goo)` | unchanged |
| 6 | `url('/horse/frames.jpg')` | unchanged |
| 7 | `url(https://x.test/y.png)` | unchanged |
| 8 | `url(//cdn.test/y.png)` | unchanged |
| 9 | **the exact text of `horse/style.css:46`** (the grain data URI, copied byte-for-byte) | **byte-identical output** |
| 10 | `url(../shared/x.png)` | `url(horse/../shared/x.png)` |
| 11 | `@font-face{src:url('./f.woff2') format('woff2')}` via `transformCss` | `url('horse/f.woff2')`, `format('woff2')` untouched |
| 12 | `@keyframes horse-k{0%{background-image:url(./a.png)}}` via `transformCss` | rewritten to `horse/a.png` |
| 13 | `@media (min-width:1px){a{background:url(./a.png)}}` via `transformCss` | rewritten to `horse/a.png` |
| 14 | `@import url('https://fonts.test/x?a%3Bb');` via `transformCss` | unchanged, still hoisted first |

Case 9 is the one that fails under a naive regex — it is the point of the test.
Print a pass/fail line per case and a final summary; paste the output into the
review comment. The harness is a scratchpad file and is **not** committed.

### 5.4 Rendering proof (WebKit snapshots — required, not optional)

Binary: `$SCRATCH/snap` (source `snap.swift` sits beside it).
Usage: `$SCRATCH/snap <url> <out.png> <w> <h>`. It waits for `didFinish` + 2s and
writes a PNG. Known-good visual reference: `$SCRATCH/webkit_standalone.png`.

Build the forced-visibility copy of the root page. It **must live at the repo
root**, not in the scratchpad, or `horse/frames.jpg` will not resolve:

```bash
node -e "
const fs=require('fs');
const p='/Users/forrest/Code/malls.github.io/index.html';
const s=fs.readFileSync(p,'utf8').replace('</head>',
  '<style>#site-horse{display:block!important}#site-random{display:none!important}</style></head>');
fs.writeFileSync('/Users/forrest/Code/malls.github.io/_fa23_check.html', s);
"
```

Serve, capture all four, then tear down:

```bash
python3 -m http.server 8123 --directory /Users/forrest/Code/malls.github.io   # background
```

| # | URL | out | size |
|---|---|---|---|
| a | `file:///Users/forrest/Code/malls.github.io/horse/index.html` | `$SCRATCH/fa23_a_file_standalone.png` | 844x390 |
| b | `file:///Users/forrest/Code/malls.github.io/_fa23_check.html` | `$SCRATCH/fa23_b_file_built.png` | 844x390 |
| c | `http://localhost:8123/horse/index.html` | `$SCRATCH/fa23_c_http_standalone.png` | 844x390 |
| d | `http://localhost:8123/_fa23_check.html` | `$SCRATCH/fa23_d_http_built.png` | 844x390 |

Then kill the server and **delete `/Users/forrest/Code/malls.github.io/_fa23_check.html`**
(it must never be staged or committed; confirm with `git status --porcelain`
afterwards that it is gone).

**`Read` all four PNGs and describe what you see.** Pass condition for every one
of them: the Muybridge horse photograph is **visible** inside the double-ruled
plate — not a blank/empty plate. The mount, EB Garamond imprint, ruled border and
`PLATE I` numeral must look like `$SCRATCH/webkit_standalone.png`. (a) is the
regression this task exists to fix and was blank before the change; (c) and (d)
prove no http regression.

If any capture is blank, the task is not done — do not report success on the
strength of the grep alone.

---

## 6. Commit

Stage **by explicit path only**:

```bash
git -C /Users/forrest/Code/malls.github.io add \
  build.js horse/style.css horse/BRANDING.md CLAUDE.md index.html
git -C /Users/forrest/Code/malls.github.io status --porcelain   # review before committing
```

Confirm the staged set is exactly those five paths and nothing else. If any
`8bit/`, `iphone/`, `isomorphic/`, `liquid/`, `memphis/`, `shibuya/`, `slop/`,
`vhs/`, `agents.md`, `.claude/`, `_fa23_check.html`, or another task's `.lattice/`
file appears staged, unstage it.

`.lattice/` files for **this** task (`.lattice/tasks/task_01KZK…json`,
`.lattice/events/task_01KZK…jsonl`, `.lattice/plans/task_01KZK…md`) may be
committed in the same commit or left for the orchestrator — but never another
task's.

Message, matching repo convention (`FA-NN: subject`, imperative, wrapped body,
trailer required):

```
FA-23: rewrite relative url() in site CSS at build time

build.js inlined site CSS declaration bodies verbatim, so horse/ had to
hardcode a root-absolute /horse/frames.jpg — which 404s under file:// and
rendered the photograph blank. transformStatements now runs a string-aware
rewriter over plain-rule bodies and @keyframes/@font-face blocks (and, by
recursion, @media/@supports), prefixing relative url() targets with the site
name. Skipped: schemes, protocol-relative, root-absolute, and #fragment refs;
the scanner reads quoted targets to the matching quote so the grain data: URI's
own url(%23horse-grain) is not mistaken for a nested url(). horse/style.css now
says './frames.jpg'; CLAUDE.md and horse/BRANDING.md document the new rule
(BRANDING.md's absolute-path prescription was the thing that was wrong).
Also sweeps in FA-20's uncommitted authoring-contract doc lines in CLAUDE.md.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

Then move the task to `review`.

---

## 7. Acceptance criteria (a cold reviewer can check each of these)

1. `node build.js` exits 0 and prints its usual one-line summary.
2. `index.html` contains exactly one `frames.jpg` reference, and it reads
   `url('horse/frames.jpg')` inside the `#site-horse .photo` rule.
3. `git diff HEAD~1 -- index.html` is **one changed line** — no other churn, and
   in particular nothing under `#site-random` and no change to any `data:` URI or
   `@import`.
4. `horse/style.css:125` reads `url('./frames.jpg')`; nothing else in that file
   changed.
5. `build.js` exports `rewriteUrls` / `isRewritableUrl` / `transformCss` and still
   auto-builds under `node build.js` (`require.main === module` guard present).
6. The rewriter is a character scanner, not a regex over the whole `url(...)`
   token, and it explicitly skips `#…`, `/…`, `//…`, and `scheme:` targets.
7. `@keyframes` and `@font-face` statements go through the rewriter;
   `@import` does not.
8. The §5.3 unit results are recorded in the review comment, including case 9
   (grain data URI byte-identical) passing.
9. Four WebKit snapshots exist and were visually inspected; the horse is visible
   in all four (standalone and built, `file://` and `http`).
10. `_fa23_check.html` no longer exists in the repo and was never committed.
11. `CLAUDE.md` has the local-assets bullet in the authoring contract, and
    `horse/BRANDING.md` no longer prescribes an absolute sprite path in any of its
    three places (§licensing bullet, §sprite-offsets code block, §10 bullet).
12. The commit touches only the five intended paths (plus, optionally, this task's
    own `.lattice/` files).

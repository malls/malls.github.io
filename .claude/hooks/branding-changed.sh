#!/bin/sh
# PostToolUse hook: when a BRANDING.md is written or edited, ask the agent to
# regenerate that direction's index.html via the `brand-page` skill.
#
# Reads the hook payload on stdin, emits PostToolUse additionalContext on a match.
# Any failure exits 0 with no output — a broken watcher must never block an edit.

set -u

payload=$(cat)

# Pull tool_input.file_path. PATH is not guaranteed to carry Homebrew, so degrade.
if command -v jq >/dev/null 2>&1; then
	path=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
elif command -v python3 >/dev/null 2>&1; then
	path=$(printf '%s' "$payload" | python3 -c 'import json,sys
try:
    print(json.load(sys.stdin).get("tool_input", {}).get("file_path", ""))
except Exception:
    pass' 2>/dev/null)
else
	path=$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)
fi

[ -n "${path:-}" ] || exit 0
[ "$(basename "$path")" = "BRANDING.md" ] || exit 0

dir=$(dirname "$path")
name=$(basename "$dir")

# Only direction folders have generated pages. A BRANDING.md at the repo root would
# otherwise point the agent at the root index.html, which brand-page refuses to touch.
if [ -n "${CLAUDE_PROJECT_DIR:-}" ]; then
	abs=$(cd "$dir" 2>/dev/null && pwd -P)
	root=$(cd "$CLAUDE_PROJECT_DIR" 2>/dev/null && pwd -P)
	[ -n "$abs" ] && [ "$abs" = "$root" ] && exit 0
fi

# Heredoc keeps the JSON readable; jq -Rs would be another dependency.
cat <<EOF
{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"$name/BRANDING.md was just modified. Its design direction page is now out of date. Use the brand-page skill on the '$name' directory to regenerate $name/index.html from the updated brief. If the brief is empty, say so and do not generate a page."}}
EOF

exit 0

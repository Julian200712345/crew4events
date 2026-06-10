#!/bin/bash
# Runs the QA checker on every screen and prints the JSON reports.
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"
for f in "$DIR"/screens/*.html; do
  name=$(basename "$f")
  out=$("$CHROME" --headless --disable-gpu --no-sandbox --virtual-time-budget=1500 --dump-dom "$f" 2>/dev/null \
        | grep -o 'QA-REPORT .* QA-END')
  echo "### $name"
  echo "$out" | sed 's/QA-REPORT //; s/ QA-END//'
  echo ""
done

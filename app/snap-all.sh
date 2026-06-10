#!/bin/bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd "$(dirname "$0")"
for f in screens/*.html; do
  n=$(basename "$f" .html)
  if [[ "$n" == admin-* ]]; then
    W=1240; H=820
  else
    W=410; H=884
  fi
  "$CHROME" --headless --disable-gpu --no-sandbox --force-device-scale-factor=2 \
    --hide-scrollbars --virtual-time-budget=2500 \
    --screenshot="snapshots/$n.png" --window-size="$W,$H" "$f" 2>/dev/null
done
echo "snapshots done: $(ls snapshots/*.png | wc -l) files"

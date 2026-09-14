#!/bin/sh
set -e
cd "$(dirname "$0")"
PY=""
if command -v python3 >/dev/null 2>&1; then PY=python3
elif command -v python >/dev/null 2>&1; then PY=python
fi
[ -n "$PY" ] || { echo "Python was not found."; exit 1; }
PORT=8080
while command -v lsof >/dev/null 2>&1 && lsof -i ":$PORT" >/dev/null 2>&1; do PORT=$((PORT + 1)); done
echo "SILENCE — http://localhost:$PORT/index.html"
( sleep 1; command -v open >/dev/null 2>&1 && open "http://localhost:$PORT/index.html" || true; command -v xdg-open >/dev/null 2>&1 && xdg-open "http://localhost:$PORT/index.html" || true ) &
"$PY" server.py --port "$PORT" --bind 127.0.0.1

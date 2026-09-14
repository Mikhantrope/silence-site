#!/usr/bin/env python3
"""SILENCE production-lite server.

- Serves the static site.
- Replaces __SITE_URL__ in HTML/robots/sitemap at response time so canonical
  and Open Graph URLs are absolute even before a static SEO build.
- Accepts POST /api/lead.
- Stores leads OUTSIDE the public web root.
- Optionally forwards leads to Telegram using server-side environment vars.
"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, unquote
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import argparse, datetime, html, json, mimetypes, os, re

ROOT = Path(__file__).resolve().parent
DEFAULT_LEADS = ROOT.parent / "silence-data" / "leads.jsonl"
LEADS_FILE = Path(os.environ.get("SILENCE_LEADS_FILE", str(DEFAULT_LEADS))).expanduser().resolve()
SEO_TOKEN = "__SITE_URL__"
TEXT_SEO_FILES = {"robots.txt", "sitemap.xml"}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _site_url(self):
        configured = os.environ.get("SITE_BASE_URL", "").strip().rstrip("/")
        if re.match(r"^https?://[A-Za-z0-9.-]+(?::\d+)?$", configured):
            return configured
        proto = (self.headers.get("X-Forwarded-Proto", "") or "http").split(",", 1)[0].strip().lower()
        if proto not in ("http", "https"):
            proto = "http"
        host = (self.headers.get("Host", "") or "localhost").strip()
        if not re.match(r"^[A-Za-z0-9.-]+(?::\d+)?$", host):
            host = "localhost"
        return f"{proto}://{host}"

    def _seo_text_response(self, path: Path, head_only=False):
        try:
            text = path.read_text(encoding="utf-8").replace(SEO_TOKEN, self._site_url())
        except (OSError, UnicodeDecodeError):
            self.send_error(404)
            return
        body = text.encode("utf-8")
        ctype = mimetypes.guess_type(path.name)[0] or "text/plain"
        self.send_response(200)
        self.send_header("Content-Type", ctype + "; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "public, max-age=300")
        self.end_headers()
        if not head_only:
            self.wfile.write(body)

    def _resolved_public_file(self):
        req_path = unquote(urlsplit(self.path).path)
        if req_path == "/":
            req_path = "/index.html"
        rel = req_path.lstrip("/")
        candidate = (ROOT / rel).resolve()
        try:
            candidate.relative_to(ROOT)
        except ValueError:
            return None, req_path
        return candidate, req_path

    def _handle_get_or_head(self, head_only=False):
        candidate, req_path = self._resolved_public_file()
        if candidate is None:
            self.send_error(404)
            return

        # Never expose lead/runtime folders even if they later appear under ROOT.
        if req_path.startswith("/data/") or req_path.startswith("/.runtime/"):
            self.send_error(404)
            return

        if candidate.is_file() and (candidate.suffix.lower() == ".html" or candidate.name in TEXT_SEO_FILES):
            return self._seo_text_response(candidate, head_only=head_only)

        if head_only:
            return super().do_HEAD()
        return super().do_GET()

    def do_GET(self):
        return self._handle_get_or_head(False)

    def do_HEAD(self):
        return self._handle_get_or_head(True)

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/api/lead":
            return self._json(404, {"ok": False, "error": "not_found"})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 64 * 1024:
                return self._json(400, {"ok": False, "error": "bad_payload"})
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            title = str(payload.get("title") or "SILENCE lead")[:200]
            fields = payload.get("fields") or []
            if not isinstance(fields, list):
                return self._json(400, {"ok": False, "error": "bad_fields"})
            clean = []
            phone_ok = False
            for row in fields[:80]:
                if not isinstance(row, list) or len(row) < 2:
                    continue
                k, v = str(row[0])[:120], str(row[1])[:2000]
                clean.append([k, v])
                if "тел" in k.lower() or "phone" in k.lower() or "телефон" in k.lower():
                    digits = ''.join(ch for ch in v if ch.isdigit())
                    phone_ok = len(digits) >= 10
            if not phone_ok:
                return self._json(422, {"ok": False, "error": "phone_required"})

            record = {
                "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "title": title,
                "fields": clean,
                "ip": self.client_address[0],
                "user_agent": self.headers.get("User-Agent", "")[:500]
            }
            LEADS_FILE.parent.mkdir(parents=True, exist_ok=True)
            with LEADS_FILE.open("a", encoding="utf-8") as f:
                f.write(json.dumps(record, ensure_ascii=False) + "\n")

            tg_token = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
            tg_chat = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
            telegram_sent = False
            if tg_token and tg_chat:
                text = "<b>%s</b>\n%s" % (
                    html.escape(title),
                    "\n".join("%s: %s" % (html.escape(k), html.escape(v or "—")) for k, v in clean)
                )
                req = Request(
                    "https://api.telegram.org/bot%s/sendMessage" % tg_token,
                    data=json.dumps({"chat_id": tg_chat, "text": text, "parse_mode": "HTML"}).encode("utf-8"),
                    headers={"Content-Type": "application/json"}, method="POST"
                )
                try:
                    with urlopen(req, timeout=8) as resp:
                        telegram_sent = 200 <= resp.status < 300
                except (URLError, HTTPError, TimeoutError):
                    telegram_sent = False

            return self._json(200, {"ok": True, "telegram": telegram_sent})
        except (ValueError, json.JSONDecodeError):
            return self._json(400, {"ok": False, "error": "invalid_json"})
        except Exception:
            return self._json(500, {"ok": False, "error": "server_error"})


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--bind", default="127.0.0.1")
    args = parser.parse_args()
    print(f"SILENCE: http://{args.bind}:{args.port}/")
    print(f"Leads: {LEADS_FILE}")
    ThreadingHTTPServer((args.bind, args.port), Handler).serve_forever()

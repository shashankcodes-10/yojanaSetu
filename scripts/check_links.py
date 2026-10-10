"""Run on your own machine: python scripts/check_links.py
Opens every scheme link with full TLS certificate checking, so a bad certificate or a dead page shows up here
before a user sees a browser warning."""
import json, ssl, sys, urllib.request, urllib.error
from pathlib import Path

data = json.loads((Path(__file__).resolve().parents[1] / "data" / "schemes.json").read_text(encoding="utf-8"))
ctx, bad = ssl.create_default_context(), 0
for s in data:
    u = s["official_url"]
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 YojanaSetu-link-check"})
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            print(f"OK        {s['id']:<16} {r.status} {r.geturl()}")
    except ssl.SSLError as e:
        bad += 1; print(f"CERT ERR  {s['id']:<16} {u}  ({e.reason if hasattr(e, 'reason') else e})")
    except urllib.error.URLError as e:
        bad += 1; kind = "CERT ERR " if isinstance(e.reason, ssl.SSLError) else "FAILED   "
        print(f"{kind} {s['id']:<16} {u}  ({e.reason})")
    except Exception as e:
        bad += 1; print(f"FAILED    {s['id']:<16} {u}  ({e})")
print(f"\n{len(data) - bad}/{len(data)} links OK")
sys.exit(1 if bad else 0)

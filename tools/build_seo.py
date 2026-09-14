#!/usr/bin/env python3
"""Build a static deployment with absolute canonical/OG/sitemap URLs.
Usage: python tools/build_seo.py https://example.kz
Output: dist/
"""
from pathlib import Path
from urllib.parse import urlparse
import argparse, shutil, sys

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
TOKEN = '__SITE_URL__'

parser = argparse.ArgumentParser()
parser.add_argument('base_url', help='Public origin, e.g. https://silence.kz')
args = parser.parse_args()
base = args.base_url.rstrip('/')
u = urlparse(base)
if u.scheme not in ('http','https') or not u.netloc or u.path not in ('','/'):
    sys.exit('base_url must be an origin such as https://example.kz')

if DIST.exists(): shutil.rmtree(DIST)
ignore = shutil.ignore_patterns('dist', '__pycache__', '*.pyc', 'data', '.runtime')
shutil.copytree(ROOT, DIST, ignore=ignore)

for p in DIST.rglob('*'):
    if not p.is_file() or p.suffix.lower() not in {'.html','.xml','.txt'}:
        continue
    try: text = p.read_text(encoding='utf-8')
    except UnicodeDecodeError: continue
    if TOKEN in text:
        p.write_text(text.replace(TOKEN, base), encoding='utf-8')

left=[]
for p in DIST.rglob('*'):
    if p.is_file() and p.suffix.lower() in {'.html','.xml','.txt'}:
        try:
            if TOKEN in p.read_text(encoding='utf-8'): left.append(str(p.relative_to(DIST)))
        except UnicodeDecodeError: pass
if left: sys.exit('Unresolved SEO token in: ' + ', '.join(left))
print('Built:', DIST)
print('Base URL:', base)

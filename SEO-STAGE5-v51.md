# SEO Stage 5 — multilingual URLs and hreflang (v51)

Implemented:
- Russian core pages remain at existing URLs.
- Kazakh core pages: /kk/ plus catalog, systems, pro, projects, gallery, contacts.
- English core pages: /en/ plus the same six inner pages.
- Self-canonical on each language URL.
- Reciprocal hreflang ru / kk-KZ / en / x-default on all 7 core page clusters.
- Language selector now navigates to the equivalent language URL instead of only changing localStorage.
- Language is forced from URL before the main site bundle executes.
- Sitemap includes all language alternates using xhtml:link.
- Russian-only long-form articles and project detail pages were deliberately not duplicated without real translations.

Notes:
- Root Russian URLs are preserved to avoid a risky site-wide /ru/ migration and duplicate Russian pages.
- /kk/ and /en/ use <base href="/"> so shared assets continue to load from one source.

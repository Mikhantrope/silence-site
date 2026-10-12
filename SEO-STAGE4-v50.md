# SILENCE v50 — SEO Stage 4: structured data and commercial entities

## Added
- Home page: unified `LocalBusiness` + `WebSite` + `WebPage` + `Service`/`OfferCatalog` JSON-LD graph.
- Organization ID normalized to `https://tishina.kz/#organization`.
- Site ID normalized to `https://tishina.kz/#website`.
- Contact data in structured data uses the visible phone and Astana address already present on the site.
- `ContactPage` schema for the consultation page.
- `CollectionPage` + `BreadcrumbList` for Catalog, Systems, Projects and Gallery.
- `WebPage` + `BreadcrumbList` for the Pro/architect page.
- `ItemList` of service directions on Systems.
- `ItemList` of linked case studies on Projects.
- `WebPage` entity added for BIART case-study page; existing project breadcrumb markup retained.

## Deliberately not added
- No fake prices, ratings, reviews, opening hours, e-mail, legal entity name or social profiles. The current files do not support those facts.
- No Product rich-result markup: the catalog is informational and does not expose verified price/availability data for online purchase.
- No FAQPage JSON-LD. Google removed the FAQ rich-result feature in 2026; the visible FAQ content is kept for users and search understanding without redundant markup.
- No SearchAction because the site has no internal search.

## Validation performed
- All JSON-LD blocks parse as valid JSON.
- Every indexable top-level page has page-type structured data and breadcrumbs (except the home page, where breadcrumbs are unnecessary).
- Canonical URLs remain on `https://tishina.kz`.
- No existing design, translations, scripts, media, forms or navigation were changed.

## Next recommended stage
- Multilingual architecture: decide whether to keep one JS-switched URL or build crawlable `/ru/`, `/kk/`, `/en/` URLs with hreflang.

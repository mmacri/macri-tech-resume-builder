# Public Footprint Cleanup

This document records the legacy URL strategy and the post-deployment actions needed to replace older public and search-engine representations of Mike Macri.

## Current canonical identity

- Primary positioning: **Technology & Customer Success Engineering Leader**
- Current role: **Senior Manager, Customer Success Engineering – AMER**
- Current employer: **GitLab**
- Canonical site: `https://mikemacri.com`
- Canonical résumé resource: `https://mikemacri.com/resume.pdf`

Momentum Edge Consulting is a limited independent advisory/personal consulting practice. It is concurrent with, and visually secondary to, Mike's primary corporate role at GitLab.

## Legacy route inventory

| Legacy route | Previous purpose | Final destination |
| --- | --- | --- |
| `/my-websites` | Old projects/websites index | `/projects` |
| `/index.html` | Duplicate homepage URL | `/` |
| `/portfolio` | Duplicate portfolio index | `/selected-work` |
| `/portfolio/customer-success` | Customer Success specialty page | `/selected-work#customer-success-model` |
| `/portfolio/partner-development` | Partner-development specialty page | `/selected-work#partner-cosell` |
| `/portfolio/compliance` | Compliance/GRC specialty page | `/selected-work#policy-hub` |
| `/portfolio/solution-engineering` | Solution Engineering specialty page | `/selected-work` |
| `/portfolio/momentum-edge` | Momentum Edge specialty page | `/projects#momentum-edge` |
The retired specialty routes are not included in the sitemap and no longer render separate professional identities. Their verified material is represented in Experience, Selected Work, or Projects.

## Redirect implementation

Redirects are layered because static hosts do not all provide the same HTTP behavior:

1. `public/_redirects` requests direct `301` redirects on hosts that support Netlify/Cloudflare-style redirect rules.
2. `npm run build` creates static compatibility pages for legacy extensionless routes. These pages use `noindex, follow`, a canonical link, an immediate meta refresh, a JavaScript `location.replace`, and a visible destination link.
3. React Router keeps equivalent client-side redirects as the final SPA fallback.

The static compatibility pages return `200` on hosts that ignore `_redirects`; they must not be described as HTTP 301 redirects. `/index.html` cannot have a separate static fallback because it is the application entry file. It relies on the hosting redirect rule, the homepage canonical, and the SPA redirect.

Production verification on September 21, 2026 confirmed that the current host serves the generated compatibility pages with HTTP `200` and does not apply `public/_redirects` as server-side redirects. The compatibility pages correctly expose `noindex, follow`, a canonical destination, a meta refresh, and `location.replace`, but host-level 301/308 rules remain preferable. Production also returned `200` for `www.mikemacri.com`, `/index.html`, trailing-slash variants, and an unknown test route. The code declares `https://mikemacri.com` as canonical and provides a noindex `404.html`; the hosting platform still needs to enforce the non-`www` redirect and true 404 status. The live `/resume.pdf` response also did not expose the canonical `Link` or revalidation headers requested by `public/_headers`, so equivalent CDN configuration is required if those headers are desired in production.

The production host already redirects HTTP to HTTPS with `301` and sends HSTS.

Canonical route shells are generated during `npm run build` so direct requests and social crawlers receive page-specific titles, descriptions, canonical URLs, Open Graph/Twitter metadata, and JSON-LD before the React application loads.

After deployment, inspect the response status and `Location` header for every route above. If the production host ignores `_redirects`, configure equivalent permanent redirects in that host's routing settings.

## Résumé cache behavior

The committed `public/resume.pdf` is the single résumé artifact. Site links use one versioned query to refresh edge/browser caches while the canonical resource remains `/resume.pdf`. `public/_headers` requests revalidation and a canonical HTTP `Link` header where supported.

After deployment, verify both:

- `https://mikemacri.com/resume.pdf`
- the versioned link exposed by the site

The bytes should match the production build artifact and show GitLab as current with a March 2026 start date. If the bare URL remains stale, purge that URL in the production CDN and recheck it without relying on the query string.

## Google Search Console actions

The maintained post-deployment procedure now lives in `SEO-SEARCH-CONSOLE-CHECKLIST.md`.

After the production deployment:

1. Verify the deployment and canonical domain.
2. Verify the actual `/resume.pdf` bytes and response headers.
3. Submit `https://mikemacri.com/sitemap.xml`.
4. Request indexing for `https://mikemacri.com/`.
5. Request indexing for `/leadership`.
6. Request indexing for `/experience`.
7. Request indexing for `/selected-work`.
8. Request indexing for `/projects`.
9. Request indexing for `/resume`.
10. Request indexing for `/about`.
11. Inspect `/my-websites`, `/index.html`, and each retired `/portfolio/*` route to confirm Google sees the intended redirect or canonical fallback.
12. Request a re-crawl of `/resume.pdf` where Search Console makes that available.
13. Monitor older snippets and indexed URLs until they are replaced.

Search Console's temporary removal tool may be used for an obsolete URL when a stale result is materially misleading, but it is not a substitute for a durable redirect or correct HTTP behavior.

Search engines choose their own recrawl schedule. A deployment or indexing request does not guarantee immediate snippet replacement.

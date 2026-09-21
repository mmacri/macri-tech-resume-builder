# Google Search Console Post-Deployment Checklist

Use this checklist after the cleaned-up production build has been deployed to `https://mikemacri.com`.

## 1. Confirm deployment

- Confirm the production homepage shows the current Technology & Customer Success Engineering positioning and current GitLab role.
- Confirm each canonical route returns its own title, description, canonical URL, Open Graph tags, and structured data in the initial HTML response.
- Confirm `https://mikemacri.com/resume.pdf` matches the current repository artifact.
- Confirm the legacy compatibility pages contain `noindex, follow` and point to their modern destination.
- Confirm the production host is configured to redirect `www.mikemacri.com` to `mikemacri.com` with an HTTP 301 or 308. A canonical tag alone is not the preferred permanent host-level fix.
- Confirm unknown URLs return an actual HTTP 404. The React 404 page is `noindex`, but the host must provide the correct HTTP status.

## 2. Submit the sitemap

Submit or resubmit:

`https://mikemacri.com/sitemap.xml`

Confirm Search Console can read it and that it contains only the intended canonical pages.

## 3. Request indexing for canonical pages

Use **URL Inspection → Test Live URL → Request Indexing** for:

- `https://mikemacri.com/`
- `https://mikemacri.com/leadership`
- `https://mikemacri.com/selected-work`
- `https://mikemacri.com/projects`
- `https://mikemacri.com/experience`
- `https://mikemacri.com/resume`
- `https://mikemacri.com/about`
- `https://mikemacri.com/contact`

Check that Google selects the declared URL as canonical for each page.

## 4. Verify the résumé PDF

Inspect:

`https://mikemacri.com/resume.pdf`

- Confirm the live fetch sees GitLab first and current, with the title **Senior Manager, Customer Success Engineering – AMER** and **March 2026 – Present**.
- Confirm the PDF does not expose stale positioning or obsolete availability language.
- Request a recrawl or indexing update if Search Console offers that workflow for the PDF.
- If the bare PDF URL remains stale after deployment, purge that single URL from the production CDN and test it again.

## 5. Inspect legacy URLs

Use URL Inspection on representative legacy URLs:

- `https://mikemacri.com/portfolio`
- `https://mikemacri.com/portfolio/compliance`
- `https://mikemacri.com/portfolio/partner-development`
- `https://mikemacri.com/my-websites`
- `https://mikemacri.com/index.html`

The preferred result is a direct HTTP 301 or 308 to the final canonical destination. If the production platform still returns the repository’s static compatibility page, confirm that Google sees `noindex, follow`, the correct canonical destination, and the immediate redirect. Configure host-level redirects when the platform supports them; do not describe a `200` compatibility page as a permanent HTTP redirect.

## 6. Use temporary removals only when necessary

Search Console’s **Removals** tool can temporarily hide a materially misleading stale URL or snippet while Google recrawls the site.

Temporary removal is not the permanent fix. The durable fix is the redirect, removal, canonical, or HTTP behavior implemented by the site and hosting platform.

## 7. Monitor the public footprint

Google may take time to recrawl pages and replace stale snippets. Do not assume a deployment or indexing request guarantees an immediate update.

Monitor:

- Indexed page count
- Duplicate or alternate-page canonical warnings
- Redirected legacy URLs
- Soft-404 reports
- Old branded-search snippets
- The résumé PDF search result
- Searches for “Mike Macri” and “Michael Macri”
- `www` versus non-`www` indexing

## Bing Webmaster Tools

- Submit `https://mikemacri.com/sitemap.xml`.
- Inspect the homepage, Leadership, Selected Work, Experience, Resume, and representative legacy URLs.
- Confirm Bing recognizes `https://mikemacri.com` as the canonical host.


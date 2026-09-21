import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const indexPath = path.join(dist, 'index.html');
const shell = fs.readFileSync(indexPath, 'utf8');

// Keep these values aligned with the SEOHead props on the matching page.
const routes = [
  {
    path: '/',
    title: 'Mike Macri | Technology & Customer Success Engineering Leader',
    description: 'Mike Macri is a Technology and Customer Success Engineering leader at GitLab with experience leading technical teams and customer programs across VMware and ServiceNow.',
    type: 'website',
  },
  {
    path: '/leadership',
    title: 'Leadership | Mike Macri – Technology & Customer Success Engineering',
    description: 'How Mike Macri leads and builds technical organizations: people development, operating cadence, cross-functional influence, and practical frameworks for scaling Customer Success Engineering.',
    type: 'profile',
  },
  {
    path: '/selected-work',
    title: 'Selected Work | Mike Macri',
    description: 'Leadership case studies showing Mike Macri’s role and results across Customer Success Engineering, customer coverage models, enterprise governance, and partner ecosystems.',
    type: 'website',
  },
  {
    path: '/projects',
    title: 'Things I’ve Built | Mike Macri',
    description: 'Tools and prototypes Mike Macri has built to explore Customer Success, DevSecOps, security, governance, enablement, and new technologies.',
    type: 'website',
  },
  {
    path: '/experience',
    title: 'Experience | Mike Macri',
    description: 'Mike Macri’s experience building technical teams, customer programs, partner ecosystems, and enterprise transformation initiatives across GitLab, ServiceNow, and VMware.',
    type: 'website',
  },
  {
    path: '/resume',
    title: 'Resume | Michael Macri, MBA',
    description: 'Resume for Michael Macri, MBA, a technology and Customer Success Engineering leader currently leading AMER Customer Success Engineering at GitLab.',
    type: 'website',
  },
  {
    path: '/about',
    title: 'About | Mike Macri',
    description: 'The through-line behind Mike Macri’s career across technical account management, Customer Success, solution engineering, partner ecosystems, governance, AI, and CSE leadership.',
    type: 'profile',
  },
  {
    path: '/contact',
    title: 'Contact | Mike Macri',
    description: 'Connect with Mike Macri on LinkedIn to discuss Customer Success Engineering, technical leadership, DevSecOps adoption, AI/platform adoption, and customer-success operating models.',
    type: 'website',
  },
];

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const replaceRequired = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`Unable to update ${label} in the route shell.`);
  return html.replace(pattern, replacement);
};

const person = {
  '@type': 'Person',
  '@id': 'https://mikemacri.com/#person',
  name: 'Michael Macri',
  alternateName: 'Mike Macri',
  honorificSuffix: 'MBA',
  jobTitle: 'Senior Manager, Customer Success Engineering – AMER',
  description: 'Technology and Customer Success Engineering leader currently serving as Senior Manager, Customer Success Engineering – AMER at GitLab, with experience across technical teams, customer programs, partner ecosystems, and enterprise transformation.',
  url: 'https://mikemacri.com/',
  image: 'https://mikemacri.com/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png',
  sameAs: ['https://www.linkedin.com/in/mikemacri', 'https://github.com/mmacri'],
  worksFor: { '@type': 'Organization', name: 'GitLab', url: 'https://about.gitlab.com/' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Xavier University' },
};

const structuredData = ({ url, title, description, type }) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://mikemacri.com/#website',
      url: 'https://mikemacri.com/',
      name: 'Mike Macri | Technology & Customer Success Engineering Leader',
      publisher: { '@id': 'https://mikemacri.com/#person' },
    },
    person,
    {
      '@type': type === 'profile' ? 'ProfilePage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@id': 'https://mikemacri.com/#website' },
      about: { '@id': 'https://mikemacri.com/#person' },
    },
  ],
});

const renderRoute = (route) => {
  const url = `https://mikemacri.com${route.path === '/' ? '/' : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  let html = shell;

  html = replaceRequired(html, /<title>[^<]*<\/title>/i, `<title>${title}</title>`, 'title');
  html = replaceRequired(html, /<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`, 'description');
  html = replaceRequired(html, /<meta name="robots" content="[^"]*">/i, '<meta name="robots" content="index, follow">', 'robots');
  html = replaceRequired(html, /<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${url}">`, 'canonical');
  html = replaceRequired(html, /<meta property="og:type" content="[^"]*">/i, `<meta property="og:type" content="${route.type}">`, 'Open Graph type');
  html = replaceRequired(html, /<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${url}">`, 'Open Graph URL');
  html = replaceRequired(html, /<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${title}">`, 'Open Graph title');
  html = replaceRequired(html, /<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`, 'Open Graph description');
  html = replaceRequired(html, /<meta name="twitter:url" content="[^"]*">/i, `<meta name="twitter:url" content="${url}">`, 'Twitter URL');
  html = replaceRequired(html, /<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${title}">`, 'Twitter title');
  html = replaceRequired(html, /<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${description}">`, 'Twitter description');

  const jsonLd = JSON.stringify(structuredData({ ...route, url })).replace(/</g, '\\u003c');
  html = replaceRequired(
    html,
    /<script id="seo-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="seo-json-ld" type="application/ld+json">${jsonLd}</script>`,
    'structured data',
  );

  return html;
};

for (const route of routes) {
  const outputPath = route.path === '/'
    ? indexPath
    : path.join(dist, ...route.path.slice(1).split('/'), 'index.html');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderRoute(route), 'utf8');
}

let notFound = shell;
notFound = replaceRequired(notFound, /<title>[^<]*<\/title>/i, '<title>Page Not Found | Mike Macri</title>', '404 title');
notFound = replaceRequired(notFound, /<meta name="description" content="[^"]*">/i, '<meta name="description" content="The requested page could not be found.">', '404 description');
notFound = replaceRequired(notFound, /<meta name="robots" content="[^"]*">/i, '<meta name="robots" content="noindex, follow">', '404 robots');
notFound = notFound
  .replace(/\s*<link rel="canonical" href="[^"]*">/i, '')
  .replace(/\s*<meta property="og:url" content="[^"]*">/i, '')
  .replace(/\s*<meta name="twitter:url" content="[^"]*">/i, '')
  .replace(/\s*<script id="seo-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/i, '');
fs.writeFileSync(path.join(dist, '404.html'), notFound, 'utf8');

console.log(`Generated ${routes.length} canonical route shells and a noindex 404 fallback.`);

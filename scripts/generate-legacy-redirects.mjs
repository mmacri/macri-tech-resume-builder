import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const redirects = new Map([
  ['/my-websites', '/projects'],
  ['/portfolio', '/selected-work'],
  ['/portfolio/customer-success', '/selected-work#customer-success-model'],
  ['/portfolio/partner-development', '/selected-work#partner-cosell'],
  ['/portfolio/compliance', '/selected-work#policy-hub'],
  ['/portfolio/solution-engineering', '/selected-work'],
  ['/portfolio/momentum-edge', '/projects#momentum-edge'],
]);

const page = (destination) => {
  const canonical = `https://mikemacri.com${destination}`;
  const escapedDestination = JSON.stringify(destination);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, follow">
    <link rel="canonical" href="${canonical}">
    <meta http-equiv="refresh" content="0; url=${destination}">
    <title>Redirecting | Mike Macri</title>
    <script>
      const target = new URL(${escapedDestination}, window.location.origin);
      target.search = window.location.search;
      window.location.replace(target.pathname + target.search + target.hash);
    </script>
  </head>
  <body>
    <p>This page has moved. <a href="${destination}">Continue to the current page</a>.</p>
  </body>
</html>
`;
};

for (const [legacyRoute, destination] of redirects) {
  const outputDirectory = path.join(dist, ...legacyRoute.slice(1).split('/'));
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, 'index.html'), page(destination), 'utf8');
}

console.log(`Generated ${redirects.size} static legacy-route fallbacks.`);

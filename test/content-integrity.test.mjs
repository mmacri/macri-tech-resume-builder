import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const read = (path) => fs.readFileSync(path, 'utf8');
const currentTeamHeadcount = /7\s*(?:-person|Customer Success Engineers|CSEs?)/i;

test('current leadership facts remain consistent', () => {
  const career = read('src/data/careerData.ts');
  assert.match(career, /Senior Manager, Customer Success Engineering – AMER/);
  assert.match(career, /Technology & Customer Success Engineering Leader/);
  assert.match(career, /March 2026 – Present/);
  assert.match(career, /AMER Customer Success Engineering team/);
  assert.doesNotMatch(career, currentTeamHeadcount);
  assert.match(career, /Independent Advisory \/ Personal Consulting Practice/);
  const currentDateLines = career.split(/\r?\n/).filter((line) => /2026\s*[–-]\s*Present/.test(line));
  assert.ok(currentDateLines.length > 0);
  assert.ok(currentDateLines.every((line) => /Mar(?:ch)? 2026\s*[–-]\s*Present/.test(line)));
});

test('primary routes include leadership and preserve legacy redirects', () => {
  const routes = read('src/components/routing/AppRoutes.tsx');
  assert.match(routes, /path="\/leadership"/);
  assert.match(routes, /path="\/experience"/);
  assert.match(routes, /path="\/selected-work"/);
  assert.match(routes, /path="\/portfolio\/customer-success"[\s\S]*Navigate/);
  assert.match(routes, /path="\/portfolio" element={<Navigate to="\/selected-work"/);
  assert.match(routes, /path="\/my-websites" element={<Navigate to="\/projects"/);
  assert.doesNotMatch(routes, /path="\/selected-work\/\*"/);
});

test('hosting redirects map only verified legacy destinations', () => {
  const redirects = read('public/_redirects');
  assert.match(redirects, /https:\/\/www\.mikemacri\.com\/\* https:\/\/mikemacri\.com\/:splat 301!/);
  for (const rule of [
    '/my-websites /projects 301',
    '/index.html / 301',
    '/portfolio /selected-work 301',
    '/portfolio/customer-success /selected-work#customer-success-model 301',
    '/portfolio/partner-development /selected-work#partner-cosell 301',
    '/portfolio/compliance /selected-work#policy-hub 301',
    '/portfolio/solution-engineering /selected-work 301',
    '/portfolio/momentum-edge /projects#momentum-edge 301',
  ]) {
    assert.ok(redirects.includes(rule), `missing redirect rule: ${rule}`);
  }
  assert.doesNotMatch(redirects, /^\/\*/m);
  assert.doesNotMatch(redirects, /\/selected-work\/\*/);
  const generator = read('scripts/generate-legacy-redirects.mjs');
  assert.match(generator, /noindex, follow/);
  assert.match(generator, /rel="canonical"/);
  assert.match(generator, /location\.replace/);
  assert.match(generator, /destination\.split\('#'\)\[0\]/);
});

test('production build generates server-visible metadata for canonical routes and a noindex 404', () => {
  const packageJson = read('package.json');
  const generator = read('scripts/generate-route-shells.mjs');
  assert.match(packageJson, /generate-route-shells\.mjs/);
  for (const route of ['/', '/leadership', '/selected-work', '/projects', '/experience', '/resume', '/about', '/contact']) {
    assert.match(generator, new RegExp(`path: '${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`));
  }
  assert.match(generator, /noindex, follow/);
  assert.match(generator, /404\.html/);
  assert.match(generator, /Senior Manager, Customer Success Engineering – AMER/);
  assert.match(generator, /worksFor:[\s\S]*GitLab/);
});

test('homepage presents leadership scope without centering current headcount', () => {
  const home = read('src/pages/Home.tsx');
  assert.match(home, /Leadership Scope/);
  assert.match(home, /Selected Outcomes/);
  assert.doesNotMatch(home, /Leadership at Scale/);
  assert.doesNotMatch(home, /Business Impact Across My Career/);
  assert.match(home, /A Career Built Across Different Kinds of Scale/);
  assert.match(home, /How I Build Technical Organizations/);
  assert.doesNotMatch(home, /What I['’]m Building Now|currentWork/);
  assert.doesNotMatch(home, currentTeamHeadcount);
});

test('leadership and project disclosure stay accurate', () => {
  const leadership = read('src/pages/Leadership.tsx');
  const career = read('src/data/careerData.ts');
  const home = read('src/pages/Home.tsx');
  const projects = read('src/pages/MyWebsites.tsx');
  const work = read('src/pages/SelectedWork.tsx');
  assert.match(leadership, /Scope Beyond the Org Chart/);
  assert.match(career, /Clear the Path/);
  assert.match(leadership, /Conceptual operating model\./);
  assert.doesNotMatch(`${leadership}\n${career}\n${work}`, /performance (?:metrics are implied|result is claimed)/i);
  assert.match(career, /Independent prototype using synthetic data\. Not an internal GitLab system and not affiliated with or endorsed by GitLab\./);
  assert.match(projects, /Independent prototype using synthetic data/);
  assert.match(career, /id: 'scaling-cse'[\s\S]*title: 'Turning Technical Coverage Into Actionable Insight'/);
  assert.doesNotMatch(career, /id: 'cse-assigned-motion'/);
  assert.match(career, /Named CSE Coverage at 50:1 Scale/);
  assert.match(career, /Making Technical Coverage Visible/);
  assert.match(leadership, /portfolios approaching 50 customers per CSE/);
  assert.match(career, /customer portfolios approaching 50:1/);
  assert.doesNotMatch(career, /customer-to-CSE ratios? (?:of|exactly) 50:1|defined revenue threshold/i);
  assert.doesNotMatch(`${home}\n${career}`, /Launching the CSE Assigned Motion|Named CSE Coverage for 50:1 Scale Motions|Book-of-business reporting layer/);
  assert.match(career, /Served as an AI\/ML governance SME, helping define requirements, policy guidance, and reusable governance patterns/);
  assert.doesNotMatch(career, /Established ServiceNow's first AI risk policy framework|Served as SME for ServiceNow's inaugural AI risk policies/);
  assert.match(career, /A technical team's hardest decision is where not to spend time\./);
  assert.match(career, /The goal is not another dashboard\. The goal is enough visibility to understand where technical expertise is being used and where it should go next\./);
  assert.match(career, /detailLink: '\/selected-work#scaling-cse'/);
  assert.match(work, /id="cse-assigned-motion"/);
  const caseStudyBlock = career.match(/export const caseStudies = \[([\s\S]*?)\n\];\n\nexport const cseProcess/)?.[1] ?? '';
  const caseStudyIds = [...caseStudyBlock.matchAll(/id: '([^']+)'/g)].map((match) => match[1]);
  assert.equal(new Set(caseStudyIds).size, caseStudyIds.length);
  assert.doesNotMatch(career.match(/id: 'scaling-cse'[\s\S]*?detailLink: '\/selected-work#scaling-cse'/)?.[0] ?? '', /Conceptual operating model/);
  assert.match(work, /caseStudies\.map/);
});

test('contact page never simulates delivery', () => {
  const contact = read('src/pages/Contact.tsx');
  assert.doesNotMatch(contact, /setTimeout|toast\.success|message sent|Thank you for your message/i);
  assert.match(contact, /Direct website messaging is not currently enabled/i);
  assert.match(contact, /Connect on LinkedIn/);
});

test('sitemap and robots expose canonical public routes', () => {
  const sitemap = read('public/sitemap.xml');
  const robots = read('public/robots.txt');
  for (const route of ['leadership', 'experience', 'selected-work', 'projects', 'resume', 'about', 'contact']) {
    assert.match(sitemap, new RegExp(`https://mikemacri\\.com/${route}`));
  }
  assert.doesNotMatch(sitemap, /my-websites|index\.html|\/portfolio(?:\/|<)/);
  assert.match(robots, /Sitemap: https:\/\/mikemacri\.com\/sitemap\.xml/);
});

test('public recommendations are not rendered without verifiable attribution', () => {
  assert.equal(fs.existsSync('src/data/aboutData.ts'), false);
  for (const page of ['src/pages/Home.tsx', 'src/pages/Leadership.tsx']) {
    const source = read(page);
    assert.doesNotMatch(source, /recommendations\.slice|tremendous business partner|true mentor, coach, and leader/);
    assert.match(source, /LinkedIn/);
  }
});

test('person schema identifies the factual current role and verified profiles', () => {
  const seo = read('src/components/layout/SEOHead.tsx');
  const fallback = read('index.html');
  for (const source of [seo, fallback]) {
    assert.match(source, /Senior Manager, Customer Success Engineering – AMER/);
    assert.match(source, /GitLab/);
    assert.match(source, /linkedin\.com\/in\/mikemacri/);
    assert.match(source, /github\.com\/mmacri/);
  }
  assert.doesNotMatch(seo, /jobTitle:\s*['"](?:Director|Executive|VP)/);
});

test('resume links share one cache-busted canonical artifact', () => {
  const career = read('src/data/careerData.ts');
  assert.match(career, /resumeFile: 'resume\.pdf\?v=2026-09-21-2'/);
  for (const page of ['src/pages/Home.tsx', 'src/pages/ExperienceImpact.tsx', 'src/pages/Resume.tsx']) {
    const source = read(page);
    assert.match(source, /profile\.resumeFile/);
    assert.doesNotMatch(source, /resume\.pdf\?v=/);
  }
  const headers = read('public/_headers');
  assert.match(headers, /Cache-Control: public, max-age=0, must-revalidate/);
  assert.match(headers, /<https:\/\/mikemacri\.com\/resume\.pdf>; rel="canonical"/);
});

test('major pages have unique canonical SEO titles', () => {
  const expectations = new Map([
    ['src/pages/Home.tsx', 'Mike Macri | Technology & Customer Success Engineering Leader'],
    ['src/pages/Leadership.tsx', 'Leadership | Mike Macri – Technology & Customer Success Engineering'],
    ['src/pages/ExperienceImpact.tsx', 'Experience | Mike Macri'],
    ['src/pages/SelectedWork.tsx', 'Selected Work | Mike Macri'],
    ['src/pages/MyWebsites.tsx', 'Things I’ve Built | Mike Macri'],
    ['src/pages/Resume.tsx', 'Resume | Michael Macri, MBA'],
    ['src/pages/About.tsx', 'About | Mike Macri'],
    ['src/pages/Contact.tsx', 'Contact | Mike Macri'],
  ]);
  for (const [path, title] of expectations) assert.match(read(path), new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(read('src/components/layout/SEOHead.tsx'), /title\.includes\('Michael Macri'\)/);
});

test('homepage fallback and runtime metadata use the same current identity', () => {
  const description = 'Mike Macri is a Technology and Customer Success Engineering leader at GitLab with experience leading technical teams and customer programs across VMware and ServiceNow.';
  for (const path of ['index.html', 'src/components/layout/SEOHead.tsx', 'src/pages/Home.tsx', 'scripts/generate-route-shells.mjs']) {
    assert.ok(read(path).includes(description), `${path} does not contain the canonical homepage description`);
  }
});

test('social preview is the intended 1200 by 630 image', () => {
  const image = fs.readFileSync('public/og-image.png');
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});

test('downloadable resume bytes contain current role and permitted contact only', () => {
  const pdf = read('public/resume.pdf');
  assert.match(pdf, /Senior Manager, Customer Success Engineering \\226 AMER/);
  assert.match(pdf, /TECHNOLOGY & CUSTOMER SUCCESS ENGINEERING LEADER/);
  assert.match(pdf, /March 2026 - Present/);
  assert.match(pdf, /GitLab/);
  assert.match(pdf, /AMER Customer Success Engineering team/);
  assert.doesNotMatch(pdf, currentTeamHeadcount);
  assert.match(pdf, /Limited Independent Advisory Work \/ Personal Consulting Practice/);
  assert.match(pdf, /ServiceNow/);
  assert.match(pdf, /VMware/);
  assert.match(pdf, /\$900M/);
  assert.match(pdf, /\$440M/);
  assert.match(pdf, /\$50M\+/);
  assert.match(pdf, /20% \+ 83 NPS/);
  assert.match(pdf, /mikemacri\.com/);
  assert.match(pdf, /linkedin\.com\/in\/mikemacri/);
  assert.doesNotMatch(pdf, /Experienced Strategic Solution Engineering Leader/i);
  assert.doesNotMatch(pdf, /Open to (?:Senior IC|senior individual contributor|opportunities)/i);
  assert.doesNotMatch(pdf, /mailto:|tel:|Email:|Phone:|Address:/i);
});

import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const read = (path) => fs.readFileSync(path, 'utf8');

test('current leadership facts remain consistent', () => {
  const career = read('src/data/careerData.ts');
  assert.match(career, /Senior Manager, Customer Success Engineering – AMER/);
  assert.match(career, /Technology & Customer Success Engineering Leader/);
  assert.match(career, /March 2026 – Present/);
  assert.match(career, /7 Customer Success Engineers/);
  assert.match(career, /Independent Advisory \/ Personal Consulting Practice/);
  const currentDateLines = career.split(/\r?\n/).filter((line) => /2026\s*[–-]\s*Present/.test(line));
  assert.ok(currentDateLines.length > 0);
  assert.ok(currentDateLines.every((line) => /Mar(?:ch)? 2026\s*[–-]\s*Present/.test(line)));
});

test('primary routes include leadership and preserve indexed redirects', () => {
  const routes = read('src/components/routing/AppRoutes.tsx');
  assert.match(routes, /path="\/leadership"/);
  assert.match(routes, /path="\/experience"/);
  assert.match(routes, /path="\/selected-work"/);
  assert.match(routes, /path="\/portfolio\/customer-success"[\s\S]*Navigate/);
});

test('homepage defines leadership scale beyond current headcount', () => {
  const home = read('src/pages/Home.tsx');
  assert.match(home, /Leadership at Scale/);
  assert.match(home, /A Career Built Across Different Kinds of Scale/);
  assert.match(home, /How I Build Technical Organizations/);
  assert.doesNotMatch(home, /7 CSEs|7-person/);
});

test('leadership and project disclosure stay accurate', () => {
  const leadership = read('src/pages/Leadership.tsx');
  const career = read('src/data/careerData.ts');
  const projects = read('src/pages/MyWebsites.tsx');
  const work = read('src/pages/SelectedWork.tsx');
  assert.match(leadership, /Scope Beyond the Org Chart/);
  assert.match(career, /Clear the Path/);
  assert.match(leadership, /Conceptual operating model\. No GitLab performance metrics are implied/);
  assert.match(projects, /Personal prototype \/ portfolio project — not an official GitLab product/);
  assert.match(work, /Why I Built This/);
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
  assert.match(robots, /Sitemap: https:\/\/mikemacri\.com\/sitemap\.xml/);
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
});

test('social preview is the intended 1200 by 630 image', () => {
  const image = fs.readFileSync('public/og-image.png');
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});

test('downloadable resume bytes contain current role and permitted contact only', () => {
  const pdf = read('public/resume.pdf');
  assert.match(pdf, /Senior Manager, Customer Success Engineering - AMER/);
  assert.match(pdf, /TECHNOLOGY & CUSTOMER SUCCESS ENGINEERING LEADER/);
  assert.match(pdf, /March 2026 - Present/);
  assert.match(pdf, /GitLab/);
  assert.match(pdf, /7 Customer Success Engineers/);
  assert.match(pdf, /linkedin\.com\/in\/mikemacri/);
  assert.doesNotMatch(pdf, /mailto:|tel:|Email:|Phone:|Address:/i);
});

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pdfPath = path.join(root, 'public', 'resume.pdf');
const pdf = fs.readFileSync(pdfPath, 'latin1');

const pageCountMatch = pdf.match(/\/Type \/Pages \/Kids \[[^\]]+\] \/Count (\d+)/);
if (!pageCountMatch) throw new Error('Unable to determine resume PDF page count.');
const pageCount = Number(pageCountMatch[1]);

const text = [...pdf.matchAll(/\(((?:\\.|[^\\)])*)\) Tj/g)]
  .map((match) => match[1]
    .replace(/\\([\\()])/g, '$1')
    .replace(/\\n/g, '\n'))
  .join('\n');

const required = [
  'Michael Macri, MBA',
  'Technology & Customer Success Engineering Leader',
  'Senior Manager, Customer Success Engineering - AMER',
  'GitLab',
  'March 2026 - Present',
  '7 Customer Success Engineers',
  'Momentum Edge Consulting',
  'Limited Independent Advisory Work',
  'ServiceNow',
  'VMware',
  '$900M',
  '$50M+',
  '$440M',
  '83 NPS',
  '20% renewal growth',
  'mikemacri.com',
  'linkedin.com/in/mikemacri',
];

const forbidden = [
  'Experienced Strategic Solution Engineering Leader',
  'Strategic Solution Engineering Leader',
  'Open to Senior IC',
  'Open to senior individual contributor',
  'Open to opportunities',
];

const missing = required.filter((phrase) => !text.toLowerCase().includes(phrase.toLowerCase()));
const stale = forbidden.filter((phrase) => text.toLowerCase().includes(phrase.toLowerCase()));

if (pageCount !== 2) throw new Error(`Expected a 2-page resume; generated ${pageCount} pages.`);
if (missing.length) throw new Error(`Resume PDF is missing required text: ${missing.join(', ')}`);
if (stale.length) throw new Error(`Resume PDF contains stale text: ${stale.join(', ')}`);
if (!/BT \/F[12]/.test(pdf)) throw new Error('Resume PDF does not contain selectable text operators.');

console.log(`Verified ${path.relative(root, pdfPath)}: ${pageCount} pages, selectable text, current GitLab role, and no stale positioning.`);

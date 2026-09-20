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
    .replace(/\\222/g, '’')
    .replace(/\\226/g, '–')
    .replace(/\\227/g, '—')
    .replace(/\\([\\()])/g, '$1')
    .replace(/\\n/g, '\n'))
  .join('\n');
const normalizedText = text.replace(/\s+/g, ' ');

const required = [
  'Michael Macri, MBA',
  'Technology & Customer Success Engineering Leader',
  'Senior Manager, Customer Success Engineering – AMER',
  'GitLab',
  'March 2026 - Present',
  'AMER Customer Success Engineering team',
  'Helped build and launch the CSE Assigned motion',
  'Associate-to-Intermediate development path',
  'Rebuilt CSE territory coverage across the AMER book',
  "Built the team's book-of-business reporting layer",
  'Designed the measurement framework for the CSE Assigned motion',
  'An AMER private-sector portfolio',
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

const confidentialPatterns = [
  /7\s+Customer Success Engineers/i,
  /7\s*-\s*person\s+AMER CSE team/i,
  /multi-million-dollar\s+ARR/i,
  /SMB,\s+Mid-Market,\s+Enterprise,\s+Financial Services,\s+and\s+Key Accounts/i,
];

const missing = required.filter((phrase) => !normalizedText.toLowerCase().includes(phrase.toLowerCase()));
const stale = forbidden.filter((phrase) => normalizedText.toLowerCase().includes(phrase.toLowerCase()));
const confidential = confidentialPatterns.filter((pattern) => pattern.test(normalizedText));

if (pageCount !== 2) throw new Error(`Expected a 2-page resume; generated ${pageCount} pages.`);
if (missing.length) throw new Error(`Resume PDF is missing required text: ${missing.join(', ')}`);
if (stale.length) throw new Error(`Resume PDF contains stale text: ${stale.join(', ')}`);
if (confidential.length) throw new Error(`Resume PDF contains prohibited current-role figures: ${confidential.join(', ')}`);
if (!/BT \/F[12]/.test(pdf)) throw new Error('Resume PDF does not contain selectable text operators.');

console.log(`Verified ${path.relative(root, pdfPath)}: ${pageCount} pages, selectable text, current GitLab role, and no stale positioning.`);

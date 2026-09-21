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
  'named CSE coverage designed for customer-to-CSE ratios approaching 50:1',
  'Associate-to-Intermediate development path',
  "Built the team's live operational view",
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
const extractedLines = text.split('\n').map((line) => line.trim()).filter(Boolean);
const standaloneArtifacts = extractedLines.filter((line) => /^[-•]$/.test(line));

const orderedMarkers = [
  'Michael Macri, MBA',
  'TECHNOLOGY & CUSTOMER SUCCESS ENGINEERING LEADER',
  'Senior Manager, Customer Success Engineering – AMER',
  'SELECTED CAREER IMPACT',
  'PROFESSIONAL EXPERIENCE',
  'Principal Consultant',
  'Senior Manager, Solution Advisory - Legal Ethics & Compliance',
  'Partner Business & Technical Alliance Director - Americas',
  'CAPABILITIES',
  'EDUCATION & RECOGNITION',
];
const markerPositions = orderedMarkers.map((marker) => normalizedText.indexOf(marker));
const readingOrderIsValid = markerPositions.every((position, index) => position >= 0 && (index === 0 || position > markerPositions[index - 1]));

if (process.argv.includes('--print-text')) {
  console.log('--- Extracted resume text ---\n');
  console.log(text);
  console.log('\n--- Reading-order markers ---');
  orderedMarkers.forEach((marker, index) => console.log(`${marker}: ${markerPositions[index]}`));
}

if (pageCount !== 2) throw new Error(`Expected a 2-page resume; generated ${pageCount} pages.`);
if (missing.length) throw new Error(`Resume PDF is missing required text: ${missing.join(', ')}`);
if (stale.length) throw new Error(`Resume PDF contains stale text: ${stale.join(', ')}`);
if (confidential.length) throw new Error(`Resume PDF contains prohibited current-role figures: ${confidential.join(', ')}`);
if (standaloneArtifacts.length) throw new Error(`Resume PDF contains standalone bullet artifacts in extracted text: ${standaloneArtifacts.join(', ')}`);
if (!readingOrderIsValid) throw new Error('Resume PDF text extraction is not in the expected reading order.');
if (!/BT \/F[12]/.test(pdf)) throw new Error('Resume PDF does not contain selectable text operators.');

console.log(`Verified ${path.relative(root, pdfPath)}: ${pageCount} pages, selectable text, current GitLab role, and no stale positioning.`);

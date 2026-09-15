import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'public', 'resume-source.md');
const outputPath = path.join(root, 'public', 'resume.pdf');
const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');

const escapePdfText = (value) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '-');

const wrapLine = (line, max = 92) => {
  if (!line.trim()) return [''];
  const words = line.split(/\s+/);
  const wrapped = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      wrapped.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) wrapped.push(current);
  return wrapped;
};

const lines = source.split('\n').flatMap((line) => wrapLine(line));
const pages = [];
const linesPerPage = 48;
for (let index = 0; index < lines.length; index += linesPerPage) {
  pages.push(lines.slice(index, index + linesPerPage));
}

const objects = [];
const addObject = (body) => {
  objects.push(body);
  return objects.length;
};

const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>');
const pagesId = addObject('');
const fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
const pageIds = [];
const contentIds = [];

for (const pageLines of pages) {
  const commands = ['BT', '/F1 10 Tf', '14 TL', '54 760 Td'];
  pageLines.forEach((line, lineIndex) => {
    if (lineIndex > 0) commands.push('T*');
    commands.push(`(${escapePdfText(line)}) Tj`);
  });
  commands.push('ET');
  const stream = commands.join('\n');
  const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`);
  const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
  contentIds.push(contentId);
  pageIds.push(pageId);
}

objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

let pdf = '%PDF-1.4\n';
const offsets = [0];
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, 'utf8'));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, 'utf8');
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

fs.writeFileSync(outputPath, pdf, 'binary');
console.log(`Generated ${path.relative(root, outputPath)} from ${path.relative(root, sourcePath)} with ${pages.length} page(s).`);

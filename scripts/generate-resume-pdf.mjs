import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'public', 'resume-source.md');
const outputPath = path.join(root, 'public', 'resume.pdf');
const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');

const page = {
  width: 612,
  height: 792,
  marginX: 44,
  marginTop: 42,
  marginBottom: 42,
};

const colors = {
  navy: '0.06 0.13 0.24',
  blue: '0.09 0.27 0.45',
  text: '0.13 0.15 0.18',
  muted: '0.38 0.42 0.48',
  rule: '0.76 0.81 0.88',
};

const escapePdfText = (value) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '-');

const textWidth = (text, size) => text.length * size * 0.48;

const wrapText = (text, size, maxWidth) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [''];

  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (textWidth(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
};

const rawLines = source.split('\n').map((line) => line.trim());
const [name, headline, currentRoleLine] = rawLines;
const linkedinLine = rawLines.find((line) => line.startsWith('LinkedIn:')) ?? 'LinkedIn: https://www.linkedin.com/in/mikemacri';
const summaryStart = rawLines.findIndex((line, index) => index > 2 && line.length > 0);
const experienceIndex = rawLines.indexOf('Experience');
const summary = rawLines.slice(summaryStart, experienceIndex).filter(Boolean).join(' ');

const sections = [];
let currentSection = null;
for (const line of rawLines.slice(experienceIndex)) {
  if (!line) continue;
  if (['Experience', 'Capability Areas', 'Selected Historical Impact'].includes(line)) {
    currentSection = { title: line, lines: [] };
    sections.push(currentSection);
  } else if (currentSection && !line.startsWith('LinkedIn:')) {
    currentSection.lines.push(line);
  }
}

const pages = [[]];
let commands = pages[0];
let y = page.height - page.marginTop;

const add = (command) => commands.push(command);
const setColor = (color) => add(`${color} rg`);
const setStroke = (color) => add(`${color} RG`);

const newPage = () => {
  pages.push([]);
  commands = pages[pages.length - 1];
  y = page.height - page.marginTop;
};

const ensureSpace = (height) => {
  if (y - height < page.marginBottom) {
    newPage();
  }
};

const drawText = ({ text, x = page.marginX, size = 10, font = 'F1', color = colors.text, leading = size + 3 }) => {
  ensureSpace(leading);
  setColor(color);
  add(`BT /${font} ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
  y -= leading;
};

const drawWrapped = ({ text, x = page.marginX, size = 10, font = 'F1', color = colors.text, maxWidth = page.width - page.marginX * 2, leading = size + 3, firstIndent = 0, subsequentIndent = 0 }) => {
  const lines = wrapText(text, size, maxWidth - firstIndent);
  lines.forEach((line, index) => {
    const indent = index === 0 ? firstIndent : subsequentIndent;
    drawText({ text: line, x: x + indent, size, font, color, leading });
  });
};

const drawRule = (offset = 3) => {
  setStroke(colors.rule);
  add(`0.7 w ${page.marginX} ${y + offset} m ${page.width - page.marginX} ${y + offset} l S`);
};

const sectionHeading = (title) => {
  ensureSpace(28);
  y -= pages.length === 1 && y > 680 ? 4 : 8;
  drawText({ text: title.toUpperCase(), size: 10, font: 'F2', color: colors.blue, leading: 14 });
  drawRule(4);
  y -= 4;
};

const splitMeta = (line) => {
  const parts = line.split('|').map((part) => part.trim());
  return {
    company: parts[0] ?? '',
    dates: parts[1] ?? '',
    location: parts[2] ?? '',
  };
};

const drawRole = (title, metaLine, bullets) => {
  ensureSpace(62);
  const meta = splitMeta(metaLine);
  drawText({ text: title, size: 10.5, font: 'F2', color: colors.navy, leading: 13 });
  drawText({
    text: [meta.company, meta.dates, meta.location].filter(Boolean).join(' | '),
    size: 9.2,
    font: 'F1',
    color: colors.muted,
    leading: 12,
  });
  bullets.forEach((bullet) => {
    drawWrapped({
      text: bullet.replace(/^- /, ''),
      x: page.marginX + 10,
      size: 9.3,
      font: 'F1',
      color: colors.text,
      maxWidth: page.width - page.marginX * 2 - 10,
      leading: 12.2,
      firstIndent: 0,
      subsequentIndent: 10,
    });
    add(`BT /F1 9 Tf ${page.marginX + 1} ${y + 12.2} Td (-) Tj ET`);
  });
  y -= 4;
};

const drawStandardBullets = (lines) => {
  lines.forEach((line) => {
    drawWrapped({
      text: line.replace(/^- /, ''),
      x: page.marginX + 10,
      size: 9.2,
      font: 'F1',
      maxWidth: page.width - page.marginX * 2 - 10,
      leading: 12,
      subsequentIndent: 10,
    });
    add(`BT /F1 9 Tf ${page.marginX + 1} ${y + 12} Td (-) Tj ET`);
  });
};

const drawCapabilities = (lines) => {
  lines.forEach((line) => {
    const [label, rest] = line.replace(/^- /, '').split(': ');
    drawWrapped({
      text: `${label}: ${rest ?? ''}`,
      x: page.marginX,
      size: 9.1,
      font: 'F1',
      maxWidth: page.width - page.marginX * 2,
      leading: 11.5,
      subsequentIndent: 14,
    });
  });
};

setColor('0.96 0.98 1');
add(`0 ${page.height - 124} ${page.width} 124 re f`);
drawText({ text: name, size: 22, font: 'F2', color: colors.navy, leading: 25 });
drawText({ text: headline, size: 12.5, font: 'F2', color: colors.blue, leading: 17 });
drawText({ text: currentRoleLine, size: 9.5, font: 'F1', color: colors.muted, leading: 13 });
drawText({ text: linkedinLine.replace('LinkedIn: ', ''), size: 9.2, font: 'F1', color: colors.blue, leading: 13 });
y -= 4;
drawRule(0);
y -= 14;

drawWrapped({
  text: summary,
  size: 9.7,
  font: 'F1',
  color: colors.text,
  maxWidth: page.width - page.marginX * 2,
  leading: 12.8,
});

for (const section of sections) {
  sectionHeading(section.title);
  if (section.title === 'Experience') {
    let index = 0;
    while (index < section.lines.length) {
      const title = section.lines[index];
      const meta = section.lines[index + 1];
      index += 2;
      const bullets = [];
      while (index < section.lines.length && section.lines[index].startsWith('- ')) {
        bullets.push(section.lines[index]);
        index += 1;
      }
      drawRole(title, meta, bullets);
    }
  } else if (section.title === 'Capability Areas') {
    drawCapabilities(section.lines);
  } else {
    drawStandardBullets(section.lines);
  }
}

const objects = [];
const addObject = (body) => {
  objects.push(body);
  return objects.length;
};

const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>');
const pagesId = addObject('');
const fontRegularId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
const fontBoldId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
const pageIds = [];

for (const pageCommands of pages) {
  const stream = pageCommands.join('\n');
  const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`);
  const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
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

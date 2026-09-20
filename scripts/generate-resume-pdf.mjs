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
  blue: '0.05 0.35 0.55',
  accent: '0.07 0.55 0.68',
  text: '0.13 0.15 0.18',
  muted: '0.38 0.42 0.48',
  rule: '0.76 0.81 0.88',
  white: '1 1 1',
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

// LinkedIn is the only personal contact channel permitted in the public resume.
// Filter common contact fields so a future source edit cannot leak them.
const contactLine = /^(email|phone|mobile|website|web|address)\s*:/i;
const rawLines = source.split('\n').map((line) => line.trim()).filter((line) => !contactLine.test(line));
const [name, headline, currentRoleLine] = rawLines;
const linkedinLine = rawLines.find((line) => line.startsWith('LinkedIn:')) ?? '';
const summaryStart = rawLines.findIndex((line, index) => index > 2 && line.length > 0);
const firstSectionIndex = rawLines.indexOf('Key Achievements');
const summary = rawLines.slice(summaryStart, firstSectionIndex).filter((line) => line && !line.startsWith('LinkedIn:')).join(' ');

const sections = [];
let currentSection = null;
for (const line of rawLines.slice(firstSectionIndex)) {
  if (!line) continue;
  if (['Key Achievements', 'Professional Experience', 'Education', 'Recognition'].includes(line)) {
    currentSection = { title: line, lines: [] };
    sections.push(currentSection);
  } else if (currentSection) {
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

const drawRightText = ({ text, right = page.width - page.marginX, baseline = y, size = 9, font = 'F1', color = colors.muted }) => {
  setColor(color);
  add(`BT /${font} ${size} Tf ${right - textWidth(text, size)} ${baseline} Td (${escapePdfText(text)}) Tj ET`);
};

const sectionHeading = (title) => {
  ensureSpace(28);
  y -= pages.length === 1 && y > 680 ? 5 : 11;
  setColor(colors.accent);
  add(`${page.marginX} ${y - 2} 4 14 re f`);
  drawText({ text: title.toUpperCase(), x: page.marginX + 11, size: 10, font: 'F2', color: colors.navy, leading: 17 });
  drawRule(2);
  y -= 5;
};

const splitMeta = (line) => {
  const parts = line.split('|').map((part) => part.trim());
  return {
    company: parts[0] ?? '',
    dates: parts[1] ?? '',
    location: parts[2] ?? '',
  };
};

const drawRole = (title, metaLine, roleSummary, bullets) => {
  const contentWidth = page.width - page.marginX * 2;
  const bulletWidth = contentWidth - 14;
  const requiredHeight =
    14 +
    13 +
    (roleSummary ? wrapText(roleSummary, 9.1, contentWidth).length * 11.8 + 2 : 0) +
    bullets.reduce((height, bullet) => height + wrapText(bullet.replace(/^- /, ''), 9.3, bulletWidth).length * 12.2, 0) +
    4;
  ensureSpace(requiredHeight);
  const meta = splitMeta(metaLine);
  drawText({ text: title, size: 10.7, font: 'F2', color: colors.navy, leading: 14 });
  drawText({ text: meta.company, size: 9.3, font: 'F2', color: colors.blue, leading: 13 });
  drawRightText({ text: [meta.dates, meta.location].filter(Boolean).join('  |  '), baseline: y + 13, size: 8.7 });
  if (roleSummary) {
    drawWrapped({
      text: roleSummary,
      size: 9.1,
      color: colors.muted,
      leading: 11.8,
    });
    y -= 2;
  }
  bullets.forEach((bullet) => {
    drawWrapped({
      text: bullet.replace(/^- /, ''),
      x: page.marginX + 14,
      size: 9.3,
      font: 'F1',
      color: colors.text,
      maxWidth: page.width - page.marginX * 2 - 14,
      leading: 12.2,
      firstIndent: 0,
      subsequentIndent: 10,
    });
    setColor(colors.accent);
    add(`${page.marginX + 2} ${y + 15.2} 3 3 re f`);
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

setColor(colors.navy);
add(`0 ${page.height - 126} ${page.width} 126 re f`);
setColor(colors.accent);
add(`0 ${page.height - 132} ${page.width} 6 re f`);
drawText({ text: name, x: page.marginX, size: 23, font: 'F2', color: colors.white, leading: 29 });
drawText({ text: headline.toUpperCase(), x: page.marginX, size: 10.5, font: 'F2', color: '0.45 0.84 0.91', leading: 19 });
drawText({ text: currentRoleLine, x: page.marginX, size: 9.2, font: 'F1', color: '0.84 0.88 0.92', leading: 13 });
if (linkedinLine) {
  drawText({ text: linkedinLine, x: page.marginX, size: 8.7, font: 'F1', color: '0.45 0.84 0.91', leading: 13 });
}
y -= 14;

drawText({ text: 'PROFESSIONAL SUMMARY', size: 9.5, font: 'F2', color: colors.blue, leading: 16 });

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
  if (section.title === 'Professional Experience') {
    let index = 0;
    while (index < section.lines.length) {
      const title = section.lines[index];
      const meta = section.lines[index + 1];
      index += 2;
      let roleSummary = '';
      if (index < section.lines.length && !section.lines[index].startsWith('- ')) {
        roleSummary = section.lines[index];
        index += 1;
      }
      const bullets = [];
      while (index < section.lines.length && section.lines[index].startsWith('- ')) {
        bullets.push(section.lines[index]);
        index += 1;
      }
      drawRole(title, meta, roleSummary, bullets);
    }
  } else {
    drawStandardBullets(section.lines);
  }
}

// Consistent, restrained page furniture makes multi-page output feel intentional.
pages.forEach((pageCommands, index) => {
  pageCommands.push(`${colors.rule} RG`);
  pageCommands.push(`0.5 w ${page.marginX} 28 m ${page.width - page.marginX} 28 l S`);
  pageCommands.push(`${colors.muted} rg`);
  pageCommands.push(`BT /F1 7.5 Tf ${page.marginX} 16 Td (MICHAEL MACRI, MBA  |  PROFESSIONAL RESUME) Tj ET`);
  const pageLabel = `${index + 1} / ${pages.length}`;
  pageCommands.push(`BT /F1 7.5 Tf ${page.width - page.marginX - textWidth(pageLabel, 7.5)} 16 Td (${pageLabel}) Tj ET`);
});

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

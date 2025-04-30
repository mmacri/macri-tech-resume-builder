
import { formatDateString } from './resumeFormatters';

/**
 * Generate the HTML for the experiences section
 */
export const generateExperiencesSection = (experiences: any[]): string => {
  if (!experiences || experiences.length === 0) {
    return '';
  }

  return `
    <div class="section">
      <h2>Professional Experience</h2>
      ${experiences.map(exp => `
        <div class="experience-item">
          <div class="date-range">${formatDateString(exp.start_date)} - ${formatDateString(exp.end_date)}</div>
          <div class="job-title">${exp.title}</div>
          <div class="company-name">${exp.organization || ''}</div>
          ${exp.description ? `
            <ul class="description">
              ${exp.description.split('\\n').map(point => `<li>${point}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
};

/**
 * Generate the HTML for the education section
 */
export const generateEducationSection = (education: any[]): string => {
  if (!education || education.length === 0) {
    return '';
  }

  return `
    <div class="section">
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="education-item">
          <div class="date-range">${formatDateString(edu.start_date)} - ${formatDateString(edu.end_date)}</div>
          <div class="degree">${edu.title}</div>
          <div class="school-name">${edu.organization || ''}</div>
          ${edu.description ? `<div class="description">${edu.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
};

/**
 * Generate the HTML for the skills section
 */
export const generateSkillsSection = (skills: any[]): string => {
  if (!skills || skills.length === 0) {
    return '';
  }
  
  return `
    <div class="section">
      <h2>Skills</h2>
      <ul class="skills-list">
        ${skills.map(skill => `<li>${skill.title}</li>`).join('')}
      </ul>
    </div>
  `;
};

/**
 * Generate the HTML for the about section's skills and success items
 */
export const generateAboutSkillsSection = (skillItems: string[], successItems: string[]): string => {
  if ((!skillItems || skillItems.length === 0) && (!successItems || successItems.length === 0)) {
    return '';
  }
  
  return `
    <div class="section">
      <table width="100%" cellpadding="5">
        <tr valign="top">
          ${skillItems && skillItems.length > 0 ? `
          <td width="50%">
            <h3><i class="fas fa-check-circle"></i> Professional Skills</h3>
            <ul>
              ${skillItems.map((skill: string) => `<li>${skill}</li>`).join('')}
            </ul>
          </td>
          ` : ''}
          
          ${successItems && successItems.length > 0 ? `
          <td width="50%">
            <h3><i class="fas fa-trophy"></i> Demonstrated Success</h3>
            <ul>
              ${successItems.map((success: string) => `<li>${success}</li>`).join('')}
            </ul>
          </td>
          ` : ''}
        </tr>
      </table>
    </div>
  `;
};

/**
 * Generate the HTML for the references section
 */
export const generateReferencesSection = (references: string[]): string => {
  if (!references || references.length === 0) {
    return '';
  }
  
  return `
    <div class="section references-section">
      <h2>References</h2>
      ${references.map((reference: string) => `
        <div class="reference-item">
          "${reference}"
        </div>
      `).join('')}
    </div>
  `;
};

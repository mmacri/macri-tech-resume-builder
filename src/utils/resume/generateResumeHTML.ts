
import { initialAboutData } from './aboutData';
import { parseContactInfo, formatDateString } from './html/resumeFormatters';
import { generateResumeStyles } from './html/resumeStyles';
import { 
  generateExperiencesSection, 
  generateEducationSection, 
  generateSkillsSection,
  generateAboutSkillsSection,
  generateReferencesSection
} from './html/resumeSections';
import { AboutInfo } from './html/resumeTypes';

/**
 * Generate HTML content for the resume
 */
export const generateResumeHTML = (aboutData: any, experiences: any[], education: any[], skills: any[]) => {
  console.log('Generating resume HTML with data:', { 
    aboutData: !!aboutData, 
    experiencesCount: experiences.length,
    educationCount: education.length,
    skillsCount: skills.length
  });
  
  // Parse about data if it's a JSON string
  let aboutInfo: AboutInfo = {};
  if (aboutData?.description) {
    try {
      aboutInfo = JSON.parse(aboutData.description) as AboutInfo;
    } catch (e) {
      console.error('Error parsing about data description:', e);
      // Use initial data as fallback
      aboutInfo = { ...initialAboutData };
    }
  } else {
    // Use initial data as fallback
    aboutInfo = { ...initialAboutData };
  }
  
  // Extract skills and success items with fallbacks
  const skillItems = aboutInfo?.skills_items || initialAboutData.skills_items;
  const successItems = aboutInfo?.success_items || initialAboutData.success_items;
  const references = aboutInfo?.references || initialAboutData.references;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mike Macri Resume</title>
      <style>
        ${generateResumeStyles()}
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${aboutInfo?.full_name || aboutData?.title || initialAboutData.full_name}</h1>
        ${aboutInfo?.headline ? `<p>${aboutInfo.headline}</p>` : aboutData?.subtitle ? `<p>${aboutData.subtitle}</p>` : `<p>${initialAboutData.headline}</p>`}
      </div>
      
      <div class="contact-info">
        ${aboutData?.description ? parseContactInfo(aboutData.description) : 
          `Email: ${initialAboutData.email} | ${initialAboutData.locations.join(', ')}`}
      </div>
      
      <div class="section">
        <p>${aboutInfo?.intro_text || initialAboutData.intro_text}</p>
      </div>
      
      ${generateAboutSkillsSection(skillItems, successItems)}
      
      ${generateReferencesSection(references)}
      
      ${generateExperiencesSection(experiences)}
      
      ${generateEducationSection(education)}
      
      ${generateSkillsSection(skills)}
    </body>
    </html>
  `;
};

// Re-export formatDateString and parseContactInfo for backward compatibility
export { formatDateString, parseContactInfo } from './html/resumeFormatters';


import { fallbackResumeData } from './fallbackData';
import { extractResumeSection, parseAboutData } from './extractUtils';
import { ExtractedResumeData } from './html/resumeTypes';

/**
 * Extract all necessary resume sections for PDF generation
 * @param resumeSections - All resume sections data
 * @returns Object containing extracted sections
 */
export const extractResumeSectionsForPDF = (resumeSections: any[] | undefined): ExtractedResumeData => {
  // If no resume sections provided, return fallback data
  if (!resumeSections || resumeSections.length === 0) {
    console.log('No resume sections provided, using fallback data');
    return fallbackResumeData;
  }
  
  // Find the about section for contact info
  const aboutSection = resumeSections.find(section => 
    section.section_name.toLowerCase() === 'about'
  );
  const aboutData = aboutSection?.items[0] || fallbackResumeData.aboutData;
  
  // Get the experience section
  const experiences = extractResumeSection(resumeSections, 'experience');
  
  // Get the education section
  const education = extractResumeSection(resumeSections, 'education');
  
  // Get the skills section
  const skills = extractResumeSection(resumeSections, 'skills');
  
  // If any section is empty, use the fallback data for that section
  return {
    aboutData: aboutData || fallbackResumeData.aboutData,
    experiences: experiences.length > 0 ? experiences : fallbackResumeData.experiences,
    education: education.length > 0 ? education : fallbackResumeData.education,
    skills: skills.length > 0 ? skills : fallbackResumeData.skills
  };
};

// Re-export the extraction utility functions
export { extractResumeSection, parseAboutData } from './extractUtils';


/**
 * Utility functions for extracting resume sections from resume data
 */

/**
 * Extract a specific section and its items from resume sections data
 * @param resumeSections - All resume sections data
 * @param sectionName - Name of the section to extract
 * @returns The section items or empty array if not found
 */
export const extractResumeSection = (resumeSections: any[] | undefined, sectionName: string): any[] => {
  if (!resumeSections || resumeSections.length === 0) {
    return [];
  }
  
  const section = resumeSections.find(section => 
    section.section_name.toLowerCase() === sectionName.toLowerCase()
  );
  
  return section?.items || [];
};

/**
 * Extract all necessary resume sections for PDF generation
 * @param resumeSections - All resume sections data
 * @returns Object containing extracted sections
 */
export const extractResumeSectionsForPDF = (resumeSections: any[] | undefined) => {
  if (!resumeSections || resumeSections.length === 0) {
    return {
      aboutData: undefined,
      experiences: [],
      education: [],
      skills: []
    };
  }
  
  // Find the about section for contact info
  const aboutSection = resumeSections.find(section => 
    section.section_name.toLowerCase() === 'about'
  );
  const aboutData = aboutSection?.items[0];
  
  // Get the experience section
  const experiences = extractResumeSection(resumeSections, 'experience');
  
  // Get the education section
  const education = extractResumeSection(resumeSections, 'education');
  
  // Get the skills section
  const skills = extractResumeSection(resumeSections, 'skills');
  
  return {
    aboutData,
    experiences,
    education,
    skills
  };
};

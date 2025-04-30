
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
 * Parse about data description from JSON string to object
 * @param description - JSON string of about data
 * @returns Parsed about data object or default structure
 */
export const parseAboutData = (description: string | null | undefined) => {
  if (!description) return null;
  
  try {
    return JSON.parse(description);
  } catch (e) {
    console.error('Error parsing about data:', e);
    return null;
  }
};


import { experienceItems } from './experienceItems';

/**
 * Import and prepare experience items with a section ID
 */
export const importExperienceItems = async (sectionId: string) => {
  // Map the static items to include the section ID
  return experienceItems.map(item => ({
    ...item,
    section_id: sectionId
  }));
};

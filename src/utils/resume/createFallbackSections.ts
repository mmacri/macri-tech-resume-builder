
import { fallbackResumeData } from './fallbackData';

/**
 * Creates fallback resume sections from static data
 * Used when database data is unavailable
 */
export const createFallbackSections = () => {
  console.log('Creating fallback resume sections from static data');
  
  // Get current timestamp for created_at and updated_at properties
  const timestamp = new Date().toISOString();
  
  // Convert fallbackResumeData to the format expected by the components
  const sections = [
    {
      id: 'about',
      section_name: 'about',
      display_order: 1,
      items: [fallbackResumeData.aboutData],
      created_at: timestamp,
      updated_at: timestamp
    },
    {
      id: 'experience',
      section_name: 'experience',
      display_order: 2,
      items: fallbackResumeData.experiences,
      created_at: timestamp,
      updated_at: timestamp
    },
    {
      id: 'education',
      section_name: 'education',
      display_order: 3,
      items: fallbackResumeData.education,
      created_at: timestamp,
      updated_at: timestamp
    },
    {
      id: 'skills',
      section_name: 'skills',
      display_order: 4,
      items: fallbackResumeData.skills,
      created_at: timestamp,
      updated_at: timestamp
    }
  ];
  
  return sections;
};

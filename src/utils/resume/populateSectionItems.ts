
import { supabase } from '@/integrations/supabase/client';
import { initialAboutData } from './aboutData';
import { createExperienceData } from './experienceData';
import { createEducationData } from './educationData';
import { createSkillsData } from './skillsData';
import { createInterestsData } from './interestsData';
import { createAwardsData } from './awardsData';

export const populateSectionItems = async (sectionId: string, sectionName: string) => {
  if (!sectionId || !sectionName) {
    console.error('Missing section ID or name');
    return;
  }

  console.log(`Populating items for section ${sectionName} (${sectionId})`);

  try {
    switch (sectionName) {
      case 'about':
        // Populate about section
        const { error: aboutError } = await supabase
          .from('resume_items')
          .insert({
            title: 'About',
            description: JSON.stringify(initialAboutData),
            section_id: sectionId,
            display_order: 1
          });
        
        if (aboutError) console.error('Error populating about section:', aboutError);
        break;

      case 'experience':
        // Use the createExperienceData function
        await createExperienceData(sectionId);
        break;

      case 'education':
        // Use the createEducationData function
        await createEducationData(sectionId);
        break;

      case 'skills':
        // Use the createSkillsData function
        await createSkillsData(sectionId);
        break;

      case 'interests':
        // Use the createInterestsData function
        await createInterestsData(sectionId);
        break;

      case 'awards':
        // Use the createAwardsData function
        await createAwardsData(sectionId);
        break;

      default:
        console.error(`Unknown section type: ${sectionName}`);
    }
  } catch (error) {
    console.error(`Error populating section ${sectionName}:`, error);
    throw error;
  }
};

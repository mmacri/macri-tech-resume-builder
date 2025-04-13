
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
    throw new Error('Missing section ID or name for populateSectionItems');
  }

  console.log(`Populating items for section ${sectionName} (${sectionId})`);

  try {
    // First check if items already exist for this section
    const { count, error: countError } = await supabase
      .from('resume_items')
      .select('*', { count: 'exact', head: true })
      .eq('section_id', sectionId);
      
    if (countError) {
      console.error(`Error checking items for section ${sectionName}:`, countError);
      throw countError;
    }
    
    if ((count || 0) > 0) {
      console.log(`Section ${sectionName} already has ${count} items, skipping population`);
      return;
    }

    switch (sectionName) {
      case 'about':
        // Populate about section
        console.log('Creating about data');
        const { error: aboutError } = await supabase
          .from('resume_items')
          .insert({
            title: 'About',
            description: typeof initialAboutData === 'object' ? JSON.stringify(initialAboutData) : initialAboutData,
            section_id: sectionId,
            display_order: 1
          });
        
        if (aboutError) {
          console.error('Error populating about section:', aboutError);
          throw aboutError;
        }
        break;

      case 'experience':
        // Use the createExperienceData function
        console.log('Creating experience data');
        await createExperienceData(sectionId);
        break;

      case 'education':
        // Use the createEducationData function
        console.log('Creating education data');
        await createEducationData(sectionId);
        break;

      case 'skills':
        // Use the createSkillsData function
        console.log('Creating skills data');
        await createSkillsData(sectionId);
        break;

      case 'interests':
        // Use the createInterestsData function
        console.log('Creating interests data');
        await createInterestsData(sectionId);
        break;

      case 'awards':
        // Use the createAwardsData function
        console.log('Creating awards data');
        await createAwardsData(sectionId);
        break;

      default:
        console.error(`Unknown section type: ${sectionName}`);
    }
    
    console.log(`Successfully populated items for section ${sectionName}`);
  } catch (error) {
    console.error(`Error populating section ${sectionName}:`, error);
    throw error;
  }
};

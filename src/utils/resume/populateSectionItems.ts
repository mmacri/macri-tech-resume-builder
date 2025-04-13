
import { supabase } from '@/integrations/supabase/client';
import { initialAboutData } from './aboutData';
import { createExperienceData } from './experienceData';
import { createEducationData } from './educationData';
import { createSkillsData } from './skillsData';
import { createInterestsData } from './interestsData';
import { createAwardsData } from './awardsData';
import { toast } from 'sonner';

export const populateSectionItems = async (sectionId: string, sectionName: string) => {
  if (!sectionId || !sectionName) {
    console.error('Missing section ID or name');
    toast.error('Missing section ID or name for populateSectionItems');
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
      toast.error(`Database error while checking items: ${countError.message}`);
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
          toast.error(`Database error while creating about data: ${aboutError.message}`);
          throw aboutError;
        }
        toast.success('About section created successfully');
        break;

      case 'experience':
        // Use the createExperienceData function
        console.log('Creating experience data');
        try {
          const result = await createExperienceData(sectionId);
          toast.success('Experience data created successfully');
          console.log('Experience data creation result:', result);
        } catch (expError) {
          console.error('Error in createExperienceData:', expError);
          toast.error(`Failed to create experience data: ${expError instanceof Error ? expError.message : 'Unknown error'}`);
          throw expError;
        }
        break;

      case 'education':
        // Use the createEducationData function
        console.log('Creating education data');
        await createEducationData(sectionId);
        toast.success('Education data created successfully');
        break;

      case 'skills':
        // Use the createSkillsData function
        console.log('Creating skills data');
        await createSkillsData(sectionId);
        toast.success('Skills data created successfully');
        break;

      case 'interests':
        // Use the createInterestsData function
        console.log('Creating interests data');
        await createInterestsData(sectionId);
        toast.success('Interests data created successfully');
        break;

      case 'awards':
        // Use the createAwardsData function
        console.log('Creating awards data');
        await createAwardsData(sectionId);
        toast.success('Awards data created successfully');
        break;

      default:
        console.error(`Unknown section type: ${sectionName}`);
        toast.error(`Unknown section type: ${sectionName}`);
    }
    
    console.log(`Successfully populated items for section ${sectionName}`);
    toast.success(`Successfully populated ${sectionName} section`);
  } catch (error) {
    console.error(`Error populating section ${sectionName}:`, error);
    toast.error(`Failed to populate ${sectionName} section: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

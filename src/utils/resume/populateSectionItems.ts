
import { supabase } from '@/integrations/supabase/client';
import { initialAboutData } from './aboutData';
import { experienceData } from './experienceData';
import { educationData } from './educationData';
import { skillsData } from './skillsData';
import { interestsData } from './interestsData';
import { awardsData } from './awardsData';

export const populateSectionItems = async (sections: any[]) => {
  if (!sections || sections.length === 0) return;

  const aboutSection = sections.find(s => s.section_name === 'about');
  const experienceSection = sections.find(s => s.section_name === 'experience');
  const educationSection = sections.find(s => s.section_name === 'education');
  const skillsSection = sections.find(s => s.section_name === 'skills');
  const interestsSection = sections.find(s => s.section_name === 'interests');
  const awardsSection = sections.find(s => s.section_name === 'awards');

  // Populate about section
  if (aboutSection) {
    const { error: aboutError } = await supabase
      .from('resume_items')
      .insert({
        title: 'About',
        description: JSON.stringify(initialAboutData),
        section_id: aboutSection.id,
        display_order: 1
      });
    
    if (aboutError) console.error('Error populating about section:', aboutError);
  }

  // Populate experience section
  if (experienceSection && experienceData.length > 0) {
    const experienceItems = experienceData.map((item, index) => ({
      ...item,
      section_id: experienceSection.id,
      display_order: index + 1
    }));
    
    const { error: experienceError } = await supabase
      .from('resume_items')
      .insert(experienceItems);
    
    if (experienceError) console.error('Error populating experience section:', experienceError);
  }

  // Populate education section
  if (educationSection && educationData.length > 0) {
    const educationItems = educationData.map((item, index) => ({
      ...item,
      section_id: educationSection.id,
      display_order: index + 1
    }));
    
    const { error: educationError } = await supabase
      .from('resume_items')
      .insert(educationItems);
    
    if (educationError) console.error('Error populating education section:', educationError);
  }

  // Populate skills section
  if (skillsSection && skillsData.length > 0) {
    const skillItems = skillsData.map((item, index) => ({
      ...item,
      section_id: skillsSection.id,
      display_order: index + 1
    }));
    
    const { error: skillsError } = await supabase
      .from('resume_items')
      .insert(skillItems);
    
    if (skillsError) console.error('Error populating skills section:', skillsError);
  }

  // Populate interests section
  if (interestsSection && interestsData.length > 0) {
    const interestItems = interestsData.map((item, index) => ({
      ...item,
      section_id: interestsSection.id,
      display_order: index + 1
    }));
    
    const { error: interestsError } = await supabase
      .from('resume_items')
      .insert(interestItems);
    
    if (interestsError) console.error('Error populating interests section:', interestsError);
  }

  // Populate awards section
  if (awardsSection && awardsData.length > 0) {
    const awardItems = awardsData.map((item, index) => ({
      ...item,
      section_id: awardsSection.id,
      display_order: index + 1
    }));
    
    const { error: awardsError } = await supabase
      .from('resume_items')
      .insert(awardItems);
    
    if (awardsError) console.error('Error populating awards section:', awardsError);
  }
};

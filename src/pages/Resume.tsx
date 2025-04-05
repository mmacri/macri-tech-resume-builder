
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Resume = () => {
  // Use the same data fetching logic as the Home component
  const { data: resumeSections, isLoading } = useQuery({
    queryKey: ['resumeSections'],
    queryFn: async () => {
      console.log('Fetching resume sections data for Resume page');
      
      // Get all sections
      const { data: sections, error: sectionsError } = await supabase
        .from('resume_sections')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (sectionsError) {
        console.error('Error fetching sections:', sectionsError);
        throw sectionsError;
      }
      
      // For each section, get its items
      const sectionsWithItems = await Promise.all(sections.map(async (section) => {
        const { data: items, error: itemsError } = await supabase
          .from('resume_items')
          .select('*')
          .eq('section_id', section.id)
          .order('display_order', { ascending: true });
        
        if (itemsError) {
          console.error(`Error fetching items for section ${section.section_name}:`, itemsError);
          throw itemsError;
        }
        
        return {
          ...section,
          items: items || []
        };
      }));
      
      return sectionsWithItems;
    }
  });

  const getSectionItems = (sectionName: string) => {
    if (isLoading || !resumeSections) return [];
    const section = resumeSections.find(s => s.section_name === sectionName);
    return section ? section.items : [];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading resume data...</p>
      </div>
    );
  }

  return (
    <>
      <AboutSection items={getSectionItems('about')} />
      <hr className="m-0" />
      <ExperienceSection items={getSectionItems('experience')} />
      <hr className="m-0" />
      <EducationSection items={getSectionItems('education')} />
      <hr className="m-0" />
      <SkillsSection items={getSectionItems('skills')} />
      <hr className="m-0" />
      <InterestsSection items={getSectionItems('interests')} />
      <hr className="m-0" />
      <AwardsSection items={getSectionItems('awards')} />
    </>
  );
};

export default Resume;

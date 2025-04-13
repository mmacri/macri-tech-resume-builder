
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

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
      
      console.log('Fetched sections for Resume page:', sections);
      
      // For each section, get its items
      const sectionsWithItems = await Promise.all(sections.map(async (section) => {
        console.log(`Fetching items for section ${section.section_name} in Resume page`);
        
        const { data: items, error: itemsError } = await supabase
          .from('resume_items')
          .select('*')
          .eq('section_id', section.id)
          .order('display_order', { ascending: true });
        
        if (itemsError) {
          console.error(`Error fetching items for section ${section.section_name}:`, itemsError);
          throw itemsError;
        }
        
        console.log(`Found ${items?.length || 0} items for section ${section.section_name} in Resume page`);
        
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
    const items = section ? section.items : [];
    console.log(`Getting items for ${sectionName} in Resume page:`, items);
    return items;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
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

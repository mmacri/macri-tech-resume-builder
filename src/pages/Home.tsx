
import React, { useEffect } from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  // Fetch all resume sections data to pass to components
  const { data: resumeSections, isLoading, error, refetch } = useQuery({
    queryKey: ['resumeSections'],
    queryFn: async () => {
      console.log('Fetching resume sections data for Home page');
      
      try {
        // Get all sections
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
          throw sectionsError;
        }
        
        if (!sections || sections.length === 0) {
          console.warn('No resume sections found in database');
          return [];
        }
        
        console.log('Fetched sections for Home:', sections.length);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
          console.log(`Fetching items for section ${section.section_name}`);
          
          const { data: items, error: itemsError } = await supabase
            .from('resume_items')
            .select('*')
            .eq('section_id', section.id)
            .order('display_order', { ascending: true });
          
          if (itemsError) {
            console.error(`Error fetching items for section ${section.section_name}:`, itemsError);
            throw itemsError;
          }
          
          const itemCount = items?.length || 0;
          console.log(`Found ${itemCount} items for section ${section.section_name}`);
          
          if (itemCount === 0) {
            console.warn(`No items found for section ${section.section_name}`);
          }
          
          return {
            ...section,
            items: items || []
          };
        }));
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error fetching resume sections:', error);
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 2
  });

  // Effect to log data load results
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
      } else if (!resumeSections || resumeSections.length === 0) {
        console.warn('No resume sections loaded in Home');
      } else {
        console.log(`Loaded ${resumeSections.length} resume sections in Home`);
        console.log('Resume sections:', resumeSections);
      }
    }
  }, [isLoading, error, resumeSections]);

  const getSectionItems = (sectionName: string) => {
    if (isLoading || !resumeSections || resumeSections.length === 0) return [];
    
    const section = resumeSections.find(s => s.section_name === sectionName);
    const items = section?.items || [];
    console.log(`Getting items for ${sectionName} in Home:`, items.length);
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

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Resume Data</h2>
        <p className="mb-4">There was a problem loading the resume data. Please try again.</p>
        <button onClick={() => refetch()} className="px-4 py-2 bg-blue-500 text-white rounded">
          Try Again
        </button>
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

export default Home;

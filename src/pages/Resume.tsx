
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
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Resume = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Use the same data fetching logic as the Home component
  const { data: resumeSections, isLoading, error, refetch } = useQuery({
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
      
      if (!sections || sections.length === 0) {
        console.warn('No resume sections found in database');
        throw new Error('No resume sections found. Please initialize resume data.');
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

  const handleInitializeData = () => {
    navigate('/admin-dashboard');
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
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Resume Data</h2>
          <p className="mb-6 text-gray-700">There was a problem loading the resume data. The database may be empty or there might be a connection issue.</p>
          <div className="space-y-4">
            <Button onClick={() => refetch()} variant="outline" className="w-full">
              Try Again
            </Button>
            
            {isAdmin && (
              <Button onClick={handleInitializeData} className="w-full bg-amber-500 hover:bg-amber-600">
                Go to Admin Dashboard
              </Button>
            )}
            
            {isAdmin && (
              <p className="text-sm text-gray-500 mt-2">
                Tip: Use the "Reset Resume Data" button in the Admin Dashboard to initialize all sections with sample data.
              </p>
            )}
          </div>
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

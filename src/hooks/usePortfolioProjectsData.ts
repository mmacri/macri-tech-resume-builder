
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioProject } from '@/types/portfolioProject';
import { toast } from 'sonner';

/**
 * Hook for fetching portfolio projects data
 */
export const usePortfolioProjectsData = () => {
  const { data: projects, isLoading, refetch, error } = useQuery({
    queryKey: ['adminPortfolioProjects'],
    queryFn: async () => {
      console.log('Fetching portfolio projects...');
      
      // Check if there are any projects
      const { data: existingProjects, error: checkError } = await supabase
        .from('portfolio_projects')
        .select('count')
        .single();
      
      if (checkError) {
        console.error('Error checking portfolio projects:', checkError);
        throw checkError;
      }
      
      // If no projects exist, create some sample projects
      if (!existingProjects || existingProjects.count === 0) {
        console.log('No portfolio projects found, creating sample data...');
        
        const sampleProjects = [
          {
            title: 'Personal Portfolio Website',
            description: 'A responsive portfolio website built with React and Tailwind CSS',
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
            image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
            link: 'https://example.com/portfolio',
            display_order: 1
          },
          {
            title: 'E-commerce Platform',
            description: 'A full-featured online store with product management and shopping cart',
            technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
            image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
            link: 'https://example.com/ecommerce',
            display_order: 2
          },
          {
            title: 'Task Management App',
            description: 'A productivity application for managing tasks and projects',
            technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
            image_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
            link: 'https://example.com/taskapp',
            display_order: 3
          }
        ];
        
        for (const project of sampleProjects) {
          const { error: insertError } = await supabase
            .from('portfolio_projects')
            .insert(project);
          
          if (insertError) {
            console.error('Error creating sample project:', insertError);
            toast.error(`Error creating sample project: ${insertError.message}`);
          }
        }
      }
      
      // Now fetch all projects
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching portfolio projects:', error);
        throw error;
      }
      
      console.log('Found projects:', data);
      return data as PortfolioProject[];
    }
  });

  if (error) {
    console.error('Error in usePortfolioProjectsData:', error);
    toast.error(`Error loading portfolio projects: ${(error as Error).message}`);
  }

  return {
    projects,
    isLoading,
    refreshProjects: refetch
  };
};

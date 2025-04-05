
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioProject } from '@/types/portfolioProject';
import { toast } from 'sonner';
import { stringToTechnologies } from '@/utils/portfolioTransformations';

/**
 * Hook for handling portfolio project mutations (create, update, delete)
 */
export const usePortfolioProjectMutations = () => {
  const queryClient = useQueryClient();
  
  // Create or update project
  const mutation = useMutation({
    mutationFn: async (project: Partial<PortfolioProject>) => {
      // Make sure required fields are present
      if (!project.title || !project.description) {
        throw new Error('Title and description are required');
      }
      
      // Convert technologies from string to array if needed
      let techArray = project.technologies;
      if (typeof project.technologies === 'string') {
        techArray = stringToTechnologies(project.technologies as string);
      }
      
      const projectData = {
        title: project.title,
        description: project.description,
        technologies: techArray as string[],
        link: project.link || null,
        image_url: project.image_url || null,
      };
      
      if (project.id) {
        // Update existing project
        const { data, error } = await supabase
          .from('portfolio_projects')
          .update({
            ...projectData,
            updated_at: new Date().toISOString()
          })
          .eq('id', project.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new project - find the highest display_order and add 1
        const { data: projects } = await supabase
          .from('portfolio_projects')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1);
          
        const highestOrder = projects && projects.length > 0 
          ? projects[0].display_order
          : 0;
          
        const { data, error } = await supabase
          .from('portfolio_projects')
          .insert({
            ...projectData,
            display_order: highestOrder + 1
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPortfolioProjects'] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Delete project
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPortfolioProjects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Change project order
  const changeOrderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string, newOrder: number }) => {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({ display_order: newOrder })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPortfolioProjects'] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  return {
    mutation,
    deleteMutation,
    changeOrderMutation
  };
};


import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PortfolioProject } from '@/types/portfolioProject';

export const usePortfolioProjectsAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<PortfolioProject> | null>(null);
  const queryClient = useQueryClient();

  // Convert technologies between array and string formats
  const technologiesToString = (techs?: string[]): string => {
    return techs ? techs.join(', ') : '';
  };

  const stringToTechnologies = (techString: string): string[] => {
    return techString.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
  };

  // Fetch portfolio projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['adminPortfolioProjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as PortfolioProject[];
    }
  });

  // Create or update portfolio project
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
        // Update
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
        // Create - find the highest display_order and add 1
        const highestOrder = projects && projects.length > 0 
          ? Math.max(...projects.map(p => p.display_order))
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
      toast.success(currentProject?.id ? 'Project updated successfully' : 'Project created successfully');
      setIsDialogOpen(false);
      setCurrentProject(null);
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

  // Change order
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

  const handleMoveUp = (project: PortfolioProject, index: number) => {
    if (index === 0) return; // Already at the top
    
    const prevProject = projects![index - 1];
    changeOrderMutation.mutate({ id: project.id, newOrder: prevProject.display_order });
    changeOrderMutation.mutate({ id: prevProject.id, newOrder: project.display_order });
  };

  const handleMoveDown = (project: PortfolioProject, index: number) => {
    if (!projects || index === projects.length - 1) return; // Already at the bottom
    
    const nextProject = projects[index + 1];
    changeOrderMutation.mutate({ id: project.id, newOrder: nextProject.display_order });
    changeOrderMutation.mutate({ id: nextProject.id, newOrder: project.display_order });
  };

  const handleNewProject = () => {
    setCurrentProject({ 
      title: '', 
      description: '', 
      technologies: [],
      link: '',
      image_url: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: PortfolioProject) => {
    setCurrentProject({
      ...project,
      technologies: project.technologies || []
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProject && currentProject.title && currentProject.description) {
      mutation.mutate(currentProject);
    } else {
      toast.error('Title and description are required');
    }
  };

  return {
    projects,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    currentProject,
    setCurrentProject,
    technologiesToString,
    mutation,
    handleNewProject,
    handleEditProject,
    handleDeleteProject,
    handleSubmit,
    handleMoveUp,
    handleMoveDown
  };
};

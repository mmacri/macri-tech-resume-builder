
import { useState } from 'react';
import { toast } from 'sonner';
import { PortfolioProject } from '@/types/portfolioProject';
import { usePortfolioProjectsData } from './usePortfolioProjectsData';
import { usePortfolioProjectMutations } from './usePortfolioProjectMutations';
import { technologiesToString } from '@/utils/portfolioTransformations';

export const usePortfolioProjectsAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<PortfolioProject> | null>(null);
  
  // Use our refactored hooks
  const { projects, isLoading, refreshProjects } = usePortfolioProjectsData();
  const { mutation, deleteMutation, changeOrderMutation } = usePortfolioProjectMutations();

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
      mutation.mutate(currentProject, {
        onSuccess: () => {
          toast.success(currentProject.id ? 'Project updated successfully' : 'Project created successfully');
          setIsDialogOpen(false);
          setCurrentProject(null);
        }
      });
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
    handleMoveDown,
    refreshProjects
  };
};

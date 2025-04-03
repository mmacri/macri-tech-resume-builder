
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash, Plus, ArrowUp, ArrowDown } from 'lucide-react';

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  link?: string;
  image_url?: string;
  technologies?: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
};

const AdminPortfolioProjects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<PortfolioProject> | null>(null);
  const queryClient = useQueryClient();

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
      // Convert technologies from comma-separated string to array if needed
      let techArray = project.technologies;
      if (typeof project.technologies === 'string') {
        techArray = (project.technologies as string).split(',').map(tech => tech.trim());
      }
      
      const projectData = {
        ...project,
        technologies: techArray
      };
      
      if (project.id) {
        // Update
        const { data, error } = await supabase
          .from('portfolio_projects')
          .update(projectData)
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
          .insert({ ...projectData, display_order: highestOrder + 1 })
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
    // Convert technologies array to comma-separated string for input field
    const techString = project.technologies ? project.technologies.join(', ') : '';
    setCurrentProject({
      ...project,
      technologies: techString
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

  if (isLoading) return <div>Loading portfolio projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Portfolio Projects</h2>
        <Button onClick={handleNewProject} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Technologies</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <TableRow key={project.id}>
                <TableCell className="w-24">
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={index === 0}
                      onClick={() => handleMoveUp(project, index)}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={!projects || index === projects.length - 1}
                      onClick={() => handleMoveDown(project, index)}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  {project.technologies ? project.technologies.join(', ') : ''}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No portfolio projects found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentProject?.id ? 'Edit Project' : 'Create New Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={currentProject?.title || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  placeholder="Project title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  value={currentProject?.description || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  placeholder="Project description"
                  required
                  rows={5}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="technologies">Technologies (comma-separated)</label>
                <Input
                  id="technologies"
                  value={typeof currentProject?.technologies === 'string' 
                    ? currentProject.technologies 
                    : currentProject?.technologies?.join(', ') || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="image_url">Image URL</label>
                <Input
                  id="image_url"
                  value={currentProject?.image_url || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="link">Project Link</label>
                <Input
                  id="link"
                  value={currentProject?.link || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortfolioProjects;

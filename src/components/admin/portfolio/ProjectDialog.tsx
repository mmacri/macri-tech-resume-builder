
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PortfolioProject } from '@/types/portfolioProject';

interface ProjectDialogProps {
  currentProject: Partial<PortfolioProject> | null;
  setCurrentProject: (project: Partial<PortfolioProject> | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  onClose: () => void;
  technologiesToString: (techs?: string[]) => string;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  currentProject,
  setCurrentProject,
  handleSubmit,
  isPending,
  onClose,
  technologiesToString
}) => {
  return (
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
              value={Array.isArray(currentProject?.technologies) 
                ? technologiesToString(currentProject?.technologies)
                : ''}
              onChange={(e) => setCurrentProject({ 
                ...currentProject, 
                technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
              })}
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
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Project'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ProjectDialog;

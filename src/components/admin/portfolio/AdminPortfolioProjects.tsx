
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { usePortfolioProjectsAdmin } from '@/hooks/usePortfolioProjectsAdmin';
import ProjectsTable from './ProjectsTable';
import ProjectDialog from './ProjectDialog';

const AdminPortfolioProjects = () => {
  const {
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
  } = usePortfolioProjectsAdmin();

  // Force refresh projects on component mount
  React.useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Portfolio Projects</h2>
        <Button onClick={handleNewProject} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <ProjectsTable
        projects={projects}
        isLoading={isLoading}
        technologiesToString={technologiesToString}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ProjectDialog
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          handleSubmit={handleSubmit}
          isPending={mutation.isPending}
          onClose={() => setIsDialogOpen(false)}
          technologiesToString={technologiesToString}
        />
      </Dialog>
    </div>
  );
};

export default AdminPortfolioProjects;

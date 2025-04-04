
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { PortfolioProject } from '@/types/portfolioProject';

interface ProjectsTableProps {
  projects: PortfolioProject[] | null;
  isLoading: boolean;
  technologiesToString: (techs?: string[]) => string;
  onEditProject: (project: PortfolioProject) => void;
  onDeleteProject: (id: string) => void;
  onMoveUp: (project: PortfolioProject, index: number) => void;
  onMoveDown: (project: PortfolioProject, index: number) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  isLoading,
  technologiesToString,
  onEditProject,
  onDeleteProject,
  onMoveUp,
  onMoveDown
}) => {
  if (isLoading) {
    return <div>Loading portfolio projects...</div>;
  }

  return (
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
                    onClick={() => onMoveUp(project, index)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={!projects || index === projects.length - 1}
                    onClick={() => onMoveDown(project, index)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>
                {project.technologies ? technologiesToString(project.technologies) : ''}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEditProject(project)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDeleteProject(project.id)}>
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
  );
};

export default ProjectsTable;

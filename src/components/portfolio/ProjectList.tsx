
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectCard } from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image_url: string | null;
  technologies: string[] | null;
  display_order: number;
}

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
}

export const ProjectList = ({ projects, loading }: ProjectListProps) => {
  if (loading) {
    return (
      <section className="resume-section">
        <div className="resume-section-content px-4 md:px-8">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-6 w-1/4 mb-2" />
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-8 w-20" />
            ))}
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </section>
    );
  }

  return (
    <>
      {projects.map((project) => (
        <div key={project.id}>
          <section className="resume-section" id={project.id}>
            <div className="resume-section-content px-4 md:px-8">
              <h2 className="text-4xl font-bold mb-8">{project.title}</h2>
              <ProjectCard project={project} />
            </div>
          </section>
          <hr className="m-0" />
        </div>
      ))}
    </>
  );
};

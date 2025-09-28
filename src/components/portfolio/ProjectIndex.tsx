
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectTile } from './ProjectTile';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image_url: string | null;
  technologies: string[] | null;
  display_order: number;
}

interface ProjectIndexProps {
  projects: Project[];
  loading: boolean;
  user: any;
  seedProjects: () => Promise<void>;
}

export const ProjectIndex = ({ projects, loading, user, seedProjects }: ProjectIndexProps) => {
  return (
    <section className="py-16 bg-macri-section-alt" id="index-of-projects">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-macri-primary">Portfolio Overview</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            This portfolio showcases a variety of projects that demonstrate my expertise in enterprise cloud solutions, 
            technical sales enablement, and customer success initiatives across multiple industries.
          </p>
        </div>
        
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-18" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-md mx-auto">
              <p className="text-gray-600 mb-6">No projects found in this portfolio.</p>
              {user && (
                <Button 
                  onClick={seedProjects}
                  className="bg-macri-primary hover:bg-macri-primary-dark text-white"
                >
                  Add Default Projects to Database
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((project) => (
                <ProjectTile key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

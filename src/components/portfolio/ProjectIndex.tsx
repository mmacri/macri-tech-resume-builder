
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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
    <section className="resume-section" id="index-of-projects">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Index of Projects</h2>
        <p className="mb-4">This portfolio showcases a variety of projects that demonstrate my skills and expertise in different areas of technology. The projects include tools for sentiment analysis, financial dashboards, AI/ML policy creation, policy management systems, and customer engagement deliverables.</p>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex flex-col space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="my-8 text-center">
            <p className="mb-4">No projects found in this portfolio.</p>
            {user && (
              <Button 
                onClick={seedProjects}
                className="bg-macri-primary hover:bg-macri-primary/80"
              >
                Add Default Projects to Database
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="font-bold mb-3">Projects Overview:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              {projects.map((project) => (
                <li key={project.id}>
                  <a href={`#${project.id}`} className="text-macri-primary hover:underline">
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

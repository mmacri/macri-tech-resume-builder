
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image_url: string | null;
  technologies: string[] | null;
  display_order: number;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="card p-6 mb-6">
      {project.image_url && (
        <div className="mb-6">
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="rounded-lg shadow-md max-h-96 object-cover mx-auto"
          />
        </div>
      )}
      <p className="mb-4">{project.description}</p>
      
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <p className="font-bold mb-2">Technologies Used:</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {project.link && (
        <div className="flex mb-4 space-x-3">
          {project.link.includes('github.com') ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-macri-primary hover:underline"
            >
              <Github className="mr-1 h-5 w-5" />
              View on GitHub
            </a>
          ) : (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-macri-primary hover:underline"
            >
              <ExternalLink className="mr-1 h-5 w-5" />
              View Project
            </a>
          )}
        </div>
      )}
      
      <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
    </div>
  );
};

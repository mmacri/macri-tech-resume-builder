
import { ExternalLink, Github, Calendar, Code, Award } from 'lucide-react';

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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
      {/* Project Image */}
      <div className="relative h-64 bg-gradient-to-br from-macri-primary/10 to-macri-primary/5 overflow-hidden">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-macri-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Code className="h-10 w-10 text-macri-primary" />
              </div>
              <div className="text-macri-primary font-semibold">Project Showcase</div>
            </div>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        
        {/* Project type badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-macri-primary border border-macri-primary/20">
            <Award className="w-4 h-4 inline mr-1" />
            Featured Project
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Project Title */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
        </div>
        
        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-macri-primary" />
              <span className="font-semibold text-gray-900">Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-gradient-to-r from-macri-primary/10 to-macri-primary/5 text-macri-primary rounded-lg text-sm font-medium border border-macri-primary/20 hover:bg-macri-primary/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-macri-primary hover:bg-macri-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {project.link.includes('github.com') ? (
                <>
                  <Github className="h-5 w-5" />
                  View on GitHub
                </>
              ) : (
                <>
                  <ExternalLink className="h-5 w-5" />
                  View Project
                </>
              )}
            </a>
          )}
          
          <a 
            href="#index-of-projects" 
            className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-macri-primary text-gray-700 hover:text-macri-primary px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Back to Index
          </a>
        </div>
      </div>
    </div>
  );
};

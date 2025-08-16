import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image_url: string | null;
  technologies: string[] | null;
  display_order: number;
}

interface ProjectTileProps {
  project: Project;
}

export const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 group border-gray-200 hover:border-macri-primary/30">
      <CardContent className="p-0">
        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-macri-primary/5 to-macri-primary/10 overflow-hidden rounded-t-lg">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-bold text-macri-primary/20 font-saira">
                {project.title.charAt(0)}
              </div>
            </div>
          )}
          
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <Link
              to={`/portfolio#${project.id}`}
              className="bg-white/90 hover:bg-white text-macri-dark px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              View Details
            </Link>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-macri-primary hover:bg-macri-primary-dark text-white p-2 rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-macri-dark mb-2 group-hover:text-macri-primary transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {truncateDescription(project.description)}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-macri-primary/10 text-macri-primary text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Action Button */}
          <Link
            to={`/portfolio#${project.id}`}
            className="text-macri-primary hover:text-macri-primary-dark font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Read Case Study
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
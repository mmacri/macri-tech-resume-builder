
import React from 'react';
import { Link } from 'react-router-dom';
import ResumeSection from './ResumeSection';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Book, ExternalLink, Code, Award, TrendingUp } from 'lucide-react';
import { staticProjectsData } from '@/data/staticResumeData';

interface ProjectsSectionProps {
  items?: any[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ items }) => {
  
  // Use items prop if provided, otherwise use static data  
  const displayItems = items && items.length > 0 ? items : staticProjectsData;
  
  return (
    <ResumeSection id="projects" title="Featured Projects">
      <div className="space-y-8">
        {/* Section intro */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 leading-relaxed">
            Showcasing key projects that demonstrate expertise in solution engineering, 
            compliance frameworks, and customer success initiatives.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayItems.map((project, index) => (
            <Card key={index} className="group h-full flex flex-col border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50">
              {/* Card Header with Icon */}
              <CardHeader className="bg-gradient-to-r from-macri-primary/5 to-macri-primary/10 border-b border-macri-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-macri-primary/5 rounded-full -translate-y-12 translate-x-12"></div>
                <CardTitle className="text-2xl flex items-start gap-3 relative z-10">
                  <div className="w-12 h-12 bg-macri-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-macri-primary/30 transition-colors">
                    <Book className="h-6 w-6 text-macri-primary" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 leading-tight">{project.title}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Award className="h-4 w-4 text-macri-primary" />
                      <span className="text-sm text-macri-primary font-medium">Featured Project</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="py-6 px-6 flex-grow space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                
                {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-macri-primary" />
                      <span className="text-sm font-semibold text-gray-900">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <span 
                          key={techIndex} 
                          className="px-3 py-1.5 bg-gradient-to-r from-macri-primary/10 to-macri-primary/5 text-macri-primary text-sm font-medium rounded-lg border border-macri-primary/20 hover:bg-macri-primary/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact indicator */}
                <div className="flex items-center gap-2 pt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">High Impact Project</span>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 px-6 pb-6 border-t border-gray-100">
                <a 
                  href={project.link || "/portfolio"} 
                  className="w-full bg-macri-primary hover:bg-macri-primary-dark text-white py-3 px-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  {project.link ? "View Project Details" : "Explore in Portfolio"}
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-macri-primary/5 to-macri-primary/10 rounded-2xl p-8 border border-macri-primary/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to See More?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore my complete portfolio to see detailed case studies, project outcomes, and technical implementations.
          </p>
          <Link 
            to="/portfolio" 
            className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Award className="h-5 w-5" />
            View Complete Portfolio
          </Link>
        </div>
      </div>
    </ResumeSection>
  );
};

export default ProjectsSection;

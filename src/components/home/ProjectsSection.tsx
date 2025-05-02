
import React from 'react';
import ResumeSection from './ResumeSection';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Book, ExternalLink } from 'lucide-react';
import { useResumeData } from './DataProvider';

interface ProjectsSectionProps {
  items?: any[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ items }) => {
  const { projectsData } = useResumeData();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : projectsData;
  
  return (
    <ResumeSection id="projects" title="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((project, index) => (
          <Card key={index} className="h-full flex flex-col border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl flex items-center gap-2">
                <Book className="h-5 w-5 text-macri-primary" />
                {project.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="py-4 flex-grow">
              <p className="text-gray-700 mb-4">{project.description}</p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="pt-0 border-t border-gray-200">
              <a 
                href={project.link || "/portfolio"} 
                className="text-macri-primary hover:text-macri-primary/80 inline-flex items-center text-sm"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {project.link ? "View Project" : "View in Portfolio"}
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <a 
          href="/portfolio" 
          className="bg-macri-primary hover:bg-macri-primary/90 text-white px-4 py-2 rounded-md font-medium inline-flex items-center"
        >
          View All Projects
        </a>
      </div>
    </ResumeSection>
  );
};

export default ProjectsSection;

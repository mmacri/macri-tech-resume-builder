import React, { useState, useEffect } from 'react';
import { ChevronUp, Home, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/utils/scrollUtils';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image_url: string | null;
  technologies: string[] | null;
  display_order: number;
}

interface FloatingNavProps {
  projects: Project[];
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ projects }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      toggleVisibility();
      
      // Find which section is currently in view
      const sections = projects.map(project => document.getElementById(project.id)).filter(Boolean);
      const indexSection = document.getElementById('index-of-projects');
      
      if (indexSection) {
        sections.unshift(indexSection);
      }
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId, 80);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-2">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-2 space-y-1">
        {/* Home/Top */}
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollToTop}
          className="w-full justify-start px-3 py-2 h-auto hover:bg-macri-primary/10 hover:text-macri-primary"
          title="Back to top"
        >
          <Home className="h-4 w-4 mr-2" />
          <span className="text-xs">Top</span>
        </Button>

        {/* Index of Projects */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleNavClick('index-of-projects')}
          className={`w-full justify-start px-3 py-2 h-auto hover:bg-macri-primary/10 hover:text-macri-primary ${
            activeSection === 'index-of-projects' ? 'bg-macri-primary/20 text-macri-primary font-medium' : ''
          }`}
          title="Project overview"
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          <span className="text-xs">Overview</span>
        </Button>

        {/* Project Navigation */}
        {projects.map((project, index) => (
          <Button
            key={project.id}
            variant="ghost"
            size="sm"
            onClick={() => handleNavClick(project.id)}
            className={`w-full justify-start px-3 py-2 h-auto hover:bg-macri-primary/10 hover:text-macri-primary ${
              activeSection === project.id ? 'bg-macri-primary/20 text-macri-primary font-medium' : ''
            }`}
            title={project.title}
          >
            <div className="flex items-center min-w-0 w-full">
              <span className="h-4 w-4 mr-2 text-xs bg-macri-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-xs truncate">{project.title.split(' ')[0]}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* Back to top button */}
      <Button
        onClick={scrollToTop}
        size="sm"
        className="bg-macri-primary hover:bg-macri-primary/90 text-white rounded-full p-2 shadow-lg"
        title="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
};
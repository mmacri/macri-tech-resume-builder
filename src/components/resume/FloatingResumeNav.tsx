import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Award, Calendar, Star, GraduationCap, Menu, X } from 'lucide-react';

const FloatingResumeNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'experience', label: 'Experience', icon: Calendar },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'awards', label: 'Awards', icon: Award },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['achievements', 'experience', 'skills', 'education', 'awards'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          mb-2 w-12 h-12 rounded-full shadow-lg transition-all duration-300
          ${isOpen ? 'bg-macri-primary hover:bg-macri-primary-dark' : 'bg-white hover:bg-gray-50'}
          ${isOpen ? 'text-white' : 'text-macri-primary border border-macri-primary'}
        `}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Navigation Menu */}
      <div
        className={`
          bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden
          transition-all duration-300 transform origin-top
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }
        `}
      >
        <div className="p-2 space-y-1">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={`
                  w-full justify-start text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-macri-primary text-white hover:bg-macri-primary-dark' 
                    : 'text-gray-700 hover:bg-macri-primary hover:text-white'
                  }
                `}
              >
                <IconComponent className="mr-2 w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Active Section Indicator Dots */}
      <div className="mt-4 space-y-2">
        {sections.map((section) => (
          <button
            key={`dot-${section.id}`}
            onClick={() => scrollToSection(section.id)}
            className={`
              block w-2 h-2 rounded-full transition-all duration-200
              ${activeSection === section.id 
                ? 'bg-macri-primary scale-125' 
                : 'bg-gray-300 hover:bg-macri-primary/60'
              }
            `}
            title={section.label}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingResumeNav;
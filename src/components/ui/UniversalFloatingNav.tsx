import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, GraduationCap, Code, Heart, Award, Folder, FileText, Mail, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/utils/scrollUtils';
import { useLocation } from 'react-router-dom';

interface FloatingNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  isRoute?: boolean;
}

export const UniversalFloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  // Define navigation items based on current route
  const getNavItems = (): FloatingNavItem[] => {
    const currentPath = location.pathname;
    
    if (currentPath === '/') {
      return [
        { id: 'about', label: 'About', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'interests', label: 'Interests', icon: Heart },
        { id: 'awards', label: 'Awards', icon: Award },
        { id: 'contact', label: 'Contact', icon: Mail },
      ];
    } else if (currentPath === '/portfolio') {
      return [
        { id: 'index-of-projects', label: 'Overview', icon: Folder },
        { id: '1', label: 'Policy Hub', icon: Code },
        { id: '2', label: 'Framework Fusion', icon: Code },
        { id: '3', label: 'ServiceNow Advisor', icon: Code },
        { id: '4', label: 'Customer Success', icon: Code },
        { id: '5', label: 'Partner Enablement', icon: Code },
        { id: '6', label: 'Security Framework', icon: Code },
      ];
    } else if (currentPath === '/resume') {
      return [
        { id: 'about', label: 'About', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'interests', label: 'Interests', icon: Heart },
        { id: 'awards', label: 'Awards', icon: Award },
      ];
    } else {
      return [
        { id: 'top', label: 'Top', icon: Home },
      ];
    }
  };

  const navItems = getNavItems();

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
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
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
  }, [navItems]);

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
    <div 
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 transition-all duration-300 ease-out ${
        isExpanded ? 'p-3' : 'p-2'
      }`}>
        {/* Navigation Items */}
        <div className="space-y-1 mb-2">
          {navItems.slice(0, isExpanded ? navItems.length : 4).map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`transition-all duration-200 ${
                  isExpanded 
                    ? 'w-full justify-start px-3 py-2 h-auto' 
                    : 'w-10 h-10 p-0 justify-center'
                } hover:bg-macri-primary/10 hover:text-macri-primary ${
                  isActive ? 'bg-macri-primary/20 text-macri-primary font-medium' : ''
                }`}
                title={isExpanded ? undefined : item.label}
              >
                <IconComponent className={`h-4 w-4 ${isExpanded ? 'mr-2' : ''}`} />
                {isExpanded && (
                  <span className="text-xs animate-fade-in">{item.label}</span>
                )}
              </Button>
            );
          })}
          
          {/* Show more indicator when collapsed */}
          {!isExpanded && navItems.length > 4 && (
            <div className="w-10 h-6 flex items-center justify-center">
              <div className="flex space-x-1">
                {[1, 2, 3].map((dot) => (
                  <div 
                    key={dot} 
                    className="w-1 h-1 bg-macri-primary/40 rounded-full animate-pulse" 
                    style={{ animationDelay: `${dot * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back to top button */}
        <Button
          onClick={scrollToTop}
          size="sm"
          className={`bg-macri-primary hover:bg-macri-primary/90 text-white shadow-md transition-all duration-200 ${
            isExpanded ? 'w-full justify-start px-3 py-2' : 'w-10 h-10 p-0 rounded-full'
          }`}
          title={isExpanded ? undefined : 'Back to top'}
        >
          <ChevronUp className={`h-4 w-4 ${isExpanded ? 'mr-2' : ''}`} />
          {isExpanded && (
            <span className="text-xs animate-fade-in">Back to Top</span>
          )}
        </Button>
      </div>
    </div>
  );
};
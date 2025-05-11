
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/utils/scrollUtils';

interface MobileNavMenuProps {
  navItems: {
    label: string;
    href?: string;
  }[];
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track active section for highlighting in the menu
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.resume-section');
      const scrollPosition = window.scrollY;
      
      // Find the current active section
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
        const sectionBottom = sectionTop + section.clientHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom && id) {
          setActiveSection(id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string | undefined) => {
    if (!href) return;
    
    // Close the menu first for better UX
    setIsOpen(false);
    
    // Immediately navigate to improve perceived performance
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      console.log(`Mobile nav: scrolling to ${targetId}`);
      
      // Use requestAnimationFrame for smoother navigation
      requestAnimationFrame(() => {
        scrollToElement(targetId, 60);
      });
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="lg:hidden">
      <Button 
        variant="ghost" 
        onClick={toggleMenu}
        className="p-2 bg-white/80 backdrop-blur-sm shadow-sm"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 animate-in fade-in duration-200">
          <div className="flex justify-end p-4">
            <Button 
              variant="ghost" 
              onClick={toggleMenu} 
              className="p-2"
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </Button>
          </div>
          
          <nav className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-macri-primary border-b pb-2">Menu</h2>
            <ul className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = item.href?.startsWith('#') && 
                  activeSection === item.href.substring(1);
                
                return (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between text-lg py-5 text-left hover:bg-gray-100 
                        transition-colors group rounded-lg ${isActive ? 'bg-gray-100' : ''}`}
                      onClick={() => handleNavClick(item.href)}
                    >
                      <span className={`font-medium ${isActive ? 'text-macri-primary' : ''}`}>
                        {item.label}
                      </span>
                      <ChevronRight className={`h-5 w-5 ${isActive ? 'text-macri-primary' : 'text-gray-400'} 
                        group-hover:text-macri-primary transition-colors`} />
                    </Button>
                  </li>
                );
              })}
            </ul>
            
            <div className="mt-8 pt-4 border-t">
              <Button 
                className="w-full bg-macri-primary hover:bg-macri-primary/90 text-white py-6 text-lg"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Me
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavMenu;

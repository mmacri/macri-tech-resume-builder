
import React, { useState } from 'react';
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string | undefined) => {
    if (!href) return;
    
    // Close the menu first for better UX
    setIsOpen(false);
    
    // Small delay to allow menu closing animation before scrolling
    setTimeout(() => {
      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        scrollToElement(targetId, 80);
      } else {
        window.location.href = href;
      }
    }, 100);
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
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950">
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
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-lg py-6 text-left hover:bg-gray-100 transition-colors group rounded-lg"
                    onClick={() => handleNavClick(item.href)}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-macri-primary transition-colors" />
                  </Button>
                </li>
              ))}
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

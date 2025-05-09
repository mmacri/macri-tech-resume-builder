
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
    
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      scrollToElement(targetId, 80);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="lg:hidden">
      <Button 
        variant="ghost" 
        onClick={toggleMenu}
        className="p-2"
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
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg py-3"
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavMenu;

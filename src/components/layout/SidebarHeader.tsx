
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface SidebarHeaderProps {
  isNavOpen: boolean;
  toggleNav: () => void;
  name: string;
  handleNavLinkClick: (href: string) => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isNavOpen,
  toggleNav,
  name,
  handleNavLinkClick
}) => {
  return (
    <div className="flex items-center mb-8 lg:mb-12 justify-between">
      <Link 
        to="/" 
        className="flex items-center"
        onClick={() => handleNavLinkClick('/')}
      >
        <span className="text-xl font-bold lg:hidden">Mike Macri, M.B.A.</span>
      </Link>
      <button 
        className="lg:hidden p-2 focus:outline-none"
        onClick={toggleNav}
        aria-label="Toggle navigation"
      >
        {isNavOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

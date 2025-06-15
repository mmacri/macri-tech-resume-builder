
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
        aria-label="Go to homepage"
      >
        <img
          src="/lovable-uploads/85b0b79e-240c-4fdc-9841-cd0d889d496b.png"
          alt="Site Logo"
          className="h-10 w-10 object-contain rounded bg-white lg:h-12 lg:w-12"
          style={{ maxWidth: '48px', maxHeight: '48px' }}
        />
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


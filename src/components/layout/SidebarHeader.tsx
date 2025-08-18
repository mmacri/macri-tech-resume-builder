
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
        <div 
          className="rounded-full overflow-hidden border-2 border-macri-primary/50 bg-white shadow-md"
          style={{
            height: '48px',
            width: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/lovable-uploads/custom-logo.svg"
            alt="Mike Macri M.B.A. Logo"
            className="h-full w-full object-contain"
            style={{
              display: 'block',
              background: 'transparent',
            }}
            onError={(e) => {
              console.log('Custom logo failed to load');
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="%23d35400"/><text x="24" y="32" text-anchor="middle" fill="white" font-family="Arial" font-size="20" font-weight="bold">M</text></svg>';
            }}
          />
        </div>
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

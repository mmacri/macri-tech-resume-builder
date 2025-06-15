
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
          className="rounded-full overflow-hidden border-2 border-macri-primary/50 bg-macri-primary/20 shadow-md"
          style={{
            height: '48px',
            width: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/lovable-uploads/1734d6e1-fc92-4f70-949c-192bdebc6d72.png"
            alt="Site Logo"
            className="h-10 w-10 lg:h-12 lg:w-12 object-contain"
            style={{
              display: 'block',
              background: 'transparent',
              borderRadius: '50%',
              filter: 'drop-shadow(0 1px 4px rgba(20,20,20,0.28))',
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

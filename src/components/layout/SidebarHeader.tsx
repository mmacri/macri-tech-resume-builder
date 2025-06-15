
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
        <div className="rounded-full overflow-hidden shadow-none border-2 border-macri-primary/60 bg-macri-primary/20" style={{height:'48px',width:'48px',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <img
            src="/lovable-uploads/logo-navbar-clean.png"
            alt="Site Logo"
            className="h-10 w-10 lg:h-12 lg:w-12 object-contain"
            style={{
              display: 'block',
              background: 'transparent',
              borderRadius: '50%',
              boxShadow: '0 1px 6px 0 rgba(0,0,0,0.14)',
              // To further remove any faint white lines left
              filter: 'drop-shadow(0 0 2px rgba(44,44,44,0.09))'
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

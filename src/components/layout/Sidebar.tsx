
import React from 'react';
import { NavigationItems } from './NavigationItems';
import { SidebarHeader } from './SidebarHeader';
import { SocialIcons } from './SocialIcons';
import { ProfileSection } from './ProfileSection';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  isNavOpen: boolean;
  toggleNav: () => void;
  handleNavLinkClick: (href: string) => void;
  navItems: {
    label: string;
    href?: string;
    external?: boolean;
  }[];
  profileImage: string;
  name: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isNavOpen,
  toggleNav,
  handleNavLinkClick,
  navItems,
  profileImage,
  name
}) => {
  const location = useLocation();
  
  return (
    <nav 
      id="sideNav"
      className={`bg-macri-primary text-white lg:fixed lg:w-64 lg:h-screen z-10 transition-all duration-300 ${isNavOpen ? 'h-screen' : 'h-16 lg:h-screen'}`}
    >
      <div className="p-4 flex flex-col h-full">
        <SidebarHeader 
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
          name={name}
          handleNavLinkClick={handleNavLinkClick}
        />
        
        <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block`}>
          <ProfileSection 
            profileImage={profileImage}
            name={name}
          />
        </div>
        
        <div className={`${isNavOpen ? 'flex-1 block' : 'hidden'} lg:block lg:flex-1`}>
          <NavigationItems 
            navItems={navItems}
            handleNavLinkClick={handleNavLinkClick}
            currentPath={location.pathname}
          />
        </div>
        
        <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block pt-4`}>
          <SocialIcons />
        </div>
      </div>
    </nav>
  );
};

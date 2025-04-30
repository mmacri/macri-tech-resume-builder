
import React, { useEffect } from 'react';
import { NavigationItems } from './NavigationItems';
import { SidebarHeader } from './SidebarHeader';
import { SocialIcons } from './SocialIcons';
import { ProfileSection } from './ProfileSection';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isNavOpen: boolean;
  toggleNav: () => void;
  handleNavLinkClick: (href: string) => void;
  navItems: {
    label: string;
    href?: string;
    external?: boolean;
    onClick?: () => Promise<void>;
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
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Debug the state of the sidebar
  useEffect(() => {
    console.log('Sidebar rendered - Current user:', user?.email);
    console.log('Navigation items:', navItems);
  }, [user, navItems]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
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
            handleLogout={handleLogout}
          />
        </div>
        
        <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block`}>
          <NavigationItems 
            navItems={navItems}
            handleNavLinkClick={handleNavLinkClick}
            currentPath={location.pathname}
          />
        </div>
        
        <div className={`mt-auto ${isNavOpen ? 'block' : 'hidden'} lg:block pt-6`}>
          <SocialIcons />
        </div>
      </div>
    </nav>
  );
};

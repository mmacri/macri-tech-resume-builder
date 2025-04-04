
import React from 'react';
import { NavigationItems } from './NavigationItems';
import { SidebarHeader } from './SidebarHeader';
import { SocialIcons } from './SocialIcons';
import { ProfileSection } from './ProfileSection';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const { user, isAdmin, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  const goToAdmin = () => {
    navigate('/admin');
    if (window.innerWidth < 992) {
      toggleNav();
    }
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
            user={user}
            isAdmin={isAdmin}
            handleLogout={handleLogout}
          />
        </div>
        
        {isAdmin && user && (
          <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block mb-4`}>
            <Button 
              onClick={goToAdmin}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin Dashboard
            </Button>
          </div>
        )}
        
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

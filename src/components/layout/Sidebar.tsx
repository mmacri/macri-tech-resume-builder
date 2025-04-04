
import React from 'react';
import { NavigationItems } from './NavigationItems';
import { SidebarHeader } from './SidebarHeader';
import { SocialIcons } from './SocialIcons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

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
        
        <div className={`${isNavOpen ? 'flex' : 'hidden'} lg:flex justify-center mb-6`}>
          <img 
            src={profileImage} 
            alt={`${name} Profile`} 
            className="img-profile rounded-full border-4 border-gray-200 w-40 h-40 object-cover"
          />
        </div>
        
        <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block mb-4`}>
          {user ? (
            <div className="flex flex-col items-center">
              <p className="text-center mb-2">
                Logged in as: <br />
                <span className="font-semibold">{user.email}</span>
                {isAdmin && (
                  <div className="mt-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => navigate('/admin')}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  </div>
                )}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-white text-white hover:bg-white/20 transition-colors mt-2"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <p className="text-center text-white/70 text-sm">Not logged in</p>
          )}
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

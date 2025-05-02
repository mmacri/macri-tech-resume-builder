
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavigationGroup from './navigation/NavigationGroup';

interface NavigationItemsProps {
  navItems: {
    label: string;
    href?: string;
    external?: boolean;
    onClick?: () => Promise<void>;
  }[];
  handleNavLinkClick: (href: string) => void;
  currentPath: string;
}

export const NavigationItems: React.FC<NavigationItemsProps> = ({ 
  navItems, 
  handleNavLinkClick, 
  currentPath 
}) => {
  const { user } = useAuth();
  
  // Group navigation items by category
  const mainNavItems = navItems.filter(item => 
    !['Login', 'Logout', 'Admin Dashboard'].includes(item.label));
  
  const adminItems = navItems.filter(item => 
    item.label === 'Admin Dashboard');
  
  const authItems = navItems.filter(item => 
    ['Login', 'Logout'].includes(item.label));
  
  return (
    <div className="flex flex-col justify-between h-full py-2">
      {/* Main navigation links */}
      <NavigationGroup
        items={mainNavItems}
        handleNavLinkClick={handleNavLinkClick}
      />
      
      {/* Admin and auth links at the bottom */}
      <div className="mt-auto pt-2 border-t border-white/20">
        <NavigationGroup
          items={adminItems}
          handleNavLinkClick={handleNavLinkClick}
          className="mb-1"
        />
        <NavigationGroup
          items={authItems}
          handleNavLinkClick={handleNavLinkClick}
        />
      </div>
    </div>
  );
};

// For backward compatibility
export { default as NavigationItem } from './navigation/NavigationItem';

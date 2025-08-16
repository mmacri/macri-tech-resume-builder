
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavigationGroup from './navigation/NavigationGroup';
import { scrollToElement } from '@/utils/scrollUtils';

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
  const location = useLocation();
  
  // Memoize the enhanced click handler to prevent recreation on every render
  const enhancedClickHandler = React.useCallback((href: string | undefined) => {
    if (!href) return;
    
    // Handle anchor links with improved scrolling
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      
      // Use a more aggressive offset for better positioning
      scrollToElement(targetId, 60);
    } else {
      // Use the provided click handler for other links
      handleNavLinkClick(href);
    }
  }, [handleNavLinkClick]);
  
  // Memoize navigation groups to prevent recalculation
  const navigationGroups = React.useMemo(() => {
    const mainNavItems = navItems.filter(item => 
      !['Login', 'Logout', 'Admin Dashboard'].includes(item.label));
    
    const adminItems = navItems.filter(item => 
      item.label === 'Admin Dashboard');
    
    const authItems = navItems.filter(item => 
      ['Login', 'Logout'].includes(item.label));

    return { mainNavItems, adminItems, authItems };
  }, [navItems]);
  
  return (
    <div className="flex flex-col justify-between h-full py-2">
      {/* Main navigation links */}
      <NavigationGroup
        items={navigationGroups.mainNavItems}
        handleNavLinkClick={enhancedClickHandler}
      />
      
      {/* Admin and auth links at the bottom */}
      <div className="mt-auto pt-2 border-t border-white/20">
        <NavigationGroup
          items={navigationGroups.adminItems}
          handleNavLinkClick={handleNavLinkClick}
          className="mb-1"
        />
        <NavigationGroup
          items={navigationGroups.authItems}
          handleNavLinkClick={handleNavLinkClick}
        />
      </div>
    </div>
  );
};

// For backward compatibility
export { default as NavigationItem } from './navigation/NavigationItem';

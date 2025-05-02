
import { useLocation } from 'react-router-dom';

interface NavItem {
  href?: string;
  label: string;
}

export const useNavigationActiveState = () => {
  const location = useLocation();
  
  // Function to determine if a navigation item is active
  const isItemActive = (item: NavItem) => {
    // Handle home page sections
    if (location.pathname === '/' && item.href?.startsWith('#')) {
      // The hash part of the URL, e.g., "#about"
      const currentHash = window.location.hash;
      return currentHash === item.href;
    }
    
    // Handle regular page links
    if (!item.href?.startsWith('#')) {
      return item.href === location.pathname;
    }
    
    // Handle resume page sections
    if (location.pathname === '/resume' && item.href?.startsWith('#')) {
      const currentHash = window.location.hash;
      return currentHash === item.href;
    }
    
    return false;
  };

  return { isItemActive };
};


import React from 'react';
import Home from './Home';
import { setupScrollSpy } from '../utils/scrollUtils';
import { setupLazyLoading, prepareLazyImages } from '../utils/lazyLoadUtils';
import { useNavigationItems } from '../components/routing/NavigationConfig';
import MobileNavMenu from '../components/layout/MobileNavMenu';

const Index = () => {
  const { getHomeNavItems } = useNavigationItems();
  const navItems = getHomeNavItems();
  
  // Filter out items for the mobile menu (only sections)
  const mobileNavItems = navItems.filter(item => item.href?.startsWith('#'));

  React.useEffect(() => {
    // Set up scroll spying to highlight active nav items
    const scrollCleanup = setupScrollSpy();
    
    // Prepare images for lazy loading
    prepareLazyImages();
    
    // Set up lazy loading for images
    const lazyLoadCleanup = setupLazyLoading();
    
    // Clean up observers when the component unmounts
    return () => {
      scrollCleanup();
      lazyLoadCleanup();
    };
  }, []);

  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <MobileNavMenu navItems={mobileNavItems} />
      </div>
      <Home />
    </>
  );
};

export default Index;

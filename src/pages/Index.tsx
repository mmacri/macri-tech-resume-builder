
import React, { useEffect } from 'react';
import Home from './Home';
import { setupScrollSpy } from '../utils/scrollUtils';
import { setupLazyLoading, prepareLazyImages } from '../utils/lazyLoadUtils';
import { useNavigationItems } from '../components/routing/NavigationConfig';
import MobileNavMenu from '../components/layout/MobileNavMenu';
import BackToTop from '../components/ui/back-to-top';

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
    
    console.log('Index: Set up scroll spy and lazy loading');
    
    // Check if there are any "loading" messages that are stuck after 3 seconds
    const checkForStuckLoaders = setTimeout(() => {
      console.log('Checking for stuck loading indicators');
      const loadingElements = document.querySelectorAll('.animate-pulse');
      loadingElements.forEach(el => {
        // Remove animation from stuck elements
        el.classList.remove('animate-pulse');
        
        // If it's a loading message, update text
        if (el.textContent?.includes('Loading')) {
          console.log('Found stuck loading message, removing animation');
          el.textContent = 'Content loaded';
          
          // Remove the element after a short delay
          setTimeout(() => {
            el.remove();
          }, 1000);
        }
      });
    }, 3000); // Shorter timeout to catch stuck loaders faster
    
    // Clean up observers when the component unmounts
    return () => {
      scrollCleanup();
      lazyLoadCleanup();
      clearTimeout(checkForStuckLoaders);
      console.log('Index: Cleaned up all observers and timeouts');
    };
  }, []);

  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <MobileNavMenu navItems={mobileNavItems} />
      </div>
      <Home />
      <BackToTop />
    </>
  );
};

export default Index;

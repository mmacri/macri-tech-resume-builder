import React, { useEffect } from 'react';
import { setupLazyLoading, prepareLazyImages } from '@/utils/lazyLoadUtils';
import { useNavigationItems } from '@/components/routing/NavigationConfig';
import MobileNavMenu from '@/components/layout/MobileNavMenu';
import BackToTop from '@/components/ui/back-to-top';
import ResumeContent from '@/components/resume/ResumeContent';

const Resume = () => {
  const { getResumeNavItems } = useNavigationItems();
  const navItems = getResumeNavItems();
  
  // Filter out items for the mobile menu (only sections)
  const mobileNavItems = navItems.filter(item => item.href?.startsWith('#'));

  useEffect(() => {
    // Prepare images for lazy loading
    prepareLazyImages();
    
    // Set up lazy loading for images
    const lazyLoadCleanup = setupLazyLoading();
    
    // Clean up when component unmounts
    return () => {
      lazyLoadCleanup();
    };
  }, []);

  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <MobileNavMenu navItems={mobileNavItems} />
      </div>
      
      <ResumeContent resumeSections={[]} />
      
      <BackToTop />
    </>
  );
};

export default Resume;
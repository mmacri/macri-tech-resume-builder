
import React, { lazy, Suspense, useEffect, useState } from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExperienceItem } from './experience/types';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components with more detailed prefetch strategy
const ExperienceList = lazy(() => {
  // Prefetch after a short delay to allow initial render to complete
  const prefetchPromise = new Promise(resolve => {
    if (typeof window !== 'undefined') {
      // Use requestIdleCallback when available for better performance
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          import('./experience/ExperienceList').then(resolve);
        });
      } else {
        setTimeout(() => {
          import('./experience/ExperienceList').then(resolve);
        }, 300); // Small delay for better initial loading
      }
    } else {
      import('./experience/ExperienceList').then(resolve);
    }
  });
  return prefetchPromise as Promise<typeof import('./experience/ExperienceList')>;
});

const EmptyExperienceState = lazy(() => 
  import('./experience/EmptyExperienceState')
);

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items }) => {
  const { experienceData } = useResumeData();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : experienceData;

  // Use Intersection Observer to detect when section is in viewport
  useEffect(() => {
    // Only set up observer in browser environment
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const sectionElement = document.getElementById('experience');
    
    if (!sectionElement) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '200px 0px' // Start loading before it's fully visible
      }
    );
    
    observer.observe(sectionElement);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // More detailed loading fallback with better perceived performance
  const LoadingFallback = () => (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-16 w-full mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="pt-2 flex gap-3">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-28" />
      </div>
    </div>
  );

  return (
    <ResumeSection id="experience" title="Experience">
      {isVisible ? (
        <Suspense fallback={<LoadingFallback />}>
          {displayItems.length > 0 ? (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <ExperienceList items={displayItems} isMobile={isMobile} />
            </div>
          ) : (
            <EmptyExperienceState />
          )}
        </Suspense>
      ) : (
        <LoadingFallback />
      )}
    </ResumeSection>
  );
};

export default ExperienceSection;

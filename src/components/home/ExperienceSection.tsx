
import React, { lazy, Suspense } from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExperienceItem } from './experience/types';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components for better performance
const ExperienceList = lazy(() => import('./experience/ExperienceList'));
const EmptyExperienceState = lazy(() => import('./experience/EmptyExperienceState'));

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items }) => {
  const { experienceData } = useResumeData();
  const isMobile = useIsMobile();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : experienceData;

  // Loading component for Suspense
  const LoadingFallback = () => (
    <div className="p-4">
      <Skeleton className="h-16 w-full mb-4" />
      <Skeleton className="h-12 w-3/4 mb-3" />
      <Skeleton className="h-10 w-5/6 mb-3" />
      <Skeleton className="h-10 w-2/3" />
    </div>
  );

  return (
    <ResumeSection id="experience" title="Experience">
      <Suspense fallback={<LoadingFallback />}>
        {displayItems.length > 0 ? (
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <ExperienceList items={displayItems} isMobile={isMobile} />
          </div>
        ) : (
          <EmptyExperienceState />
        )}
      </Suspense>
    </ResumeSection>
  );
};

export default ExperienceSection;

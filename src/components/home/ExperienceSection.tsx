
import React, { lazy, Suspense, useEffect, useState } from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExperienceItem } from './experience/types';
import { Skeleton } from '@/components/ui/skeleton';

// Import directly instead of lazy loading to prevent delay
import ExperienceList from './experience/ExperienceList';
import EmptyExperienceState from './experience/EmptyExperienceState';

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items }) => {
  const { experienceData } = useResumeData();
  const isMobile = useIsMobile();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : experienceData;

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
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        {displayItems.length > 0 ? (
          <ExperienceList items={displayItems} isMobile={isMobile} />
        ) : (
          <EmptyExperienceState />
        )}
      </div>
    </ResumeSection>
  );
};

export default ExperienceSection;

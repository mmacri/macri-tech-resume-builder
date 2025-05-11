
import React from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExperienceItem } from './experience/types';
import { Skeleton } from '@/components/ui/skeleton';

// Import directly to avoid lazy loading issues
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
  
  console.log(`ExperienceSection: Rendering with ${displayItems?.length || 0} items`);

  return (
    <ResumeSection id="experience" title="Experience">
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        {displayItems && displayItems.length > 0 ? (
          <ExperienceList items={displayItems} isMobile={isMobile} />
        ) : (
          <EmptyExperienceState />
        )}
      </div>
    </ResumeSection>
  );
};

export default ExperienceSection;

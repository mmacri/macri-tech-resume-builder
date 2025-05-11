
import React from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import ExperienceList from './experience/ExperienceList';
import EmptyExperienceState from './experience/EmptyExperienceState';
import { ExperienceItem } from './experience/types';

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items }) => {
  const { experienceData } = useResumeData();
  const isMobile = useIsMobile();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : experienceData;

  return (
    <ResumeSection id="experience" title="Experience">
      {displayItems.length > 0 ? (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <ExperienceList items={displayItems} isMobile={isMobile} />
        </div>
      ) : (
        <EmptyExperienceState />
      )}
    </ResumeSection>
  );
};

export default ExperienceSection;

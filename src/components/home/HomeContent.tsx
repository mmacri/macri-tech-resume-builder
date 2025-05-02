import React, { useState } from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import DataProvider from '@/components/home/DataProvider';
import ResumeDataLoader from '@/components/home/ResumeDataLoader';

/**
 * Main content component for the Home page showing all resume sections
 * Uses static content for all sections by default, but can also load dynamic data
 */
const HomeContent: React.FC = () => {
  const [sections, setSections] = useState<any[]>([]);

  const handleDataLoaded = (loadedSections: any[]) => {
    if (loadedSections && loadedSections.length > 0) {
      setSections(loadedSections);
    }
  };
  
  const handleDataError = (error: Error) => {
    console.error('Error loading resume data:', error);
    // Keep using static data on error
  };

  return (
    <>
      <ResumeDataLoader onDataLoaded={handleDataLoaded} onDataError={handleDataError} />
      
      <DataProvider dynamicData={sections}>
        <div className="resume-container">
          <AboutSection items={[]} />
          <hr className="m-0" />
          <ExperienceSection items={[]} />
          <hr className="m-0" />
          <EducationSection items={[]} />
          <hr className="m-0" />
          <SkillsSection items={[]} />
          <hr className="m-0" />
          <InterestsSection items={[]} />
          <hr className="m-0" />
          <AwardsSection items={[]} />
        </div>
      </DataProvider>
    </>
  );
};

export default HomeContent;

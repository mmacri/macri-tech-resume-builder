
import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ReferencesSection from '@/components/home/about/ReferencesSection';
import DataProvider from '@/components/home/DataProvider';
import ResumeDataLoader from '@/components/home/ResumeDataLoader';
import { initialAboutData } from '@/utils/resume/aboutData';

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
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* References Section */}
      <section className="py-12 md:py-16 border-b border-gray-200">
        <div className="px-4 md:px-8 max-w-6xl mx-auto">
          <ReferencesSection references={initialAboutData.references} />
        </div>
      </section>
      
      <DataProvider dynamicData={sections}>
        <div className="resume-container">
          {/* Critical sections (load first) */}
          <ExperienceSection items={[]} />
          
          {/* Less critical sections (can be loaded later) */}
          <hr className="m-0" />
          <EducationSection items={[]} />
          <hr className="m-0" />
          <ProjectsSection items={[]} />
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

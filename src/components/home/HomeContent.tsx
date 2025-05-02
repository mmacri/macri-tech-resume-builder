
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';

/**
 * Main content component for the Home page showing all resume sections
 * Uses static content for all sections
 */
const HomeContent: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default HomeContent;

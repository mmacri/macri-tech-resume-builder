
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import { initialExperienceData } from '@/utils/resume/experienceData';
import { initialEducationData } from '@/utils/resume/educationData';
import { initialSkillsData } from '@/utils/resume/skillsData';
import { initialInterestsData } from '@/utils/resume/interestsData';
import { initialAwardsData } from '@/utils/resume/awardsData';

/**
 * Main content component for the Home page showing all resume sections
 * Uses static content for all sections
 */
const HomeContent: React.FC = () => {
  return (
    <>
      <AboutSection items={[]} />
      <hr className="m-0" />
      <ExperienceSection items={initialExperienceData} />
      <hr className="m-0" />
      <EducationSection items={initialEducationData} />
      <hr className="m-0" />
      <SkillsSection items={initialSkillsData} />
      <hr className="m-0" />
      <InterestsSection items={initialInterestsData} />
      <hr className="m-0" />
      <AwardsSection items={initialAwardsData} />
    </>
  );
};

export default HomeContent;


import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import { extractResumeSection } from '@/utils/resume/extractUtils';

interface HomeContentProps {
  resumeSections: any[] | undefined;
}

/**
 * Main content component for the Home page showing all resume sections
 */
const HomeContent: React.FC<HomeContentProps> = ({ resumeSections }) => {
  const getSectionItems = (sectionName: string) => {
    return extractResumeSection(resumeSections, sectionName);
  };

  return (
    <>
      <AboutSection items={getSectionItems('about')} />
      <hr className="m-0" />
      <ExperienceSection items={getSectionItems('experience')} />
      <hr className="m-0" />
      <EducationSection items={getSectionItems('education')} />
      <hr className="m-0" />
      <SkillsSection items={getSectionItems('skills')} />
      <hr className="m-0" />
      <InterestsSection items={getSectionItems('interests')} />
      <hr className="m-0" />
      <AwardsSection items={getSectionItems('awards')} />
    </>
  );
};

export default HomeContent;

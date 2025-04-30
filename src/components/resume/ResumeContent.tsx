
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';

interface ResumeContentProps {
  resumeSections: any[];
}

/**
 * Main content component for the Resume page showing all resume sections
 */
const ResumeContent: React.FC<ResumeContentProps> = ({ resumeSections }) => {
  const getSectionItems = (sectionName: string) => {
    if (!resumeSections) return [];
    const section = resumeSections.find(s => s.section_name === sectionName);
    const items = section ? section.items : [];
    console.log(`Getting items for ${sectionName} in Resume page:`, items);
    return items;
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

export default ResumeContent;

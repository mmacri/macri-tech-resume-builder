
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';

const Home = () => {
  return (
    <>
      <AboutSection />
      <hr className="m-0" />
      <ExperienceSection />
      <hr className="m-0" />
      <EducationSection />
      <hr className="m-0" />
      <SkillsSection />
      <hr className="m-0" />
      <InterestsSection />
      <hr className="m-0" />
      <AwardsSection />
    </>
  );
};

export default Home;

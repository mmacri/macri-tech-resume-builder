
import React from 'react';
import { 
  staticExperienceData, 
  staticEducationData, 
  staticSkillsData, 
  staticInterestsData, 
  staticAwardsData,
  staticProjectsData
} from '@/data/staticResumeData';

/**
 * Context for providing resume section data to components
 */
export const ResumeDataContext = React.createContext<{
  experienceData: any[];
  educationData: any[];
  skillsData: any[];
  interestsData: any[];
  awardsData: any[];
  projectsData: any[];
}>({
  experienceData: [],
  educationData: [],
  skillsData: [],
  interestsData: [],
  awardsData: [],
  projectsData: []
});

interface DataProviderProps {
  children: React.ReactNode;
  dynamicData?: any[];
}

/**
 * Provider component that supplies static or dynamic resume data to child components
 */
const DataProvider: React.FC<DataProviderProps> = ({ children, dynamicData = [] }) => {
  // Memoize the data mapping to prevent unnecessary re-calculations
  const contextValue = React.useMemo(() => {
    // Map dynamic data (if available) or use static data
    const getSectionData = (sectionName: string, staticData: any[]) => {
      const section = dynamicData.find(section => section.section_name === sectionName);
      return section && section.items && section.items.length > 0 ? section.items : staticData;
    };

    const experienceData = getSectionData('experience', staticExperienceData);
    const educationData = getSectionData('education', staticEducationData);
    const skillsData = getSectionData('skills', staticSkillsData);
    const interestsData = getSectionData('interests', staticInterestsData);
    const awardsData = getSectionData('awards', staticAwardsData);
    const projectsData = getSectionData('projects', staticProjectsData);

    return {
      experienceData,
      educationData,
      skillsData,
      interestsData,
      awardsData,
      projectsData
    };
  }, [dynamicData?.length]); // Only recalculate when data length changes

  return (
    <ResumeDataContext.Provider value={contextValue}>
      {children}
    </ResumeDataContext.Provider>
  );
};

export default DataProvider;

/**
 * Custom hook to access resume data
 */
export const useResumeData = () => {
  const context = React.useContext(ResumeDataContext);
  if (context === undefined) {
    throw new Error('useResumeData must be used within a DataProvider');
  }
  return context;
};

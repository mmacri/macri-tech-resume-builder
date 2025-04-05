
import { createAboutData } from './aboutData';
import { createExperienceData } from './experienceData';
import { createEducationData } from './educationData';
import { createSkillsData } from './skillsData';
import { createInterestsData } from './interestsData';
import { createAwardsData } from './awardsData';

export const populateSectionItems = async (sectionId: string, sectionName: string) => {
  try {
    switch (sectionName) {
      case 'about':
        await createAboutData(sectionId);
        break;
      case 'experience':
        await createExperienceData(sectionId);
        break;
      case 'education':
        await createEducationData(sectionId);
        break;
      case 'skills':
        await createSkillsData(sectionId);
        break;
      case 'interests':
        await createInterestsData(sectionId);
        break;
      case 'awards':
        await createAwardsData(sectionId);
        break;
      default:
        console.log(`No data population method for section: ${sectionName}`);
    }
  } catch (error) {
    console.error(`Error populating ${sectionName} section:`, error);
    throw error;
  }
};

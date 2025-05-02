
// This file maintains the original export structure but imports data from separate files
// for better organization and maintainability

import { 
  staticExperienceData,
  staticEducationData,
  staticSkillsData,
  staticInterestsData,
  staticAwardsData,
  staticProjectsData
} from './resume';

// Re-export all the data to maintain the existing API
export {
  staticExperienceData,
  staticEducationData,
  staticSkillsData,
  staticInterestsData,
  staticAwardsData,
  staticProjectsData
};

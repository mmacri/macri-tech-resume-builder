
import { staticExperienceData } from "@/data/resume/experienceData";
import { staticEducationData } from "@/data/resume/educationData";
import { staticSkillsData } from "@/data/resume/skillsData";
import { staticInterestsData } from "@/data/resume/interestsData";
import { staticAwardsData } from "@/data/resume/awardsData";
import { staticProjectsData } from "@/data/resume/projectsData";
import { initialAboutData } from "./aboutData";

/**
 * Creates and returns fallback sections for when database data is unavailable
 */
export const createFallbackSections = () => {
  // Create a timestamp for created_at and updated_at fields
  const timestamp = new Date().toISOString();
  
  // Create a unique ID for each section
  const createSectionId = (sectionName: string) => `${sectionName}-${Math.random().toString(36).substring(2, 9)}`;

  // About section
  const aboutSection = {
    id: createSectionId('about'),
    section_name: 'about',
    display_order: 1,
    created_at: timestamp,
    updated_at: timestamp,
    items: [{
      id: `about-item-${Math.random().toString(36).substring(2, 9)}`,
      title: 'About',
      description: JSON.stringify(initialAboutData),
      display_order: 1,
      created_at: timestamp,
      updated_at: timestamp
    }]
  };

  // Experience section
  const experienceSection = {
    id: createSectionId('experience'),
    section_name: 'experience',
    display_order: 2,
    created_at: timestamp,
    updated_at: timestamp,
    items: staticExperienceData.map((item, index) => ({
      id: `experience-item-${index}-${Math.random().toString(36).substring(2, 9)}`,
      title: item.title,
      organization: item.organization,
      location: item.location,
      start_date: item.start_date,
      end_date: item.end_date,
      description: item.description,
      display_order: item.display_order,
      created_at: timestamp,
      updated_at: timestamp
    }))
  };

  // Education section
  const educationSection = {
    id: createSectionId('education'),
    section_name: 'education',
    display_order: 3,
    created_at: timestamp,
    updated_at: timestamp,
    items: staticEducationData.map((item, index) => ({
      id: `education-item-${index}-${Math.random().toString(36).substring(2, 9)}`,
      title: item.title,
      organization: item.organization,
      description: item.description,
      display_order: item.display_order,
      created_at: timestamp,
      updated_at: timestamp
    }))
  };

  // Projects section
  const projectsSection = {
    id: createSectionId('projects'),
    section_name: 'projects',
    display_order: 4,
    created_at: timestamp,
    updated_at: timestamp,
    items: staticProjectsData.map((item, index) => ({
      id: `project-item-${index}-${Math.random().toString(36).substring(2, 9)}`,
      title: item.title,
      description: item.description, 
      technologies: item.technologies ? JSON.stringify(item.technologies) : null,
      link: item.link,
      display_order: item.display_order,
      created_at: timestamp,
      updated_at: timestamp
    }))
  };

  // Skills section
  const skillsSection = {
    id: createSectionId('skills'),
    section_name: 'skills',
    display_order: 5,
    created_at: timestamp,
    updated_at: timestamp,
    items: staticSkillsData.map((item, index) => ({
      id: `skill-item-${index}-${Math.random().toString(36).substring(2, 9)}`,
      title: item.title,
      description: item.description,
      display_order: item.display_order,
      created_at: timestamp,
      updated_at: timestamp
    }))
  };

  // Interests section
  const interestsSection = {
    id: createSectionId('interests'),
    section_name: 'interests',
    display_order: 6,
    created_at: timestamp,
    updated_at: timestamp,
    items: staticInterestsData.map((item, index) => ({
      id: `interest-item-${index}-${Math.random().toString(36).substring(2, 9)}`,
      title: item.title,
      description: item.description,
      display_order: item.display_order,
      created_at: timestamp,
      updated_at: timestamp
    }))
  };

  // Awards section
  const awardsSection = {
    id: createSectionId('awards'),
    section_name: 'awards',
    display_order: 7,
    created_at: timestamp,
    updated_at: timestamp,
    items: staticAwardsData.map((item, index) => ({
      id: `award-item-${index}-${Math.random().toString(36).substring(2, 9)}`,
      title: item.title,
      display_order: item.display_order,
      created_at: timestamp,
      updated_at: timestamp
    }))
  };

  // Return all sections
  return [
    aboutSection,
    experienceSection,
    educationSection,
    projectsSection,
    skillsSection,
    interestsSection,
    awardsSection
  ];
};

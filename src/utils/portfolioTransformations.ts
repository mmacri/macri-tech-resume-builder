
/**
 * Utility functions for transforming portfolio project data
 */

/**
 * Convert technologies array to comma-separated string
 */
export const technologiesToString = (techs?: string[]): string => {
  return techs ? techs.join(', ') : '';
};

/**
 * Convert comma-separated string to technologies array
 */
export const stringToTechnologies = (techString: string): string[] => {
  return techString.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
};

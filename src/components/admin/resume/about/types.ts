
/**
 * Types for the About section admin components
 */

export interface AboutData {
  full_name: string;
  headline: string;
  intro_text: string;
  locations: string[];
  skills_items: string[];
  success_items: string[];
  references: string[];
}

export interface AboutSection {
  id: string;
  description: string;
  title: string;
  section_id: string;
}

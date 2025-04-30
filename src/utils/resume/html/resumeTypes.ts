
/**
 * Define interface for the about data structure
 */
export interface AboutInfo {
  full_name?: string;
  headline?: string;
  intro_text?: string;
  locations?: string[];
  skills_items?: string[];
  success_items?: string[];
  references?: string[];
  email?: string;
  phone?: string;
}

/**
 * Interface for extracted resume data for PDF generation
 */
export interface ExtractedResumeData {
  aboutData: any;
  experiences: any[];
  education: any[];
  skills: any[];
}

/**
 * Interface for fallback resume data
 */
export interface FallbackResumeData extends ExtractedResumeData {
  aboutData: {
    title: string;
    subtitle: string;
    description: string;
  };
}

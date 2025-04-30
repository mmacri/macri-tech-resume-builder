
export interface UpdateOptions {
  updateIndex?: boolean;
  updateResume?: boolean;
}

export interface ExperienceItemInput {
  id?: string;
  title: string;
  organization: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  display_order?: number;
  section_id?: string;
}

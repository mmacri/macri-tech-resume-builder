
export interface ExperienceItem {
  id?: string;
  title: string;
  organization: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  description: string;
  display_order?: number;
}

export interface DateFormatOptions {
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  day?: 'numeric' | '2-digit';
}

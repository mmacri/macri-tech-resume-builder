
export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  link?: string | null;
  image_url?: string | null;
  technologies?: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
};

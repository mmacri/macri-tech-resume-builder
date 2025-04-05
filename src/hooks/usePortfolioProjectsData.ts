
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioProject } from '@/types/portfolioProject';

/**
 * Hook for fetching portfolio projects data
 */
export const usePortfolioProjectsData = () => {
  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ['adminPortfolioProjects'],
    queryFn: async () => {
      console.log('Fetching portfolio projects...');
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching portfolio projects:', error);
        throw error;
      }
      
      console.log('Found projects:', data);
      return data as PortfolioProject[];
    }
  });

  return {
    projects,
    isLoading,
    refreshProjects: refetch
  };
};

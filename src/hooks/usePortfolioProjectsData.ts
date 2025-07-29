
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioProject } from '@/types/portfolioProject';
import { toast } from 'sonner';

/**
 * Hook for fetching portfolio projects data
 */
export const usePortfolioProjectsData = () => {
  const { data: projects, isLoading, refetch, error } = useQuery({
    queryKey: ['adminPortfolioProjects'],
    queryFn: async () => {
      console.log('Fetching portfolio projects...');
      
      // Fetch all projects directly
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching portfolio projects:', error);
        throw error;
      }
      
      console.log('Found projects:', data?.length || 0);
      return data as PortfolioProject[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false
  });

  if (error) {
    console.error('Error in usePortfolioProjectsData:', error);
    toast.error(`Error loading portfolio projects: ${(error as Error).message}`);
  }

  return {
    projects,
    isLoading,
    refreshProjects: refetch
  };
};

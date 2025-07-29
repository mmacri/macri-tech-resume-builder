
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
      
      // Fetch all projects directly - more reliable than checking count first
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching portfolio projects:', error);
        toast.error(`Error loading portfolio projects: ${error.message}`);
        throw error;
      }
      
      console.log('Portfolio projects fetched successfully:', data?.length || 0, 'projects');
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

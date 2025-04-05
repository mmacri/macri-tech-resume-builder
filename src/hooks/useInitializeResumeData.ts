
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';

export const useInitializeResumeData = () => {
  // Initialize data function
  const initializeDataMutation = useMutation({
    mutationFn: initializeResumeData,
    onSuccess: () => {
      toast.success('Resume data initialized successfully');
    },
    onError: (error: Error) => {
      console.error('Error initializing data:', error);
      toast.error(`Failed to initialize data: ${error.message}`);
    }
  });

  return {
    initializeData: initializeDataMutation.mutate,
    isInitializing: initializeDataMutation.isPending,
    isSuccess: initializeDataMutation.isSuccess,
    isError: initializeDataMutation.isError,
    error: initializeDataMutation.error
  };
};

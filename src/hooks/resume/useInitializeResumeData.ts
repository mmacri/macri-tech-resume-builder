
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';

export interface InitializeDataOptions {
  force?: boolean;
}

export const useInitializeResumeData = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  
  const initializeData = async (options: InitializeDataOptions = {}) => {
    console.log('Initializing resume data with options:', options);
    setIsInitializing(true);
    
    try {
      // Use the centralized initialization function and pass the options
      const result = await initializeResumeData(options);
      
      if (result.success) {
        toast.success(result.message || 'Resume data initialized successfully!');
        return result;
      } else {
        console.error('Failed to initialize resume data:', result.message);
        toast.error(result.message || 'Failed to initialize resume data');
        
        // Even though there was an error, return the result for downstream handling
        return result;
      }
    } catch (error) {
      console.error('Error initializing resume data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to initialize resume data: ${errorMessage}`);
      
      // Return a formatted error object for better handling downstream
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsInitializing(false);
    }
  };
  
  const mutation = useMutation({
    mutationFn: initializeData,
    onSettled: (data, error) => {
      // Additional global handling for both success and error cases if needed
      console.log('Resume data initialization completed with result:', data);
      if (error) {
        console.error('Mutation error during init:', error);
      }
    }
  });
  
  return {
    initializeData: mutation.mutate,
    isInitializing: isInitializing || mutation.isPending,
    error: mutation.error,
    result: mutation.data
  };
};

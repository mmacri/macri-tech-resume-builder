
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
        toast.success('Resume data initialized successfully!');
      }
      
      // Return the result so it can be used downstream if needed
      return result;
    } catch (error) {
      console.error('Error initializing resume data:', error);
      toast.error(`Failed to initialize resume data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error; // Re-throw to propagate to mutation error handler
    } finally {
      setIsInitializing(false);
    }
  };
  
  const mutation = useMutation({
    mutationFn: initializeData
  });
  
  return {
    initializeData: mutation.mutate,
    isInitializing: isInitializing || mutation.isPending
  };
};

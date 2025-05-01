
import React from 'react';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { useAdminControls } from '../AdminControlsContext';
import { toast } from 'sonner';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';

export const InitializeExperienceButton = () => {
  const { isAdmin, onFixDatabaseIssues } = useAdminControls();
  const [isInitializing, setIsInitializing] = React.useState(false);

  if (!isAdmin) return null;

  const handleInitializeExperience = async () => {
    try {
      setIsInitializing(true);
      toast.loading('Initializing experience data...');
      
      const result = await forceInitExperience();
      
      if (result.initialized) {
        toast.success('Experience data initialized successfully!');
        // Call the fix database function to reload data
        onFixDatabaseIssues();
      } else {
        toast.info(result.message || 'Experience data already exists');
      }
    } catch (error) {
      console.error('Error initializing experience data:', error);
      toast.error('Failed to initialize experience data. Please try again.');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <Button 
      variant="outline"
      onClick={handleInitializeExperience}
      disabled={isInitializing}
      size="sm"
      className="text-green-600 border-green-600 hover:bg-green-100"
    >
      <Database className="mr-2 h-4 w-4" />
      {isInitializing ? 'Initializing...' : 'Initialize Experience'}
    </Button>
  );
};

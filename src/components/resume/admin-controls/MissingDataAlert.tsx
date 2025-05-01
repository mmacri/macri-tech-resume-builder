
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAdminControls } from '../AdminControlsContext';

export const MissingDataAlert = () => {
  const { resumeSections, isLoading } = useAdminControls();
  
  // Check if there's no data at all
  const hasNoData = !resumeSections || resumeSections.length === 0;
  
  // Check specifically for experience data
  const hasNoExperience = !hasNoData && (!resumeSections.find(s => 
    s.section_name === 'experience' && s.items && s.items.length > 0
  ));
  
  if (isLoading || (!hasNoData && !hasNoExperience)) return null;

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {hasNoData ? 'Resume Data Missing' : 'Experience Data Missing'}
      </AlertTitle>
      <AlertDescription>
        {hasNoData ? 
          'No resume data was found in the database. Use the buttons below to initialize or fix data.' : 
          'No experience data was found. Use the Initialize Experience button to add experience data.'}
      </AlertDescription>
    </Alert>
  );
};

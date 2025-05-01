
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAdminControls } from '../AdminControlsContext';

export const MissingDataAlert = () => {
  const { resumeSections, isLoading } = useAdminControls();
  const hasNoData = !resumeSections || resumeSections.length === 0;

  if (!hasNoData || isLoading) return null;

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Resume Data Missing</AlertTitle>
      <AlertDescription>
        No resume data was found in the database. Use the buttons below to initialize or fix data.
      </AlertDescription>
    </Alert>
  );
};


import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';

interface MissingDataStatusProps {
  isInitializing: boolean;
  onInitialize: () => void;
}

const MissingDataStatus: React.FC<MissingDataStatusProps> = ({ isInitializing, onInitialize }) => {
  return (
    <Alert className="mb-6 bg-amber-50">
      <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
      <AlertTitle className="text-amber-600">Missing Data</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>
          Some sections are missing data. Click the button below to initialize all sections with Michael Macri's resume data.
        </p>
        <Button 
          onClick={onInitialize} 
          variant="outline" 
          className="w-fit"
          disabled={isInitializing}
        >
          {isInitializing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Initializing Data...
            </>
          ) : (
            "Initialize Resume Data"
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default MissingDataStatus;

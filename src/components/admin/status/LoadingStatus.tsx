
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const LoadingStatus = () => {
  return (
    <Alert className="mb-6 bg-gray-100">
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      <AlertTitle>Checking data status...</AlertTitle>
      <AlertDescription>
        Verifying that all resume sections, portfolio projects, and users are populated.
      </AlertDescription>
    </Alert>
  );
};

export default LoadingStatus;

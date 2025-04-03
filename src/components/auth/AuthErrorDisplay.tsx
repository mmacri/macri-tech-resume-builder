
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AuthErrorDisplayProps {
  error: string | null;
}

const AuthErrorDisplay = ({ error }: AuthErrorDisplayProps) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  );
};

export default AuthErrorDisplay;

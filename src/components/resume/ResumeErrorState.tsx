
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ResumeErrorStateProps {
  onRetry: () => void;
  onInitializeData?: () => void;
}

/**
 * Error state component for the Resume page
 */
const ResumeErrorState: React.FC<ResumeErrorStateProps> = ({ onRetry, onInitializeData }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleInitializeData = () => {
    if (onInitializeData) {
      onInitializeData();
    } else {
      navigate('/admin-dashboard');
    }
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Resume Data</h2>
        <p className="mb-6 text-gray-700">There was a problem loading the resume data. The database may be empty or there might be a connection issue.</p>
        <div className="space-y-4">
          <Button onClick={onRetry} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          {isAdmin && (
            <Button 
              onClick={handleInitializeData} 
              className="w-full bg-amber-500 hover:bg-amber-600"
            >
              <Database className="w-4 h-4 mr-2" />
              {onInitializeData ? 'Initialize Resume Data' : 'Go to Admin Dashboard'}
            </Button>
          )}
          
          {isAdmin && (
            <p className="text-sm text-gray-500 mt-2">
              Click the button above to initialize all sections with sample data directly from this page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeErrorState;

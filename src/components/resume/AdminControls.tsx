
import React from 'react';
import { AdminControlsProvider } from './AdminControlsContext';
import { MissingDataAlert } from './admin-controls/MissingDataAlert';
import { AdminControlsButtonGroup } from './admin-controls/ButtonGroup';

interface AdminControlsProps {
  isAdmin: boolean;
  resumeSections: any[] | undefined;
  isLoading: boolean;
  isFixing: boolean;
  isInitializing: boolean;
  isResettingExperience: boolean;
  onResetExperience: () => void;
  onInitializeData: () => void;
  onFixDatabaseIssues: () => void;
}

/**
 * Admin controls component for the Resume page
 * Provides functionality for initializing and fixing resume data
 */
const AdminControls: React.FC<AdminControlsProps> = (props) => {
  if (!props.isAdmin) return null;

  return (
    <AdminControlsProvider {...props}>
      <div className="container mx-auto mt-4 mb-2">
        <div className="space-y-4">
          <MissingDataAlert />
          <AdminControlsButtonGroup />
        </div>
      </div>
    </AdminControlsProvider>
  );
};

export default AdminControls;

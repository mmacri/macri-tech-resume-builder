
import React, { createContext, useContext } from 'react';

export interface AdminControlsContextType {
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

const AdminControlsContext = createContext<AdminControlsContextType | undefined>(undefined);

export const AdminControlsProvider: React.FC<AdminControlsContextType & { children: React.ReactNode }> = ({ children, ...value }) => {
  return (
    <AdminControlsContext.Provider value={value}>
      {children}
    </AdminControlsContext.Provider>
  );
};

export const useAdminControls = () => {
  const context = useContext(AdminControlsContext);
  if (context === undefined) {
    throw new Error('useAdminControls must be used within an AdminControlsProvider');
  }
  return context;
};

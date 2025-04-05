
import React, { createContext, useContext, useState } from 'react';

interface AdminUpdateContextProps {
  updateResume: boolean;
  updateIndex: boolean;
  setUpdateResume: (value: boolean) => void;
  setUpdateIndex: (value: boolean) => void;
  toggleUpdateResume: () => void;
  toggleUpdateIndex: () => void;
}

const AdminUpdateContext = createContext<AdminUpdateContextProps | undefined>(undefined);

export const AdminUpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [updateResume, setUpdateResume] = useState<boolean>(true);
  const [updateIndex, setUpdateIndex] = useState<boolean>(false);

  const toggleUpdateResume = () => setUpdateResume((prev) => !prev);
  const toggleUpdateIndex = () => setUpdateIndex((prev) => !prev);

  return (
    <AdminUpdateContext.Provider
      value={{
        updateResume,
        updateIndex,
        setUpdateResume,
        setUpdateIndex,
        toggleUpdateResume,
        toggleUpdateIndex
      }}
    >
      {children}
    </AdminUpdateContext.Provider>
  );
};

export const useAdminUpdate = (): AdminUpdateContextProps => {
  const context = useContext(AdminUpdateContext);
  if (!context) {
    throw new Error('useAdminUpdate must be used within an AdminUpdateProvider');
  }
  return context;
};

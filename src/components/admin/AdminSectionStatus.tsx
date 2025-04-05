
import React, { useEffect } from 'react';
import { useInitializeResumeData } from '@/hooks/useInitializeResumeData';
import { useResumeStatusChecks } from '@/hooks/useResumeStatusChecks';
import LoadingStatus from './status/LoadingStatus';
import CompletedStatus from './status/CompletedStatus';
import MissingDataStatus from './status/MissingDataStatus';

interface SectionStatusProps {
  onAllSectionsPopulated?: () => void;
}

const AdminSectionStatus: React.FC<SectionStatusProps> = ({ onAllSectionsPopulated }) => {
  const { initializeData, isInitializing, isSuccess } = useInitializeResumeData();
  const { allPopulated, isLoading, refreshAllData } = useResumeStatusChecks();

  // Call onAllSectionsPopulated when allPopulated changes to true
  useEffect(() => {
    if (allPopulated && onAllSectionsPopulated) {
      onAllSectionsPopulated();
    }
  }, [allPopulated, onAllSectionsPopulated]);

  // Refetch data when initialization is done
  useEffect(() => {
    if (isSuccess) {
      refreshAllData();
    }
  }, [isSuccess, refreshAllData]);

  const handleInitializeData = () => {
    console.log('Initializing data...');
    initializeData();
  };

  if (isLoading) {
    return <LoadingStatus />;
  }

  return (
    <>
      {allPopulated ? (
        <CompletedStatus />
      ) : (
        <MissingDataStatus 
          isInitializing={isInitializing} 
          onInitialize={handleInitializeData} 
        />
      )}
    </>
  );
};

export default AdminSectionStatus;

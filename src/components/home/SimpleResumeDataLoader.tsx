import React from 'react';
// Removed static data dependency

interface ResumeDataLoaderProps {
  onDataLoaded: (sections: any[]) => void;
  onDataError: (error: Error) => void;
}

const SimpleResumeDataLoader: React.FC<ResumeDataLoaderProps> = ({ onDataLoaded, onDataError }) => {
  React.useEffect(() => {
    // Simply load static data
    onDataLoaded([]);
  }, [onDataLoaded]);

  return null; // This is a non-visual component
};

export default SimpleResumeDataLoader;
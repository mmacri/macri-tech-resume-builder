
import React from 'react';

const EmptyExperienceState: React.FC = () => {
  return (
    <div className="p-8 border rounded-lg bg-macri-secondary text-center">
      <p className="text-gray-600">No experience information available.</p>
      <p className="text-sm text-gray-500 mt-2">Experience details will appear here when added.</p>
    </div>
  );
};

export default EmptyExperienceState;

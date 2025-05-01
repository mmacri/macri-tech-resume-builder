
import React from 'react';
import { ResetExperienceButton } from './ResetExperienceButton';
import { InitializeDataButton } from './InitializeDataButton';
import { FixDatabaseButton } from './FixDatabaseButton';
import { InitializeExperienceButton } from './InitializeExperienceButton';

export const AdminControlsButtonGroup = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <ResetExperienceButton />
      <InitializeDataButton />
      <FixDatabaseButton />
      <InitializeExperienceButton />
    </div>
  );
};

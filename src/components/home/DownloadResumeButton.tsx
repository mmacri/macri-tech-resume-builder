
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DownloadResume from '@/components/resume/DownloadResume';

const DownloadResumeButton = () => {
  return (
    <div className="mt-4 flex justify-center">
      <DownloadResume inlineButton={false} />
    </div>
  );
};

export default DownloadResumeButton;

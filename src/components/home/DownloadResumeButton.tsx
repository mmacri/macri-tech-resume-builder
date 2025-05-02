
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DownloadResume from '@/components/resume/DownloadResume';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DownloadResumeButton = () => {
  return (
    <div className="mt-8 flex justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DownloadResume inlineButton={false} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download a PDF version of my resume</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DownloadResumeButton;

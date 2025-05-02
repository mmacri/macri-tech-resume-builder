
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AboutSidebarProps {
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  emailUrl: string;
}

const AboutSidebar: React.FC<AboutSidebarProps> = ({
  linkedinUrl,
  githubUrl,
  websiteUrl,
  emailUrl
}) => {
  return (
    <div className="lg:w-1/3 flex flex-col gap-4 items-center">
      <div className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm w-full">
        <h3 className="text-xl font-semibold mb-3 text-center text-macri-primary">Connect With Me</h3>
        <div className="social-icons flex justify-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={emailUrl} 
                  className="social-icon"
                  aria-label="Email"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send me an email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Connect on LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Check out my GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon"
                  aria-label="Website"
                >
                  <i className="fas fa-globe"></i>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visit my website</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="w-full">
        <Button variant="default" className="w-full bg-macri-primary hover:bg-macri-primary/90 flex items-center gap-2 py-6 text-lg" asChild>
          <a href="/resume">
            <Download className="h-5 w-5" />
            View Full Resume
          </a>
        </Button>
      </div>
    </div>
  );
};

export default AboutSidebar;

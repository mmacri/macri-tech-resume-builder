
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AboutSocialIconsProps {
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  emailUrl: string;
}

const AboutSocialIcons: React.FC<AboutSocialIconsProps> = ({ 
  linkedinUrl, 
  githubUrl, 
  websiteUrl, 
  emailUrl 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={emailUrl}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-macri-primary hover:bg-black text-white transition-colors duration-200"
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
              className="flex items-center justify-center h-10 w-10 rounded-full bg-macri-primary hover:bg-black text-white transition-colors duration-200"
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
              className="flex items-center justify-center h-10 w-10 rounded-full bg-macri-primary hover:bg-black text-white transition-colors duration-200"
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
              className="flex items-center justify-center h-10 w-10 rounded-full bg-macri-primary hover:bg-black text-white transition-colors duration-200"
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
  );
};

export default AboutSocialIcons;

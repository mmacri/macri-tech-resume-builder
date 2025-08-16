
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SocialIcons: React.FC = () => {
  return (
    <div className="social-icons flex justify-center space-x-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" 
              href="https://linkedin.com/in/mikemacri" 
              target="_blank" 
              rel="noopener noreferrer"
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
              className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" 
              href="https://github.com/mmacri/my-portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
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
                className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" 
                href="/contact" 
                aria-label="Contact Form"
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
              className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" 
              href="https://mikemacri.com" 
              target="_blank" 
              rel="noopener noreferrer"
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

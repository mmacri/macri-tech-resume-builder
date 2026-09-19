
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
              href="https://www.linkedin.com/in/mikemacri" 
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
      
    </div>
  );
};

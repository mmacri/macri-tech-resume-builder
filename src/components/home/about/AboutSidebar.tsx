
import React from 'react';
import { Download, Mail, Linkedin, Github, Globe, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className="lg:w-1/3 flex flex-col gap-6 items-center">
      <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-macri-primary">Connect With Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href={emailUrl} 
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-macri-primary hover:bg-black text-white transition-colors duration-200"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
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
                    <Linkedin className="h-5 w-5" />
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
                    <Github className="h-5 w-5" />
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
                    <Globe className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit my website</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
      
      {/* Only show the CV download button if not on mobile */}
      {!isMobile && (
        <Button variant="default" className="w-full bg-macri-primary hover:bg-macri-primary/90 flex items-center gap-2 py-6 text-lg" asChild>
          <a href="/resume">
            <Download className="h-5 w-5" />
            <FileText className="h-5 w-5" />
            <span>Download My Resume</span>
          </a>
        </Button>
      )}
    </div>
  );
};

export default AboutSidebar;

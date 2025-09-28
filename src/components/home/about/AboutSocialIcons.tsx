
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
}

const AboutSocialIcons: React.FC<AboutSocialIconsProps> = ({ 
  linkedinUrl, 
  githubUrl, 
  websiteUrl
}) => {
  // This component is intentionally left empty as we've moved all social connections to the sidebar
  return null;
};

export default AboutSocialIcons;

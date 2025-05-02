
import React from 'react';
import DownloadResumeButton from './DownloadResumeButton';
import { parseAboutData } from '@/utils/resume/extractResumeSectionsForPDF';
import { initialAboutData } from '@/utils/resume/aboutData';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trophy, CheckCircle, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AboutSectionProps {
  items: any[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ items = [] }) => {
  // Get the first item or use default fallback data
  const aboutItem = items.length > 0 ? items[0] : null;
  
  // Parse the description if it exists (it should be a JSON string with all the about data)
  const aboutData = aboutItem ? parseAboutData(aboutItem.description) : null;
  
  // Use parsed data or fall back to defaults
  const name = aboutData?.full_name || initialAboutData.full_name;
  const headline = aboutData?.headline || initialAboutData.headline;
  const introText = aboutData?.intro_text || initialAboutData.intro_text;
  const locations = aboutData?.locations || initialAboutData.locations;
  const skillsItems = aboutData?.skills_items || initialAboutData.skills_items;
  const successItems = aboutData?.success_items || initialAboutData.success_items;
  const references = aboutData?.references || initialAboutData.references;
  
  // Website links
  const linkedinUrl = "https://linkedin.com/in/michaelmacri";
  const githubUrl = "https://github.com/mikemacri";
  const websiteUrl = "https://mikemacri.com";
  const email = "contact@mikemacri.com"; // Using a generic contact email that can be set up as a forwarder

  return (
    <section className="resume-section" id="about">
      <div className="resume-section-content px-4 md:px-8">
        <h1 className="text-macri-primary text-6xl mb-0">
          {name}
        </h1>
        <div className="subheading mb-5">
          {headline}
          {locations.length > 0 && (
            <div className="text-sm mt-2">
              {locations.join(' · ')}
            </div>
          )}
        </div>
        <p className="lead mb-5">
          {introText}
        </p>
        
        {/* Contact Information - Using buttons that link externally rather than displaying private info */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Connect With Me</h3>
          <TooltipProvider>
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href={`mailto:${email}`}>
                      <Mail className="h-4 w-4" />
                      Contact Me
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send me an email</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View my LinkedIn profile</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View my GitHub repositories</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Website
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit my personal website</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        
        {/* Skills and Success Items Table */}
        <div className="mb-5">
          <Table>
            <TableBody>
              <TableRow>
                {/* Skills Column */}
                {skillsItems.length > 0 && (
                  <TableCell className="align-top w-1/2">
                    <div className="flex items-center gap-2 text-xl font-semibold mb-3 text-macri-primary">
                      <CheckCircle className="h-5 w-5" />
                      <h3>Skilled At</h3>
                    </div>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      {skillsItems.map((item, index) => (
                        <li key={`skill-${index}`} className="text-gray-700 hover:text-macri-primary transition-colors">{item}</li>
                      ))}
                    </ul>
                  </TableCell>
                )}
                
                {/* Success Items Column */}
                {successItems.length > 0 && (
                  <TableCell className="align-top w-1/2">
                    <div className="flex items-center gap-2 text-xl font-semibold mb-3 text-macri-primary">
                      <Trophy className="h-5 w-5" />
                      <h3>Proven Experience</h3>
                    </div>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      {successItems.map((item, index) => (
                        <li key={`success-${index}`} className="text-gray-700 hover:text-macri-primary transition-colors">{item}</li>
                      ))}
                    </ul>
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* References Section */}
        {references.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-3">References</h3>
            <div className="space-y-4">
              {references.map((reference, index) => (
                <blockquote key={`ref-${index}`} className="border-l-4 border-macri-primary pl-4 italic text-gray-600">
                  "{reference}"
                </blockquote>
              ))}
            </div>
          </div>
        )}
        
        {/* Add Download Resume Button for easy access */}
        <DownloadResumeButton />
      </div>
    </section>
  );
};

export default AboutSection;

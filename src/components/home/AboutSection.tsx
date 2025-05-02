
import React from 'react';
import { parseAboutData } from '@/utils/resume/extractResumeSectionsForPDF';
import { initialAboutData } from '@/utils/resume/aboutData';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trophy, CheckCircle, Github, Linkedin, ExternalLink, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DownloadResume from '@/components/resume/DownloadResume';

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
  const emailUrl = "mailto:contact@mikemacri.com"; // Only used for icon link, not displayed

  return (
    <section className="resume-section" id="about">
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3">
            <h1 className="text-macri-primary text-5xl md:text-6xl mb-0 font-bold">
              {name}
            </h1>
            <div className="subheading mb-5">
              <h2 className="text-2xl text-gray-700">{headline}</h2>
              {locations.length > 0 && (
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-macri-primary" />
                  {locations.join(' · ')}
                </div>
              )}
            </div>
            
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
            
            <p className="lead mb-5 text-lg">
              {introText}
            </p>
          </div>
          
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
        </div>
        
        {/* Skills and Success Items Table */}
        <div className="my-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills Column */}
            {skillsItems.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-xl font-semibold mb-4 text-macri-primary">
                  <CheckCircle className="h-5 w-5" />
                  <h3>Key Skills</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {skillsItems.map((item, index) => (
                    <li key={`skill-${index}`} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Success Items Column */}
            {successItems.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-xl font-semibold mb-4 text-macri-primary">
                  <Trophy className="h-5 w-5" />
                  <h3>Notable Achievements</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {successItems.map((item, index) => (
                    <li key={`success-${index}`} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* References Section */}
        {references.length > 0 && (
          <div className="my-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-macri-primary">References</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {references.map((reference, index) => (
                <blockquote key={`ref-${index}`} className="blockquote">
                  "{reference}"
                </blockquote>
              ))}
            </div>
          </div>
        )}
        
        {/* Download Resume Button for mobile */}
        <div className="md:hidden mt-6">
          <DownloadResume inlineButton={false} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

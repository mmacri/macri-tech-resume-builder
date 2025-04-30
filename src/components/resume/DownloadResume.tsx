
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useResumeData } from '@/hooks/resume/useResumeData';
import { generateResumeHTML } from '@/utils/resume/generateResumeHTML';
import ResumeInlineButton from './ResumeInlineButton';
import ResumeFullButton from './ResumeFullButton';

interface DownloadResumeProps {
  inlineButton?: boolean;
}

const DownloadResume: React.FC<DownloadResumeProps> = ({ inlineButton = false }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { data: resumeSections, isLoading } = useResumeData();
  
  const generatePDF = async () => {
    if (isLoading || !resumeSections || resumeSections.length === 0) {
      toast.error('Resume data is not available. Please initialize your resume data first.');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Find the about section for contact info
      const aboutSection = resumeSections.find(section => section.section_name.toLowerCase() === 'about');
      const aboutData = aboutSection?.items[0];
      
      // Get the experience section
      const experienceSection = resumeSections.find(section => section.section_name.toLowerCase() === 'experience');
      const experiences = experienceSection?.items || [];
      
      // Get the education section
      const educationSection = resumeSections.find(section => section.section_name.toLowerCase() === 'education');
      const education = educationSection?.items || [];
      
      // Get the skills section
      const skillsSection = resumeSections.find(section => section.section_name.toLowerCase() === 'skills');
      const skills = skillsSection?.items || [];

      // Generate HTML for the resume
      const htmlContent = generateResumeHTML(aboutData, experiences, education, skills);
      
      // Convert HTML to PDF
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Open in a new window for printing
      const printWindow = window.open(url, '_blank');
      
      if (printWindow) {
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            setIsGenerating(false);
          }, 500);
        };
      } else {
        toast.error('Please allow pop-ups to download the resume');
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      toast.error('Failed to generate resume PDF');
      setIsGenerating(false);
    }
  };

  if (inlineButton) {
    return (
      <ResumeInlineButton 
        onClick={generatePDF}
        isLoading={isLoading}
        isGenerating={isGenerating}
      />
    );
  }

  return (
    <ResumeFullButton
      onClick={generatePDF}
      isLoading={isLoading}
      isGenerating={isGenerating}
    />
  );
};

export default DownloadResume;

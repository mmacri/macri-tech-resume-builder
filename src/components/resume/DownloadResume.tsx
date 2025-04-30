
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useResumeData } from '@/hooks/resume/useResumeData';
import { generateResumeHTML } from '@/utils/resume/generateResumeHTML';
import { extractResumeSectionsForPDF } from '@/utils/resume/extractResumeSections';
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
      // Extract resume sections
      const { aboutData, experiences, education, skills } = extractResumeSectionsForPDF(resumeSections);
      
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

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface DownloadResumeProps {
  inlineButton?: boolean;
}

const DownloadResume: React.FC<DownloadResumeProps> = ({ inlineButton = false }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Fetch all resume data sections
  const { data: resumeSections, isLoading } = useQuery({
    queryKey: ['downloadResumeData'],
    queryFn: async () => {
      console.log('Fetching resume data for download');
      
      try {
        // Get all sections
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
          throw sectionsError;
        }
        
        if (!sections || sections.length === 0) {
          return [];
        }
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
          const { data: items, error: itemsError } = await supabase
            .from('resume_items')
            .select('*')
            .eq('section_id', section.id)
            .order('display_order', { ascending: true });
          
          if (itemsError) {
            console.error(`Error fetching items for section ${section.section_name}:`, itemsError);
            return {
              ...section,
              items: []
            };
          }
          
          return {
            ...section,
            items: items || []
          };
        }));
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error in download resume data query:', error);
        return [];
      }
    },
    staleTime: 30000 // 30 seconds
  });
  
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

  // Format date string for the resume
  const formatDateString = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  // Generate HTML content for the resume
  const generateResumeHTML = (aboutData: any, experiences: any[], education: any[], skills: any[]) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 5px;
          }
          h2 {
            font-size: 18px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-top: 20px;
          }
          h3 {
            font-size: 16px;
            margin-bottom: 5px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .contact-info {
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
          }
          .section {
            margin-bottom: 20px;
          }
          .experience-item, .education-item {
            margin-bottom: 15px;
          }
          .job-title, .degree {
            font-weight: bold;
          }
          .company-name, .school-name {
            font-style: italic;
          }
          .date-range {
            float: right;
            font-size: 14px;
          }
          .description {
            margin-top: 5px;
            font-size: 14px;
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            padding: 0;
          }
          .skills-list li {
            margin-right: 15px;
            margin-bottom: 5px;
          }
          @media print {
            body {
              padding: 0;
              max-width: 100%;
            }
            @page {
              margin: 0.5in;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${aboutData?.title || 'Mike Macri'}</h1>
          ${aboutData?.subtitle ? `<p>${aboutData.subtitle}</p>` : ''}
        </div>
        
        <div class="contact-info">
          ${aboutData?.description ? parseContactInfo(aboutData.description) : ''}
        </div>
        
        <div class="section">
          <h2>Professional Experience</h2>
          ${experiences.map(exp => `
            <div class="experience-item">
              <div class="date-range">${formatDateString(exp.start_date)} - ${formatDateString(exp.end_date)}</div>
              <div class="job-title">${exp.title}</div>
              <div class="company-name">${exp.organization || ''}</div>
              ${exp.description ? `
                <ul class="description">
                  ${exp.description.split('\n').map(point => `<li>${point}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2>Education</h2>
          ${education.map(edu => `
            <div class="education-item">
              <div class="date-range">${formatDateString(edu.start_date)} - ${formatDateString(edu.end_date)}</div>
              <div class="degree">${edu.title}</div>
              <div class="school-name">${edu.organization || ''}</div>
              ${edu.description ? `<div class="description">${edu.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2>Skills</h2>
          <ul class="skills-list">
            ${skills.map(skill => `<li>${skill.title}</li>`).join('')}
          </ul>
        </div>
      </body>
      </html>
    `;
  };
  
  // Helper function to parse contact info from the about description
  const parseContactInfo = (description: string) => {
    if (!description) return '';
    
    let contactHTML = '';
    try {
      // Try to parse as JSON first
      const contactData = JSON.parse(description);
      if (typeof contactData === 'object') {
        if (contactData.email) contactHTML += `Email: ${contactData.email} | `;
        if (contactData.phone) contactHTML += `Phone: ${contactData.phone} | `;
        if (contactData.address) contactHTML += `${contactData.address}`;
        return contactHTML;
      }
    } catch (e) {
      // If not JSON, use as plain text
      return description;
    }
    
    return description;
  };

  if (inlineButton) {
    return (
      <Button 
        onClick={generatePDF} 
        disabled={isGenerating || isLoading}
        variant="outline"
        size="default"
        className="flex items-center gap-1 border-2 border-d35400 hover:bg-d35400/10"
        style={{ borderColor: '#d35400', color: '#d35400' }}
      >
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {isGenerating ? 'Generating...' : 'Resume'}
      </Button>
    );
  }

  return (
    <div className="flex justify-center mt-4 mb-8">
      <Button 
        onClick={generatePDF} 
        disabled={isGenerating || isLoading}
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-5 w-5" />}
        {isGenerating ? 'Generating...' : 'Download Resume'}
      </Button>
    </div>
  );
};

export default DownloadResume;

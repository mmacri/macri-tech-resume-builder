
import { format } from 'date-fns';

// Format date string for the resume
export const formatDateString = (dateString: string | null | undefined) => {
  if (!dateString) return 'Present';
  try {
    const date = new Date(dateString);
    return format(date, 'MMM yyyy');
  } catch (e) {
    return dateString;
  }
};

// Helper function to parse contact info from the about description
export const parseContactInfo = (description: string) => {
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

// Generate HTML content for the resume
export const generateResumeHTML = (aboutData: any, experiences: any[], education: any[], skills: any[]) => {
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

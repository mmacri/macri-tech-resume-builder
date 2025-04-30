
/**
 * Generate CSS styles for the resume HTML
 */
export const generateResumeStyles = (): string => {
  return `
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
    .skills-section, .success-section {
      margin-top: 15px;
    }
    .skills-section ul, .success-section ul {
      padding-left: 20px;
    }
    .references-section {
      margin-top: 15px;
    }
    .reference-item {
      font-style: italic;
      margin-bottom: 10px;
      padding-left: 20px;
      border-left: 2px solid #ccc;
    }
    .fas {
      color: #d35400;
      margin-right: 5px;
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
  `;
};

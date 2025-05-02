
/**
 * Generate CSS styles for the resume HTML
 */
export const generateResumeStyles = (): string => {
  return `
    body {
      font-family: "Muli", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9fb;
    }
    h1 {
      font-family: "Saira Extra Condensed", sans-serif;
      font-size: 28px;
      margin-bottom: 5px;
      color: #d35400;
    }
    h2 {
      font-family: "Saira Extra Condensed", sans-serif;
      font-size: 22px;
      border-bottom: 2px solid #d35400;
      padding-bottom: 5px;
      margin-top: 24px;
      color: #333333;
    }
    h3 {
      font-family: "Saira Extra Condensed", sans-serif;
      font-size: 18px;
      margin-bottom: 5px;
      color: #555555;
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    .contact-info {
      text-align: center;
      margin-bottom: 24px;
      font-size: 14px;
      color: #666;
    }
    .section {
      margin-bottom: 24px;
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    .experience-item, .education-item {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;
    }
    .experience-item:last-child, .education-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .job-title, .degree {
      font-weight: bold;
      color: #d35400;
    }
    .company-name, .school-name {
      font-style: italic;
      color: #555;
    }
    .date-range {
      float: right;
      font-size: 14px;
      color: #777;
      background: #f5f5f7;
      padding: 2px 8px;
      border-radius: 12px;
    }
    .description {
      margin-top: 8px;
      font-size: 14px;
    }
    .description ul {
      padding-left: 20px;
    }
    .description li {
      margin-bottom: 5px;
    }
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      gap: 10px;
    }
    .skills-list li {
      margin-bottom: 5px;
      background-color: #f5f5f7;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 13px;
    }
    .skills-section, .success-section {
      margin-top: 15px;
    }
    .skills-section ul, .success-section ul {
      padding-left: 20px;
    }
    .references-section {
      margin-top: 20px;
      background-color: #fafafa;
      padding: 15px;
      border-radius: 5px;
    }
    .reference-item {
      font-style: italic;
      margin-bottom: 10px;
      padding-left: 20px;
      border-left: 3px solid #d35400;
      color: #555;
    }
    .fas {
      color: #d35400;
      margin-right: 5px;
    }
    @media print {
      body {
        padding: 0;
        max-width: 100%;
        background-color: white;
      }
      .section {
        box-shadow: none;
        padding: 15px 0;
        border-radius: 0;
      }
      @page {
        margin: 0.75in;
      }
    }
  `;
};

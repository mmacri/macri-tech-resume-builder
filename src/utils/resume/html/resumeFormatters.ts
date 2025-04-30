
import { format } from 'date-fns';

/**
 * Format date string for the resume
 */
export const formatDateString = (dateString: string | null | undefined) => {
  if (!dateString) return 'Present';
  try {
    const date = new Date(dateString);
    return format(date, 'MMM yyyy');
  } catch (e) {
    return dateString;
  }
};

/**
 * Helper function to parse contact info from the about description
 */
export const parseContactInfo = (description: string) => {
  if (!description) return '';
  
  let contactHTML = '';
  try {
    // Try to parse as JSON first
    const contactData = JSON.parse(description);
    if (typeof contactData === 'object') {
      if (contactData.email) contactHTML += `Email: ${contactData.email}`;
      if (contactData.locations && contactData.locations.length > 0) {
        contactHTML += contactHTML ? ` | ${contactData.locations.join(', ')}` : contactData.locations.join(', ');
      }
      return contactHTML;
    }
  } catch (e) {
    // If not JSON, use as plain text
    console.log('Contact info is not in JSON format, using as plain text');
    return description;
  }
  
  return description;
};

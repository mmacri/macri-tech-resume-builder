
/**
 * Format a date string into a readable format
 * @param dateString The date string to format
 * @param options The Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string | null | undefined,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' }
): string {
  if (!dateString) return 'Present';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Format a date range between two dates
 * @param startDate The start date string
 * @param endDate The end date string (or null for "Present")
 * @param options The Intl.DateTimeFormat options
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }
): string {
  return `${formatDate(startDate, options)} - ${formatDate(endDate, options)}`;
}

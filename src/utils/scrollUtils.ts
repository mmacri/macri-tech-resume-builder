
/**
 * Utility functions for smooth scrolling behavior
 */

/**
 * Scrolls to the element with the given ID with smooth behavior
 * @param elementId - The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Handles navigation link clicks for smooth scrolling
 * @param event - The click event
 * @param targetId - The ID of the element to scroll to
 */
export const handleLinkClick = (
  event: React.MouseEvent<HTMLAnchorElement>,
  targetId: string
): void => {
  event.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
};

/**
 * Returns a function to handle navigation link clicks
 * @param targetId - The ID of the element to scroll to
 */
export const createScrollHandler = (targetId: string) => {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleLinkClick(event, targetId);
  };
};

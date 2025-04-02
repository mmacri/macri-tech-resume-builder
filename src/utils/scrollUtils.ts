
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
    const yOffset = -20; // Adjust this value based on your header height
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
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
  scrollToElement(targetId);
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

/**
 * Sets up scroll spying to highlight active navigation links
 * @param navLinkSelector - CSS selector for navigation links
 * @param sectionSelector - CSS selector for page sections
 * @param activeClass - CSS class to apply to active links
 */
export const setupScrollSpy = (
  navLinkSelector: string = '.nav-link',
  sectionSelector: string = '.resume-section',
  activeClass: string = 'active'
): void => {
  const sections = document.querySelectorAll(sectionSelector);
  const navLinks = document.querySelectorAll(navLinkSelector);
  
  const scrollHandler = () => {
    let current = '';
    
    sections.forEach((section) => {
      const element = section as HTMLElement;
      const sectionTop = element.offsetTop;
      const sectionHeight = element.clientHeight;
      
      if (window.scrollY >= sectionTop - 100 && 
          window.scrollY < sectionTop + sectionHeight - 100) {
        current = element.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove(activeClass);
      const href = link.getAttribute('href');
      if (href && href.includes('#' + current) && current !== '') {
        link.classList.add(activeClass);
      }
    });
  };

  window.addEventListener('scroll', scrollHandler);
  // Call once on load to set initial state
  scrollHandler();
};


/**
 * Scroll to element with ID
 * @param elementId ID of the element to scroll to
 * @param offset Optional offset from the top
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found.`);
    return;
  }

  const headerOffset = offset;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Set up scroll spying to highlight active nav items
 */
export const setupScrollSpy = (): void => {
  // Elements to observe for scroll position
  const sections = document.querySelectorAll('.resume-section');
  
  // Intersection Observer options
  const options = {
    threshold: 0.3, // How much of the element needs to be visible
    rootMargin: '-80px 0px -80px 0px' // Adjust for header offset
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Get the ID of the current section
      const id = entry.target.getAttribute('id');
      
      // Find the corresponding navigation link
      const navLink = document.querySelector(`a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        // Add active class to currently visible section's nav link
        navLink?.classList.add('active');
        
        // Update URL hash without scrolling
        if (id) {
          const url = new URL(window.location.href);
          url.hash = id;
          window.history.replaceState(null, '', url.toString());
        }
      } else {
        // Remove active class from non-visible sections
        navLink?.classList.remove('active');
      }
    });
  }, options);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Clean up observer on route change
  return () => {
    sections.forEach(section => {
      observer.unobserve(section);
    });
  };
};

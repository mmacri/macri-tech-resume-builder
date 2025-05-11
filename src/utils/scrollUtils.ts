
/**
 * Improved scroll to element function
 * @param elementId ID of the element to scroll to
 * @param offset Optional offset from the top
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found.`);
    return;
  }

  // Calculate position with offset
  const headerOffset = offset;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  // Use requestAnimationFrame for smoother scrolling
  requestAnimationFrame(() => {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    console.log(`Scrolled to ${elementId} at position ${offsetPosition}px`);
  });
  
  // Update URL hash without triggering another scroll
  setTimeout(() => {
    history.replaceState(null, '', `#${elementId}`);
    console.log(`Updated URL hash to #${elementId}`);
  }, 300); // Shorter timeout for better user experience
};

/**
 * Set up scroll spying to highlight active nav items
 * @returns Cleanup function to remove observers
 */
export const setupScrollSpy = (): (() => void) => {
  // Elements to observe for scroll position
  const sections = document.querySelectorAll('.resume-section');
  console.log(`Setting up scroll spy for ${sections.length} sections`);
  
  // Intersection Observer options
  const options = {
    threshold: 0.15, // More sensitive threshold
    rootMargin: '-65px 0px -65px 0px' // Adjusted margin for better accuracy
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Get the ID of the current section
      const id = entry.target.getAttribute('id');
      if (!id) return;
      
      // Find all corresponding navigation links (for both mobile and desktop)
      const navLinks = document.querySelectorAll(`a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        console.log(`Section #${id} is now visible`);
        // Add active class to currently visible section's nav links
        navLinks.forEach(link => {
          link.classList.add('active');
          console.log(`Activated nav link for #${id}`);
        });
        
        // Update URL hash without scrolling
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(null, '', url.toString());
      } else {
        // Remove active class from non-visible sections
        navLinks.forEach(link => link.classList.remove('active'));
      }
    });
  }, options);
  
  // Check if we're at the top of the page and activate first section if so
  if (window.scrollY < 100) {
    const firstSection = document.querySelector('.resume-section');
    if (firstSection) {
      const firstId = firstSection.getAttribute('id');
      if (firstId) {
        const firstNavLinks = document.querySelectorAll(`a[href="#${firstId}"]`);
        firstNavLinks.forEach(link => {
          link.classList.add('active');
          console.log(`Initially activated nav link for #${firstId}`);
        });
      }
    }
  }
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
    console.log(`Observing section: #${section.getAttribute('id')}`);
  });

  // Return cleanup function
  return () => {
    sections.forEach(section => {
      observer.unobserve(section);
    });
    console.log('Cleaned up scroll spy observers');
  };
};

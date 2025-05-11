
/**
 * Mark all images that should be lazy loaded
 * This should be called before setupLazyLoading
 */
export const prepareLazyImages = (): void => {
  // Add loading="lazy" to all images that are likely to be below the fold
  const images = document.querySelectorAll('img:not([loading])');
  
  // Determine if we're on mobile for more aggressive lazy loading
  const isMobile = window.innerWidth < 768;
  const mobileFoldThreshold = isMobile ? 0.5 * window.innerHeight : window.innerHeight;
  
  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    
    // More aggressive lazy loading on mobile - load fewer images eagerly
    const shouldLazyLoad = isMobile ? 
      (rect.top > mobileFoldThreshold || index > 0) :  // Only first image loads eagerly on mobile
      (rect.top > window.innerHeight || index > 1);    // First two images load eagerly on desktop
    
    if (shouldLazyLoad) {
      img.setAttribute('loading', 'lazy');
      
      // Add a data attribute that we can use to check if it should be lazy loaded
      img.setAttribute('data-lazy', 'true');
      
      // For images that will be lazy loaded, also set data-src with the real source
      const currentSrc = img.getAttribute('src');
      if (currentSrc && !currentSrc.includes('placeholder.svg')) {
        img.setAttribute('data-src', currentSrc);
        
        // Cast the Element to HTMLImageElement to access the style property
        const imgElement = img as HTMLImageElement;
        
        // Use ultra-small placeholder for mobile
        if (!imgElement.style.backgroundImage) {
          imgElement.setAttribute('src', '/placeholder.svg');
        }
      }
    }
  });
};

/**
 * Set up lazy loading for images using IntersectionObserver
 * @returns Cleanup function to remove observers
 */
export const setupLazyLoading = (): (() => void) => {
  // Only proceed if IntersectionObserver is available
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, lazy loading disabled');
    return () => {};
  }
  
  // Get all images marked for lazy loading
  const lazyImages = document.querySelectorAll('img[data-lazy="true"]');
  
  if (lazyImages.length === 0) {
    return () => {};
  }
  
  // Determine if we're on mobile for different root margins
  const isMobile = window.innerWidth < 768;
  const rootMargin = isMobile ? '50px' : '100px'; // Load closer to viewport on mobile
  
  // Create an observer instance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If image is in viewport
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Get the real source from data attribute
        const src = img.getAttribute('data-src');
        
        // If we have a real source, set it
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.removeAttribute('data-lazy');
          
          // Add a fade-in effect when image loads
          img.style.transition = 'opacity 0.3s ease';
          img.style.opacity = '0';
          
          img.onload = () => {
            img.style.opacity = '1';
          };
        }
        
        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: rootMargin, // Load when within rootMargin of viewport
    threshold: 0.1 // When at least 10% of the image is visible
  });
  
  // Observe all lazy images
  lazyImages.forEach(img => {
    observer.observe(img);
  });
  
  // Return cleanup function
  return () => {
    lazyImages.forEach(img => {
      observer.unobserve(img);
    });
  };
};


/**
 * Mark all images that should be lazy loaded
 * This should be called before setupLazyLoading
 */
export const prepareLazyImages = (): void => {
  // Add loading="lazy" to all images that are likely to be below the fold
  const images = document.querySelectorAll('img:not([loading])');
  
  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    
    // If image is likely below the fold (not in the first viewport) or not the first 2 images
    if (rect.top > window.innerHeight || index > 1) {
      img.setAttribute('loading', 'lazy');
      
      // Add a data attribute that we can use to check if it should be lazy loaded
      img.setAttribute('data-lazy', 'true');
      
      // Add a low-quality placeholder if not already set
      if (!img.getAttribute('src') && !img.style.backgroundImage) {
        img.setAttribute('src', '/placeholder.svg');
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
        }
        
        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px', // Load when within 100px of viewport
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

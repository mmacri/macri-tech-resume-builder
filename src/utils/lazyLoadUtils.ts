
/**
 * Sets up lazy loading for images using Intersection Observer
 * This helps defer offscreen images until they're needed
 * 
 * @returns Cleanup function to remove observer
 */
export const setupLazyLoading = (): (() => void) => {
  // Only run on client
  if (typeof window === 'undefined') {
    return () => {};
  }

  // Skip if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) {
    console.warn('Lazy loading not supported in this browser');
    return () => {};
  }

  const options = {
    rootMargin: '100px 0px', // Start loading when image is 100px from viewport
    threshold: 0.01 // Trigger when at least 1% of the image is visible
  };
  
  const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // If the image has a data-src attribute, load the image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        
        // Stop observing once loaded
        observer.unobserve(img);
      }
    });
  };
  
  // Create observer
  const observer = new IntersectionObserver(handleIntersection, options);
  
  // Select all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
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

/**
 * Add data-src attributes to images for lazy loading
 * Use this on component mount to prepare images for lazy loading
 */
export const prepareLazyImages = (): void => {
  // Only run on client
  if (typeof window === 'undefined') {
    return;
  }

  // Select all images that don't have data-src and aren't already loaded
  const images = document.querySelectorAll('img:not([data-src]):not(.loaded)');
  
  images.forEach(img => {
    const imgElement = img as HTMLImageElement;
    // Skip if image is already in viewport
    const rect = imgElement.getBoundingClientRect();
    const isInViewport = (
      rect.top >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
    
    if (!isInViewport && imgElement.src) {
      // Store the original src in data-src and remove src to prevent loading
      imgElement.dataset.src = imgElement.src;
      imgElement.removeAttribute('src');
    }
  });
};

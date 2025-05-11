
// This file is loaded by modern browsers that support ES modules
// It will import the main application but skip polyfills
import './main.tsx';

// Flag for conditional polyfill loading
window.__USES_MODERN_JS__ = true;

// Add performance marker
if (window.performance && window.performance.mark) {
  window.performance.mark('modern-entry-loaded');
}

// Initialize optimizations for mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  // Disable animations on mobile for better performance
  document.documentElement.classList.add('reduce-motion');
  
  // Only preload critical resources on mobile
  document.addEventListener('DOMContentLoaded', () => {
    // Preload only links the user hovers over on mobile
    const mobilePreloadStrategy = () => {
      // Preload internal pages when tapping links
      const internalLinks = document.querySelectorAll('a[href^="/"]:not([href$=".jpg"]):not([href$=".png"]):not([href$=".pdf"])');
      
      internalLinks.forEach(link => {
        link.addEventListener('touchstart', () => {
          const href = link.getAttribute('href');
          if (href && !link.hasAttribute('data-preloaded')) {
            setTimeout(() => {
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'prefetch';
              preloadLink.href = href;
              document.head.appendChild(preloadLink);
              link.setAttribute('data-preloaded', 'true');
            }, 100); // Small delay to ensure it doesn't affect touch responsiveness
          }
        }, { passive: true });
      });
    };
    
    mobilePreloadStrategy();
  });
} else {
  // Desktop preloading strategy - more aggressive
  document.addEventListener('DOMContentLoaded', () => {
    // Preload internal pages when hovering over links
    const internalLinks = document.querySelectorAll('a[href^="/"]:not([href$=".jpg"]):not([href$=".png"]):not([href$=".pdf"])');
    
    internalLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !link.hasAttribute('data-preloaded')) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'prefetch';
          preloadLink.href = href;
          document.head.appendChild(preloadLink);
          link.setAttribute('data-preloaded', 'true');
        }
      });
    });
  });
}

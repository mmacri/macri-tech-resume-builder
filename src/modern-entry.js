
// This file is loaded by modern browsers that support ES modules
// It will import the main application but skip polyfills
import './main.tsx';

// Flag for conditional polyfill loading
window.__USES_MODERN_JS__ = true;

// Add performance marker
if (window.performance && window.performance.mark) {
  window.performance.mark('modern-entry-loaded');
}

// Initialize cache preload for internal links
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

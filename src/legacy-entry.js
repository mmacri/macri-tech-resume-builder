
// This file is loaded by legacy browsers that don't support ES modules
// It will load polyfills before importing the main application
// Polyfills are only loaded for legacy browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Add performance marker
if (window.performance && window.performance.mark) {
  window.performance.mark('legacy-entry-loaded');
}

// Check if running on mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  // Disable animations on mobile for better performance
  document.documentElement.classList.add('reduce-motion');
  console.log('Mobile device detected, optimizing performance');
}

// Import main application
import './main.tsx';

console.log('Legacy browser detected, loading polyfills');

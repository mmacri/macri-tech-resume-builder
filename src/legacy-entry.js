
// This file is loaded by legacy browsers that don't support ES modules
// It will load polyfills before importing the main application
// Polyfills are only loaded for legacy browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Add performance marker
if (window.performance && window.performance.mark) {
  window.performance.mark('legacy-entry-loaded');
}

// Import main application
import './main.tsx';

console.log('Legacy browser detected, loading polyfills');


// Helper function to handle smooth scrolling for anchor links
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Helper function to activate tooltip functionality
export const initTooltips = (): void => {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.getAttribute('data-tooltip') || '';
    element.appendChild(tooltip);
  });
};

// Helper to handle the active state of navigation links
export const setActiveNavLink = (): void => {
  const sections = document.querySelectorAll('.resume-section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href')?.substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  });
};

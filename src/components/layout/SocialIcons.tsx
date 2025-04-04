
import React from 'react';

export const SocialIcons: React.FC = () => {
  return (
    <div className="social-icons flex justify-center space-x-4">
      <a 
        className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" 
        href="https://linkedin.com/in/mikemacri" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a 
        className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" 
        href="https://github.com/mmacri/my-portfolio" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <i className="fab fa-github"></i>
      </a>
    </div>
  );
};

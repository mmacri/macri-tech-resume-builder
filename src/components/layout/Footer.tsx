import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Experience', href: '/experience' },
    { label: 'Work', href: '/selected-work' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="font-saira font-bold text-xl mb-4 text-macri-primary">
              Michael Macri, MBA
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Technology and Customer Success Engineering leader at GitLab. Mike builds technical teams and the operating systems behind them — so organizations can see where technical expertise actually changes the outcome.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/mikemacri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-macri-primary hover:bg-macri-primary-dark rounded-full transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center w-10 h-10 bg-macri-primary hover:bg-macri-primary-dark rounded-full transition-colors"
                aria-label="Contact Mike Macri"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-macri-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Professional</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/mikemacri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-macri-primary transition-colors flex items-center"
                >
                  LinkedIn Profile
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Role Anchoring Statement */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-gray-300 text-center mb-4 italic">
            Customer Success Engineering leadership · Technical teams · DevSecOps and AI adoption
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400">
            © {currentYear} Mike Macri. All rights reserved. 
            Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

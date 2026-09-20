import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Work', href: '/selected-work' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Resume', href: '/resume' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link 
            to="/" 
            className="font-saira font-bold text-xl text-macri-primary hover:text-macri-primary-dark transition-colors"
          >
            Mike Macri
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-macri-primary ${
                  isActive(item.href)
                    ? 'text-macri-primary bg-macri-primary/10'
                    : 'text-gray-700 hover:text-macri-primary hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Social Links */}
            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-300">
              <a
                href="https://www.linkedin.com/in/mikemacri"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-macri-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <Button size="sm" className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden min-h-11 min-w-11"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-primary-navigation"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-primary-navigation" className="lg:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-3 rounded-md font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-macri-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/about" className="px-4 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-100">About</Link>
              <Link to="/contact" className="mx-4 mt-2 rounded-md bg-macri-primary px-4 py-3 text-center font-semibold text-white">Contact</Link>
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center pt-4 mt-4 border-t border-border">
                <a
                  href="https://www.linkedin.com/in/mikemacri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-macri-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

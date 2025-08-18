import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { scrollToElement } from '@/utils/scrollUtils';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  isRoute?: boolean;
}

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFloatingNavVisible, setIsFloatingNavVisible] = useState(false);
  const location = useLocation();

  // Monitor scroll position to hide hamburger when floating nav is visible
  useEffect(() => {
    const handleScroll = () => {
      setIsFloatingNavVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get menu items based on current route
  const getMenuItems = (): MenuItem[] => {
    const currentPath = location.pathname;
    
    if (currentPath === '/') {
      return [
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'interests', label: 'Interests' },
        { id: 'awards', label: 'Awards' },
        { id: 'portfolio', label: 'Portfolio', href: '/portfolio', isRoute: true },
        { id: 'contact', label: 'Contact' },
      ];
    } else if (currentPath === '/portfolio') {
      return [
        { id: 'index-of-projects', label: 'Overview' },
        { id: '1', label: 'Policy Hub' },
        { id: '2', label: 'Framework Fusion' },
        { id: '3', label: 'ServiceNow Advisor' },
        { id: '4', label: 'Customer Success' },
        { id: '5', label: 'Partner Enablement' },
        { id: '6', label: 'Security Framework' },
      ];
    } else if (currentPath === '/resume') {
      return [
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'interests', label: 'Interests' },
        { id: 'awards', label: 'Awards' },
        { id: 'portfolio', label: 'Portfolio', href: '/portfolio', isRoute: true },
      ];
    } else {
      return [
        { id: 'home', label: 'Home', href: '/', isRoute: true },
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleMenuClick = (item: MenuItem) => {
    if (item.isRoute && item.href) {
      window.location.href = item.href;
    } else {
      scrollToElement(item.id, 80);
    }
    setIsOpen(false);
  };

  // Hide hamburger menu when floating nav is visible
  if (isFloatingNavVisible) return null;

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          className="bg-white/95 backdrop-blur-sm hover:bg-white text-macri-primary border border-gray-200 shadow-lg rounded-full w-12 h-12 p-0"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-20 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 min-w-48 overflow-hidden">
            <div className="p-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleMenuClick(item)}
                  className="w-full justify-start text-left hover:bg-macri-primary/10 hover:text-macri-primary mb-1 last:mb-0"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
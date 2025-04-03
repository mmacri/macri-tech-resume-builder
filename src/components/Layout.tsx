
import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToElement } from '../utils/scrollUtils';
import { Menu, X } from 'lucide-react';
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
  navItems: { label: string; href: string; external?: boolean }[];
  profileImage: string;
  name: string;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isNavOpen && !target.closest('#sideNav') && !target.closest('.navbar-toggler')) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  // Handle navigation link clicks
  const handleNavLinkClick = (href: string) => {
    // Close mobile nav
    if (window.innerWidth < 992) {
      setIsNavOpen(false);
    }

    // Handle anchor links (section navigation)
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      // If we're already on the page with the anchor, scroll to it
      if (document.getElementById(targetId)) {
        scrollToElement(targetId);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Navigation */}
      <nav 
        id="sideNav"
        className={`bg-macri-primary text-white lg:fixed lg:w-64 lg:h-screen z-10 transition-all duration-300 ${isNavOpen ? 'h-screen' : 'h-16 lg:h-screen'}`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Brand/Logo Section */}
          <div className="flex items-center mb-8 lg:mb-12 justify-between">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => handleNavLinkClick('/')}
            >
              <span className="text-xl font-bold lg:hidden">{name}</span>
            </Link>
            <button 
              className="lg:hidden p-2 focus:outline-none"
              onClick={toggleNav}
              aria-label="Toggle navigation"
            >
              {isNavOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Profile Image (visible only on large screens or when menu is open) */}
          <div className={`${isNavOpen ? 'flex' : 'hidden'} lg:flex justify-center mb-6`}>
            <img 
              src={profileImage} 
              alt={`${name} Profile`} 
              className="img-profile rounded-full border-4 border-gray-200 w-40 h-40 object-cover"
            />
          </div>
          
          {/* Navigation Links */}
          <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block`}>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  {item.external ? (
                    <a 
                      href={item.href} 
                      className="nav-link block py-2 hover:opacity-80 transition-opacity"
                      onClick={() => handleNavLinkClick(item.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.href.startsWith('#') ? (
                      // Handle anchor links within the same page
                      <a 
                        href={item.href} 
                        className="nav-link block py-2 hover:opacity-80 transition-opacity"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavLinkClick(item.href);
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      // Handle links to other pages
                      <Link 
                        to={item.href} 
                        className={`nav-link block py-2 hover:opacity-80 transition-opacity ${location.pathname === item.href ? 'font-bold' : ''}`}
                        onClick={() => handleNavLinkClick(item.href)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Icons (visible only on large screens and at bottom or when menu is open) */}
          <div className={`mt-auto ${isNavOpen ? 'block' : 'hidden'} lg:block pt-6`}>
            <div className="social-icons flex justify-center space-x-4">
              <a className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" href="https://linkedin.com/in/mikemacri" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" href="https://github.com/mmacri/my-portfolio" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="container-fluid p-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

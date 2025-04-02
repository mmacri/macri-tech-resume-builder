
import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  navItems: { label: string; href: string; external?: boolean }[];
  profileImage: string;
  name: string;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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

  // Close mobile nav when a link is clicked
  const handleNavLinkClick = () => {
    if (window.innerWidth < 992) {
      setIsNavOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Navigation */}
      <nav 
        id="sideNav"
        className="bg-macri-primary text-white lg:fixed lg:w-64 lg:h-screen z-10"
      >
        <div className="p-4 flex flex-col h-full">
          {/* Brand/Logo Section */}
          <Link 
            to="/" 
            className="flex items-center mb-8 lg:mb-12 justify-between"
            onClick={handleNavLinkClick}
          >
            <span className="text-xl font-bold lg:hidden">{name}</span>
            <button 
              className="lg:hidden p-2 focus:outline-none"
              onClick={toggleNav}
              aria-label="Toggle navigation"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </Link>
          
          {/* Profile Image (visible only on large screens) */}
          <div className="hidden lg:flex justify-center mb-6">
            <img 
              src={profileImage} 
              alt={`${name} Profile`} 
              className="img-profile rounded-full border-4 border-gray-200 w-40 h-40 object-cover"
            />
          </div>
          
          {/* Navigation Links */}
          <div className={`lg:block ${isNavOpen ? 'block' : 'hidden'}`}>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  {item.external ? (
                    <a 
                      href={item.href} 
                      className="nav-link"
                      onClick={handleNavLinkClick}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      to={item.href} 
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Icons (visible only on large screens and at bottom) */}
          <div className="mt-auto hidden lg:block pt-6">
            <div className="social-icons justify-center">
              <a className="social-icon" href="https://linkedin.com/in/mikemacri" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="social-icon" href="https://github.com/mmacri/my-portfolio" target="_blank" rel="noopener noreferrer">
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

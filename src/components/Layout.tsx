
import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToElement } from '../utils/scrollUtils';
import { Sidebar } from './layout/Sidebar';
import { UniversalFloatingNav } from './ui/UniversalFloatingNav';

interface LayoutProps {
  children: ReactNode;
  navItems: { label: string; href?: string; external?: boolean }[];
  profileImage: string;
  name: string;
  highlightResume?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name, highlightResume }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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

  const handleNavLinkClick = (href: string) => {
    console.log('Layout handling nav click:', href);
    
    // Close the mobile nav if open
    if (window.innerWidth < 992) {
      setIsNavOpen(false);
    }

    // Handle anchor links with smooth scrolling
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      console.log('Scrolling to element with id:', targetId);
      
      // Small delay to allow mobile nav to close
      setTimeout(() => {
        scrollToElement(targetId, 80); // Increased offset for better positioning
      }, 100);
    } else if (href.startsWith('/')) {
      // Navigate to other pages
      navigate(href);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar 
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        handleNavLinkClick={handleNavLinkClick}
        navItems={navItems}
        profileImage={profileImage}
        name={name}
      />

      <main className="flex-1 lg:ml-64">
        <div className="container-fluid p-0">
          {children}
        </div>
        <UniversalFloatingNav />
      </main>
    </div>
  );
};

export default Layout;

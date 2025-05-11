
import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToElement } from '../utils/scrollUtils';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './layout/Sidebar';

interface LayoutProps {
  children: ReactNode;
  navItems: { label: string; href?: string; external?: boolean; onClick?: () => Promise<void> }[];
  profileImage: string;
  name: string;
  highlightResume?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name, highlightResume }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    // Log auth state for debugging
    console.log('Layout rendered - Current user:', user?.email);
    console.log('Layout rendered - Is admin:', isAdmin);
  }, [user, isAdmin]);

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

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Create a complete copy of navItems to avoid modifying the original array
  const updatedNavItems = [...navItems];
  
  // Special handling for Admin Dashboard
  if (isAdmin && user) {
    // Check if Admin Dashboard is already in the nav items
    const adminIndex = updatedNavItems.findIndex(item => item.label === "Admin Dashboard");
    
    // If not found, add it after the first item (typically "About")
    if (adminIndex === -1) {
      updatedNavItems.splice(1, 0, {
        label: "Admin Dashboard",
        href: "/admin-dashboard"
      });
    }
  }

  // Add login/logout link if not already present
  const loginLogoutIndex = updatedNavItems.findIndex(
    item => item.label === "Login" || item.label === "Logout"
  );
  
  if (loginLogoutIndex === -1) {
    if (user) {
      updatedNavItems.push({
        label: "Logout",
        onClick: signOut,
        href: "#"
      });
    } else {
      updatedNavItems.push({
        label: "Login",
        href: "/auth"
      });
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar 
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        handleNavLinkClick={handleNavLinkClick}
        navItems={updatedNavItems}
        profileImage={profileImage}
        name={name}
      />

      <main className="flex-1 lg:ml-64">
        <div className="container-fluid p-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

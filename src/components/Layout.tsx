
import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToElement } from '../utils/scrollUtils';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './layout/Sidebar';

interface LayoutProps {
  children: ReactNode;
  navItems: { label: string; href?: string; external?: boolean; onClick?: () => Promise<void> }[];
  profileImage: string;
  name: string;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

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
    if (window.innerWidth < 992) {
      setIsNavOpen(false);
    }

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      if (document.getElementById(targetId)) {
        scrollToElement(targetId);
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const filteredNavItems = navItems.filter(item => {
    if (user && item.href === '/auth') {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar 
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        handleNavLinkClick={handleNavLinkClick}
        navItems={filteredNavItems}
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

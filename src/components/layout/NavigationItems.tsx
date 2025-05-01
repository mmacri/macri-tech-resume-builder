
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToElement } from '@/utils/scrollUtils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface NavigationItemProps {
  item: {
    label: string;
    href?: string;
    external?: boolean;
    onClick?: () => Promise<void>;
  };
  handleNavLinkClick: (href: string) => void;
  isActive?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ 
  item, 
  handleNavLinkClick, 
  isActive 
}) => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Special handling for Admin Dashboard link
  if (item.label === "Admin Dashboard") {
    const handleAdminDashboardClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (!user) {
        // If not logged in, redirect to auth with return URL
        navigate("/auth?redirectTo=/admin-dashboard");
        toast.info("Please login to access the admin dashboard");
      } else if (!isAdmin) {
        // If logged in but not admin, show message and stay on current page
        toast.error("Only administrators can access this area");
      } else {
        // If logged in and admin, go directly to admin dashboard
        navigate("/admin-dashboard");
      }
      handleNavLinkClick(item.href || '');
    };

    return (
      <li className="nav-item">
        <a 
          href="#"
          className={`nav-link block py-1.5 hover:opacity-80 transition-opacity ${isActive ? 'font-bold' : ''}`}
          onClick={handleAdminDashboardClick}
        >
          {item.label}
        </a>
      </li>
    );
  }
  
  // Special handling for Login link
  if (item.label === "Login") {
    return (
      <li className="nav-item">
        <Link 
          to="/auth" 
          className={`nav-link block py-1.5 hover:opacity-80 transition-opacity ${isActive ? 'font-bold' : ''}`}
          onClick={() => handleNavLinkClick('/auth')}
        >
          Login
        </Link>
      </li>
    );
  }
  
  // Special handling for Logout link
  if (item.label === "Logout" && item.onClick) {
    return (
      <li className="nav-item">
        <a 
          href="#"
          className="nav-link block py-1.5 hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            if (item.onClick) item.onClick();
          }}
        >
          Logout
        </a>
      </li>
    );
  }

  if (item.external) {
    return (
      <li className="nav-item">
        <a 
          href={item.href} 
          className="nav-link block py-1.5 hover:opacity-80 transition-opacity"
          onClick={() => handleNavLinkClick(item.href || '')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </a>
      </li>
    );
  }
  
  if (item.onClick) {
    return (
      <li className="nav-item">
        <a 
          href="#"
          className="nav-link block py-1.5 hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            if (item.onClick) item.onClick();
          }}
        >
          {item.label}
        </a>
      </li>
    );
  }
  
  if (item.href?.startsWith('#')) {
    return (
      <li className="nav-item">
        <a 
          href={item.href} 
          className="nav-link block py-1.5 hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick(item.href || '');
          }}
        >
          {item.label}
        </a>
      </li>
    );
  }
  
  return (
    <li className="nav-item">
      <Link 
        to={item.href || '/'} 
        className={`nav-link block py-1.5 hover:opacity-80 transition-opacity ${isActive ? 'font-bold' : ''}`}
        onClick={() => handleNavLinkClick(item.href || '')}
      >
        {item.label}
      </Link>
    </li>
  );
};

interface NavigationItemsProps {
  navItems: {
    label: string;
    href?: string;
    external?: boolean;
    onClick?: () => Promise<void>;
  }[];
  handleNavLinkClick: (href: string) => void;
  currentPath: string;
}

export const NavigationItems: React.FC<NavigationItemsProps> = ({ 
  navItems, 
  handleNavLinkClick, 
  currentPath 
}) => {
  const { user } = useAuth();
  
  // Group navigation items by category
  const mainNavItems = navItems.filter(item => 
    !['Login', 'Logout', 'Admin Dashboard'].includes(item.label));
  const adminItems = navItems.filter(item => 
    item.label === 'Admin Dashboard');
  const authItems = navItems.filter(item => 
    ['Login', 'Logout'].includes(item.label));
  
  // Debug the current navigation items
  console.log("Navigation Items:", navItems);
  console.log("User logged in:", !!user);
  
  return (
    <div className="flex flex-col justify-between h-full py-2">
      {/* Main navigation links */}
      <div className="space-y-0.5">
        <ul>
          {mainNavItems.map((item, index) => (
            <NavigationItem 
              key={index} 
              item={item} 
              handleNavLinkClick={handleNavLinkClick} 
              isActive={currentPath === item.href}
            />
          ))}
        </ul>
      </div>
      
      {/* Admin and auth links at the bottom */}
      <div className="mt-auto space-y-1 pt-2 border-t border-white/20">
        <ul>
          {adminItems.map((item, index) => (
            <NavigationItem 
              key={index} 
              item={item} 
              handleNavLinkClick={handleNavLinkClick} 
              isActive={currentPath === item.href}
            />
          ))}
          {authItems.map((item, index) => (
            <NavigationItem 
              key={index} 
              item={item} 
              handleNavLinkClick={handleNavLinkClick} 
              isActive={currentPath === item.href}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

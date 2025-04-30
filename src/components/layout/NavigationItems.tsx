
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
          className={`nav-link block py-2 hover:opacity-80 transition-opacity ${isActive ? 'font-bold' : ''}`}
          onClick={handleAdminDashboardClick}
        >
          {item.label}
        </a>
      </li>
    );
  }
  
  // Special handling for Login/Logout links
  if (item.label === "Login") {
    return (
      <li className="nav-item">
        <Link 
          to="/auth" 
          className={`nav-link block py-2 hover:opacity-80 transition-opacity ${isActive ? 'font-bold' : ''}`}
          onClick={() => handleNavLinkClick('/auth')}
        >
          Login
        </Link>
      </li>
    );
  }
  
  if (item.label === "Logout" && item.onClick) {
    return (
      <li className="nav-item">
        <a 
          href="#"
          className="nav-link block py-2 hover:opacity-80 transition-opacity"
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
          className="nav-link block py-2 hover:opacity-80 transition-opacity"
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
          className="nav-link block py-2 hover:opacity-80 transition-opacity"
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
          className="nav-link block py-2 hover:opacity-80 transition-opacity"
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
        className={`nav-link block py-2 hover:opacity-80 transition-opacity ${isActive ? 'font-bold' : ''}`}
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
  
  // Debug the current navigation items
  console.log("Navigation Items:", navItems);
  console.log("User logged in:", !!user);
  
  return (
    <ul className="space-y-2">
      {/* Always shown navigation items */}
      {navItems.filter(item => item.label !== "Login" && item.label !== "Logout").map((item, index) => (
        <NavigationItem 
          key={index} 
          item={item} 
          handleNavLinkClick={handleNavLinkClick} 
          isActive={currentPath === item.href}
        />
      ))}
      
      {/* Login/Logout based on authentication status */}
      {user ? (
        // Show logout if user is logged in
        navItems.find(item => item.label === "Logout") && (
          <NavigationItem 
            item={navItems.find(item => item.label === "Logout")!} 
            handleNavLinkClick={handleNavLinkClick} 
            isActive={false}
          />
        )
      ) : (
        // Show login if user is not logged in
        <NavigationItem 
          item={{ label: "Login", href: "/auth" }} 
          handleNavLinkClick={handleNavLinkClick} 
          isActive={currentPath === "/auth"}
        />
      )}
    </ul>
  );
};

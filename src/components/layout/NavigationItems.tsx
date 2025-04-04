
import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToElement } from '@/utils/scrollUtils';

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
  return (
    <ul className="space-y-2">
      {navItems.map((item, index) => (
        <NavigationItem 
          key={index} 
          item={item} 
          handleNavLinkClick={handleNavLinkClick} 
          isActive={currentPath === item.href}
        />
      ))}
    </ul>
  );
};

import React from 'react';

interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
}

interface NavigationItemsProps {
  navItems: NavItem[];
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
        <li key={index}>
          <button
            onClick={() => item.href && handleNavLinkClick(item.href)}
            className="w-full text-left px-3 py-2 rounded hover:bg-white/20 transition-colors"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
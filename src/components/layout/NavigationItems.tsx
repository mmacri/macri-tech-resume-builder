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
  const isActive = (href: string | undefined) => {
    if (!href) return false;
    if (href.startsWith('#')) return false; // Hash links are handled by scroll position
    return currentPath === href;
  };

  return (
    <ul className="space-y-2">
      {navItems.map((item, index) => {
        const active = isActive(item.href);
        return (
          <li key={index}>
            <button
              onClick={() => item.href && handleNavLinkClick(item.href)}
              className={`w-full text-left px-3 py-2 rounded transition-colors font-medium ${
                active 
                  ? 'bg-white/30 text-white shadow-sm' 
                  : 'hover:bg-white/20 text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

import React from 'react';
import NavigationItem from './NavigationItem';
import { useNavigationActiveState } from './useNavigationActiveState';

interface NavigationGroupProps {
  items: {
    label: string;
    href?: string;
    external?: boolean;
    onClick?: () => Promise<void>;
  }[];
  handleNavLinkClick: (href: string) => void;
  title?: string;
  className?: string;
}

const NavigationGroup: React.FC<NavigationGroupProps> = ({
  items,
  handleNavLinkClick,
  title,
  className = ""
}) => {
  const { isItemActive } = useNavigationActiveState();
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className={`space-y-1 ${className}`}>
      {title && <h3 className="text-xs uppercase text-white/50 font-semibold px-2 mb-2">{title}</h3>}
      <ul>
        {items.map((item, index) => (
          <NavigationItem 
            key={index} 
            item={item} 
            handleNavLinkClick={handleNavLinkClick} 
            isActive={isItemActive(item)}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavigationGroup;

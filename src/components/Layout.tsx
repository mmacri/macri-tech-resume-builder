
import React, { useState, useEffect } from 'react';
import { 
  Sidebar, 
  SidebarProvider 
} from './ui/sidebar';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminButtons from './AdminButtons';

interface LayoutProps {
  children: React.ReactNode;
  navItems: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  profileImage?: string;
  name?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  
  // This helps to hide the sidebar when clicking on an anchor link
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Filter out Admin Panel link if user is not admin
  const filteredNavItems = navItems.filter(item => {
    if (item.href === '/admin' && !isAdmin) {
      return false;
    }
    return true;
  });

  return (
    <SidebarProvider defaultOpen={!mobile}>
      <div className="min-h-screen flex flex-col w-full">
        {mobile && (
          <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-2 backdrop-blur-sm bg-background/80 border-b">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            {profileImage && name && (
              <div className="flex items-center gap-2">
                <img src={profileImage} alt={name} className="h-8 w-8 rounded-full object-cover" />
                <span className="font-semibold">{name}</span>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-1">
          <Sidebar
            items={filteredNavItems}
            avatar={profileImage}
            name={name}
            className={mobile ? "fixed top-[49px] z-30 h-[calc(100vh-49px)]" : "sticky top-0 h-screen"}
          />
          <div className="flex-1">
            <div className="container mx-auto p-4 md:p-8">
              {user && isAdmin && <AdminButtons />}
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

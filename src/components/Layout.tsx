
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { UniversalFloatingNav } from './ui/UniversalFloatingNav';

interface LayoutProps {
  children: ReactNode;
  navItems: { label: string; href?: string; external?: boolean }[];
  profileImage: string;
  name: string;
  highlightResume?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name, highlightResume }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          navItems={navItems}
          profileImage={profileImage}
          name={name}
        />
        
        <main className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <header className="h-14 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <div className="flex-1" />
          </header>
          
          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
          
          <UniversalFloatingNav />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

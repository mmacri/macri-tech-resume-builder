
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePenLine, FolderKanban, Users, FileText } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const hash = location.hash.replace('#', '');

  // Admin navigation items
  const adminNavItems = [
    {
      title: "Dashboard",
      value: "dashboard",
      icon: LayoutDashboard,
      isActive: path === "/admin-dashboard",
      route: "/admin-dashboard"
    },
    {
      title: "Blog Posts",
      value: "blog",
      icon: FilePenLine,
      isActive: path === "/admin" && hash === "blog",
      route: "/admin#blog"
    },
    {
      title: "Portfolio Projects",
      value: "portfolio",
      icon: FolderKanban,
      isActive: path === "/admin" && hash === "portfolio",
      route: "/admin#portfolio"
    },
    {
      title: "Resume Management",
      value: "resume",
      icon: FileText,
      isActive: path === "/admin" && hash === "resume",
      route: "/admin#resume"
    },
    {
      title: "User Management",
      value: "users",
      icon: Users,
      isActive: path === "/admin" && hash === "users",
      route: "/admin#users"
    }
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.route)}
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;

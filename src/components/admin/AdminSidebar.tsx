
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePenLine, FolderKanban, Users } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
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

  // Admin navigation items
  const adminNavItems = [
    {
      title: "Dashboard",
      value: "dashboard",
      icon: LayoutDashboard,
      isActive: path === "/admin",
    },
    {
      title: "Blog Posts",
      value: "blog",
      icon: FilePenLine,
      isActive: path === "/admin" && location.hash === "#blog",
    },
    {
      title: "Portfolio Projects",
      value: "portfolio",
      icon: FolderKanban,
      isActive: path === "/admin" && location.hash === "#portfolio",
    },
    {
      title: "User Management",
      value: "users",
      icon: Users,
      isActive: path === "/admin" && location.hash === "#users",
    }
  ];

  const handleNavClick = (value: string) => {
    if (value === "dashboard") {
      navigate("/admin");
    } else {
      navigate(`/admin#${value}`);
    }
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
                    onClick={() => handleNavClick(item.value)}
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

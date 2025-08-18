import { useState } from "react"
import { Home, User, Briefcase, GraduationCap, Code, Heart, Award, Folder, FileText, Mail, ChevronRight } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { ProfileSection } from "./layout/ProfileSection"
import { SocialIcons } from "./layout/SocialIcons"

interface AppSidebarProps {
  navItems: { label: string; href?: string; external?: boolean }[]
  profileImage: string
  name: string
}

export function AppSidebar({ navItems, profileImage, name }: AppSidebarProps) {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (href: string | undefined) => {
    if (!href) return false
    if (href.startsWith('#')) return false // Hash links handled by scroll position
    return currentPath === href
  }

  const getNavCls = (isActive: boolean) =>
    isActive ? "bg-white/30 text-white font-medium" : "text-white/90 hover:text-white hover:bg-white/20"

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Handle anchor links with smooth scrolling
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Update URL hash
        window.history.replaceState(null, '', href)
      }
    }
    // React Router will handle route navigation automatically through NavLink
  }

  // Separate navigation items into sections and routes
  const sectionItems = navItems.filter(item => item.href?.startsWith('#'))
  const routeItems = navItems.filter(item => item.href && !item.href.startsWith('#'))

  return (
    <Sidebar
      className={`bg-macri-primary border-r-0 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        {!collapsed && (
          <ProfileSection 
            profileImage={profileImage}
            name={name}
          />
        )}
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Page Navigation */}
        {routeItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-white/70 text-xs uppercase tracking-wider">
              {!collapsed && "Pages"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routeItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.href!} 
                        className={getNavCls(isActive(item.href))}
                        title={collapsed ? item.label : undefined}
                      >
                        {item.label === 'Portfolio' && <Folder className="h-4 w-4" />}
                        {item.label === 'Blog' && <FileText className="h-4 w-4" />}
                        {item.label === 'Resume' && <User className="h-4 w-4" />}
                        {item.label === 'Contact' && <Mail className="h-4 w-4" />}
                        {item.label === 'Home' && <Home className="h-4 w-4" />}
                        {!collapsed && <span className="ml-2">{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Section Navigation */}
        {sectionItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-white/70 text-xs uppercase tracking-wider">
              {!collapsed && "Sections"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sectionItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      onClick={() => item.href && handleNavClick(item.href)}
                      className="text-white/90 hover:text-white hover:bg-white/20 cursor-pointer"
                      title={collapsed ? item.label : undefined}
                    >
                      {item.label === 'About' && <User className="h-4 w-4" />}
                      {item.label === 'Experience' && <Briefcase className="h-4 w-4" />}
                      {item.label === 'Education' && <GraduationCap className="h-4 w-4" />}
                      {(item.label === 'Skills' || item.label === 'Skills & Methods') && <Code className="h-4 w-4" />}
                      {item.label === 'Interests' && <Heart className="h-4 w-4" />}
                      {(item.label === 'Awards' || item.label === 'Awards & Certs') && <Award className="h-4 w-4" />}
                      {item.label.includes('Projects') && <Folder className="h-4 w-4" />}
                      {!collapsed && <span className="ml-2">{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && <SocialIcons />}
      </SidebarFooter>
    </Sidebar>
  )
}
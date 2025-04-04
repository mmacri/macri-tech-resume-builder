
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import AdminPortfolioProjects from '@/components/admin/AdminPortfolioProjects';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminLayout from '@/components/admin/AdminLayout';

const Admin = () => {
  const location = useLocation();
  const hash = location.hash.replace('#', '') || 'blog';

  // Update the URL hash when tab changes
  const handleTabChange = (value: string) => {
    window.location.hash = value;
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs 
        defaultValue={hash} 
        className="w-full" 
        onValueChange={handleTabChange}
        value={hash}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Projects</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts Management</CardTitle>
              <CardDescription>Create, edit, or delete blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminBlogPosts />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Projects Management</CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminPortfolioProjects />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user roles and accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUsers />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;

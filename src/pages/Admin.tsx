
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import AdminPortfolioProjects from '@/components/admin/AdminPortfolioProjects';
import AdminUsers from '@/components/admin/AdminUsers';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null; // Prevent any flash of content before redirect
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="blog" className="w-full">
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
    </div>
  );
};

export default Admin;


import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Pencil, FolderKanban, Users, FileText } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Blog Management Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Pencil className="h-5 w-5 text-primary" />
                Blog Management
              </CardTitle>
              <CardDescription>
                Create, edit, and manage blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Manage all your blog content. Add new posts, update existing ones, or remove outdated content.
              </p>
              <Link to="/admin#blog">
                <Button className="w-full">Manage Blog Posts</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Portfolio Projects Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-primary" />
                Portfolio Projects
              </CardTitle>
              <CardDescription>
                Showcase your work and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Update your portfolio with your latest projects, case studies, and professional accomplishments.
              </p>
              <Link to="/admin#portfolio">
                <Button className="w-full">Manage Projects</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Resume Management Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Resume Management
              </CardTitle>
              <CardDescription>
                Edit experience and other resume sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Update your resume sections including experience, education, skills, and more.
              </p>
              <Link to="/admin#resume">
                <Button className="w-full">Manage Resume</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* User Management Card */}
        <Card className="hover:shadow-md transition-shadow mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Control who has access to your site. Add new administrators or manage existing user accounts.
            </p>
            <Link to="/admin#users">
              <Button className="w-full">Manage Users</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
            <CardDescription>Making the most of your admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the <strong>Blog Management</strong> section to keep your content fresh and engaging.</li>
              <li>Update your <strong>Portfolio Projects</strong> regularly to showcase your latest work.</li>
              <li>Keep your <strong>Resume</strong> sections updated with your latest experience and achievements.</li>
              <li>Monitor <strong>User Management</strong> to control who has administrative access to your site.</li>
              <li>Remember to log out when you're finished making changes, especially on shared devices.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

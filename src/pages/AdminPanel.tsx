
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import UserManagement from '@/components/admin/UserManagement';
import BlogPostManagement from '@/components/admin/BlogPostManagement';
import CommentManagement from '@/components/admin/CommentManagement';

// Define types for our data
type UserProfile = Database['public']['Tables']['profiles']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogComment = Database['public']['Tables']['blog_comments']['Row'];

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Fetch data on mount
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch blog posts');
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*, blog_posts(title)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to fetch comments');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <UserManagement 
            users={users} 
            fetchUsers={fetchUsers} 
          />
        </TabsContent>
        
        <TabsContent value="posts" className="space-y-4">
          <BlogPostManagement
            posts={posts}
            users={users}
            fetchPosts={fetchPosts}
          />
        </TabsContent>
        
        <TabsContent value="comments" className="space-y-4">
          <CommentManagement
            comments={comments}
            users={users}
            fetchComments={fetchComments}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;

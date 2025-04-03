
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { Shield, UserPlus, Key, Trash2, Edit, Mail } from 'lucide-react';

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
  const [newUser, setNewUser] = useState({ email: '', password: '', fullName: '', username: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [emailToReset, setEmailToReset] = useState('');

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

  const handleAddUser = async () => {
    setIsLoading(true);
    try {
      // First create the user in auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true
      });

      if (authError) throw authError;
      
      // Then update their profile data
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: newUser.fullName,
            username: newUser.username
          })
          .eq('id', authData.user.id);
        
        if (profileError) throw profileError;
      }
      
      toast.success('User created successfully');
      setNewUser({ email: '', password: '', fullName: '', username: '' });
      fetchUsers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(`Failed to create user: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?tab=reset`,
      });
      
      if (error) throw error;
      toast.success('Password reset email sent to user');
      setEmailToReset('');
    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast.error(`Failed to send reset email: ${error.message}`);
    }
  };

  const handleMakeAdmin = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !isCurrentlyAdmin })
        .eq('id', userId);
      
      if (error) throw error;
      toast.success(`User ${isCurrentlyAdmin ? 'removed from' : 'added to'} admin role`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating admin status:', error);
      toast.error(`Failed to update admin status: ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(`Failed to delete user: ${error.message}`);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      // First delete all comments associated with this post
      const { error: commentsError } = await supabase
        .from('blog_comments')
        .delete()
        .eq('post_id', postId);
      
      if (commentsError) throw commentsError;
      
      // Then delete the post
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      toast.success('Post and associated comments deleted successfully');
      fetchPosts();
      fetchComments();
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast.error(`Failed to delete post: ${error.message}`);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);
      
      if (error) throw error;
      toast.success('Comment deleted successfully');
      fetchComments();
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast.error(`Failed to delete comment: ${error.message}`);
    }
  };

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
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
          <Card>
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    placeholder="Full Name"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddUser} disabled={isLoading} className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isLoading ? 'Adding...' : 'Add User'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reset User Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="User Email"
                  value={emailToReset}
                  onChange={(e) => setEmailToReset(e.target.value)}
                />
                <Button 
                  onClick={() => handleResetPassword(emailToReset)} 
                  disabled={!emailToReset}
                  className="flex-shrink-0"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reset Email
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.is_admin ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleMakeAdmin(user.id, user.is_admin || false)}
                          className="flex items-center"
                        >
                          <Shield className="mr-1 h-3 w-3" />
                          {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleResetPassword(user.id)}
                          className="flex items-center"
                        >
                          <Key className="mr-1 h-3 w-3" />
                          Reset Password
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteUser(user.id)}
                          className="flex items-center"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{getUserById(post.user_id)?.username || post.user_id}</TableCell>
                      <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/blog/edit/${post.id}`)}
                          className="flex items-center"
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeletePost(post.id)}
                          className="flex items-center"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell className="max-w-[200px] truncate">{comment.content}</TableCell>
                      <TableCell>
                        {/* @ts-ignore - blog_posts is included via the join but TS doesn't know */}
                        {comment.blog_posts?.title || comment.post_id}
                      </TableCell>
                      <TableCell>{getUserById(comment.user_id || '')?.username || comment.name || 'Anonymous'}</TableCell>
                      <TableCell>{new Date(comment.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="flex items-center"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;

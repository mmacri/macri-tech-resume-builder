
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Mail, User, Key, Trash2, Check, X, RefreshCw } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  created_at: string;
  is_admin?: boolean;
  last_sign_in_at?: string;
}

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

interface BlogCommentData {
  id: string;
  post_id: string;
  user_id: string | null;
  name: string | null;
  content: string;
  created_at: string;
}

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [blogComments, setBlogComments] = useState<BlogCommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [userToReset, setUserToReset] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'user' | 'post' | 'comment' } | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error('You do not have permission to access the admin panel');
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('id, is_admin, created_at');

        if (usersError) throw usersError;

        // Fetch user emails from auth.users
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

        if (authError) throw authError;
        
        // Combine data
        const combinedUsers = usersData.map(profile => {
          const authUser = authUsers.users.find(u => u.id === profile.id);
          return {
            ...profile,
            email: authUser?.email || 'Unknown',
            last_sign_in_at: authUser?.last_sign_in_at || 'Never'
          };
        });
        
        setUsers(combinedUsers);

        // Fetch blog posts
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        setBlogPosts(postsData);

        // Fetch blog comments
        const { data: commentsData, error: commentsError } = await supabase
          .from('blog_comments')
          .select('*')
          .order('created_at', { ascending: false });

        if (commentsError) throw commentsError;
        setBlogComments(commentsData);

      } catch (error: any) {
        console.error('Error fetching admin data:', error);
        toast.error(error.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user, isAdmin]);

  const handleAddUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast.error('Email and password are required');
      return;
    }

    try {
      // Create user with Supabase auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserEmail,
        password: newUserPassword,
        email_confirm: true
      });

      if (error) throw error;

      toast.success(`User ${newUserEmail} created successfully`);
      setShowAddUserDialog(false);
      setNewUserEmail('');
      setNewUserPassword('');
      
      // Refresh user list
      const { data: usersData } = await supabase
        .from('profiles')
        .select('id, is_admin, created_at');
        
      const { data: authUsers } = await supabase.auth.admin.listUsers();
      
      const combinedUsers = usersData.map(profile => {
        const authUser = authUsers.users.find(u => u.id === profile.id);
        return {
          ...profile,
          email: authUser?.email || 'Unknown',
          last_sign_in_at: authUser?.last_sign_in_at || 'Never'
        };
      });
      
      setUsers(combinedUsers);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  const openResetPasswordDialog = (userId: string, email: string) => {
    setUserToReset(userId);
    setResetEmail(email);
    setResetPassword('');
    setShowResetPasswordDialog(true);
  };

  const handleResetPassword = async () => {
    if (!userToReset || !resetPassword) {
      toast.error('User ID and new password are required');
      return;
    }

    try {
      const { error } = await supabase.auth.admin.updateUserById(
        userToReset,
        { password: resetPassword }
      );

      if (error) throw error;

      toast.success(`Password reset for ${resetEmail}`);
      setShowResetPasswordDialog(false);
      setUserToReset(null);
      setResetEmail('');
      setResetPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    }
  };

  const confirmDelete = (id: string, type: 'user' | 'post' | 'comment') => {
    setItemToDelete({ id, type });
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      const { id, type } = itemToDelete;

      if (type === 'user') {
        // Delete user
        const { error } = await supabase.auth.admin.deleteUser(id);
        if (error) throw error;
        setUsers(users.filter(user => user.id !== id));
        toast.success('User deleted successfully');
      } else if (type === 'post') {
        // Delete blog post
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);
        if (error) throw error;
        setBlogPosts(blogPosts.filter(post => post.id !== id));
        toast.success('Blog post deleted successfully');
      } else if (type === 'comment') {
        // Delete blog comment
        const { error } = await supabase
          .from('blog_comments')
          .delete()
          .eq('id', id);
        if (error) throw error;
        setBlogComments(blogComments.filter(comment => comment.id !== id));
        toast.success('Comment deleted successfully');
      }

      setShowDeleteDialog(false);
      setItemToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete item');
    }
  };

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_admin: !currentStatus } : user
      ));

      toast.success(`User ${currentStatus ? 'removed from' : 'added to'} admin role`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update admin status');
    }
  };

  if (loading) {
    return (
      <div className="w-full px-6 py-12 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-12 md:px-12">
      <h1 className="text-4xl font-bold mb-10">Admin Panel</h1>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="blog_posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="blog_comments">Blog Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">User Management</h2>
            <Button onClick={() => setShowAddUserDialog(true)}>Add New User</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Sign In</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.last_sign_in_at && user.last_sign_in_at !== 'Never' 
                      ? new Date(user.last_sign_in_at).toLocaleDateString() 
                      : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAdminStatus(user.id, !!user.is_admin)}
                    >
                      {user.is_admin ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openResetPasswordDialog(user.id, user.email)}
                      >
                        <Key className="h-4 w-4 mr-1" />
                        Reset Password
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => confirmDelete(user.id, 'user')}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="blog_posts" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Blog Posts Management</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map(post => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {post.updated_at && post.updated_at !== post.created_at 
                      ? new Date(post.updated_at).toLocaleDateString() 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => confirmDelete(post.id, 'post')}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="blog_comments" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Blog Comments Management</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogComments.map(comment => (
                <TableRow key={comment.id}>
                  <TableCell className="max-w-md truncate">{comment.content}</TableCell>
                  <TableCell>{comment.name || 'Anonymous'}</TableCell>
                  <TableCell>{new Date(comment.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => confirmDelete(comment.id, 'comment')}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-blue-500">
                <Mail className="h-4 w-4 mx-3 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-blue-500">
                <Key className="h-4 w-4 mx-3 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Password"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label>Email</label>
              <div className="flex items-center border rounded-md bg-gray-50">
                <Mail className="h-4 w-4 mx-3 text-gray-500" />
                <Input
                  type="email"
                  value={resetEmail}
                  readOnly
                  className="border-0 bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="new-password">New Password</label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-blue-500">
                <Key className="h-4 w-4 mx-3 text-gray-500" />
                <Input
                  id="new-password"
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  placeholder="New Password"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;

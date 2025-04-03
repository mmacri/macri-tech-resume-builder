
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Pencil, Shield } from 'lucide-react';

type UserProfile = {
  id: string;
  username?: string;
  full_name?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  email?: string; // We'll join this from auth.users
};

const AdminUsers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserProfile> | null>(null);
  const queryClient = useQueryClient();

  // Fetch users with profiles
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Fetch emails for profiles
      const usersWithEmails = await Promise.all(
        profiles.map(async (profile) => {
          try {
            // Get user email from auth.users via admin API (if available) or use an empty string
            // In a production app, you would use an edge function with admin rights
            return {
              ...profile,
              email: profile.username || '' // fallback to username as we can't directly query auth.users
            };
          } catch (err) {
            console.error('Error fetching user email:', err);
            return { ...profile, email: '' };
          }
        })
      );
      
      return usersWithEmails as UserProfile[];
    }
  });

  // Update user profile
  const mutation = useMutation({
    mutationFn: async (user: Partial<UserProfile>) => {
      if (!user.id) throw new Error('User ID is required');
      
      const { id, email, ...profileData } = user;
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User updated successfully');
      setIsDialogOpen(false);
      setCurrentUser(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const handleEditUser = (user: UserProfile) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && currentUser.id) {
      mutation.mutate(currentUser);
    }
  };

  const toggleAdmin = (user: UserProfile) => {
    mutation.mutate({
      id: user.id,
      is_admin: !user.is_admin
    });
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username/Email</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email || user.username || 'N/A'}</TableCell>
                <TableCell>{user.full_name || 'N/A'}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant={user.is_admin ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAdmin(user)}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    {user.is_admin ? 'Admin' : 'User'}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No users found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  value={currentUser?.email || ''}
                  disabled
                  readOnly
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  value={currentUser?.username || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                  placeholder="Username"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="full_name">Full Name</label>
                <Input
                  id="full_name"
                  value={currentUser?.full_name || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, full_name: e.target.value })}
                  placeholder="Full Name"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_admin"
                  checked={currentUser?.is_admin || false}
                  onCheckedChange={(checked) => setCurrentUser({ ...currentUser, is_admin: checked })}
                />
                <label htmlFor="is_admin">Admin privileges</label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;

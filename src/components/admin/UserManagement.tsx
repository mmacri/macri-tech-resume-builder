
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { UserPlus, Key, Trash2, Shield, Mail } from 'lucide-react';
import AddUserForm from './AddUserForm';

// Define types for our data
type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface UserManagementProps {
  users: UserProfile[];
  fetchUsers: () => Promise<void>;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, fetchUsers }) => {
  const [emailToReset, setEmailToReset] = useState('');

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

  return (
    <div className="space-y-4">
      <AddUserForm onUserAdded={fetchUsers} />
      
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
    </div>
  );
};

export default UserManagement;

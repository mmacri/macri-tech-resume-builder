
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { Key, Trash2, Shield, Mail, Loader2 } from 'lucide-react';
import AddUserForm from './AddUserForm';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define types for our data
type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface UserManagementProps {
  users: UserProfile[];
  fetchUsers: () => Promise<void>;
}

type ActionType = 'delete' | 'adminRole' | 'resetPassword';

const UserManagement: React.FC<UserManagementProps> = ({ users, fetchUsers }) => {
  const [emailToReset, setEmailToReset] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionTarget, setActionTarget] = useState<{id: string, action: ActionType, isAdmin?: boolean} | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleResetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?tab=reset`,
      });
      
      if (error) throw error;
      toast.success('Password reset email sent to user');
      setEmailToReset('');
    } catch (error: any) {
      console.error('Error resetting password:', error);
      setError(`Failed to send reset email: ${error.message}`);
      toast.error(`Failed to send reset email: ${error.message}`);
    } finally {
      setIsLoading(false);
      setActionTarget(null);
      setIsAlertOpen(false);
    }
  };

  const handleMakeAdmin = async (userId: string, isCurrentlyAdmin: boolean) => {
    setIsLoading(true);
    setError(null);
    
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
      setError(`Failed to update admin status: ${error.message}`);
      toast.error(`Failed to update admin status: ${error.message}`);
    } finally {
      setIsLoading(false);
      setActionTarget(null);
      setIsAlertOpen(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      setError(`Failed to delete user: ${error.message}`);
      toast.error(`Failed to delete user: ${error.message}`);
    } finally {
      setIsLoading(false);
      setActionTarget(null);
      setIsAlertOpen(false);
    }
  };

  const openConfirmationDialog = (id: string, action: ActionType, isAdmin?: boolean) => {
    setActionTarget({ id, action, isAdmin });
    setIsAlertOpen(true);
  };

  const getConfirmationDetails = () => {
    if (!actionTarget) return { title: '', description: '' };
    
    switch (actionTarget.action) {
      case 'delete':
        return {
          title: 'Delete User',
          description: 'This action cannot be undone. This will permanently delete the user account and all associated data.',
        };
      case 'adminRole':
        return {
          title: actionTarget.isAdmin ? 'Remove Admin Role' : 'Grant Admin Role',
          description: actionTarget.isAdmin 
            ? 'This will remove administrative privileges from this user.' 
            : 'This will grant administrative privileges to this user.',
        };
      case 'resetPassword':
        return {
          title: 'Send Password Reset Email',
          description: 'This will send a password reset email to the user.',
        };
      default:
        return { title: '', description: '' };
    }
  };

  const handleConfirmedAction = () => {
    if (!actionTarget) return;
    
    switch (actionTarget.action) {
      case 'delete':
        handleDeleteUser(actionTarget.id);
        break;
      case 'adminRole':
        if (typeof actionTarget.isAdmin === 'boolean') {
          handleMakeAdmin(actionTarget.id, actionTarget.isAdmin);
        }
        break;
      case 'resetPassword':
        handleResetPassword(actionTarget.id);
        break;
    }
  };

  const confirmationDetails = getConfirmationDetails();

  return (
    <div className="space-y-4">
      <AddUserForm onUserAdded={fetchUsers} />
      
      <Card>
        <CardHeader>
          <CardTitle>Reset User Password</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center gap-2">
            <Input
              placeholder="User Email"
              value={emailToReset}
              onChange={(e) => setEmailToReset(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleResetPassword(emailToReset)} 
              disabled={!emailToReset || isLoading}
              className="flex-shrink-0 flex items-center"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.is_admin ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openConfirmationDialog(user.id, 'adminRole', user.is_admin || false)}
                        className="flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading && actionTarget?.id === user.id && actionTarget?.action === 'adminRole' ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : (
                          <Shield className="mr-1 h-3 w-3" />
                        )}
                        {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openConfirmationDialog(user.id, 'resetPassword')}
                        className="flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading && actionTarget?.id === user.id && actionTarget?.action === 'resetPassword' ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : (
                          <Key className="mr-1 h-3 w-3" />
                        )}
                        Reset Password
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => openConfirmationDialog(user.id, 'delete')}
                        className="flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading && actionTarget?.id === user.id && actionTarget?.action === 'delete' ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="mr-1 h-3 w-3" />
                        )}
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmationDetails.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDetails.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmedAction}
              className={actionTarget?.action === 'delete' ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;

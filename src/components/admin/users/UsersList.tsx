
import React from 'react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditUserDialog } from './EditUserDialog';
import { useAuth } from '@/contexts/AuthContext';

export const UsersList = () => {
  const { 
    users, 
    isLoading, 
    currentUser, 
    setCurrentUser,
    isDialogOpen,
    setIsDialogOpen,
    handleEditUser,
    handleSubmit,
    toggleAdmin
  } = useUserManagement();
  
  const { user: currentAuthUser } = useAuth();

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Admin Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email || 'No email'}</TableCell>
                <TableCell>{user.full_name || 'Not set'}</TableCell>
                <TableCell>{user.username || 'Not set'}</TableCell>
                <TableCell>
                  {user.is_admin ? (
                    <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      User
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant={user.is_admin ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => toggleAdmin(user)}
                      // Prevent users from removing their own admin status
                      disabled={user.id === currentAuthUser?.id && user.is_admin}
                    >
                      {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <EditUserDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={currentUser}
        onChange={setCurrentUser}
        onSubmit={handleSubmit}
      />
    </>
  );
};

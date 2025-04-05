
import React from 'react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

const UsersList = () => {
  const {
    users,
    isLoading,
    handleEditUser,
    toggleAdmin
  } = useUserManagement();

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (!users || users.length === 0) {
    return <div className="text-center py-8">No users found.</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Username/Email</TableHead>
            <TableHead>Admin Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.full_name || 'No name set'}
              </TableCell>
              <TableCell>{user.username || user.email || 'No username/email'}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={user.is_admin} 
                    onCheckedChange={() => {
                      toggleAdmin(user);
                      toast.success(`${user.full_name || 'User'} ${user.is_admin ? 'removed from' : 'added to'} administrators`);
                    }}
                  />
                  <span>{user.is_admin ? 'Admin' : 'User'}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;

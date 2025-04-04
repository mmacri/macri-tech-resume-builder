
import React from 'react';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Shield } from 'lucide-react';

interface UsersListProps {
  users: UserProfile[] | undefined;
  onEditUser: (user: UserProfile) => void;
  onToggleAdmin: (user: UserProfile) => void;
  isLoading: boolean;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onEditUser,
  onToggleAdmin,
  isLoading
}) => {
  if (isLoading) return <div>Loading users...</div>;
  
  return (
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
                  onClick={() => onToggleAdmin(user)}
                >
                  <Shield className="h-4 w-4 mr-1" />
                  {user.is_admin ? 'Admin' : 'User'}
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEditUser(user)}>
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
  );
};

export default UsersList;

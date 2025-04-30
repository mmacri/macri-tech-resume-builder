
import React from 'react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Pencil, UserCog, Trash2, RefreshCw, AlertTriangle, Info } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { UserProfile } from '@/types/user';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';

const UsersList = () => {
  const { 
    users, 
    isLoading, 
    error,
    refetch,
    handleEditUser, 
    toggleAdmin,
    deleteUser
  } = useUserManagement();
  
  const { user: currentUser } = useAuth();

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return <div className="py-4 text-center">Loading users...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error loading users</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to fetch users from the database'}
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Accounts</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {(!users || users.length === 0) && (
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertTitle>No Users Found</AlertTitle>
          <AlertDescription>
            No user profiles exist in the database. This could mean:
            <ul className="list-disc ml-5 mt-2">
              <li>You need to create new user accounts</li>
              <li>User accounts exist but profiles haven't been created</li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2" 
              onClick={handleRefresh}
            >
              Refresh List
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email/Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user: UserProfile) => {
              const isCurrentUser = currentUser?.id === user.id;
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.email || user.username || '-'}
                    {isCurrentUser && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">You</span>}
                  </TableCell>
                  <TableCell>{user.full_name || '-'}</TableCell>
                  <TableCell>{user.is_admin ? 'Administrator' : 'User'}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={!!user.is_admin}
                      onCheckedChange={() => toggleAdmin(user)}
                      disabled={isCurrentUser && user.is_admin} // Prevent removing admin from yourself
                    />
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteUser(user.id)} 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      disabled={isCurrentUser} // Prevent deleting yourself
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <UserCog className="h-8 w-8 text-gray-400" />
                  <p className="text-gray-500">No users found in the database</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefresh}
                    className="mt-2"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh List
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;

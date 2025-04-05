
import React, { useEffect, useState } from 'react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Pencil, UserCog } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { UserProfile } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const UsersList = () => {
  const { users, isLoading, handleEditUser, toggleAdmin } = useUserManagement();
  const [isCreatingSampleUser, setIsCreatingSampleUser] = useState(false);

  // Check if we need to create a sample user
  useEffect(() => {
    const checkAndCreateSampleUser = async () => {
      if (!isLoading && (!users || users.length === 0) && !isCreatingSampleUser) {
        setIsCreatingSampleUser(true);
        try {
          // Check if we already have users in auth.users
          const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
          
          if (authError) {
            console.error('Error checking auth users:', authError);
            
            // Create a sample admin profile without auth
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Sample UUID
                username: 'admin@example.com',
                full_name: 'Admin User',
                is_admin: true
              })
              .select()
              .single();
              
            if (profileError) {
              console.error('Error creating sample admin profile:', profileError);
              toast.error(`Error creating sample user: ${profileError.message}`);
            } else {
              toast.success('Created sample admin user for demonstration');
            }
          } else if (!authUsers || authUsers.users.length === 0) {
            // For demo purposes, create a sample profile without auth
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Sample UUID
                username: 'demo@example.com',
                full_name: 'Demo User',
                is_admin: true
              })
              .select()
              .single();
              
            if (profileError) {
              console.error('Error creating sample profile:', profileError);
              toast.error(`Error creating sample user: ${profileError.message}`);
            } else {
              toast.success('Created sample user for demonstration');
            }
          }
        } catch (error) {
          console.error('Error in checkAndCreateSampleUser:', error);
        } finally {
          setIsCreatingSampleUser(false);
        }
      }
    };
    
    checkAndCreateSampleUser();
  }, [isLoading, users, isCreatingSampleUser]);

  if (isLoading || isCreatingSampleUser) {
    return <div className="py-4">Loading users...</div>;
  }

  return (
    <div>
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
            users.map((user: UserProfile) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email || user.username || '-'}</TableCell>
                <TableCell>{user.full_name || '-'}</TableCell>
                <TableCell>{user.is_admin ? 'Administrator' : 'User'}</TableCell>
                <TableCell>
                  <Switch 
                    checked={!!user.is_admin}
                    onCheckedChange={() => toggleAdmin(user)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;

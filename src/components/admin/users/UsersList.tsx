
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
          console.log('No users found, attempting to create a sample admin user');
          
          // Create a sample admin profile directly in the profiles table
          const sampleUserUuid = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'; // Sample UUID
          
          // First check if this profile already exists to avoid duplicate errors
          const { data: existingProfile, error: checkError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', sampleUserUuid)
            .maybeSingle();
            
          if (checkError) {
            console.error('Error checking for existing profile:', checkError);
          }
          
          // Only insert if it doesn't exist
          if (!existingProfile) {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: sampleUserUuid,
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
              console.log('Successfully created sample admin profile:', profile);
              toast.success('Created sample admin user for demonstration');
            }
          } else {
            console.log('Sample admin profile already exists, skipping creation');
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

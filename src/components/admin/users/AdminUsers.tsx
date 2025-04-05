
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useUserManagement } from '@/hooks/useUserManagement';
import UsersList from './UsersList';
import EditUserDialog from './EditUserDialog';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const AdminUsers = () => {
  const {
    users,
    isLoading,
    mutation,
    currentUser,
    setCurrentUser,
    isDialogOpen,
    setIsDialogOpen,
    handleEditUser,
    handleSubmit,
    toggleAdmin
  } = useUserManagement();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button size="sm" variant="outline">
          <UserPlus className="mr-2 h-4 w-4" /> Invite User
        </Button>
      </div>

      <UsersList />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <EditUserDialog
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          handleSubmit={handleSubmit}
          isPending={mutation.isPending}
          onClose={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default AdminUsers;


import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useUserManagement } from '@/hooks/useUserManagement';
import UsersList from './UsersList';
import EditUserDialog from './EditUserDialog';
import { Button } from "@/components/ui/button";
import { UserPlus, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AdminUsers = () => {
  const {
    users,
    isLoading,
    error,
    refetch,
    mutation,
    currentUser,
    setCurrentUser,
    isDialogOpen,
    setIsDialogOpen,
    handleEditUser,
    handleSubmit,
    toggleAdmin
  } = useUserManagement();
  
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowAddUserDialog(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Database Integration</AlertTitle>
        <AlertDescription>
          This section shows actual users from your database. You can manage user permissions and details here.
        </AlertDescription>
      </Alert>

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

      {/* We could implement a UserAddDialog component here if needed */}
    </div>
  );
};

export default AdminUsers;

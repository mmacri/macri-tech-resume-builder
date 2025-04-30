
import { useState } from 'react';
import { UserProfile } from '@/types/user';
import { useUserQuery } from './user/useUserQuery';
import { useUserMutations } from './user/useUserMutations';

export function useUserManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserProfile> | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  
  // Use our refactored hooks
  const { users, isLoading, error, refetch } = useUserQuery();
  const { updateMutation, addMutation, deleteMutation } = useUserMutations();

  const handleEditUser = (user: UserProfile) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && currentUser.id) {
      updateMutation.mutate(currentUser);
      setIsDialogOpen(false);
      setCurrentUser(null);
    }
  };

  const toggleAdmin = (user: UserProfile) => {
    console.log(`Toggling admin status for user ${user.full_name || user.username} to ${!user.is_admin}`);
    updateMutation.mutate({
      id: user.id,
      is_admin: !user.is_admin
    });
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteMutation.mutate(userId);
    }
  };

  const addUser = (userData: Partial<UserProfile>) => {
    addMutation.mutate(userData);
    setShowAddUserDialog(false);
  };

  return {
    users,
    isLoading,
    error,
    refetch,
    mutation: updateMutation,
    currentUser,
    setCurrentUser,
    isDialogOpen,
    setIsDialogOpen,
    handleEditUser,
    handleSubmit,
    toggleAdmin,
    deleteUser,
    addUser,
    showAddUserDialog,
    setShowAddUserDialog
  };
}

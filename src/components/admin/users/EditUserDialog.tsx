
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { UserProfile } from '@/types/user';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface EditUserDialogProps {
  currentUser: Partial<UserProfile> | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Partial<UserProfile> | null>>;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  onClose: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  currentUser,
  setCurrentUser,
  handleSubmit,
  isPending,
  onClose,
}) => {
  const { user: authUser } = useAuth();
  
  if (!currentUser) return null;
  
  const isCurrentUser = authUser?.id === currentUser.id;
  const isDisabled = isCurrentUser && currentUser.is_admin;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        {isCurrentUser && (
          <DialogDescription>
            This is your account. Note that you cannot remove admin privileges from yourself.
          </DialogDescription>
        )}
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="username">Username/Email</Label>
          <Input
            id="username"
            value={currentUser.username || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
            placeholder="Enter username or email"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={currentUser.full_name || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, full_name: e.target.value })}
            placeholder="Enter full name"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isAdmin"
            checked={!!currentUser.is_admin}
            onCheckedChange={(checked) => setCurrentUser({ ...currentUser, is_admin: checked })}
            disabled={isDisabled}
          />
          <Label htmlFor="isAdmin">
            Administrator
            {isDisabled && (
              <span className="ml-2 text-xs text-amber-600">(Cannot be disabled for your own account)</span>
            )}
          </Label>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditUserDialog;

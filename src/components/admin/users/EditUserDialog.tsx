
import React from 'react';
import { UserProfile } from '@/types/user';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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
  onClose
}) => {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              value={currentUser?.email || ''}
              disabled
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              value={currentUser?.username || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
              placeholder="Username"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="full_name">Full Name</label>
            <Input
              id="full_name"
              value={currentUser?.full_name || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, full_name: e.target.value })}
              placeholder="Full Name"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="is_admin"
              checked={currentUser?.is_admin || false}
              onCheckedChange={(checked) => setCurrentUser({ ...currentUser, is_admin: checked })}
            />
            <label htmlFor="is_admin">Admin privileges</label>
          </div>
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

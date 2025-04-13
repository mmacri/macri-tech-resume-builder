
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { UserProfile } from '@/types/user';
import { Label } from '@/components/ui/label';

interface AddUserDialogProps {
  onSubmit: (userData: Partial<UserProfile>) => void;
  onClose: () => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ onSubmit, onClose }) => {
  const [userData, setUserData] = useState<Partial<UserProfile>>({
    full_name: '',
    username: '',
    is_admin: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New User</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="email">Email/Username</Label>
          <Input
            id="email"
            value={userData.username || ''}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            placeholder="Enter email or username"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={userData.full_name || ''}
            onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
            placeholder="Enter full name"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isAdmin"
            checked={!!userData.is_admin}
            onCheckedChange={(checked) => setUserData({ ...userData, is_admin: checked })}
          />
          <Label htmlFor="isAdmin">Administrator</Label>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add User</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddUserDialog;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserPlus, Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface AddUserFormProps {
  onUserAdded: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onUserAdded }) => {
  const [newUser, setNewUser] = useState({ email: '', password: '', fullName: '', username: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async () => {
    // Basic validation
    if (!newUser.email || !newUser.password) {
      setError('Email and password are required');
      return;
    }
    
    if (newUser.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First create the user in auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true
      });

      if (authError) throw authError;
      
      // Then update their profile data
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: newUser.fullName,
            username: newUser.username
          })
          .eq('id', authData.user.id);
        
        if (profileError) throw profileError;
      }
      
      toast.success('User created successfully');
      setNewUser({ email: '', password: '', fullName: '', username: '' });
      onUserAdded();
    } catch (error: any) {
      console.error('Error creating user:', error);
      setError(`Failed to create user: ${error.message}`);
      toast.error(`Failed to create user: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Add New User
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2 h-5 w-5">
                <Info className="h-4 w-4" />
                <span className="sr-only">Info</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new user account with access to the platform</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              placeholder="Email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Input
              placeholder="Full Name"
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Input
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleAddUser} 
            disabled={isLoading} 
            className="flex items-center"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Adding...' : 'Add User'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddUserForm;

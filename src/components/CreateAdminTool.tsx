
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const CreateAdminTool: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createAdminUser = async () => {
    setIsLoading(true);
    
    try {
      // Create admin user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: 'admin@recoveryessentials',
        password: 'A5!Paper',
        email_confirm: true
      });

      if (authError) throw authError;
      
      // Update profile as admin
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: 'Admin User',
            username: 'admin',
            is_admin: true
          })
          .eq('id', authData.user.id);
        
        if (profileError) throw profileError;
      }
      
      toast.success('Admin user created successfully!');
    } catch (error: any) {
      console.error('Error creating admin user:', error);
      toast.error(`Failed to create admin user: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Create Admin User</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">
          This will create an admin user with email: admin@recoveryessentials and password: A5!Paper
        </p>
        <Button 
          onClick={createAdminUser} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Admin User...
            </>
          ) : (
            'Create Admin User'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateAdminTool;


import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const resetSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

interface ResetPasswordFormProps {
  setAuthError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ResetPasswordForm = ({ setAuthError, isLoading, setIsLoading }: ResetPasswordFormProps) => {
  const { resetPassword } = useAuth();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleResetPassword = async (values: ResetFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      console.log('Resetting password for:', values.email);
      await resetPassword(values.email);
      // Don't navigate away, let user check their email
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error.message) {
        setAuthError(error.message);
      } else {
        setAuthError('An unexpected error occurred during password reset.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending reset email...' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;

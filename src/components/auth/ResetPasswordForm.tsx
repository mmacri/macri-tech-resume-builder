
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail } from 'lucide-react';

const resetSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

interface ResetPasswordFormProps {
  setAuthError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
}

const ResetPasswordForm = ({ setAuthError, isLoading, setIsLoading, setActiveTab }: ResetPasswordFormProps) => {
  const { resetPassword } = useAuth();
  const [resetSent, setResetSent] = useState(false);

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
      setResetSent(true);
      form.reset();
      toast.success('Reset link sent to your email');
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

  if (resetSent) {
    return (
      <Alert className="bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 rounded-full p-1">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <AlertDescription className="text-blue-800">
            <h3 className="font-medium">Check your inbox</h3>
            <p className="text-sm">A password reset link has been sent to your email.</p>
          </AlertDescription>
        </div>
        <div className="mt-4">
          <Button variant="outline" onClick={() => setActiveTab('login')} className="w-full">
            Return to Login
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
        </div>
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
          {isLoading ? 'Sending reset email...' : 'Send Reset Link'}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-2">
          <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setActiveTab('login')}>
            Back to login
          </Button>
        </p>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;

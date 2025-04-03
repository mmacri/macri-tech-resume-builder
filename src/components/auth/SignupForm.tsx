
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  setAuthError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
}

const SignupForm = ({ setAuthError, isLoading, setIsLoading, setActiveTab }: SignupFormProps) => {
  const { signUp } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      console.log('Signing up with:', values.email);
      await signUp(values.email, values.password);
      // Don't redirect away since we want user to confirm their email
      // Instead, show a success message and direct them to login tab
      setActiveTab('login');
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.message) {
        setAuthError(error.message);
      } else {
        setAuthError('An unexpected error occurred during signup.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;

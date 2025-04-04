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
import { Check } from 'lucide-react';

const signupSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string()
    .min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      console.log('Signing up with:', values.email);
      const response = await signUp(values.email, values.password);
      
      if (response.error) {
        throw response.error;
      }

      setRegistrationSuccess(true);
      form.reset();
      toast.success('Account created! Please check your email for confirmation.');
      
      // Keep on the signup page to show success message, don't redirect yet
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

  if (registrationSuccess) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 rounded-full p-1">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <AlertDescription className="text-green-800">
            <h3 className="font-medium">Registration successful!</h3>
            <p className="text-sm">Please check your inbox to confirm your email and complete registration.</p>
          </AlertDescription>
        </div>
        <div className="mt-4">
          <Button variant="outline" onClick={() => setActiveTab('login')} className="w-full">
            Go to Login
          </Button>
        </div>
      </Alert>
    );
  }

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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setActiveTab('login')}>
            Log in
          </Button>
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;

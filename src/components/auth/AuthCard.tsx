
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthErrorDisplay from './AuthErrorDisplay';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';
import { Link } from 'react-router-dom';

interface AuthCardProps {
  authError: string | null;
  setAuthError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AuthCard = ({ 
  authError, 
  setAuthError, 
  isLoading, 
  setIsLoading, 
  activeTab, 
  setActiveTab 
}: AuthCardProps) => {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account or create a new one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthErrorDisplay error={authError} />
        
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="reset">Reset</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm 
              setAuthError={setAuthError} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm 
              setAuthError={setAuthError} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
              setActiveTab={setActiveTab}
            />
          </TabsContent>
          
          <TabsContent value="reset">
            <ResetPasswordForm 
              setAuthError={setAuthError} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
              setActiveTab={setActiveTab} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} - Secure Authentication
      </CardFooter>
    </Card>
  );
};

export default AuthCard;

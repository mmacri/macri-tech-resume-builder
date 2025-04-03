
import React from 'react';
import { CardFooter } from '@/components/ui/card';

const AuthFooter = () => {
  return (
    <CardFooter className="flex justify-center">
      <p className="text-sm text-center text-gray-500">
        This site is protected by reCAPTCHA and the{' '}
        <a href="https://policies.google.com/privacy" className="underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" className="underline">
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </CardFooter>
  );
};

export default AuthFooter;

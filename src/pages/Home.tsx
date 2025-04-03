
import React from 'react';
import { Button } from '@/components/ui/button';
import CreateAdminTool from '@/components/CreateAdminTool';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Welcome to the Application</h1>
      
      <div className="p-4 border rounded-md bg-muted/50">
        <h2 className="text-2xl font-semibold mb-4">Admin User Creation Tool</h2>
        <CreateAdminTool />
        <p className="text-sm text-muted-foreground mt-4">
          After creating the admin user, you can log in using the credentials specified.
        </p>
      </div>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">About this Application</h2>
        <p>
          This is a demonstration application with authentication and user management features.
          Sign in to access the protected content and features.
        </p>
      </section>
    </div>
  );
}

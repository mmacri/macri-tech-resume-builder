
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Michael Macri</h1>
      
      <section id="about" className="space-y-4">
        <h2 className="text-2xl font-semibold">About</h2>
        <p>
          Over 25 years in enterprise technology adoption, customer success programs, 
          partner management, and solution advisory. Proven results in driving revenue growth, 
          product adoption, and operational efficiency.
        </p>
      </section>
      
      <section id="experience" className="space-y-4">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <div className="card p-4 border rounded-md">
          <h3 className="text-xl font-medium">Director of Customer Success</h3>
          <p className="text-sm text-muted-foreground">Enterprise Technology Inc. • 2018 - Present</p>
          <p className="mt-2">
            Leading customer success strategies and initiatives that have increased customer 
            retention by 35% and expanded revenue from existing accounts by 40%.
          </p>
        </div>
        <div className="card p-4 border rounded-md">
          <h3 className="text-xl font-medium">Senior Solutions Architect</h3>
          <p className="text-sm text-muted-foreground">Global Tech Solutions • 2012 - 2018</p>
          <p className="mt-2">
            Designed and implemented enterprise solutions that drove technology adoption 
            and operational efficiency for clients across multiple industries.
          </p>
        </div>
      </section>

      <section id="education" className="space-y-4">
        <h2 className="text-2xl font-semibold">Education</h2>
        <div className="card p-4 border rounded-md">
          <h3 className="text-xl font-medium">MBA, Technology Management</h3>
          <p className="text-sm text-muted-foreground">Business University • 2010</p>
        </div>
        <div className="card p-4 border rounded-md">
          <h3 className="text-xl font-medium">BS, Computer Science</h3>
          <p className="text-sm text-muted-foreground">Tech University • 2004</p>
        </div>
      </section>

      <section id="skills" className="space-y-4">
        <h2 className="text-2xl font-semibold">Skills & Methods</h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Customer Success</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Solution Architecture</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Enterprise Integration</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Technology Adoption</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Change Management</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Project Leadership</span>
        </div>
      </section>

      {!user && (
        <div className="flex gap-4 mt-8">
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
      
      {isAdmin && (
        <div className="p-4 border rounded-md bg-muted/50 mt-8">
          <h2 className="text-lg font-semibold mb-2">Admin Access</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You're signed in as an administrator and have access to additional features.
          </p>
          <Link to="/admin">
            <Button variant="outline">Go to Admin Panel</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

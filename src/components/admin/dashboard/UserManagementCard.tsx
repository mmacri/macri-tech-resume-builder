
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';

const UserManagementCard = () => {
  return (
    <Card className="hover:shadow-md transition-shadow mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user accounts and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          Control who has access to your site. Add new administrators or manage existing user accounts.
        </p>
        <Link to="/admin#users">
          <Button className="w-full">Manage Users</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserManagementCard;

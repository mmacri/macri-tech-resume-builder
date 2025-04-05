
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkTo: string;
  content: string;
}

const DashboardCard = ({ title, description, icon: Icon, linkTo, content }: DashboardCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          {content}
        </p>
        <Link to={linkTo}>
          <Button className="w-full">Manage {title}</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

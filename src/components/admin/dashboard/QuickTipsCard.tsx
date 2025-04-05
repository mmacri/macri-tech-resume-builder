
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const QuickTipsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Tips</CardTitle>
        <CardDescription>Making the most of your admin dashboard</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the <strong>Blog Management</strong> section to keep your content fresh and engaging.</li>
          <li>Update your <strong>Portfolio Projects</strong> regularly to showcase your latest work.</li>
          <li>Keep your <strong>Resume</strong> sections updated with your latest experience and achievements.</li>
          <li>Monitor <strong>User Management</strong> to control who has administrative access to your site.</li>
          <li>Remember to log out when you're finished making changes, especially on shared devices.</li>
          <li>Click on <strong>Back to Home</strong> in the sidebar to view your website as visitors see it.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default QuickTipsCard;

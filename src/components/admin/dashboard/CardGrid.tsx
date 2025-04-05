
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Users, Award, BookOpen, Heart } from 'lucide-react';
import UserManagementCard from './UserManagementCard';
import QuickTipsCard from './QuickTipsCard';

const CardGrid = () => {
  const resumeCards = [
    {
      title: "About",
      description: "Manage your personal information",
      icon: FileText,
      hash: "about",
      content: "Update your name, contact information, and professional summary."
    },
    {
      title: "Experience",
      description: "Manage your work history",
      icon: Briefcase,
      hash: "experience",
      content: "Add, edit, or remove your professional experience entries."
    },
    {
      title: "Education",
      description: "Manage your educational background",
      icon: BookOpen,
      hash: "education",
      content: "Update your academic history, degrees, and certifications."
    },
    {
      title: "Skills",
      description: "Manage your skillset",
      icon: Award,
      hash: "skills",
      content: "Showcase your technical and professional skills by category."
    },
    {
      title: "Interests",
      description: "Manage your personal interests",
      icon: Heart,
      hash: "interests",
      content: "Share your hobbies and personal interests to round out your profile."
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Resume Management</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumeCards.map((card) => (
            <Card key={card.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <card.icon className="h-5 w-5 text-primary" />
                  {card.title}
                </CardTitle>
                <CardDescription>
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  {card.content}
                </p>
                <Link to={`/admin#resume`} onClick={() => localStorage.setItem('activeResumeTab', card.hash)}>
                  <Button className="w-full">Manage {card.title}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <UserManagementCard />
        <QuickTipsCard />
      </div>
    </div>
  );
};

export default CardGrid;

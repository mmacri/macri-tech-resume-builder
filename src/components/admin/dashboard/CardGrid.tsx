
import React from 'react';
import DashboardCard from './DashboardCard';
import { Pencil, FolderKanban, FileText } from 'lucide-react';

const CardGrid = () => {
  const cards = [
    {
      title: "Blog Management",
      description: "Create, edit, and manage blog posts",
      icon: Pencil,
      linkTo: "/admin#blog",
      content: "Manage all your blog content. Add new posts, update existing ones, or remove outdated content."
    },
    {
      title: "Portfolio Projects",
      description: "Showcase your work and achievements",
      icon: FolderKanban,
      linkTo: "/admin#portfolio",
      content: "Update your portfolio with your latest projects, case studies, and professional accomplishments."
    },
    {
      title: "Resume Management",
      description: "Edit experience and other resume sections",
      icon: FileText,
      linkTo: "/admin#resume",
      content: "Update your resume sections including experience, education, skills, and more."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <DashboardCard
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          linkTo={card.linkTo}
          content={card.content}
        />
      ))}
    </div>
  );
};

export default CardGrid;

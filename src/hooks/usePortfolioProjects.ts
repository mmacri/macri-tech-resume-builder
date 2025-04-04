
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image_url: string | null;
  technologies: string[] | null;
  display_order: number;
}

export const usePortfolioProjects = (user: any) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const getDefaultProjects = (): Project[] => {
    return [
      {
        id: 'default-1',
        title: "Sentiment Analyzer",
        description: "This project involves developing a sentiment analysis tool that uses natural language processing (NLP) techniques to analyze and classify the sentiment of text data. The tool can be used to gauge public opinion, customer feedback, and social media sentiment.",
        link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Sentiment-Analyzer",
        image_url: null,
        technologies: ["Python", "NLTK", "Scikit-learn", "Flask"],
        display_order: 1
      },
      {
        id: 'default-2',
        title: "Financial Dashboard",
        description: "This project is a financial dashboard that provides real-time insights into financial data. It includes features such as data visualization, trend analysis, and performance metrics to help users make informed financial decisions.",
        link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Financial-Dashboard",
        image_url: null,
        technologies: ["JavaScript", "D3.js", "React", "Node.js"],
        display_order: 2
      },
      {
        id: 'default-3',
        title: "AI/ML Policies",
        description: "This project focuses on creating policies for the ethical and responsible use of AI and machine learning technologies. It includes guidelines for data privacy, algorithmic transparency, and bias mitigation.",
        link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/AI-ML-Policies",
        image_url: null,
        technologies: ["Python", "TensorFlow", "Keras", "Jupyter Notebook"],
        display_order: 3
      },
      {
        id: 'default-4',
        title: "Policy Registrar",
        description: "This project involves developing a policy registrar system that helps organizations manage and track their policies and procedures. It includes features such as policy creation, approval workflows, and compliance tracking.",
        link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Policy-Registrar",
        image_url: null,
        technologies: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
        display_order: 4
      },
      {
        id: 'default-5',
        title: "Customer Engagement Deliverables",
        description: "This project focuses on creating deliverables that enhance customer engagement and satisfaction. It includes tools and resources for customer onboarding, support, and feedback collection.",
        link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Customer-Engagement-Deliverables",
        image_url: null,
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        display_order: 5
      },
      {
        id: 'default-6',
        title: "Portfolio Website",
        description: "This website serves as a comprehensive portfolio to showcase my projects and skills. It is built using modern web technologies and provides an overview of various projects I have worked on, including tools for sentiment analysis, financial dashboards, AI/ML policy creation, policy management systems, and customer engagement deliverables.",
        link: "https://github.com/mmacri/Websites",
        image_url: null,
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        display_order: 6
      }
    ];
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // We have projects in the database, set them
        console.log(`Found ${data.length} projects`);
        setProjects(data);
      } else {
        // No projects in the database, add default projects
        console.log('No projects found, adding default projects');
        const defaultProjects = getDefaultProjects();
        setProjects(defaultProjects);
        
        // If user is authenticated, try to seed the database
        if (user) {
          await seedProjects();
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Error loading projects');
      console.error('Error fetching projects:', error);
      
      // Fallback to default projects on error
      setProjects(getDefaultProjects());
    } finally {
      setLoading(false);
    }
  };

  const seedProjects = async () => {
    try {
      if (!user) {
        console.log('Cannot seed projects: User is not authenticated');
        toast.error('You need to be logged in to add default projects to the database');
        return;
      }

      const defaultProjects = getDefaultProjects().map(({ id, ...rest }) => rest); // Remove the default id

      const { error } = await supabase
        .from('portfolio_projects')
        .insert(defaultProjects);
        
      if (error) {
        throw error;
      }
      
      toast.success('Default projects have been added to your portfolio');
      
      // Fetch the projects again to get the DB IDs
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || 'Error adding default projects');
      console.error('Error seeding projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, fetchProjects, seedProjects };
};

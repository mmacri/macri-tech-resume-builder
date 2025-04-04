import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Github } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image_url: string | null;
  technologies: string[] | null;
  display_order: number;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

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
      
      // If there are no projects in the database, seed the database with the default projects
      // regardless of admin status
      if (data?.length === 0) {
        console.log('No projects found, seeding default projects');
        await seedProjects();
        return; // fetchProjects will be called again after seeding
      }
      
      setProjects(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Error loading projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedProjects = async () => {
    try {
      const defaultProjects = [
        {
          title: "Sentiment Analyzer",
          description: "This project involves developing a sentiment analysis tool that uses natural language processing (NLP) techniques to analyze and classify the sentiment of text data. The tool can be used to gauge public opinion, customer feedback, and social media sentiment.",
          link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Sentiment-Analyzer",
          technologies: ["Python", "NLTK", "Scikit-learn", "Flask"],
          display_order: 1
        },
        {
          title: "Financial Dashboard",
          description: "This project is a financial dashboard that provides real-time insights into financial data. It includes features such as data visualization, trend analysis, and performance metrics to help users make informed financial decisions.",
          link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Financial-Dashboard",
          technologies: ["JavaScript", "D3.js", "React", "Node.js"],
          display_order: 2
        },
        {
          title: "AI/ML Policies",
          description: "This project focuses on creating policies for the ethical and responsible use of AI and machine learning technologies. It includes guidelines for data privacy, algorithmic transparency, and bias mitigation.",
          link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/AI-ML-Policies",
          technologies: ["Python", "TensorFlow", "Keras", "Jupyter Notebook"],
          display_order: 3
        },
        {
          title: "Policy Registrar",
          description: "This project involves developing a policy registrar system that helps organizations manage and track their policies and procedures. It includes features such as policy creation, approval workflows, and compliance tracking.",
          link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Policy-Registrar",
          technologies: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
          display_order: 4
        },
        {
          title: "Customer Engagement Deliverables",
          description: "This project focuses on creating deliverables that enhance customer engagement and satisfaction. It includes tools and resources for customer onboarding, support, and feedback collection.",
          link: "https://github.com/mmacri/my-portfolio/tree/master/Projects/Customer-Engagement-Deliverables",
          technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
          display_order: 5
        },
        {
          title: "Portfolio Website",
          description: "This website serves as a comprehensive portfolio to showcase my projects and skills. It is built using modern web technologies and provides an overview of various projects I have worked on, including tools for sentiment analysis, financial dashboards, AI/ML policy creation, policy management systems, and customer engagement deliverables.",
          link: "https://github.com/mmacri/Websites",
          technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
          display_order: 6
        }
      ];

      const { error } = await supabase
        .from('portfolio_projects')
        .insert(defaultProjects);
        
      if (error) {
        throw error;
      }
      
      toast.success('Default projects have been added to your portfolio');
      
      // Fetch the projects again to display them
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || 'Error adding default projects');
      console.error('Error seeding projects:', error);
    }
  };

  return (
    <>
      {/* Index of Projects*/}
      <section className="resume-section" id="index-of-projects">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Index of Projects</h2>
          <p className="mb-4">This portfolio showcases a variety of projects that demonstrate my skills and expertise in different areas of technology. The projects include tools for sentiment analysis, financial dashboards, AI/ML policy creation, policy management systems, and customer engagement deliverables.</p>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex flex-col space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="my-8 text-center">
              <p className="mb-4">No projects found in your portfolio.</p>
              {isAdmin && (
                <Button 
                  onClick={seedProjects}
                  className="bg-macri-primary hover:bg-macri-primary/80"
                >
                  Add Default Projects
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="font-bold mb-3">Projects Overview:</p>
              <ul className="list-disc pl-6 space-y-2 mb-8">
                {projects.map((project) => (
                  <li key={project.id}>
                    <a href={`#${project.id}`} className="text-macri-primary hover:underline">
                      {project.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Project Sections */}
      {loading ? (
        <section className="resume-section">
          <div className="resume-section-content px-4 md:px-8">
            <Skeleton className="h-10 w-1/3 mb-6" />
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-8 w-20" />
              ))}
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
        </section>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <section className="resume-section" id={project.id}>
              <div className="resume-section-content px-4 md:px-8">
                <h2 className="text-4xl font-bold mb-8">{project.title}</h2>
                <div className="card p-6 mb-6">
                  {project.image_url && (
                    <div className="mb-6">
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="rounded-lg shadow-md max-h-96 object-cover mx-auto"
                      />
                    </div>
                  )}
                  <p className="mb-4">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <p className="font-bold mb-2">Technologies Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {project.link && (
                    <div className="flex mb-4 space-x-3">
                      {project.link.includes('github.com') ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-macri-primary hover:underline"
                        >
                          <Github className="mr-1 h-5 w-5" />
                          View on GitHub
                        </a>
                      ) : (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-macri-primary hover:underline"
                        >
                          <ExternalLink className="mr-1 h-5 w-5" />
                          View Project
                        </a>
                      )}
                    </div>
                  )}
                  
                  <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
                </div>
              </div>
            </section>
            <hr className="m-0" />
          </div>
        ))
      )}
    </>
  );
};

export default Portfolio;

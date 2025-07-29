
import { useAuth } from '@/contexts/AuthContext';
import { ProjectIndex } from '@/components/portfolio/ProjectIndex';
import { ProjectList } from '@/components/portfolio/ProjectList';
import { usePortfolioProjectsData } from '@/hooks/usePortfolioProjectsData';
import { staticProjectsData } from '@/data/resume/projectsData';

const Portfolio = () => {
  const { user } = useAuth();
  
  // Use database data with fallback to static data - show static immediately
  const { projects: dbProjects, refreshProjects } = usePortfolioProjectsData();
  
  // Transform database projects to match expected interface
  const transformedDbProjects = dbProjects?.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    link: project.link || '/portfolio',
    image_url: project.image_url,
    technologies: project.technologies,
    display_order: project.display_order
  }));
  
  // Always use static data as fallback, replace with DB data when available
  const projects = transformedDbProjects && transformedDbProjects.length > 0 ? transformedDbProjects : staticProjectsData;
  const loading = false; // Never show loading state, always show projects
  
  // Updated seed function to refresh from database
  const seedProjects = async () => {
    await refreshProjects();
  };

  return (
    <>
      <ProjectIndex 
        projects={projects} 
        loading={loading} 
        user={user} 
        seedProjects={seedProjects} 
      />
      
      <hr className="m-0" />
      
      <ProjectList projects={projects} loading={loading} />
    </>
  );
};

export default Portfolio;

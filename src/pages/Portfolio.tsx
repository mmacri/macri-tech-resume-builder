
import { useAuth } from '@/contexts/AuthContext';
import { ProjectIndex } from '@/components/portfolio/ProjectIndex';
import { ProjectList } from '@/components/portfolio/ProjectList';
import { usePortfolioProjectsData } from '@/hooks/usePortfolioProjectsData';
import { staticProjectsData } from '@/data/resume/projectsData';

const Portfolio = () => {
  const { user } = useAuth();
  
  // Use database data with fallback to static data
  const { projects: dbProjects, isLoading, refreshProjects } = usePortfolioProjectsData();
  
  console.log('Portfolio: dbProjects:', dbProjects?.length || 0, 'items');
  console.log('Portfolio: isLoading:', isLoading);
  
  // Transform database projects to match expected interface and use fallback to static data
  const transformedDbProjects = dbProjects?.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    link: project.link || '/portfolio',
    image_url: project.image_url,
    technologies: project.technologies,
    display_order: project.display_order
  }));
  
  const projects = transformedDbProjects && transformedDbProjects.length > 0 ? transformedDbProjects : staticProjectsData;
  const loading = isLoading;
  
  console.log('Portfolio: Final projects count:', projects.length);
  console.log('Portfolio: Using database data:', transformedDbProjects && transformedDbProjects.length > 0 ? 'YES' : 'NO (using static)');
  
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

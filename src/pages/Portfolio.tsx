import { ProjectIndex } from '@/components/portfolio/ProjectIndex';
import { ProjectList } from '@/components/portfolio/ProjectList';
import { FloatingNav } from '@/components/portfolio/FloatingNav';
import { staticProjectsData } from '@/data/staticResumeData';

const Portfolio = () => {
  const user = null; // Removed auth functionality
  
  // Use static data instead of database
  const projects = staticProjectsData || [];
  const isLoading = false;
  const error = null;

  // Mock seed function (no longer needed)
  const seedProjects = async () => {
    console.log('Database removed - using static data');
  };

  return (
    <>
      <ProjectIndex 
        projects={projects} 
        loading={isLoading} 
        user={user} 
        seedProjects={seedProjects} 
      />
      
      <hr className="m-0" />
      
      <ProjectList projects={projects} loading={isLoading} />
      
      <FloatingNav projects={projects} />
    </>
  );
};

export default Portfolio;
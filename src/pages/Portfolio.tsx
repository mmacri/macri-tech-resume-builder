
import { useAuth } from '@/contexts/AuthContext';
import { ProjectIndex } from '@/components/portfolio/ProjectIndex';
import { ProjectList } from '@/components/portfolio/ProjectList';
import { staticProjectsData } from '@/data/resume/projectsData';

const Portfolio = () => {
  const { user } = useAuth();
  
  // Use static projects data instead of database
  const projects = staticProjectsData;
  const loading = false;
  
  // Mock seed function for consistency with existing interface
  const seedProjects = async () => {
    console.log('Using static data - no seeding needed');
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


import { useAuth } from '@/contexts/AuthContext';
import { ProjectIndex } from '@/components/portfolio/ProjectIndex';
import { ProjectList } from '@/components/portfolio/ProjectList';
import { usePortfolioProjects } from '@/hooks/usePortfolioProjects';

const Portfolio = () => {
  const { user } = useAuth();
  const { projects, loading, seedProjects } = usePortfolioProjects(user);

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

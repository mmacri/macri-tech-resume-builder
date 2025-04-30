
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DownloadResume from '@/components/resume/DownloadResume';

interface AboutSectionProps {
  items: any[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ items = [] }) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Get about data from items
  const aboutItem = items.length > 0 ? items[0] : null;
  
  // Parse the JSON description if it exists
  const aboutData = aboutItem?.description ? JSON.parse(aboutItem.description || '{}') : null;
  
  // Default values if aboutData not found
  const fullName = aboutData?.full_name || 'Michael Macri';
  const headline = aboutData?.headline || '';
  const introText = aboutData?.intro_text || 'A value-driven leader with 25 years of experience recognized for customer success programs, partner management, and solution advisory, specializing in enterprise technology adoption, renewal, and upsell.';
  const locations = aboutData?.locations || ['Edmonds, WA', 'San Diego, CA', 'San Francisco, CA', 'Chicago, IL', 'South Bend, IN', 'Denver, CO', 'Remote'];
  const skillsItems = aboutData?.skills_items || [
    'Operational Efficiency: Implementing practical solutions that cut training time and prevent compliance issues.',
    'Team Leadership: Building and aligning high-performing teams for clear, measurable results.',
    'Process Improvement: Streamlining workflows to reduce redundancy and enhance transparency.',
    'Product Adoption: Developing self-service tools and playbooks that drive usage and build customer trust.'
  ];
  const successItems = aboutData?.success_items || [
    'Policy & Compliance: Created PolicyHub for on-demand access to 400+ policies, reducing training time and compliance risk.',
    'Customer Success: Built playbooks and dashboards that increased product adoption by 21% and raised NPS by 30 points.',
    'GTM Strategy: Defined and executed business plans driving 644% revenue growth in FY21 H1, 466% in FY21 H2 and a quarterly pipeline increase of 250%.',
    'Partner Growth: Secured top-tier partnerships with GSIs, boosting revenue and outperforming competitors.',
    'AI/ML Initiatives: Acted as SME for enterprise AI/ML policy creation, ensuring ethical compliance and effective data governance.'
  ];
  const references = aboutData?.references || [
    "I have worked with Mike for the past 5 years during my time as an Enterprise Sales Exec at VMware. From Day 1 Mike has been a tremendous business partner (not only to me but most importantly, to my customers). Mike leads by example in holding himself and his team accountable resulting in the highest levels of customer satisfaction and building long-term, trusted, customer relationships. Working with Mike has been a pleasure; his attention to detail, work ethic, and unyielding commitment to delivering customer business goals &amp; outcomes has been invaluable.",
    "I find Mike to be a manager that is a true mentor, coach, and leader. Mike not only guides but listens. When I found myself in a quandary his 'Next Step' has always got me further in my endeavors, from customer maturity to conversations with Directors and above we always moved the needle."
  ];
  
  // Initialize tooltips
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-tooltip]');
    tooltipTriggerList.forEach(element => {
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.textContent = element.getAttribute('data-tooltip');
      element.classList.add('group', 'relative');
      element.appendChild(tooltip);
    });
  }, []);

  const handleAdminDashboardClick = () => {
    navigate('/admin-dashboard');
  };

  return (
    <section className="resume-section" id="about">
      <div className="resume-section-content px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-0">
          {fullName.split(' ')[0]}
          <span className="text-primary"> {fullName.split(' ').slice(1).join(' ')}</span>
        </h1>
        <div className="subheading mb-5">
          <b>Located:</b>
          <div className="flex flex-wrap gap-1 mt-2">
            {locations.map((location, index) => (
              <span key={index} className="badge bg-primary">{location}</span>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Button 
              asChild
              variant="outline"
              className="bg-white text-macri-primary border-2 border-macri-primary hover:bg-macri-primary/10 hover:text-macri-primary flex items-center gap-2"
            >
              <a href="mailto:MikeMacri@gmail.com">
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </Button>
            
            <DownloadResume inlineButton={true} />
            
            {isAdmin && user && (
              <Button 
                onClick={handleAdminDashboardClick}
                className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-600 hover:border-amber-700 flex items-center gap-1"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Button>
            )}
          </div>
        </div>

        {/* About Header */}
        <h3 className="mb-4 border-b-2 border-macri-primary inline-block">About</h3>
        <p className="lead mb-4 text-lg">
          {introText}
        </p>

        <hr className="border-t border-gray-200 my-4" />

        {/* Two-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Skilled In Section */}
          <div className="border-l-4 border-macri-primary bg-gray-50 rounded-lg p-5 shadow-sm">
            <p className="text-sm uppercase font-bold text-macri-primary mb-3">Skilled in:</p>
            <ul className="space-y-3">
              {skillsItems.map((item, index) => {
                const [title, description] = item.split(': ');
                const iconClass = [
                  'fas fa-rocket text-macri-primary',
                  'fas fa-users text-macri-success',
                  'fas fa-sync-alt text-macri-info',
                  'fas fa-user-check text-macri-warning'
                ][index % 4]; // Cycle through the icon classes
                
                return (
                  <li key={index} className="flex gap-3">
                    <i className={`${iconClass} mt-1`}></i>
                    <span><strong>{title}:</strong> {description}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Demonstrated Success Section */}
          <div className="border-l-4 border-macri-primary bg-gray-50 rounded-lg p-5 shadow-sm">
            <p className="text-sm uppercase font-bold text-macri-primary mb-3">Demonstrated success in:</p>
            <ul className="space-y-3">
              {successItems.map((item, index) => {
                const [title, description] = item.split(': ');
                const iconClass = [
                  'fas fa-lightbulb text-macri-warning',
                  'fas fa-chart-line text-macri-success',
                  'fas fa-cubes text-macri-info',
                  'fas fa-handshake text-macri-primary',
                  'fas fa-lightbulb text-macri-warning'
                ][index % 5]; // Cycle through the icon classes
                
                return (
                  <li key={index} className="flex gap-3">
                    <i className={`${iconClass} mt-1`}></i>
                    <span>
                      <strong>{title}:</strong> {description}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* References Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">References</h3>
          {references.map((reference, index) => (
            <blockquote key={index} className="border-l-4 border-macri-primary pl-4 italic my-4 text-gray-600">
              <p className="mb-0 text-sm">{reference}</p>
            </blockquote>
          ))}
          <a 
            href="https://linkedin.com/in/mikemacri/details/recommendations/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View References on LinkedIn
          </a>
        </div>
        
        {/* Mobile Social Icons (only visible on mobile) */}
        <div className="block lg:hidden mb-6">
          <div className="social-icons">
            <a className="social-icon" href="https://linkedin.com/in/mikemacri" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="social-icon" href="https://github.com/mmacri/my-portfolio" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AboutSection: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
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
          Michael
          <span className="text-primary"> Macri</span>
        </h1>
        <div className="subheading mb-5">
          <b>Located:</b>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="badge bg-primary">Edmonds, WA</span>
            <span className="badge bg-primary">San Diego, CA</span>
            <span className="badge bg-primary">San Francisco, CA</span>
            <span className="badge bg-primary">Chicago, IL</span>
            <span className="badge bg-primary">South Bend, IN</span>
            <span className="badge bg-primary">Denver, CO</span>
            <span className="badge bg-primary">Remote</span>
          </div>
          <div className="flex gap-2 mt-2">
            <a className="btn inline-block" 
              style={{ backgroundColor: '#fff', color: '#d35400', border: '2px solid #d35400' }} 
              href="mailto:MikeMacri@gmail.com">
                Contact Me
            </a>
            
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
          <b>A value-driven leader</b> with <u>25 years of experience</u> recognized for <b>customer success programs</b>, <b>partner management</b>, and <b>solution advisory</b>, specializing in <b>enterprise technology adoption</b>, <b>renewal</b>, and <b>upsell</b>. Known for <u>driving transformative initiatives</u> in <u>emerging technologies</u> and <u>hybrid cloud solutions</u>, resulting in <b>multi-million-dollar outcomes</b> by aligning <i>initiatives</i> with <b>executive business objectives</b>.
        </p>

        <hr className="border-t border-gray-200 my-4" />

        {/* Two-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Skilled In Section */}
          <div className="border-l-4 border-macri-primary bg-gray-50 rounded-lg p-5 shadow-sm">
            <p className="text-sm uppercase font-bold text-macri-primary mb-3">Skilled in:</p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <i className="fas fa-rocket text-macri-primary mt-1"></i>
                <span><strong>Operational Efficiency:</strong> Implementing practical solutions that cut training time and prevent compliance issues.</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-users text-macri-success mt-1"></i>
                <span><strong>Team Leadership:</strong> Building and aligning high-performing teams for clear, measurable results.</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-sync-alt text-macri-info mt-1"></i>
                <span><strong>Process Improvement:</strong> Streamlining workflows to reduce redundancy and enhance transparency.</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-user-check text-macri-warning mt-1"></i>
                <span><strong>Product Adoption:</strong> Developing self-service tools and playbooks that drive usage and build customer trust.</span>
              </li>
            </ul>
          </div>
          
          {/* Demonstrated Success Section */}
          <div className="border-l-4 border-macri-primary bg-gray-50 rounded-lg p-5 shadow-sm">
            <p className="text-sm uppercase font-bold text-macri-primary mb-3">Demonstrated success in:</p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <i className="fas fa-lightbulb text-macri-warning mt-1"></i>
                <span>
                  <strong>Policy &amp; Compliance:</strong> Created PolicyHub for on-demand access to <span className="relative group">
                    <b data-tooltip="Centralized over 400 compliance policies">400+ policies</b>
                  </span>, reducing training time and compliance risk.
                </span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-chart-line text-macri-success mt-1"></i>
                <span>
                  <strong>Customer Success:</strong> Built playbooks and dashboards that increased product adoption by <span className="relative group">
                    <b data-tooltip="Increased adoption by 21%">21%</b>
                  </span> and raised NPS by <span className="relative group">
                    <b data-tooltip="NPS improved by 30 points">30 points</b>
                  </span>.
                </span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-cubes text-macri-info mt-1"></i>
                <span>
                  <strong>GTM Strategy:</strong> Defined and executed business plans driving <span className="relative group">
                    <b data-tooltip="Revenue increased by 644% in FY21 H1">644% revenue growth in FY21 H1</b>
                  </span>, <span className="relative group">
                    <b data-tooltip="Revenue increased by 466% in FY21 H2">466% in FY21 H2</b>
                  </span> and a quarterly pipeline increase of <span className="relative group">
                    <b data-tooltip="Quarterly pipeline expanded by 250%">250%</b>
                  </span>.
                </span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-handshake text-macri-primary mt-1"></i>
                <span><strong>Partner Growth:</strong> Secured top-tier partnerships with GSIs, boosting revenue and outperforming competitors.</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-lightbulb text-macri-warning mt-1"></i>
                <span><strong>AI/ML Initiatives:</strong> Acted as SME for enterprise AI/ML policy creation, ensuring ethical compliance and effective data governance.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* References Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">References</h3>
          <blockquote className="border-l-4 border-macri-primary pl-4 italic my-4 text-gray-600">
            <p className="mb-0 text-sm">
              "I have worked with Mike for the past 5 years during my time as an Enterprise Sales Exec at VMware. From Day 1 Mike has been a tremendous business partner (not only to me but most importantly, to my customers). Mike leads by example in holding himself and his team accountable resulting in the highest levels of customer satisfaction and building long-term, trusted, customer relationships. Working with Mike has been a pleasure; his attention to detail, work ethic, and unyielding commitment to delivering customer business goals &amp; outcomes has been invaluable."
            </p>
          </blockquote>
          <blockquote className="border-l-4 border-macri-primary pl-4 italic my-4 text-gray-600">
            <p className="mb-0 text-sm">
              "I find Mike to be a manager that is a true mentor, coach, and leader. Mike not only guides but listens. When I found myself in a quandary his 'Next Step' has always got me further in my endeavors, from customer maturity to conversations with Directors and above we always moved the needle."
            </p>
          </blockquote>
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

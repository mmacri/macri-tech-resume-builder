
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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

  return (
    <>
      {/* About */}
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
            <a className="btn mt-2 inline-block" 
              style={{ backgroundColor: '#fff', color: '#d35400', border: '2px solid #d35400' }} 
              href="mailto:MikeMacri@gmail.com">
                Contact Me
            </a>
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
      
      <hr className="m-0" />
      
      {/* Experience */}
      <section className="resume-section" id="experience">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Experience</h2>

          {/* Experience Card 1 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Sr Manager, InfoSec Solution &amp; Automation Engineering</h3>
                <p className="text-macri-primary text-sm">Dec 2021 - Present</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">ServiceNow.com: Legal, Ethics &amp; Compliance Program</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Created PolicyHub – a self-service portal centralizing <span className="relative group">
                  <b data-tooltip="Centralized over 400 compliance policies">400+ policies</b>
                </span> – to enable fast, secure access to critical compliance documentation and reduce training dependency.</li>
                <li>Enhanced product features in GRC, Policy &amp; Compliance, Strategic Portfolio Manager, and risk management by aligning cross-functional processes.</li>
                <li>Collaborated with executives to resolve production vulnerabilities, mitigating <span className="relative group">
                  <b data-tooltip="Mitigated revenue risk by resolving production vulnerabilities">$900M</b>
                </span> in annual revenue risk.</li>
                <li>Streamlined workflows and implemented common controls to reduce redundant operations and boost data transparency.</li>
              </ul>
            </div>
          </div>

          {/* Experience Card 2 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Partner Business Development &amp; Technical Alliance Director – GSI's Americas</h3>
                <p className="text-macri-primary text-sm">Nov 2019 - Dec 2021</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com: Global System Integrators Program (GSI/MSP Sales)</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Managed VMware's largest alliances with strategic system integrators, driving multi-hundred-million-dollar growth.</li>
                <li>Defined and executed joint business plans that delivered <span className="relative group">
                  <b data-tooltip="Revenue increased by 644% in FY21 H1">644% revenue growth in FY21 H1</b>
                </span> and <span className="relative group">
                  <b data-tooltip="Revenue increased by 466% in FY21 H2">466% in FY21 H2</b>
                </span>.</li>
                <li>Expanded the quarterly pipeline by <span className="relative group">
                  <b data-tooltip="Quarterly pipeline expanded by 250%">250%</b>
                </span> through partnerships with DXC, Capgemini, and others.</li>
                <li>Awarded Partner Business Manager MVP and Regional Technical Alliance Manager of the Quarter on multiple occasions.</li>
              </ul>
            </div>
          </div>

          {/* Experience Card 3 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Partner Staff Solutions Engineer</h3>
                <p className="text-macri-primary text-sm">Dec 2017 - Dec 2019</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com: Channel Partner Engineering</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Partnered with CDW to drive <span className="relative group">
                  <b data-tooltip="Generated $440M in multi-tiered routes-to-market revenue">$440M</b>
                </span> through multi-tiered routes-to-market.</li>
                <li>Delivered targeted SaaS and hybrid cloud campaigns that increased pipeline capture by <span className="relative group">
                  <b data-tooltip="Pipeline capture increased by 20%">20%</b>
                </span>.</li>
                <li>Launched new upsell and cross-sell programs that resulted in a <span className="relative group">
                  <b data-tooltip="Renewal revenue increased by 20%">20% revenue increase</b>
                </span> from renewals.</li>
                <li>Implemented technical enablement programs that boosted solution adoption by <span className="relative group">
                  <b data-tooltip="Solution adoption increased by 20%">20%</b>
                </span>.</li>
              </ul>
            </div>
          </div>

          {/* Experience Card 4 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Sr Manager, Customer Success TAMs &amp; Product Specialists – West Coast Regional Practice</h3>
                <p className="text-macri-primary text-sm">Oct 2014 - Dec 2017</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com - Pre &amp; Post Sales Solutions</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Developed and branded customer success teams that increased solution adoption by <span className="relative group">
                  <b data-tooltip="Solution adoption increased by 44%">44%</b>
                </span> and improved NPS by <span className="relative group">
                  <b data-tooltip="NPS improved by 30 points">30 points</b>
                </span> (20 points above goal).</li>
                <li>Created customer success playbooks, account plans, and success metrics that were adopted nationally.</li>
                <li>Built Salesforce and Power BI dashboards to identify and track key customer success metrics.</li>
              </ul>
            </div>
          </div>

          {/* Experience Card 5 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Staff Technical Account Manager – Team Lead</h3>
                <p className="text-macri-primary text-sm">Dec 2011 - Nov 2014</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">VMware.com - Technical Account Solutions</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Automated Costco's storefront deployment across <span className="relative group">
                  <b data-tooltip="Deployment scaled to over 500 locations">500+ locations</b>
                </span>, reducing setup time from <span className="relative group">
                  <b data-tooltip="Deployment time reduced from 4 hours">4 hours</b>
                </span> to <span className="relative group">
                  <b data-tooltip="Deployment time reduced to 10 minutes">10 minutes</b>
                </span> and generating significant CAPEX/OPEX savings.</li>
                <li>Enabled Nike's adoption of VMware-integrated OpenStack solutions, enhancing operational efficiency and scalability.</li>
              </ul>
            </div>
          </div>

          {/* Experience Card 6 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Senior Systems Engineer – National Channel Partners Team</h3>
                <p className="text-macri-primary text-sm">May 2011 – Dec 2011</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">VMware</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Managed channel partner engagement and enablement plans that increased VMware demand by <span className="relative group">
                  <b data-tooltip="Increased demand by $16.5M in realized revenue">$16.5M</b>
                </span> in realized revenue.</li>
              </ul>
            </div>
          </div>

          {/* Experience Card 7 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Group Manager / Lead Senior Consultant</h3>
                <p className="text-macri-primary text-sm">Jan 2007 – May 2011</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">ISOutsource</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Improved project efficiency and profit margins by <span className="relative group">
                  <b data-tooltip="Efficiency improved by 14%">14%</b>
                </span> using pod-based frameworks.</li>
              </ul>
            </div>
          </div>

          {/* Experience Card 8 */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Entrepreneur / Managing Partner</h3>
                <p className="text-macri-primary text-sm">Nov 2002 – Dec 2006</p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">Connecting Point</h5>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li>Founded a professional services division that led to acquisition and rebranding as <b>Connecting Point of Indiana</b>.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Education */}
      <section className="resume-section" id="education">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Education</h2>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">Xavier University - Williams College of Business</h3>
                <div className="subheading mb-2">MBA</div>
                <div>Management of Information Systems</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">Xavier University</h3>
                <div className="subheading mb-2">B.S.</div>
                <div>Industrial Organizational Psychology</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Skills */}
      <section className="resume-section" id="skills">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Skills</h2>

          {/* Methodologies and Focus */}
          <div className="mb-6">
            <div className="subheading mb-3">Methodologies and Focus</div>
            <ul className="fa-ul space-y-2">
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                Value Selling, Spin Seller, Golden Circle, Phoenix-Project Solutioning, Ethical AI, and Problem Solver
              </li>
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                AI/ML implementation, Prompt Engineering, Business Analytics in ServiceNow, PowerBI, and Salesforce
              </li>
            </ul>
          </div>
          
          {/* Routes to Market */}
          <div className="mb-6">
            <div className="subheading mb-3">Routes to Market</div>
            <ul className="fa-ul space-y-2">
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                Sell to, sell through, Managed Services, OEM, ISV, and GSI
              </li>
            </ul>
          </div>
          
          {/* Solutioning */}
          <div className="mb-6">
            <div className="subheading mb-3">Solutioning</div>
            <ul className="fa-ul space-y-2">
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                ServiceNow Core, GRC/IRM, ITSM, ITOM, SecOps, Performance Analytics, CSM, and ITBM
              </li>
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                VMware vSphere, vSAN, NSX, SD-WAN, vRealize, vROPS, VMC on AWS, and Tanzu
              </li>
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                AWS, Azure, GCP, Docker, SnowFlake, Splunk, Hybrid Cloud, and HashiCorp
              </li>
            </ul>
          </div>
          
          {/* Compliance Frameworks */}
          <div className="mb-6">
            <div className="subheading mb-3">Frameworks</div>
            <ul className="fa-ul space-y-2">
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                NIST 800-53, NIST AI 600-1, NIST 800-190, NIST CSF, HIPAA, PCI, SOC 2, CIS, STIGS and EU AI Act 
              </li>
            </ul>
          </div>
          
          {/* Programming Languages & Tools */}
          <div>
            <div className="subheading mb-3">Programming Languages &amp; Tools</div>
            <div className="flex flex-wrap gap-4 text-3xl mb-4">
              <i className="fab fa-html5 text-[#e34c26]"></i>
              <i className="fab fa-css3-alt text-[#264de4]"></i>
              <i className="fab fa-js-square text-[#f0db4f]"></i>
              <i className="fab fa-angular text-[#dd0031]"></i>
              <i className="fab fa-react text-[#61dafb]"></i>
              <i className="fab fa-node-js text-[#3c873a]"></i>
            </div>
            <ul className="fa-ul">
              <li className="flex gap-2">
                <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                Python, Glide, Javascript, HTML, CSS, React, Vue, LLM, and API integrations
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Interests */}
      <section className="resume-section" id="interests">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Interests</h2>
          <p className="mb-4">Outside of my professional work, I stay current with advancements in AI, automation, and cloud computing—exploring practical applications that solve complex problems.</p>
          <p className="mb-4">I also enjoy traveling between my homes in Washington, California, and Illinois, with outdoor activities like hiking and fishing to recharge.</p>
          <p>Indoors, I pursue photography, AI-powered content projects, and innovative investing in crypto and global stock markets.</p>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Awards */}
      <section className="resume-section" id="awards">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Awards &amp; Certifications</h2>
          <ul className="fa-ul space-y-3">
            <li className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              AI Security and Governance Certification - Securiti (2024)
            </li>
            <li className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              VMware Certified Professional
            </li>
            <li className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q4
            </li>
            <li className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q3
            </li>
            <li className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              GSI Partners - Rockstar of the Half Award - FY21H2
            </li>
            <li className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              Partner Solutions Engineer of the Quarter - FY19Q4
            </li>
            <li className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              VMware Americas VP Award of Service Excellence
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;

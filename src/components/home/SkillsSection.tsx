
import React from 'react';

const SkillsSection: React.FC = () => {
  return (
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
  );
};

export default SkillsSection;

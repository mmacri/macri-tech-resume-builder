
import React from 'react';

interface SkillsSectionProps {
  items: any[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ items = [] }) => {
  // Group skills by category
  const groupedSkills: Record<string, string[]> = {};
  
  if (items && items.length > 0) {
    items.forEach(item => {
      const category = item.organization || "Other";
      if (!groupedSkills[category]) {
        groupedSkills[category] = [];
      }
      groupedSkills[category].push(item.title);
    });
  } else {
    // Default skills by category if no items
    groupedSkills["Methodologies and Focus"] = [
      "Value Selling, Spin Seller, Golden Circle, Phoenix-Project Solutioning, Ethical AI, and Problem Solver",
      "AI/ML implementation, Prompt Engineering, Business Analytics in ServiceNow, PowerBI, and Salesforce"
    ];
    groupedSkills["Routes to Market"] = [
      "Sell to, sell through, Managed Services, OEM, ISV, and GSI"
    ];
    groupedSkills["Solutioning"] = [
      "ServiceNow Core, GRC/IRM, ITSM, ITOM, SecOps, Performance Analytics, CSM, and ITBM",
      "VMware vSphere, vSAN, NSX, SD-WAN, vRealize, vROPS, VMC on AWS, and Tanzu",
      "AWS, Azure, GCP, Docker, SnowFlake, Splunk, Hybrid Cloud, and HashiCorp"
    ];
    groupedSkills["Frameworks"] = [
      "NIST 800-53, NIST AI 600-1, NIST 800-190, NIST CSF, HIPAA, PCI, SOC 2, CIS, STIGS and EU AI Act"
    ];
    groupedSkills["Programming Languages & Tools"] = [
      "Python, Glide, Javascript, HTML, CSS, React, Vue, LLM, and API integrations"
    ];
  }

  return (
    <section className="resume-section" id="skills">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Skills</h2>

        {/* Map through grouped skills */}
        {Object.keys(groupedSkills).map((category, catIndex) => (
          <div key={catIndex} className="mb-6">
            <div className="subheading mb-3">{category}</div>
            <ul className="fa-ul space-y-2">
              {groupedSkills[category].map((skill, skillIndex) => (
                <li key={skillIndex} className="flex gap-2">
                  <span className="w-5 text-center"><i className="fas fa-check text-macri-primary"></i></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Always include programming icons section */}
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
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

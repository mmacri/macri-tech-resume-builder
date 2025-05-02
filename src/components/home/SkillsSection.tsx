
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
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">Skills</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Map through grouped skills */}
          {Object.keys(groupedSkills).map((category, catIndex) => (
            <div key={catIndex} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-macri-primary">{category}</h3>
              <ul className="space-y-2">
                {groupedSkills[category].map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex gap-2 items-start">
                    <span className="text-macri-primary mt-1">•</span>
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Programming icons section */}
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-macri-primary">Programming Languages &amp; Tools</h3>
          <div className="flex flex-wrap gap-6 text-4xl">
            <i className="fab fa-html5 text-[#e34c26]"></i>
            <i className="fab fa-css3-alt text-[#264de4]"></i>
            <i className="fab fa-js-square text-[#f0db4f]"></i>
            <i className="fab fa-angular text-[#dd0031]"></i>
            <i className="fab fa-react text-[#61dafb]"></i>
            <i className="fab fa-node-js text-[#3c873a]"></i>
            <i className="fab fa-python text-[#306998]"></i>
            <i className="fab fa-aws text-[#FF9900]"></i>
            <i className="fab fa-docker text-[#2496ED]"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

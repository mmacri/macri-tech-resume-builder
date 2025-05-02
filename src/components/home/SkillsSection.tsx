
import React from 'react';

interface SkillsSectionProps {
  items: any[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ items = [] }) => {
  // Define our skill categories
  const skillCategories = [
    "Methodologies and Focus",
    "Analytics and Business Intelligence",
    "Routes to Market",
    "Solutioning - ServiceNow",
    "Solutioning - VMware",
    "Solutioning - Cloud",
    "Compliance Frameworks",
    "Programming Languages & Tools"
  ];
  
  // Group skills by category or use defaults
  const groupedSkills: Record<string, string[]> = {};
  
  if (items && items.length > 0) {
    items.forEach(item => {
      // Use title as the skill and organization as the category
      const category = item.title || "Other";
      if (!groupedSkills[category]) {
        groupedSkills[category] = [];
      }
      groupedSkills[category].push(item.description);
    });
  } else {
    // Default skills by category if no items
    groupedSkills["Methodologies and Focus"] = [
      "Value Selling, Spin Seller, Golden Circle, Phoenix-Project Solutioning, Ethical AI, and Problem Solver"
    ];
    groupedSkills["Analytics and Business Intelligence"] = [
      "AI/ML implementation, Prompt Engineering, Business Analytics in ServiceNow, PowerBI, and Salesforce"
    ];
    groupedSkills["Routes to Market"] = [
      "Sell to, sell through, Managed Services, OEM, ISV, and GSI"
    ];
    groupedSkills["Solutioning - ServiceNow"] = [
      "ServiceNow Core, GRC/IRM, ITSM, ITOM, SecOps, Performance Analytics, CSM, and ITBM"
    ];
    groupedSkills["Solutioning - VMware"] = [
      "VMware vSphere, vSAN, NSX, SD-WAN, vRealize, vROPS, VMC on AWS, and Tanzu"
    ];
    groupedSkills["Solutioning - Cloud"] = [
      "AWS, Azure, GCP, Docker, SnowFlake, Splunk, Hybrid Cloud, and HashiCorp"
    ];
    groupedSkills["Compliance Frameworks"] = [
      "NIST 800-53, NIST AI 600-1, NIST 800-190, NIST CSF, HIPAA, PCI, SOC 2, CIS, STIGS and EU AI Act"
    ];
    groupedSkills["Programming Languages & Tools"] = [
      "Python, Glide, Javascript, HTML, CSS, React, Vue, LLM, and API integrations"
    ];
  }

  // Programming icons with their classes and colors
  const programmingIcons = [
    { icon: "fab fa-html5", color: "#e34c26", name: "HTML5" },
    { icon: "fab fa-css3-alt", color: "#264de4", name: "CSS3" },
    { icon: "fab fa-js-square", color: "#f0db4f", name: "JavaScript" },
    { icon: "fab fa-react", color: "#61dafb", name: "React" },
    { icon: "fab fa-vuejs", color: "#41B883", name: "Vue.js" },
    { icon: "fab fa-python", color: "#306998", name: "Python" },
    { icon: "fab fa-aws", color: "#FF9900", name: "AWS" },
    { icon: "fab fa-docker", color: "#2496ED", name: "Docker" },
    { icon: "fab fa-node-js", color: "#3c873a", name: "Node.js" }
  ];

  // Find categories that exist in our data
  const availableCategories = Object.keys(groupedSkills);

  return (
    <section className="resume-section" id="skills">
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">Skills</h2>

        {/* Grid layout for skill categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => {
            // Skip Programming Languages category as we'll render it separately
            if (category === "Programming Languages & Tools" || !groupedSkills[category]) {
              return null;
            }
            
            return (
              <div key={idx} className="skill-card">
                <h3 className="text-xl font-semibold mb-4 text-macri-primary">{category}</h3>
                <ul className="skill-list">
                  {groupedSkills[category].map((skill, skillIdx) => (
                    <li key={skillIdx} className="flex gap-2 items-start">
                      <span className="text-macri-primary mt-1">•</span>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        {/* Programming icons section */}
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-macri-primary">Programming Languages &amp; Tools</h3>
          
          {/* Icons with tooltips */}
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {programmingIcons.map((iconData, idx) => (
              <div key={idx} className="group relative cursor-pointer">
                <i className={`${iconData.icon} skill-icon`} style={{ color: iconData.color }}></i>
                <div className="tooltip">
                  {iconData.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Text description for programming skills */}
          {groupedSkills["Programming Languages & Tools"] && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-gray-700">
                {groupedSkills["Programming Languages & Tools"].join(", ")}
              </p>
            </div>
          )}
        </div>
        
        {/* Workflow section */}
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-macri-primary">Workflow</h3>
          <ul className="fa-ul space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-macri-primary">
                <i className="fas fa-check"></i>
              </span>
              <span className="text-gray-700">Customer-focused, value-driven approach</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-macri-primary">
                <i className="fas fa-check"></i>
              </span>
              <span className="text-gray-700">Collaborative problem solving and partnerships</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-macri-primary">
                <i className="fas fa-check"></i>
              </span>
              <span className="text-gray-700">Cross-functional team leadership</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-macri-primary">
                <i className="fas fa-check"></i>
              </span>
              <span className="text-gray-700">Agile development and continuous improvement</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

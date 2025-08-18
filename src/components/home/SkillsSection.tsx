
import React from 'react';
import ResumeSection from './ResumeSection';
import { staticSkillsData } from '@/data/staticResumeData';
import { Cloud, Server, Globe, Layers, Zap } from 'lucide-react';

interface SkillsSectionProps {
  items?: any[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ items }) => {
  
  // Use items prop if provided, otherwise use static data
  const displayItems = items && items.length > 0 ? items : staticSkillsData;

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
  
  displayItems.forEach(item => {
    // Use title as the skill and organization as the category
    const category = item.title || "Other";
    if (!groupedSkills[category]) {
      groupedSkills[category] = [];
    }
    groupedSkills[category].push(item.description);
  });

  // Programming icons with their classes and colors (removed AWS and Docker)
  const programmingIcons = [
    { icon: "fab fa-html5", color: "#e34c26", name: "HTML5" },
    { icon: "fab fa-css3-alt", color: "#264de4", name: "CSS3" },
    { icon: "fab fa-js-square", color: "#f0db4f", name: "JavaScript" },
    { icon: "fab fa-react", color: "#61dafb", name: "React" },
    { icon: "fab fa-vuejs", color: "#41B883", name: "Vue.js" },
    { icon: "fab fa-python", color: "#306998", name: "Python" },
    { icon: "fab fa-node-js", color: "#3c873a", name: "Node.js" }
  ];

  // Technology icons using Lucide icons and Font Awesome for cloud providers
  const technologyIcons = [
    { component: <Server className="h-8 w-8" />, color: "#00A1C9", name: "ServiceNow" },
    { component: <Cloud className="h-8 w-8" />, color: "#607078", name: "VMware" },
    { component: <Globe className="h-8 w-8" />, color: "#0066CC", name: "SaaS" },
    { component: <Layers className="h-8 w-8" />, color: "#FF6B35", name: "PaaS" },
    { component: <Zap className="h-8 w-8" />, color: "#8B5CF6", name: "XaaS" },
    { icon: "fab fa-aws", color: "#FF9900", name: "AWS" },
    { icon: "fab fa-google", color: "#4285F4", name: "Google Cloud" },
    { icon: "fab fa-docker", color: "#2496ED", name: "Docker" }
  ];

  // Find categories that exist in our data
  const availableCategories = Object.keys(groupedSkills);

  return (
    <ResumeSection id="skills" title="Skills">
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

      {/* Technology & Platforms section */}
      <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold mb-6 text-macri-primary">Enterprise Technologies &amp; Platforms</h3>
        
        {/* Technology icons with tooltips */}
        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          {technologyIcons.map((techData, idx) => (
            <div key={idx} className="group relative cursor-pointer">
              {techData.component ? (
                <div className="transition-transform duration-200 hover:scale-110" style={{ color: techData.color }}>
                  {techData.component}
                </div>
              ) : (
                <i className={`${techData.icon} skill-icon transition-transform duration-200 hover:scale-110`} style={{ color: techData.color }}></i>
              )}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {techData.name}
              </div>
            </div>
          ))}
        </div>
        
        {/* Text description for technologies */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-700">
            ServiceNow Platform Solutions, VMware Infrastructure, Software as a Service (SaaS), Platform as a Service (PaaS), Everything as a Service (XaaS), Amazon Web Services (AWS), Google Cloud Platform (GCP), Docker Containerization
          </p>
        </div>
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
    </ResumeSection>
  );
};

export default SkillsSection;

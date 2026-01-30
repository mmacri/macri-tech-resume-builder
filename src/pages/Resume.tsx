import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Linkedin, Award, GraduationCap, MapPin } from 'lucide-react';
import { staticExperienceData, staticEducationData, staticSkillsData, staticAwardsData } from '@/data/staticResumeData';

const Resume: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Resume - Mike Macri | Security, Platform & Customer Outcomes Leader"
        description="Professional resume for Mike Macri - Cross-functional leader in Solution Engineering, Security Governance, Partner Development, and Customer Success."
        keywords="Mike Macri resume, solution engineering, security compliance, partner development, customer success, GRC, MBA"
        url="https://mikemacri.com/resume"
      />

      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
              <img
                src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                alt="Mike Macri - Professional headshot"
                className="w-28 h-28 rounded-full border-4 border-macri-primary/20 object-cover"
              />
              
              <div className="flex-1 text-center lg:text-left">
                <h1 className="font-saira font-bold text-3xl lg:text-4xl text-macri-primary mb-2">
                  Mike Macri, M.B.A.
                </h1>
                <p className="text-xl text-gray-700 mb-3">
                  Security, Platform & Customer Outcomes Leader
                </p>
                <div className="flex items-center justify-center lg:justify-start text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Edmonds, WA • San Diego, CA • Chicago, IL • Remote</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                Cross-functional leader who builds repeatable frameworks and insight-driven platforms that translate complex security, compliance, and technical systems into measurable business outcomes. Experience operating at scale across VMware and ServiceNow with a strong bias toward outcomes, adoption, and executive clarity.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-macri-primary hover:bg-macri-primary-dark text-white px-6"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 w-5 h-5" />
                  Download Resume
                </a>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-6"
                asChild
              >
                <a href="https://linkedin.com/in/mikemacri" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 w-5 h-5" />
                  LinkedIn Profile
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">$900M</div>
              <div className="text-white/80 text-sm">Risk Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold">450%</div>
              <div className="text-white/80 text-sm">Target Achievement</div>
            </div>
            <div>
              <div className="text-3xl font-bold">83</div>
              <div className="text-white/80 text-sm">NPS Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold">$100M+</div>
              <div className="text-white/80 text-sm">Landmark Deals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {staticExperienceData.map((experience) => (
              <div key={experience.id} className="border-l-4 border-macri-primary/30 pl-6 relative">
                <div className="absolute w-3 h-3 bg-macri-primary rounded-full -left-[7px] top-2"></div>
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="font-semibold text-lg text-macri-primary">
                    {experience.title}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {experience.start_date} - {experience.end_date || 'Present'}
                  </span>
                </div>
                
                <div className="text-gray-900 font-medium">{experience.organization}</div>
                <div className="text-gray-600 text-sm mb-3">{experience.location}</div>
                
                <div className="text-gray-700 text-sm space-y-1">
                  {experience.description.split('\n').filter(line => line.trim().startsWith('•')).slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-macri-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>{item.replace('•', '').trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staticSkillsData.slice(0, 6).map((skill) => (
              <div key={skill.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-macri-primary mb-2">{skill.title}</h3>
                <p className="text-gray-700 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6 flex items-center">
            <GraduationCap className="w-6 h-6 mr-2" />
            Education
          </h2>
          <div className="space-y-4">
            {staticEducationData.map((education) => (
              <div key={education.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-macri-primary">{education.title}</h3>
                    <p className="text-gray-900">{education.organization}</p>
                    <p className="text-gray-600 text-sm">{education.location}</p>
                  </div>
                  <span className="text-sm text-gray-600 mt-2 md:mt-0">{education.end_date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2" />
            Certifications & Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staticAwardsData.map((award) => (
              <div key={award.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                <Award className="w-5 h-5 text-macri-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{award.title}</h3>
                  <p className="text-gray-600 text-sm">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-2xl mb-4">
            Open to Senior IC, Leadership, and Advisory Roles
          </h2>
          <p className="text-white/90 mb-6">
            Available for remote, hybrid, or on-site opportunities across North America.
          </p>
          
          <Button 
            size="lg"
            variant="collaboration"
            className="px-8"
            asChild
          >
            <a href="/contact">
              Get In Touch
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Resume;

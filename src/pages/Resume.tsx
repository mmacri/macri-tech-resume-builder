import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Linkedin, Award, GraduationCap } from 'lucide-react';
import { staticExperienceData, staticEducationData, staticSkillsData, staticAwardsData } from '@/data/staticResumeData';

const Resume: React.FC = () => {
  const keyAchievements = [
    {
      title: 'Scaled Adoption & Value Realization',
      description: 'Designed and led scalable technical enablement and onboarding programs across partner and customer ecosystems, driving measurable adoption, renewal growth (20%), and sustained platform usage across VMware\'s Americas region.'
    },
    {
      title: 'Repeatable Enablement Frameworks',
      description: 'Built standardized onboarding playbooks, maturity checkpoints, and KPI frameworks that removed adoption barriers and accelerated customer progression, contributing to 250% pipeline growth and consistent services and solution attach.'
    },
    {
      title: 'Customer Success Impact at Scale',
      description: 'Led and supported technical success motions across a pooled book of business, delivering high-signal guidance that improved customer outcomes and resulted in NPS of 83 (20 points above target).'
    },
    {
      title: 'Risk, Governance & DevSecOps Outcomes',
      description: 'Delivered cloud-native, security, and compliance advisory that reduced $900M in enterprise risk, while strengthening platform trust, governance adoption, and long-term value realization.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Resume - Mike Macri MBA | Customer Success & Solution Engineering Leader"
        description="Professional resume for Mike Macri MBA - Cross-functional leader in Customer Success Engineering, Solution Engineering, Partner Ecosystems, and Risk-Driven Platforms."
        keywords="Mike Macri resume, customer success engineering, solution engineering, partner development, DevSecOps, MBA"
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
                  Michael Macri MBA
                </h1>
                <p className="text-xl text-gray-700 mb-3">
                  Customer Success Engineering & Solution Engineering Leader
                </p>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                Cross-functional leader with experience spanning Customer Success Engineering, Solution Engineering, partner ecosystems, and risk-driven platforms. Led distributed technical teams and scalable enablement programs across VMware and ServiceNow, driving adoption, renewal growth, and measurable customer value at scale. Proven track record building repeatable frameworks that remove adoption barriers, translate DevSecOps and governance capabilities into business outcomes, and align technical success with commercial impact through close partnership with Sales, Renewals, Product, and Engineering.
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

      {/* Key Achievements */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6">
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-macri-primary mb-2">{achievement.title}</h3>
                <p className="text-gray-700 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {staticExperienceData.map((experience) => (
              <div key={experience.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
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
                  {experience.description.split('\n').filter(line => line.trim()).map((item, index) => {
                    const cleanItem = item.replace('•', '').trim();
                    if (!cleanItem) return null;
                    return (
                      <div key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-macri-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>{cleanItem}</span>
                      </div>
                    );
                  })}
                </div>
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
                <h3 className="font-semibold text-macri-primary">{education.title}</h3>
                <p className="text-gray-900">{education.organization}</p>
                <p className="text-gray-600 text-sm">{education.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section id="awards" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2" />
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staticAwardsData.map((award) => (
              <div key={award.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                <Award className="w-5 h-5 text-macri-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{award.title}</h3>
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

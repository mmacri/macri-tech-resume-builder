import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, MapPin, Mail, Linkedin, Calendar, Award, GraduationCap } from 'lucide-react';
import { staticExperienceData, staticEducationData, staticSkillsData, staticAwardsData } from '@/data/staticResumeData';

const Resume: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Resume - Mike Macri's Professional Experience & Qualifications"
        description="View Mike Macri's comprehensive resume including professional experience, education, skills, and achievements in business consulting and solution architecture."
        keywords="Mike Macri resume, professional experience, business consultant CV, solution architect qualifications, MBA, certifications"
        url="https://mikemacri.com/resume"
      />

      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-macri-primary/10 via-white to-macri-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-saira font-bold text-5xl text-macri-primary mb-4">
              Professional Resume
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive overview of my professional experience, education, and achievements
            </p>
            
            {/* Download Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-3"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 w-5 h-5" />
                  Download PDF Resume
                </a>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-3"
                asChild
              >
                <a href="https://linkedin.com/in/mikemacri" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 w-5 h-5" />
                  LinkedIn Profile
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <img
                src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                alt="Mike Macri - Professional headshot"
                className="w-32 h-32 rounded-full border-4 border-macri-primary/20 object-cover"
              />
              
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-saira font-bold text-3xl text-macri-primary mb-2">
                  Mike Macri, M.B.A.
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Strategic Business Consultant & Solution Architect
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href="mailto:mike@mikemacri.com" className="hover:text-macri-primary transition-colors">
                      mike@mikemacri.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-2" />
                    <a 
                      href="https://linkedin.com/in/mikemacri" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-macri-primary transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-6">
            Professional Summary
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              Strategic business consultant and solution architect with over 15 years of experience 
              driving organizational transformation and growth. Proven track record of implementing 
              governance frameworks, managing complex technology initiatives, and optimizing business 
              processes across diverse industries.
            </p>
            <p className="text-lg leading-relaxed">
              Expertise in solution consulting, risk management, partner ecosystem development, and 
              customer success optimization. Consistently delivers measurable results through innovative 
              approaches, strategic thinking, and collaborative leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8">
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">$50M+</div>
              <div className="font-semibold text-gray-900 mb-2">Revenue Growth Managed</div>
              <p className="text-gray-700 text-sm">
                Successfully managed initiatives resulting in over $50M in revenue growth across multiple client engagements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">40%</div>
              <div className="font-semibold text-gray-900 mb-2">Risk Reduction Average</div>
              <p className="text-gray-700 text-sm">
                Implemented governance frameworks that reduced organizational risk by an average of 40%.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">95%</div>
              <div className="font-semibold text-gray-900 mb-2">Client Satisfaction Rate</div>
              <p className="text-gray-700 text-sm">
                Maintained exceptional client satisfaction through strategic consulting and solution delivery.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">500+</div>
              <div className="font-semibold text-gray-900 mb-2">Stakeholders Managed</div>
              <p className="text-gray-700 text-sm">
                Successfully coordinated and managed relationships with over 500 stakeholders across various initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {staticExperienceData.slice(0, 4).map((experience) => (
              <div key={experience.id} className="border-l-4 border-macri-primary/30 pl-6 relative">
                <div className="absolute w-3 h-3 bg-macri-primary rounded-full -left-2 top-2"></div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="font-semibold text-xl text-macri-primary">
                      {experience.title}
                    </h3>
                    <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                      {experience.start_date} - {experience.end_date || 'Present'}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="font-medium text-lg text-gray-900">{experience.organization}</div>
                    <div className="text-gray-600 italic">{experience.location}</div>
                  </div>
                  
                  <div className="text-gray-700 space-y-2">
                    {experience.description.split('•').filter(item => item.trim()).map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-macri-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {staticSkillsData.slice(0, 4).map((skill) => (
              <div key={skill.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-semibold text-xl text-macri-primary mb-4">
                  {skill.title}
                </h3>
                <p className="text-gray-700">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8 flex items-center">
            <GraduationCap className="w-8 h-8 mr-3" />
            Education
          </h2>
          <div className="space-y-6">
            {staticEducationData.map((education) => (
              <div key={education.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="font-semibold text-xl text-macri-primary">
                    {education.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-600">
                    {education.end_date}
                  </span>
                </div>
                <div className="text-lg text-gray-900 font-medium mb-1">
                  {education.organization}
                </div>
                <div className="text-gray-600">
                  {education.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3" />
            Awards & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staticAwardsData.map((award) => (
              <div key={award.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-start mb-3">
                  <Award className="w-6 h-6 text-macri-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-macri-primary">
                      {award.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-4xl mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Interested in leveraging my expertise for your next project? 
            I'd love to discuss how I can help drive your business forward.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-macri-primary hover:bg-gray-100 px-8 py-3"
              asChild
            >
              <a href="/contact">
                <Mail className="mr-2 w-5 h-5" />
                Contact Me
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-macri-primary px-8 py-3"
              asChild
            >
              <a href="/portfolio">
                <ExternalLink className="mr-2 w-5 h-5" />
                View Portfolio
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resume;
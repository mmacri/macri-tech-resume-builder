import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, MapPin, Mail, Linkedin, Calendar, Award, GraduationCap, Star } from 'lucide-react';
import { staticExperienceData, staticEducationData, staticSkillsData, staticAwardsData } from '@/data/staticResumeData';
import FloatingResumeNav from '@/components/resume/FloatingResumeNav';

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
      <section className="py-8 sm:py-16 bg-gradient-to-br from-macri-primary/10 via-white to-macri-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 border border-gray-200">
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mb-6">
                  <img
                    src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                    alt="Mike Macri - Professional headshot"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-macri-primary/20 object-cover"
                  />
                  
                   <div className="flex-1 text-center lg:text-left">
                     <h1 className="font-saira font-bold text-2xl sm:text-4xl text-macri-primary mb-2">
                       Mike Macri, M.B.A.
                     </h1>
                     <p className="text-lg sm:text-xl text-gray-700 mb-4">
                       Strategic Business Consultant & Solution Architect
                     </p>
                     
                      <div className="flex flex-col gap-2 justify-center lg:justify-start text-gray-600">
                        <div className="flex items-center justify-center lg:justify-start">
                          <span className="text-sm sm:text-base text-center lg:text-left">📍 Available in: Edmonds, WA • San Diego, CA • Chicago, IL • Denver, CO • Remote/Hybrid</span>
                        </div>
                      </div>
                   </div>
                </div>

                 {/* Professional Summary */}
                 <div className="mb-6">
                   <h2 className="font-saira font-bold text-xl sm:text-2xl text-macri-primary mb-4">
                     Professional Summary
                   </h2>
                   <div className="prose prose-lg max-w-none text-gray-700">
                     <p className="text-base sm:text-lg leading-relaxed mb-4">
                       <strong>Cross-Functional Strategic Leader</strong> integrating <strong>Solution Engineering</strong>, <strong>Customer Success</strong>, <strong>Partner Ecosystem Development</strong>, and <strong>Compliance & Risk Management</strong> to deliver enterprise-wide business impact. At ServiceNow, bridged technical innovation with governance expertise, delivering $900M in risk reduction through GRC solution advisory, PolicyHub module creation, and AI/ML ethics framework establishment while driving customer zero initiatives and influencing product roadmaps.
                     </p>
                     <p className="text-base sm:text-lg leading-relaxed">
                       At VMware, unified customer success strategies with partner ecosystem building, securing two $50M+ landmark deals through joint business planning while scaling advisory teams across the US West. Achieved 83 NPS (20 points above company target), 450% sales attainment, and $440M in partner-influenced revenue by integrating solution delivery excellence with strategic relationship management and compliance frameworks that accelerate adoption and strengthen enterprise resilience.
                     </p>
                   </div>
                 </div>

                 {/* Contact Links - Only LinkedIn and Website */}
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                     size="lg"
                     variant="outline"
                     className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-6 py-3"
                     asChild
                   >
                     <a href="https://linkedin.com/in/mikemacri" target="_blank" rel="noopener noreferrer">
                       <Linkedin className="mr-2 w-5 h-5" />
                       LinkedIn Profile
                     </a>
                   </Button>
                   
                   <Button 
                     size="lg"
                     variant="outline"
                     className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-6 py-3"
                     asChild
                   >
                     <a href="https://mikemacri.com" target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="mr-2 w-5 h-5" />
                       Visit Website
                     </a>
                   </Button>
                 </div>
              </div>
            </div>

            {/* About Me Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h3 className="font-saira font-bold text-lg text-macri-primary mb-3">About Me</h3>
                
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold text-macri-primary mb-1">Key Strengths</h4>
                    <ul className="space-y-0.5 text-xs">
                      <li>• Solution Architecture</li>
                      <li>• Strategic Planning</li>
                      <li>• Risk Management</li>
                      <li>• Partner Development</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-macri-primary mb-1">Industries</h4>
                    <ul className="space-y-0.5 text-xs">
                      <li>• Technology Services</li>
                      <li>• Enterprise Software</li>
                      <li>• Cloud Solutions</li>
                      <li>• Compliance & Security</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-macri-primary mb-2">References</h4>
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white text-xs"
                        asChild
                      >
                        <a href="https://www.linkedin.com/in/mikemacri/details/recommendations/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 w-3 h-3" />
                          View References
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <FloatingResumeNav />

       {/* Key Achievements */}
       <section id="achievements" className="py-8 sm:py-12 bg-gray-50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="font-saira font-bold text-2xl sm:text-3xl text-macri-primary mb-6 sm:mb-8">
             Key Achievements
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">$900M</div>
              <div className="font-semibold text-gray-900 mb-2">Risk Reduction Delivered</div>
              <p className="text-gray-700 text-sm">
                Successfully managed initiatives at ServiceNow resulting in $900M in enterprise risk reduction through solution advisory.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">450%</div>
              <div className="font-semibold text-gray-900 mb-2">Sales Target Achievement</div>
              <p className="text-gray-700 text-sm">
                Exceeded sales targets by 450% at VMware through strategic partner joint business planning and execution.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">83</div>
              <div className="font-semibold text-gray-900 mb-2">Net Promoter Score</div>
              <p className="text-gray-700 text-sm">
                Achieved NPS of 83, which is 20 points above company target, through exceptional customer success delivery.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-macri-primary mb-2">$100M+</div>
              <div className="font-semibold text-gray-900 mb-2">Landmark Deal Value</div>
              <p className="text-gray-700 text-sm">
                Secured two record-setting $50M+ deals through strategic partner alliance and business development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 bg-white">
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
      <section id="skills" className="py-12 bg-gray-50">
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
      <section id="education" className="py-12 bg-white">
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
      <section id="awards" className="py-12 bg-gray-50">
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
              variant="collaboration"
              className="px-8 py-3"
              asChild
            >
              <a href="/contact">
                <Mail className="mr-2 w-5 h-5" />
                Contact Me
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="collaborationOutline"
              className="px-8 py-3"
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
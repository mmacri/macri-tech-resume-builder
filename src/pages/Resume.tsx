import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, MapPin, Mail, Linkedin, Calendar, Award, GraduationCap, Star } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
                  <img
                    src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                    alt="Mike Macri - Professional headshot"
                    className="w-32 h-32 rounded-full border-4 border-macri-primary/20 object-cover"
                  />
                  
                  <div className="flex-1 text-center lg:text-left">
                    <h1 className="font-saira font-bold text-4xl text-macri-primary mb-2">
                      Mike Macri, M.B.A.
                    </h1>
                    <p className="text-xl text-gray-700 mb-4">
                      Strategic Business Consultant & Solution Architect
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Seattle, WA • San Diego, CA • Chicago Metro Area</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 mr-2 text-center">📍</span>
                        <span>Available Nationwide - Onsite or Remote</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-6">
                  <h2 className="font-saira font-bold text-2xl text-macri-primary mb-4">
                    Professional Summary
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="text-lg leading-relaxed mb-4">
                      Strategic Solution Engineering Leader with a proven record of aligning technical solutions to business priorities, accelerating adoption, and mitigating enterprise risk. At ServiceNow, delivered $900M in risk reduction through customer zero solution advisory and technical governance initiatives.
                    </p>
                    <p className="text-lg leading-relaxed">
                      At VMware, grew advisory teams across the US West and delivered partner joint business planning that secured two $50M+ landmark deals. Recognized for driving brand growth with an NPS of 83 (20 points above company target of 63) and 100% deal attach rate, scaling partner ecosystems to go-to-market jointly and resolving complex global compliance challenges that strengthened enterprise resilience.
                    </p>
                  </div>
                </div>

                {/* Download and LinkedIn Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>

            {/* About Me Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-8">
                <h3 className="font-saira font-bold text-xl text-macri-primary mb-4">About Me</h3>
                
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold text-macri-primary mb-2">Key Strengths</h4>
                    <ul className="space-y-1">
                      <li>• Solution Architecture</li>
                      <li>• Strategic Planning</li>
                      <li>• Risk Management</li>
                      <li>• Partner Development</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-macri-primary mb-2">Industries</h4>
                    <ul className="space-y-1">
                      <li>• Technology Services</li>
                      <li>• Enterprise Software</li>
                      <li>• Cloud Solutions</li>
                      <li>• Compliance & Security</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-macri-primary mb-2">References</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded text-xs">
                        <p className="italic mb-2">
                          "I have worked with Mike for the past 5 years during my time as an Enterprise Sales Exec at VMware. From Day 1 Mike has been a tremendous business partner... his attention to detail, work ethic, and unyielding commitment to delivering customer business goals & outcomes has been invaluable."
                        </p>
                        <p className="text-macri-primary font-medium">- LinkedIn Recommendation</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded text-xs">
                        <p className="italic mb-2">
                          "I find Mike to be a manager that is a true mentor, coach, and leader. Mike not only guides but listens. When I found myself in a quandary his 'Next Step' has always got me further in my endeavors."
                        </p>
                        <p className="text-macri-primary font-medium">- LinkedIn Recommendation</p>
                      </div>
                      
                      <div className="text-center mt-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white text-xs"
                          asChild
                        >
                          <a href="https://www.linkedin.com/in/mikemacri/details/recommendations/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 w-3 h-3" />
                            View All References
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-saira font-bold text-lg text-macri-primary mb-4 text-center">Quick Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white transition-all duration-200"
                  onClick={() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <Award className="mr-1 w-4 h-4" />
                  Achievements
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white transition-all duration-200"
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <Calendar className="mr-1 w-4 h-4" />
                  Experience
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white transition-all duration-200"
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <Star className="mr-1 w-4 h-4" />
                  Skills
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white transition-all duration-200"
                  onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <GraduationCap className="mr-1 w-4 h-4" />
                  Education
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white transition-all duration-200"
                  onClick={() => document.getElementById('awards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <Award className="mr-1 w-4 h-4" />
                  Awards
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section id="achievements" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8">
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
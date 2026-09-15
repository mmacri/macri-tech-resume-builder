import React from 'react';
import { Download, Linkedin, Award, GraduationCap, CheckCircle } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { staticAwardsData, staticEducationData } from '@/data/staticResumeData';
import { capabilities, experiences, metrics, profile } from '@/data/careerData';

const Resume: React.FC = () => {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <>
      <SEOHead
        title="Resume | Mike Macri MBA"
        description="Interactive resume for Michael Macri, MBA, Customer Success Engineering and Technology Leader currently leading Customer Success Engineering at GitLab."
        keywords="Michael Macri resume, GitLab Customer Success Engineering, DevSecOps, ServiceNow, VMware, MBA"
        url="https://mikemacri.com/resume"
      />

      <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
            <div className="mb-6 flex flex-col items-center gap-6 lg:flex-row">
              <img
                src={`${assetBase}lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png`}
                alt="Michael Macri professional headshot"
                className="h-28 w-28 rounded-full border-4 border-macri-primary/20 object-cover"
              />
              <div className="flex-1 text-center lg:text-left">
                <h1 className="mb-2 font-saira text-3xl font-bold text-macri-primary lg:text-4xl">{profile.name}</h1>
                <p className="mb-2 text-xl text-gray-700">{profile.headline}</p>
                <p className="text-sm font-medium text-macri-primary">{profile.currentRole} | {profile.currentCompany} | {profile.currentDates}</p>
              </div>
            </div>
            <div className="mb-6 border-b border-gray-200 pb-6">
              <p className="leading-7 text-gray-700">{profile.summary}</p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
                <a href={`${assetBase}resume.pdf`} download><Download className="mr-2 h-5 w-5" /> Download Resume</a>
              </Button>
              <Button size="lg" variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-5 w-5" /> LinkedIn Profile</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-saira text-2xl font-bold text-macri-primary">Selected Impact</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <p className="text-3xl font-bold text-macri-primary">{metric.metric}</p>
                <h3 className="mb-1 font-semibold text-gray-900">{metric.label}</h3>
                <p className="mb-2 text-sm font-medium text-gray-600">{metric.organization}</p>
                <p className="text-sm leading-6 text-gray-700">{metric.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-saira text-2xl font-bold text-macri-primary">Professional Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience) => (
              <article key={experience.id} className={`rounded-lg border bg-white p-6 shadow-sm ${experience.id === 'gitlab' ? 'border-macri-primary border-l-4' : 'border-gray-200'}`}>
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {experience.id === 'gitlab' && <Badge className="bg-macri-primary text-white">CURRENT</Badge>}
                      {experience.advisory && <Badge variant="secondary">Independent Consulting / Advisory</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold text-macri-primary">{experience.title}</h3>
                    <p className="font-medium text-gray-900">{experience.organization}</p>
                    <p className="text-sm text-gray-600">{experience.location}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{experience.period}</span>
                </div>
                <p className="mb-3 text-sm leading-6 text-gray-700">{experience.summary}</p>
                <ul className="space-y-2">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-6 text-gray-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-saira text-2xl font-bold text-macri-primary">Capability Areas</h2>
          <div className="space-y-4">
            {capabilities.map((capability) => (
              <div key={capability.title} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-3 font-semibold text-macri-primary">{capability.title}</h3>
                <p className="text-sm leading-6 text-gray-700">{capability.topics.join(' | ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 flex items-center font-saira text-2xl font-bold text-macri-primary"><GraduationCap className="mr-2 h-6 w-6" /> Education</h2>
          <div className="space-y-4">
            {staticEducationData.map((education) => (
              <div key={education.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="font-semibold text-macri-primary">{education.title}</h3>
                <p className="text-gray-900">{education.organization}</p>
                <p className="text-sm text-gray-600">{education.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="awards" className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 flex items-center font-saira text-2xl font-bold text-macri-primary"><Award className="mr-2 h-6 w-6" /> Awards & Recognition</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {staticAwardsData.map((award) => (
              <div key={award.id} className="flex items-start rounded-lg border border-gray-200 bg-gray-50 p-4">
                <Award className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-macri-primary" />
                <h3 className="text-sm font-semibold text-gray-900">{award.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-macri-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-saira text-2xl font-bold">Professional Profile</h2>
          <p className="mb-6 text-white/90">Connect with Mike to discuss Customer Success Engineering, DevSecOps adoption, AI governance, partner ecosystems, and enterprise technology leadership.</p>
          <Button size="lg" variant="collaboration" asChild>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Resume;

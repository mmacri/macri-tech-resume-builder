import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, Linkedin, Shield, TrendingUp, Users, Workflow } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { careerCompanies, careerProgression, capabilities, metrics, profile, seoDefaults } from '@/data/careerData';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead title={seoDefaults.title} description={seoDefaults.description} url="https://mikemacri.com" />

      <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="order-2 lg:order-1 lg:col-span-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-macri-primary">
              {profile.name}
            </p>
            <h1 className="mb-5 font-saira text-4xl font-bold leading-tight text-macri-primary lg:text-6xl">
              {profile.headline}
            </h1>
            <p className="mb-4 max-w-3xl text-xl leading-relaxed text-gray-700 lg:text-2xl">
              {profile.positioning}
            </p>
            <p className="mb-8 max-w-3xl text-base leading-7 text-gray-700 lg:text-lg">
              {profile.secondary}
            </p>

            <div className="mb-8 flex flex-wrap gap-3" aria-label="Career history">
              {careerCompanies.map((company) => (
                <div key={company.name} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
                  <span className="font-semibold text-macri-primary">{company.name}</span>
                  <span className="ml-2 text-gray-500">{company.years}</span>
                  {company.current && <span className="ml-2 rounded-full bg-macri-primary/10 px-2 py-0.5 text-xs text-macri-primary">Current</span>}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
                <Link to="/selected-work">
                  Explore My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild>
                <Link to="/experience">View Experience</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" /> Resume
                </a>
              </Button>
              <Button size="lg" variant="ghost" className="text-macri-primary hover:bg-macri-primary/10" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4">
            <div className="relative">
              <img
                src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                alt="Michael Macri professional headshot"
                className="h-64 w-64 rounded-full border-8 border-white object-cover shadow-2xl lg:h-80 lg:w-80"
              />
              <div className="absolute -bottom-2 left-4 right-4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-center shadow-lg">
                <p className="text-sm font-semibold text-macri-primary">{profile.currentRole}</p>
                <p className="text-xs text-gray-600">{profile.currentCompany} | {profile.currentDates}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-macri-primary py-10 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {metrics.map((item) => (
            <details key={item.label} className="group rounded-lg border border-white/20 bg-white/10 p-5 open:bg-white open:text-gray-800">
              <summary className="cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <span className="block text-4xl font-bold">{item.metric}</span>
                <span className="block font-medium">{item.label}</span>
                <span className="block text-sm opacity-80 group-open:opacity-100">{item.organization}</span>
              </summary>
              <div className="mt-4 space-y-2 text-sm leading-6">
                <p><strong>Context:</strong> {item.context}</p>
                <p><strong>Contribution:</strong> {item.contribution}</p>
                <p><strong>Outcome:</strong> {item.outcome}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="mb-3 font-saira text-3xl font-bold text-macri-primary">One Leadership Story, Several Arenas</h2>
            <p className="text-lg leading-8 text-gray-700">
              Mike builds technical organizations, programs, and operating models that connect technology adoption with customer and business outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {capabilities.map((capability, index) => (
              <div key={capability.title} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-macri-primary text-sm font-bold text-white">{index + 1}</div>
                <h3 className="mb-3 text-base font-semibold text-macri-primary">{capability.title}</h3>
                <p className="text-sm leading-6 text-gray-600">{capability.topics.slice(0, 5).join(' | ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-saira text-3xl font-bold text-macri-primary">Career Progression</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
            {careerProgression.map((step, index) => (
              <div key={step} className="relative rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                <p className="text-sm font-semibold text-gray-800">{step}</p>
                {index < careerProgression.length - 1 && (
                  <ArrowRight className="mx-auto mt-3 hidden h-4 w-4 text-macri-primary md:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { icon: Users, title: 'Teams & Operating Models', text: 'Led and coached technical teams while designing repeatable engagement models that scale customer outcomes.' },
            { icon: Workflow, title: 'DevSecOps & Adoption', text: 'Connects modern software delivery, platform adoption, security, and value realization through practical customer programs.' },
            { icon: Shield, title: 'Governance & Risk', text: 'Turns governance, AI, compliance, and enterprise risk into clear controls, workflows, and executive decisions.' },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <item.icon className="mb-4 h-7 w-7 text-macri-primary" />
              <h3 className="mb-2 text-lg font-semibold text-macri-primary">{item.title}</h3>
              <p className="text-sm leading-6 text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-macri-primary py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-saira text-3xl font-bold">Here is what Mike does, and the evidence behind it.</h2>
          <p className="mb-8 text-lg text-white/90">
            Explore case studies, projects, and resume details across GitLab, ServiceNow, VMware, and independent advisory work.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="collaboration" asChild>
              <Link to="/selected-work">
                <FileText className="mr-2 h-5 w-5" /> Selected Work
              </Link>
            </Button>
            <Button size="lg" variant="collaborationOutline" asChild>
              <Link to="/projects">
                <TrendingUp className="mr-2 h-5 w-5" /> Projects & Experiments
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

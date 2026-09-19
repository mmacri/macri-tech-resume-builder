import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { capabilities, careerProgression, experiences, metrics, profile } from '@/data/careerData';
import { staticAwardsData } from '@/data/staticResumeData';

const ExperienceImpact: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Experience | Mike Macri MBA"
        description="Career progression across GitLab, ServiceNow, VMware, and independent advisory work, focused on customer success engineering, DevSecOps, solution engineering, partner ecosystems, AI governance, and enterprise technology adoption."
        keywords="Mike Macri experience, GitLab, customer success engineering, DevSecOps, ServiceNow, VMware, solution engineering"
        url="https://mikemacri.com/experience"
      />

      <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-macri-primary text-white">Current: {profile.currentRole} at {profile.currentCompany}</Badge>
          <h1 className="mb-6 font-saira text-4xl font-bold text-macri-primary lg:text-5xl">Experience & Impact</h1>
          <p className="mx-auto max-w-3xl text-xl leading-8 text-gray-700">
            Senior Customer Success leadership across GitLab, ServiceNow, VMware, and independent advisory work. The common thread: building and developing post-sales technical teams and data-driven operating models that connect adoption, consumption, customer health, expansion, retention, and value realization.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-saira text-3xl font-bold text-macri-primary">Career Story</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
            {careerProgression.map((step, index) => (
              <div key={step} className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-sm font-semibold text-gray-800">{step}</p>
                {index < careerProgression.length - 1 && <ArrowRight className="mx-auto mt-3 hidden h-4 w-4 text-macri-primary md:block" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-saira text-3xl font-bold text-macri-primary">Professional Timeline</h2>
          <div className="space-y-6">
            {experiences.map((role) => (
              <article
                key={role.id}
                className={`rounded-lg border bg-white p-6 shadow-sm ${role.id === 'gitlab' ? 'border-macri-primary border-l-4' : role.advisory ? 'border-l-4 border-l-gray-300' : 'border-gray-200 border-l-4 border-l-macri-primary/50'}`}
              >
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {role.id === 'gitlab' && <Badge className="bg-macri-primary text-white">CURRENT</Badge>}
                      {role.advisory && <Badge variant="secondary">Independent Consulting / Advisory</Badge>}
                      <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">{role.theme}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-macri-primary">{role.title}</h3>
                    <p className="font-medium text-gray-900">{role.organization}</p>
                    <p className="text-sm text-gray-600">{role.location}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 md:text-right">{role.period}</p>
                </div>
                <p className="mb-4 leading-7 text-gray-700">{role.summary}</p>
                <ul className="space-y-2">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-gray-700">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-saira text-3xl font-bold text-macri-primary">Recognition</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staticAwardsData.map((award) => (
              <div key={award.id} className="flex items-start rounded-lg border border-gray-200 bg-gray-50 p-5">
                <Award className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-macri-primary" />
                <div>
                  <h3 className="font-semibold text-gray-900">{award.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 font-saira text-3xl font-bold text-macri-primary">Capability Areas</h2>
          <p className="mb-8 max-w-3xl text-gray-700">
            These are not separate identities. They are connected ways Mike has applied the same leadership pattern: technology, customers, people, and business outcomes.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability.title} className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-3 text-lg font-semibold text-macri-primary">{capability.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {capability.topics.map((topic) => (
                    <span key={topic} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">{topic}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-saira text-3xl font-bold text-macri-primary">Validated Impact Metrics</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item) => (
              <details key={item.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm open:ring-2 open:ring-macri-primary/20">
                <summary className="cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-macri-primary">
                  <span className="block text-3xl font-bold text-macri-primary">{item.metric}</span>
                  <span className="block font-semibold text-gray-900">{item.label}</span>
                  <span className="block text-sm text-gray-600">{item.organization}</span>
                </summary>
                <div className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
                  <p><strong>Context:</strong> {item.context}</p>
                  <p><strong>Contribution:</strong> {item.contribution}</p>
                  <p><strong>Outcome:</strong> {item.outcome}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-macri-primary py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-saira text-3xl font-bold">Explore The Evidence</h2>
          <p className="mb-8 text-lg text-white/90">Case studies show how these leadership patterns were applied across customer success, DevSecOps, solution engineering, partner ecosystems, and governance.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="collaboration" asChild>
              <Link to="/selected-work">Selected Work <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="collaborationOutline" asChild>
              <Link to="/resume">Full Resume <ExternalLink className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceImpact;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, CheckCircle } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { caseStudies, caseStudyDetails, cseProcess } from '@/data/careerData';

const SelectedWork: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Selected Work | Mike Macri"
        description="Leadership case studies showing Mike Macri’s role, operating approach, cross-functional partners, and outcomes across Customer Success Engineering, platform adoption, governance, and partner ecosystems."
        keywords="Mike Macri selected work, customer success engineering, ServiceNow Policy Hub, AI governance, VMware partner enablement, GitLab CSE"
        url="https://mikemacri.com/selected-work"
      />

      <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 font-saira text-4xl font-bold text-macri-primary lg:text-5xl">Selected Work</h1>
          <p className="mx-auto max-w-3xl text-xl leading-8 text-gray-700">
            Evidence of how Mike approaches technical customer-success problems: clarify the environment, define his role, build a repeatable system, and show what changed.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {caseStudies.map((study) => {
              const detail = caseStudyDetails[study.id];
              return (
              <article key={study.id} id={study.id} className="scroll-mt-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {study.image && (
                    <div className="bg-gray-100 lg:col-span-4">
                      <img src={study.image} alt={`${study.title} preview`} className="h-full min-h-64 w-full object-cover object-top" />
                    </div>
                  )}
                  <div className={study.image ? 'p-6 lg:col-span-8 lg:p-8' : 'p-6 lg:col-span-12 lg:p-8'}>
                    <Badge variant="secondary" className="mb-4">{study.category}</Badge>
                    <h2 className="mb-2 font-saira text-2xl font-bold text-macri-primary">{study.title}</h2>
                    <p className="mb-6 text-lg text-gray-700">{study.subtitle}</p>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">Challenge</h3>
                        <p className="leading-7 text-gray-700">{study.problem}</p>
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">Environment / Constraints</h3>
                        <p className="leading-7 text-gray-700">{detail.environment}</p>
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">My Role</h3>
                        <p className="leading-7 text-gray-700">{detail.role}</p>
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">Approach</h3>
                        <p className="leading-7 text-gray-700">{study.approach}</p>
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">What Was Built / Changed</h3>
                        <p className="leading-7 text-gray-700">{detail.changed}</p>
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">Cross-Functional Partners</h3>
                        <p className="leading-7 text-gray-700">{detail.partners.join(' · ')}</p>
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">Outcome</h3>
                        <ul className="space-y-2">
                          {study.outcomes.map((outcome) => (
                            <li key={outcome} className="flex gap-2 text-sm leading-6 text-gray-700">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">Leadership Lesson</h3>
                        <p className="leading-7 text-gray-700">{detail.lesson}</p>
                      </div>
                    </div>

                    {study.id === 'scaling-cse' && (
                      <div className="mt-8 rounded-lg border border-macri-primary/20 bg-white p-5">
                        <h3 className="mb-4 font-semibold text-macri-primary">Engagement Model</h3>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-7 md:items-stretch">
                          {cseProcess.map((step, index) => (
                            <div key={step} className="flex flex-col items-center">
                              <div className="flex min-h-20 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3 text-center text-sm font-semibold text-gray-800">
                                {step}
                              </div>
                              {index < cseProcess.length - 1 && (
                                <>
                                  <ArrowDown className="my-2 h-5 w-5 text-macri-primary md:hidden" aria-hidden="true" />
                                  <ArrowRight className="my-2 hidden h-5 w-5 text-macri-primary md:block" aria-hidden="true" />
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="mt-5 rounded-lg bg-macri-primary/5 p-4 text-sm font-medium leading-6 text-gray-800">
                          Use digital programs to create reach. Use technical signals to create focus. Use CSE expertise where human engagement creates the greatest customer impact.
                        </p>
                        <p className="mt-3 text-xs text-gray-600">{study.note}</p>
                      </div>
                    )}

                  </div>
                </div>
              </article>
            );})}
          </div>
        </div>
      </section>

      <section className="bg-macri-primary py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-saira text-3xl font-bold">Projects Show The Same Pattern In Practice</h2>
          <p className="mb-8 text-lg text-white/90">Explore platforms, dashboards, training tools, and technical experiments built around customer success, governance, security, and operational problems.</p>
          <Button size="lg" variant="collaboration" asChild>
            <Link to="/projects">Projects & Experiments <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default SelectedWork;

import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Flow } from '@/components/leadership/LeadershipVisuals';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { caseStudies, caseStudyDetails, cseProcess } from '@/data/careerData';

const SelectedWork: React.FC = () => (
  <>
    <SEOHead
      title="Selected Work | Mike Macri"
      description="Leadership case studies showing Mike Macri’s role and results across Customer Success Engineering, customer operating models, enterprise governance, and partner ecosystems."
      keywords="Mike Macri selected work, customer success engineering, ServiceNow Policy Hub, VMware customer success, partner enablement"
      url="https://mikemacri.com/selected-work"
    />

    <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-5 font-saira text-4xl font-bold text-slate-900 sm:text-5xl">Selected Work</h1>
        <p className="max-w-4xl text-xl leading-8 text-gray-700">Examples of Mike’s judgment and execution across technical Customer Success, people leadership, enterprise governance, and partner ecosystems. Each summary can be expanded for the full case study.</p>
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl space-y-7 px-4 sm:px-6 lg:px-8">
        {caseStudies.map((study) => {
          const detail = caseStudyDetails[study.id];
          return (
            <article key={study.id} id={study.id} className="scroll-mt-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {study.image && <div className="bg-gray-100 lg:col-span-4"><img src={study.image} alt={`${study.title} preview`} className="h-full min-h-64 w-full object-cover object-top" loading="lazy" /></div>}
                <div className={study.image ? 'p-6 lg:col-span-8 lg:p-8' : 'p-6 lg:col-span-12 lg:p-8'}>
                  <Badge variant="secondary" className="mb-4">{study.category}</Badge>
                  <h2 className="mb-2 font-saira text-2xl font-bold text-macri-primary">{study.title}</h2>
                  <p className="mb-6 text-lg text-gray-700">{study.subtitle}</p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <div><h3 className="mb-2 text-base font-semibold text-gray-900">Challenge</h3><p className="mb-0 text-sm leading-6 text-gray-700">{study.problem}</p></div>
                    <div><h3 className="mb-2 text-base font-semibold text-gray-900">My Role</h3><p className="mb-0 text-sm leading-6 text-gray-700">{detail.role}</p></div>
                    <div><h3 className="mb-2 text-base font-semibold text-gray-900">Result / Why It Matters</h3><ul className="space-y-2">{study.outcomes.slice(0, 3).map((outcome) => <li key={outcome} className="flex gap-2 text-sm leading-6 text-gray-700"><CheckCircle className="mt-0.5 h-4 w-4 flex-none text-green-600" />{outcome}</li>)}</ul></div>
                  </div>

                  <details className="group mt-7 border-t border-gray-200 pt-5">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center font-semibold text-macri-primary focus-visible:ring-2 focus-visible:ring-macri-primary">Explore case study <ChevronDown className="ml-2 h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                    <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                      {study.id === 'scaling-cse' && <div className="md:col-span-2 rounded-lg border border-orange-200 bg-orange-50 p-5"><h3 className="mb-2 text-lg font-semibold text-slate-900">Why I Built This</h3><p className="mb-0 text-sm leading-6 text-gray-700">I developed this framework around a common scaling problem: technical Customer Success teams cannot treat every account and every technical need the same way. The challenge is deciding how digital engagement, customer intent, product signals, pooled expertise, and direct CSE engagement should work together.</p></div>}
                      <div><h3 className="mb-2 text-base font-semibold text-gray-900">Environment / Constraints</h3><p className="mb-0 text-sm leading-6 text-gray-700">{detail.environment}</p></div>
                      <div><h3 className="mb-2 text-base font-semibold text-gray-900">Approach</h3><p className="mb-0 text-sm leading-6 text-gray-700">{study.approach}</p></div>
                      <div><h3 className="mb-2 text-base font-semibold text-gray-900">What Changed</h3><p className="mb-0 text-sm leading-6 text-gray-700">{detail.changed}</p></div>
                      <div><h3 className="mb-2 text-base font-semibold text-gray-900">Cross-Functional Partners</h3><p className="mb-0 text-sm leading-6 text-gray-700">{detail.partners.join(' · ')}</p></div>
                      <div><h3 className="mb-2 text-base font-semibold text-gray-900">Detailed Outcomes</h3><ul className="space-y-2">{study.outcomes.map((outcome) => <li key={outcome} className="flex gap-2 text-sm leading-6 text-gray-700"><CheckCircle className="mt-0.5 h-4 w-4 flex-none text-green-600" />{outcome}</li>)}</ul></div>
                      <div><h3 className="mb-2 text-base font-semibold text-gray-900">Leadership Lesson</h3><p className="mb-0 text-sm leading-6 text-gray-700">{detail.lesson}</p></div>
                      {study.id === 'scaling-cse' && <div className="md:col-span-2 rounded-lg border border-gray-200 bg-white p-5"><h3 className="mb-4 text-lg font-semibold text-macri-primary">Engagement Model</h3><Flow steps={cseProcess} label="Scaling Customer Success Engineering engagement model" /><p className="mt-4 mb-0 text-xs leading-5 text-gray-600">{study.note}</p></div>}
                    </div>
                  </details>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>

    <section className="bg-macri-primary py-14 text-white"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"><h2 className="mb-4 font-saira text-3xl font-bold">See the Tools and Prototypes</h2><p className="mb-8 text-lg text-white/90">Explore the working systems Mike has built to understand customer, governance, security, and operational problems more deeply.</p><Button size="lg" variant="collaboration" asChild><Link to="/projects">Things I’ve Built <ArrowRight className="ml-2 h-5 w-5" /></Link></Button></div></section>
  </>
);

export default SelectedWork;

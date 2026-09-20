import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle, Download } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { experiences, metrics, profile } from '@/data/careerData';
import { staticAwardsData } from '@/data/resume/awardsData';

const ExperienceImpact: React.FC = () => {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <>
      <SEOHead
        title="Experience | Mike Macri – Customer Success Engineering Leader"
        description="Mike Macri’s leadership experience across GitLab, ServiceNow, and VMware, including AMER CSE team leadership, customer-success operating models, solution advisory, and partner ecosystems."
        url="https://mikemacri.com/experience"
      />

      <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-macri-primary text-white">Current: {profile.currentRole} · {profile.currentCompany}</Badge>
          <h1 className="mb-5 font-saira text-4xl font-bold text-slate-900 sm:text-5xl">Experience</h1>
          <p className="max-w-4xl text-xl leading-8 text-gray-700">A career built around one through-line: lead technical customer-facing teams, create operating clarity, and help customers turn complex platforms into sustained outcomes.</p>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="timeline-heading" className="mb-8 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Professional Timeline</h2>
          <div className="space-y-6">
            {experiences.map((role) => {
              const isCurrent = role.id === 'gitlab';
              const isAdvisory = role.id === 'momentum-edge';
              return (
                <article
                  key={role.id}
                  className={`${isCurrent ? 'border-l-4 border-l-macri-primary bg-white shadow-md' : isAdvisory ? 'border-l-4 border-l-slate-300 bg-slate-50' : 'border-l-4 border-l-macri-primary/40 bg-white'} rounded-xl border border-gray-200 p-6 sm:p-8`}
                >
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {isCurrent && <Badge className="bg-macri-primary text-white">CURRENT LEADERSHIP ROLE</Badge>}
                        {isAdvisory && <Badge variant="secondary">INDEPENDENT ADVISORY / PERSONAL CONSULTING PRACTICE</Badge>}
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">{role.theme}</span>
                      </div>
                      <h3 className={`${isCurrent ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} mb-1 font-semibold text-slate-900`}>{role.title}</h3>
                      <p className="mb-1 font-semibold text-macri-primary">{role.organization}</p>
                      <p className="mb-0 text-sm text-gray-600">{role.location}</p>
                    </div>
                    <p className="mb-0 whitespace-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">{role.period}</p>
                  </div>

                  {isCurrent && (
                    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {['7 CSEs', 'AMER private sector', 'SMB → Key Accounts', 'DevSecOps + AI adoption'].map((scope) => (
                        <div key={scope} className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-3 text-center text-sm font-semibold text-slate-800">{scope}</div>
                      ))}
                    </div>
                  )}

                  {isAdvisory && <p className="mb-5 rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-gray-700">Limited independent advisory work conducted as a personal consulting practice alongside Mike’s primary leadership role.</p>}

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <h4 className="mb-2 text-base font-semibold uppercase tracking-[0.08em] text-gray-500">Scope & Mission</h4>
                      <p className="mb-0 leading-7 text-gray-700">{role.summary}</p>
                    </div>
                    <div className="lg:col-span-7">
                      <h4 className="mb-2 text-base font-semibold uppercase tracking-[0.08em] text-gray-500">Leadership & Impact</h4>
                      {role.bullets.length > 0 ? (
                        <ul className="space-y-3">
                          {role.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-6 text-gray-700"><CheckCircle className="mt-0.5 h-5 w-5 flex-none text-macri-primary" />{bullet}</li>)}
                        </ul>
                      ) : <p className="mb-0 text-sm leading-6 text-gray-700">Strategic enterprise account leadership spanning technical planning, adoption, roadmap execution, and services alignment.</p>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14" aria-labelledby="historical-impact-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 max-w-3xl">
            <h2 id="historical-impact-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Historical Impact</h2>
            <p className="text-gray-700">ServiceNow and VMware context, separated from Mike’s current GitLab responsibilities.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item) => (
              <article key={item.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-1 text-3xl font-bold text-macri-primary">{item.metric}</p>
                <h3 className="mb-1 text-base font-semibold text-slate-900">{item.label}</h3>
                <p className="mb-3 text-sm font-medium text-gray-500">{item.organization}</p>
                <p className="mb-0 text-sm leading-6 text-gray-700">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="recognition-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="recognition-heading" className="mb-7 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Recognition</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staticAwardsData.map((award) => (
              <article key={award.id} className="flex items-start rounded-xl border border-gray-200 bg-gray-50 p-5">
                <Award className="mr-3 mt-0.5 h-5 w-5 flex-none text-macri-primary" />
                <div><h3 className="text-base font-semibold text-slate-900">{award.title}</h3><p className="mt-1 mb-0 text-sm leading-6 text-gray-600">{award.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-macri-primary py-12 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><h2 className="mb-2 font-saira text-3xl font-bold">Go deeper.</h2><p className="mb-0 text-white/90">Review Mike’s leadership approach, case studies, or current résumé.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="collaboration" asChild><Link to="/leadership">Leadership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button variant="collaborationOutline" asChild><a href={`${assetBase}resume.pdf`} download><Download className="mr-2 h-4 w-4" /> Resume</a></Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceImpact;

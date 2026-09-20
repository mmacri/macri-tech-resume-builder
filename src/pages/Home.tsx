import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Linkedin, Network, Signal, Users } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import {
  caseStudies,
  caseStudyDetails,
  leadershipPillars,
  leadershipScope,
  metrics,
  operatingMission,
  profile,
} from '@/data/careerData';

const pillarIcons = [Users, Signal, Network];
const featuredIds = ['scaling-cse', 'customer-success-model', 'policy-hub'];

const Home: React.FC = () => {
  const assetBase = import.meta.env.BASE_URL;
  const featuredWork = featuredIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is (typeof caseStudies)[number] => Boolean(study));

  return (
    <>
      <SEOHead
        title="Mike Macri | Customer Success Engineering & Technical Leadership"
        description="Mike Macri leads Customer Success Engineering across AMER at GitLab, developing technical teams and scaling DevSecOps and AI adoption through signal-driven operating models."
        url="https://mikemacri.com/"
      />

      <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="order-2 lg:order-1 lg:col-span-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-macri-primary">{profile.name}</p>
            <h1 className="mb-4 max-w-4xl font-saira text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Senior Customer Success Engineering Leader
            </h1>
            <p className="mb-5 text-lg font-semibold text-macri-primary sm:text-xl">
              {profile.currentRole} · {profile.currentCompany}
            </p>
            <p className="mb-8 max-w-3xl text-lg leading-8 text-gray-700 sm:text-xl">
              Mike builds and leads post-sales technical organizations that connect product adoption, customer health, and technical expertise to measurable customer and business outcomes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button size="lg" className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
                <Link to="/leadership">See How I Lead <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild>
                <Link to="/selected-work">View Selected Work</Link>
              </Button>
              <div className="flex items-center gap-1 sm:ml-2">
                <Button variant="ghost" className="text-gray-700 hover:text-macri-primary" asChild>
                  <a href={`${assetBase}resume.pdf`} download><Download className="mr-2 h-4 w-4" /> Resume</a>
                </Button>
                <Button variant="ghost" className="text-gray-700 hover:text-macri-primary" asChild>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a>
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4">
            <img
              src={`${assetBase}lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png`}
              alt="Michael Macri, Senior Customer Success Engineering leader"
              className="h-56 w-56 rounded-full border-8 border-white object-cover shadow-xl sm:h-64 sm:w-64 lg:h-80 lg:w-80"
              width="320"
              height="320"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white" aria-labelledby="current-scope-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">Current leadership scope</p>
            <h2 id="current-scope-heading" className="mb-3 font-saira text-3xl font-bold sm:text-4xl">What I Lead Today</h2>
            <p className="text-lg leading-8 text-slate-300">AMER Customer Success Engineering for private-sector customers across the full segment range, from SMB through Key Accounts.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {leadershipScope.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/15 bg-white/5 p-6">
                <p className="mb-1 text-3xl font-bold text-orange-300">{item.value}</p>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.label}</h3>
                <p className="mb-0 text-sm leading-6 text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 md:grid-cols-3">
            {operatingMission.map((item) => (
              <div key={item.title}>
                <h3 className="mb-2 text-lg font-semibold text-orange-300">{item.title}</h3>
                <p className="mb-0 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="impact-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 id="impact-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Historical Impact, With Context</h2>
            <p className="text-gray-700">These are historical ServiceNow and VMware outcomes—not claims about current GitLab performance.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item) => (
              <details key={item.label} className="group rounded-xl border border-gray-200 bg-gray-50 p-5 open:bg-white open:shadow-md">
                <summary className="cursor-pointer list-none rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-macri-primary">
                  <span className="block text-3xl font-bold text-macri-primary">{item.metric}</span>
                  <span className="mt-1 block font-semibold text-gray-900">{item.label}</span>
                  <span className="mt-1 block text-sm text-gray-600">{item.organization} · View context</span>
                </summary>
                <div className="mt-4 space-y-3 border-t border-gray-200 pt-4 text-sm leading-6 text-gray-700">
                  <p className="mb-0"><strong>Context:</strong> {item.context}</p>
                  <p className="mb-0"><strong>Mike’s contribution:</strong> {item.contribution}</p>
                  <p className="mb-0"><strong>Result:</strong> {item.outcome}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14" aria-labelledby="leadership-story-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 id="leadership-story-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">One Leadership Story</h2>
            <p className="text-lg leading-8 text-gray-700">The breadth supports one core identity: a technical customer-success leader who connects people, platforms, customer signals, and commercial outcomes.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {leadershipPillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <article key={pillar.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <Icon className="mb-4 h-7 w-7 text-macri-primary" aria-hidden="true" />
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mb-0 text-sm leading-6 text-gray-700">{pillar.description}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-7 text-sm font-medium leading-7 text-gray-600">Customer Success Engineering · Solution Engineering · Strategic TAM · DevSecOps · AI Adoption · Partner Ecosystems · Governance</p>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="featured-work-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 id="featured-work-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Selected Leadership Work</h2>
              <p className="mb-0 text-lg leading-8 text-gray-700">Examples of how Mike turns customer and technical complexity into clearer decisions, repeatable execution, and stronger outcomes.</p>
            </div>
            <Link to="/selected-work" className="inline-flex items-center font-semibold text-macri-primary hover:text-macri-primary-dark">All selected work <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredWork.map((study) => {
              const detail = caseStudyDetails[study.id];
              return (
                <article key={study.id} className="flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-macri-primary">{study.category}</p>
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">{study.title}</h3>
                  <dl className="space-y-4 text-sm leading-6 text-gray-700">
                    <div><dt className="font-semibold text-slate-900">Problem</dt><dd>{study.problem}</dd></div>
                    <div><dt className="font-semibold text-slate-900">Mike’s role</dt><dd>{detail.role}</dd></div>
                    <div><dt className="font-semibold text-slate-900">What changed</dt><dd>{detail.changed}</dd></div>
                    <div><dt className="font-semibold text-slate-900">Why it matters</dt><dd>{detail.lesson}</dd></div>
                  </dl>
                  <Link to={`/selected-work#${study.id}`} className="mt-6 inline-flex items-center font-semibold text-macri-primary hover:text-macri-primary-dark">View case study <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-macri-primary py-12 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="mb-2 font-saira text-3xl font-bold">See the leadership system behind the work.</h2>
            <p className="mb-0 text-white/90">Management principles, operating cadence, and practical frameworks for technical Customer Success.</p>
          </div>
          <Button size="lg" variant="collaboration" asChild><Link to="/leadership">Leadership approach <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
        </div>
      </section>
    </>
  );
};

export default Home;

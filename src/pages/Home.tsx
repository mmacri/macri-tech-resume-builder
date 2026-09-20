import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Download, Linkedin, Quote } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { OrganizationFramework } from '@/components/leadership/LeadershipVisuals';
import { Button } from '@/components/ui/button';
import {
  careerEras,
  caseStudies,
  caseStudyDetails,
  currentFocus,
  leadershipScale,
  metrics,
  profile,
} from '@/data/careerData';
import { recommendations } from '@/data/aboutData';

const featuredIds = ['scaling-cse', 'customer-success-model', 'policy-hub'];

const Home: React.FC = () => {
  const assetBase = import.meta.env.BASE_URL;
  const featuredWork = featuredIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is (typeof caseStudies)[number] => Boolean(study));

  return (
    <>
      <SEOHead
        title="Mike Macri | Technology & Customer Success Engineering Leader"
        description="Mike Macri is a technology and Customer Success Engineering leader at GitLab with experience building technical teams, customer programs, and enterprise initiatives across DevSecOps, AI, cloud, and governance."
        url="https://mikemacri.com/"
      />

      <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="order-2 lg:order-1 lg:col-span-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-macri-primary">{profile.name}</p>
            <h1 className="mb-5 max-w-4xl font-saira text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">Technology &amp; Customer Success Engineering Leader</h1>
            <p className="mb-6 max-w-3xl text-lg leading-8 text-gray-700 sm:text-xl">{profile.positioning}</p>
            <p className="mb-8 text-base font-semibold text-macri-primary sm:text-lg">Currently: Sr. Manager, Customer Success Engineering – AMER · GitLab</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button size="lg" className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild><Link to="/leadership">How I Lead <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
              <Button size="lg" variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild><Link to="/selected-work">Selected Work</Link></Button>
            </div>
            <nav className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold" aria-label="Additional profile links">
              <Link to="/experience" className="text-gray-700 hover:text-macri-primary">Experience</Link>
              <a href={`${assetBase}resume.pdf?v=2026-09`} download className="inline-flex items-center text-gray-700 hover:text-macri-primary"><Download className="mr-1.5 h-4 w-4" /> Resume</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-700 hover:text-macri-primary"><Linkedin className="mr-1.5 h-4 w-4" /> LinkedIn</a>
            </nav>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4">
            <img src={`${assetBase}lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png`} alt="Michael Macri, technology and Customer Success Engineering leader" className="h-56 w-56 rounded-full border-8 border-white object-cover shadow-xl sm:h-64 sm:w-64 lg:h-80 lg:w-80" width="320" height="320" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white" aria-labelledby="current-focus-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-4xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">Current role</p>
            <h2 id="current-focus-heading" className="mb-3 font-saira text-3xl font-bold sm:text-4xl">Leading Customer Success Engineering Today</h2>
            <p className="mb-0 text-lg leading-8 text-slate-300">Leading technical Customer Success across an AMER private-sector portfolio, with responsibility spanning customer adoption, account signals, and coordinated technical engagement.</p>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-y border-white/15 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {currentFocus.map((item) => <div key={item.title}><h3 className="mb-2 text-lg font-semibold text-orange-300">{item.title}</h3><p className="mb-0 text-sm leading-6 text-slate-300">{item.detail}</p></div>)}
          </div>
          <p className="mt-7 mb-0 max-w-3xl text-base font-medium text-white">The goal is to focus technical expertise where it can make the greatest difference for customers and the business.</p>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="scale-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-3xl"><h2 id="scale-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Leadership at Scale</h2><p className="mb-0 text-lg leading-8 text-gray-700">Organizational scale is more than an org-chart number. Mike’s career spans direct leadership, complex customer portfolios, partner ecosystems, and enterprise change.</p></div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-8 md:grid-cols-2">
            {leadershipScale.map((item) => <article key={item.dimension} className="border-l-4 border-macri-primary pl-5"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-macri-primary">{item.dimension}</p><h3 className="mb-2 text-xl font-semibold text-slate-900">{item.title}</h3><p className="mb-0 text-sm leading-6 text-gray-700">{item.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14" aria-labelledby="career-scale-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-3xl"><h2 id="career-scale-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">A Career Built Across Different Kinds of Scale</h2><p className="mb-0 text-gray-700">Each chapter expanded the lens—from customers and teams, to ecosystems, enterprise change, and modern technical Customer Success.</p></div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {careerEras.map((era, index) => <React.Fragment key={era.organization}>
              <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><p className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-macri-primary">{era.organization}</p><h3 className="mb-3 text-2xl font-semibold text-slate-900">{era.era}</h3><p className="mb-4 text-sm font-semibold leading-6 text-gray-600">{era.themes}</p><p className="mb-0 text-sm leading-6 text-gray-700">{era.detail}</p></article>
              {index < careerEras.length - 1 && <div className="flex items-center justify-center py-1"><ArrowDown className="h-6 w-6 text-macri-primary lg:hidden" aria-hidden="true" /><ArrowRight className="hidden h-6 w-6 text-macri-primary lg:block" aria-hidden="true" /></div>}
            </React.Fragment>)}
          </div>
          <p className="mt-6 mb-0 text-sm text-gray-600">Momentum Edge continues alongside this progression as limited independent advisory work.</p>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="impact-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl"><h2 id="impact-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Business Impact Across My Career</h2><p className="mb-0 text-gray-700">Historical ServiceNow and VMware results, with the role and program context behind each number.</p></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((item) => <details key={`${item.metric}-${item.label}`} className="group rounded-xl border border-gray-200 bg-gray-50 p-5 open:bg-white open:shadow-md">
              <summary className="cursor-pointer list-none rounded focus-visible:ring-2 focus-visible:ring-macri-primary"><span className="block text-3xl font-bold text-macri-primary">{item.metric}</span><span className="mt-1 block font-semibold text-gray-900">{item.label}</span><span className="mt-1 block text-sm text-gray-600">{item.organization} · View context</span></summary>
              <dl className="mt-4 space-y-3 border-t border-gray-200 pt-4 text-sm leading-6 text-gray-700"><div><dt className="font-semibold text-slate-900">Situation</dt><dd>{item.context}</dd></div><div><dt className="font-semibold text-slate-900">My role</dt><dd>{item.contribution}</dd></div><div><dt className="font-semibold text-slate-900">Result</dt><dd>{item.outcome}</dd></div></dl>
            </details>)}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white" aria-labelledby="organizations-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-4xl"><h2 id="organizations-heading" className="mb-3 font-saira text-3xl font-bold sm:text-4xl">How I Build Technical Organizations</h2><p className="mb-0 text-lg leading-8 text-slate-300">Strong technical organizations need more than talented people. They need clarity about outcomes, a way to focus expertise, useful signals, strong cross-functional relationships, and an operating model that improves as the organization learns.</p></div>
          <div className="rounded-2xl bg-slate-100 p-5 text-slate-900 sm:p-7"><OrganizationFramework /></div>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="featured-work-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-3xl"><h2 id="featured-work-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Selected Leadership Work</h2><p className="mb-0 text-lg leading-8 text-gray-700">Three views of the same leadership pattern: focus expertise, build repeatable systems, and coordinate people around a clear outcome.</p></div><Link to="/selected-work" className="inline-flex items-center font-semibold text-macri-primary hover:text-macri-primary-dark">All selected work <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredWork.map((study) => { const detail = caseStudyDetails[study.id]; return <article key={study.id} className="flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-6"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-macri-primary">{study.category}</p><h3 className="mb-4 text-xl font-semibold text-slate-900">{study.title}</h3><dl className="space-y-4 text-sm leading-6 text-gray-700"><div><dt className="font-semibold text-slate-900">Challenge</dt><dd>{study.problem}</dd></div><div><dt className="font-semibold text-slate-900">My role</dt><dd>{detail.role}</dd></div><div><dt className="font-semibold text-slate-900">Why it matters</dt><dd>{detail.lesson}</dd></div></dl><Link to={`/selected-work#${study.id}`} className="mt-6 inline-flex items-center font-semibold text-macri-primary hover:text-macri-primary-dark">Explore case study <ArrowRight className="ml-2 h-4 w-4" /></Link></article>; })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14" aria-labelledby="recommendations-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 id="recommendations-heading" className="mb-2 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">What People Say</h2><p className="mb-0 text-gray-700">Published recommendations from a business partner and someone Mike managed and coached.</p></div><a href={`${profile.linkedin}/details/recommendations/`} target="_blank" rel="noopener noreferrer" className="font-semibold text-macri-primary hover:text-macri-primary-dark">View on LinkedIn</a></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{recommendations.slice(0, 2).map((reference) => <blockquote key={reference} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><Quote className="mb-4 h-6 w-6 text-macri-primary" aria-hidden="true" /><p className="mb-0 text-base leading-7 text-gray-700">“{reference}”</p></blockquote>)}</div>
        </div>
      </section>

      <section className="bg-macri-primary py-12 text-white" aria-labelledby="explore-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="explore-heading" className="mb-6 font-saira text-3xl font-bold">Explore Further</h2><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['/leadership', 'Leadership'], ['/experience', 'Experience'], ['/projects', 'Things I’ve Built'], ['/resume', 'Resume']].map(([href, label]) => <Link key={href} to={href} className="flex min-h-14 items-center justify-between rounded-lg border border-white/30 bg-white/10 px-5 font-semibold text-white hover:bg-white/20">{label}<ArrowRight className="h-4 w-4" /></Link>)}</div></div>
      </section>
    </>
  );
};

export default Home;

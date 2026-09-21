import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Linkedin } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Flow, OrganizationFramework } from '@/components/leadership/LeadershipVisuals';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  cseProcess,
  healthSignals,
  managementCadence,
  managementPrinciples,
  profile,
  scopeBeyondOrgChart,
  talentPath,
} from '@/data/careerData';

const Leadership: React.FC = () => (
  <>
    <SEOHead
      title="Leadership | Mike Macri – Technology & Customer Success Engineering"
      description="How Mike Macri leads and builds technical organizations: people development, operating cadence, cross-functional influence, and practical frameworks for scaling Customer Success Engineering."
      url="https://mikemacri.com/leadership"
      type="profile"
    />

    <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-macri-primary">People · Systems · Judgment</p>
        <h1 className="mb-5 max-w-4xl font-saira text-4xl font-bold text-slate-900 sm:text-5xl">How I Lead</h1>
        <p className="max-w-4xl text-xl leading-9 text-gray-700">Leadership is creating clarity around the outcome, helping people develop the judgment to reach it, and building systems that make strong execution repeatable.</p>
      </div>
    </section>

    <section className="bg-white py-14" aria-labelledby="team-gets-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl"><h2 id="team-gets-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">What My Team Gets From Me</h2><p className="mb-0 text-gray-700">These principles show up in coaching, decisions, and how work moves across organizational boundaries.</p></div>
        <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {managementPrinciples.map((principle, index) => <article key={principle.title}><span className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-macri-primary">0{index + 1}</span><h3 className="mb-2 text-xl font-semibold text-slate-900">{principle.title}</h3><p className="mb-0 text-sm leading-6 text-gray-700">{principle.description}</p></article>)}
        </div>
      </div>
    </section>

    <section className="bg-gray-50 py-14" aria-labelledby="leaders-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5"><h2 id="leaders-heading" className="mb-4 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Developing Technical Leaders</h2><p className="leading-7 text-gray-700">I don’t want a team that needs the manager in every customer conversation. I want people who can understand the situation, make sound decisions, collaborate across the organization, and know when something needs escalation.</p></div>
          <div className="lg:col-span-7"><Flow steps={talentPath.map((item) => item.stage)} label="Technical leader development path" /><dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">{talentPath.map((item) => <div key={item.stage}><dt className="font-semibold text-slate-900">{item.stage}</dt><dd className="text-sm leading-6 text-gray-700">{item.detail}</dd></div>)}</dl></div>
        </div>
      </div>
    </section>

    <section className="bg-slate-950 py-14 text-white" aria-labelledby="manage-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="manage-heading" className="mb-8 font-saira text-3xl font-bold sm:text-4xl">How I Manage</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{managementCadence.map((cadence) => <article key={cadence.horizon} className="rounded-xl border border-white/15 bg-white/5 p-6"><h3 className="mb-4 text-xl font-semibold text-orange-300">{cadence.horizon}</h3><ul className="space-y-3">{cadence.items.map((item) => <li key={item} className="flex gap-2 text-sm text-slate-200"><CheckCircle className="mt-0.5 h-4 w-4 flex-none text-orange-300" />{item}</li>)}</ul></article>)}</div>
        <blockquote className="mt-8 rounded-xl border-l-4 border-orange-400 bg-white/10 p-6 text-xl font-semibold leading-8 text-white sm:text-2xl">“I don’t use metrics to create dashboards. I use metrics to decide where the team should spend time.”</blockquote>
      </div>
    </section>

    <section className="bg-white py-14" aria-labelledby="beyond-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-4xl"><h2 id="beyond-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Scope Beyond the Org Chart</h2><p className="mb-0 text-lg leading-8 text-gray-700">I don’t think leadership scale is defined only by the number of direct reports. Much of my career has involved leading across organizations where the outcome depended on people I didn’t directly manage.</p></div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-8 sm:grid-cols-2">{scopeBeyondOrgChart.map((item) => <article key={item.title}><h3 className="mb-2 text-xl font-semibold text-macri-primary">{item.title}</h3><p className="mb-0 text-sm leading-6 text-gray-700">{item.detail}</p></article>)}</div>
      </div>
    </section>

    <section className="bg-gray-50 py-14" aria-labelledby="build-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-4xl"><h2 id="build-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">How I Build Technical Organizations</h2><p className="mb-0 text-lg leading-8 text-gray-700">Start with the outcome. Decide where expert attention matters. Give people the signals, relationships, and room to act, then keep improving the system. If a process only works because the best person knows the workaround, it is not repeatable.</p></div>
        <OrganizationFramework />
      </div>
    </section>

    <section className="bg-white py-14" aria-labelledby="scale-cse-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <article>
          <h2 id="scale-cse-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Scaling Technical Customer Success</h2>
          <p className="mb-5 max-w-4xl text-base leading-7 text-gray-700">Traditional high-touch technical Customer Success does not translate directly to portfolios approaching 50 customers per CSE. At higher ratios, coverage has to be designed intentionally: who receives named technical ownership, what that ownership includes, when human expertise adds the most value, and where digital or pooled engagement provides greater leverage.</p>
          <p className="mb-5 max-w-4xl text-base leading-7 text-gray-700">That model also requires visibility. Customer assignment alone does not show where technical capacity is actually being spent. Engagement, workload, renewal timing, customer signals, and unassigned work need to be visible enough for leaders to decide where technical expertise should—and should not—go.</p>
          <p className="mb-7 text-lg font-medium text-macri-primary">Digital creates reach. Signals create focus. Human expertise creates leverage where it matters most.</p>
          <Flow steps={cseProcess} label="Scaling technical Customer Success flow" />
          <div className="mt-7 grid grid-cols-2 gap-3 text-sm text-gray-700 sm:grid-cols-4">{['Digital engagement', 'One-to-many', 'Technical workshops', 'Hands-on labs', 'Reusable content', 'Customer-requested engagement', 'Targeted 1:1 engagement', 'Pooled expertise'].map((motion) => <div key={motion} className="rounded-lg bg-gray-50 p-3">{motion}</div>)}</div>
          <p className="mt-5 mb-0 text-sm leading-6 text-gray-600">Conceptual operating model.</p>
        </article>
      </div>
    </section>

    <section className="bg-gray-50 py-14" aria-labelledby="supporting-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><h2 id="supporting-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Supporting Frameworks</h2><p className="mb-0 text-gray-700">Two concise ways I connect customer signals and product usage to a decision.</p></div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="health" className="rounded-xl border border-gray-200 bg-white px-5">
            <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:no-underline"><span><span className="block">How I Think About Customer Health</span><span className="mt-1 block text-sm font-normal text-macri-primary">Signals → Context → Decision → Action</span></span></AccordionTrigger>
            <AccordionContent className="pb-6"><p className="mb-5 text-base leading-7 text-gray-700">Health isn’t a score. It’s information that should change what we do next.</p><div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{healthSignals.map((signal) => <div key={signal} className="rounded-lg bg-gray-50 p-3 text-center text-sm font-medium text-gray-800">{signal}</div>)}</div><Flow steps={['Signals', 'Context', 'Risk / Opportunity', 'Action']} label="Customer health decision flow" /></AccordionContent>
          </AccordionItem>
          <AccordionItem value="adoption" className="rounded-xl border border-gray-200 bg-white px-5">
            <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:no-underline"><span><span className="block">How I Think About Technical Adoption</span><span className="mt-1 block text-sm font-normal text-macri-primary">Enabled → Used → Embedded → Outcome</span></span></AccordionTrigger>
            <AccordionContent className="pb-6"><p className="mb-5 text-base leading-7 text-gray-700">A capability being turned on isn’t the same thing as a customer receiving value from it.</p><Flow steps={['Enabled', 'Used', 'Embedded', 'Outcome']} label="Technical adoption progression" /><dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Enabled', 'Capability is available.'], ['Used', 'The customer actively uses it.'], ['Embedded', 'It becomes part of normal workflows.'], ['Outcome', 'It contributes to technical or business value.']].map(([term, definition]) => <div key={term}><dt className="font-semibold text-slate-900">{term}</dt><dd className="text-sm leading-6 text-gray-700">{definition}</dd></div>)}</dl></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <section className="bg-white py-14" aria-labelledby="colleagues-heading">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8"><div><h2 id="colleagues-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">What Colleagues Say</h2><p className="mb-0 max-w-3xl text-lg leading-8 text-gray-700">Read Mike’s published recommendations with the names, roles, and relationships provided by LinkedIn.</p></div><a href={`${profile.linkedin}/details/recommendations/`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-macri-primary hover:text-macri-primary-dark"><Linkedin className="mr-2 h-4 w-4" /> View LinkedIn recommendations</a></div>
    </section>

    <section className="bg-macri-primary py-12 text-white"><div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><div><h2 className="mb-2 font-saira text-3xl font-bold">See the approach in practice.</h2><p className="mb-0 text-white/90">Case studies connect these ideas to teams, customer programs, ecosystems, and enterprise change.</p></div><Button size="lg" variant="collaboration" asChild><Link to="/selected-work">View selected work <ArrowRight className="ml-2 h-5 w-5" /></Link></Button></div></section>
  </>
);

export default Leadership;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, CheckCircle, Linkedin, Quote } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import {
  cseProcess,
  healthSignals,
  managementCadence,
  managementPrinciples,
  profile,
} from '@/data/careerData';
import { recommendations } from '@/data/aboutData';

const Flow: React.FC<{ steps: string[] }> = ({ steps }) => (
  <div className="grid grid-cols-1 gap-2 md:grid-flow-col md:auto-cols-fr md:items-center">
    {steps.map((step, index) => (
      <React.Fragment key={step}>
        <div className="flex min-h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm">
          {step}
        </div>
        {index < steps.length - 1 && (
          <>
            <ArrowDown className="mx-auto h-5 w-5 text-macri-primary md:hidden" aria-hidden="true" />
            <ArrowRight className="mx-auto hidden h-5 w-5 text-macri-primary md:block" aria-hidden="true" />
          </>
        )}
      </React.Fragment>
    ))}
  </div>
);

const Leadership: React.FC = () => (
  <>
    <SEOHead
      title="Leadership | Mike Macri – Technical Customer Success"
      description="How Mike Macri leads technical Customer Success teams: management principles, operating cadence, customer-health signals, adoption frameworks, and cross-functional execution."
      url="https://mikemacri.com/leadership"
      type="profile"
    />

    <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-macri-primary">People · Systems · Judgment</p>
        <h1 className="mb-5 max-w-4xl font-saira text-4xl font-bold text-slate-900 sm:text-5xl">How I Lead</h1>
        <p className="max-w-4xl text-xl leading-9 text-gray-700">
          Leadership is creating clarity around the outcome, helping people develop the judgment to reach it, and building systems that make strong execution repeatable.
        </p>
      </div>
    </section>

    <section className="bg-white py-14" aria-labelledby="team-gets-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 id="team-gets-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">What My Team Gets From Me</h2>
          <p className="text-gray-700">These principles show up in operating decisions, coaching conversations, and how work moves across organizational boundaries.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {managementPrinciples.map((principle, index) => (
            <article key={principle.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-macri-primary text-sm font-bold text-white">{index + 1}</span>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{principle.title}</h3>
              <p className="mb-0 text-sm leading-6 text-gray-700">{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-slate-950 py-14 text-white" aria-labelledby="manage-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="manage-heading" className="mb-8 font-saira text-3xl font-bold sm:text-4xl">How I Manage</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {managementCadence.map((cadence) => (
            <article key={cadence.horizon} className="rounded-xl border border-white/15 bg-white/5 p-6">
              <h3 className="mb-4 text-xl font-semibold text-orange-300">{cadence.horizon}</h3>
              <ul className="space-y-3">
                {cadence.items.map((item) => <li key={item} className="flex gap-2 text-sm text-slate-200"><CheckCircle className="mt-0.5 h-4 w-4 flex-none text-orange-300" />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <blockquote className="mt-8 rounded-xl border-l-4 border-orange-400 bg-white/10 p-6 text-xl font-semibold leading-8 text-white sm:text-2xl">
          “I don’t use metrics to create dashboards. I use metrics to decide where the team should spend time.”
        </blockquote>
      </div>
    </section>

    <section className="bg-gray-50 py-14" aria-labelledby="thinking-heading">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 id="thinking-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">How I Think</h2>
          <p className="text-gray-700">Three practical frameworks guide how I scale technical engagement, interpret customer health, and separate feature usage from customer value.</p>
        </div>

        <article className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h3 className="mb-2 text-2xl font-semibold text-slate-900">Scaling Technical Customer Success</h3>
          <p className="mb-6 text-lg font-medium text-macri-primary">Digital creates reach. Signals create focus. Human expertise creates leverage where it matters most.</p>
          <Flow steps={cseProcess} />
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700 sm:grid-cols-4">
            {['Digital-first engagement', 'Customer-requested engagement', 'Health and adoption signals', 'Targeted CSE engagement', 'One-to-many enablement', 'Webinars and labs', 'Reusable technical content', 'Pooled expertise'].map((motion) => (
              <div key={motion} className="rounded-lg bg-gray-50 p-3">{motion}</div>
            ))}
          </div>
          <p className="mt-5 mb-0 text-sm leading-6 text-gray-600">Conceptual operating model. It does not claim measured GitLab performance.</p>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h3 className="mb-2 text-2xl font-semibold text-slate-900">Customer Health</h3>
          <p className="mb-6 text-lg font-medium text-macri-primary">Health isn’t a score. It’s a set of signals that should result in a decision or action.</p>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {healthSignals.map((signal) => <div key={signal} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center text-sm font-medium text-gray-800">{signal}</div>)}
          </div>
          <Flow steps={['Signals', 'Context', 'Risk / Opportunity', 'Action']} />
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h3 className="mb-2 text-2xl font-semibold text-slate-900">Technical Adoption</h3>
          <p className="mb-6 text-lg font-medium text-macri-primary">Feature activation is not the same thing as customer value.</p>
          <Flow steps={['Enabled', 'Used', 'Embedded', 'Outcome']} />
          <dl className="mt-6 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-700 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="font-semibold text-slate-900">Enabled</dt><dd>Capability exists and is available.</dd></div>
            <div><dt className="font-semibold text-slate-900">Used</dt><dd>The customer actively uses it.</dd></div>
            <div><dt className="font-semibold text-slate-900">Embedded</dt><dd>It becomes part of regular workflows.</dd></div>
            <div><dt className="font-semibold text-slate-900">Outcome</dt><dd>Usage contributes to customer or business value.</dd></div>
          </dl>
        </article>
      </div>
    </section>

    <section className="bg-white py-14" aria-labelledby="system-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="system-heading" className="mb-4 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">The Cross-Functional Customer System</h2>
            <p className="text-lg leading-8 text-gray-700">CSE leadership sits inside a broader system. My role is to help technical signals become coordinated customer actions instead of isolated departmental information.</p>
            <p className="mb-0 leading-7 text-gray-700">That means clear ownership, shared context, and deliberate handoffs across Sales, Renewals, Support, Product, Engineering, and the customer.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5" aria-label="Customer cross-functional model">
            {['Sales', 'Product', 'Engineering', 'CSE', 'Customer', 'Renewals', 'Support'].map((team, index) => (
              <div key={team} className={`${team === 'Customer' ? 'bg-macri-primary text-white' : team === 'CSE' ? 'border-macri-primary bg-orange-50 text-macri-primary' : 'bg-white text-gray-800'} ${index === 6 ? 'col-start-2' : ''} flex min-h-20 items-center justify-center rounded-lg border p-3 text-center text-sm font-semibold shadow-sm`}>{team}</div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-slate-950 py-14 text-white" aria-labelledby="perspectives-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">Perspectives</p>
          <h2 id="perspectives-heading" className="mb-3 font-saira text-3xl font-bold sm:text-4xl">Practical Notes on Technical Customer Success</h2>
          <p className="mb-0 leading-7 text-slate-300">Three operating ideas I return to when a team needs more reach, better signals, or a clearer definition of value.</p>
        </div>
        <div className="space-y-4">
          <details className="group rounded-xl border border-white/15 bg-white/5 p-5 open:bg-white/10">
            <summary className="cursor-pointer list-none pr-8 text-xl font-semibold text-white focus-visible:outline-none">Customer Health Isn’t a Score</summary>
            <div className="mt-4 space-y-4 leading-7 text-slate-300">
              <p>A red, yellow, or green label can summarize a situation, but it cannot explain it. Useful customer health starts with signals: product usage, technical adoption, support history, stakeholder engagement, champion stability, renewal timing, and progress toward the customer’s intended outcome.</p>
              <p>The important step is interpretation. The same decline in usage can mean an implementation problem, a seasonal pattern, a change in ownership, or a capability that never became part of the customer’s workflow. Context turns a signal into a defensible view of risk or opportunity.</p>
              <p>Health becomes operational only when it produces a decision: who should engage, what they need to learn, what action is appropriate, and when the team will reassess. A dashboard is useful when it changes where people spend time—not when it merely makes the portfolio easier to color-code.</p>
            </div>
          </details>
          <details className="group rounded-xl border border-white/15 bg-white/5 p-5 open:bg-white/10">
            <summary className="cursor-pointer list-none pr-8 text-xl font-semibold text-white focus-visible:outline-none">Don’t Scale Meetings. Scale Expertise.</summary>
            <div className="mt-4 space-y-4 leading-7 text-slate-300">
              <p>Technical Customer Success does not scale when every CSE manually schedules the same conversation with every customer. That model consumes expert time without distinguishing between customers who need guidance now, customers who can progress through digital resources, and customers whose signals warrant deeper intervention.</p>
              <p>Scale comes from combining motions. Digital onboarding and reusable technical content create reach. Webinars, labs, and office hours make expertise available to many customers at once. Pooled specialists provide depth. Product, health, and customer-intent signals help the team focus human attention where judgment will have the greatest effect.</p>
              <p>The goal is not to remove people from Customer Success. It is to protect their time for work that benefits from diagnosis, trust, technical depth, and cross-functional coordination. The operating model should make expertise easier to access and more deliberate to deploy.</p>
            </div>
          </details>
          <details className="group rounded-xl border border-white/15 bg-white/5 p-5 open:bg-white/10">
            <summary className="cursor-pointer list-none pr-8 text-xl font-semibold text-white focus-visible:outline-none">Technical Adoption Is Not Business Value</summary>
            <div className="mt-4 space-y-4 leading-7 text-slate-300">
              <p>Enabling a feature is a technical milestone, not proof of value. A capability can be licensed, configured, and technically available while having little effect on how a customer works. Even active usage may be temporary or disconnected from the outcome that justified the purchase.</p>
              <p>I think about adoption as a progression: enabled, used, embedded, outcome. The most important transition is from used to embedded. That is where a capability becomes part of a repeatable workflow, has clear ownership, and survives beyond the initial implementation team.</p>
              <p>Customer and business value comes last. It requires connecting the embedded behavior to something the customer cares about—faster delivery, reduced risk, better reliability, stronger governance, or less operational effort. CSEs help make that connection visible and identify what must change when the progression stalls.</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section className="bg-gray-50 py-14" aria-labelledby="colleagues-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="colleagues-heading" className="font-saira text-3xl font-bold text-slate-900 sm:text-4xl">What Colleagues Say</h2>
          <a href={`${profile.linkedin}/details/recommendations/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-macri-primary hover:text-macri-primary-dark"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn recommendations</a>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {recommendations.slice(0, 2).map((reference) => (
            <blockquote key={reference} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <Quote className="mb-4 h-6 w-6 text-macri-primary" aria-hidden="true" />
              <p className="mb-0 text-base leading-7 text-gray-700">“{reference}”</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-macri-primary py-12 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div><h2 className="mb-2 font-saira text-3xl font-bold">See the approach in practice.</h2><p className="mb-0 text-white/90">Case studies connect these principles to real operating models, teams, and platform work.</p></div>
        <Button size="lg" variant="collaboration" asChild><Link to="/selected-work">View selected work <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
      </div>
    </section>
  </>
);

export default Leadership;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';

const careerPath = [
  ['Technical Account Management', 'Understand the customer'],
  ['Customer Success', 'Drive adoption and outcomes'],
  ['Solution Engineering', 'Connect technology to business problems'],
  ['Partners', 'Scale through ecosystems'],
  ['Governance + AI', 'Balance innovation, risk, and trust'],
  ['CSE Leadership', 'Bring the pieces together'],
];

const About: React.FC = () => (
  <>
    <SEOHead
      title="About | Mike Macri"
      description="The through-line behind Mike Macri’s career across technical account management, Customer Success, solution engineering, partner ecosystems, governance, AI, and CSE leadership."
      url="https://mikemacri.com/about"
      type="profile"
    />
    <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-5 font-saira text-4xl font-bold text-slate-900 sm:text-5xl">About Mike</h1>
        <p className="max-w-4xl text-xl leading-9 text-gray-700">I’ve spent most of my career somewhere between customers and complicated technology.</p>
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 text-lg leading-8 text-gray-700 lg:col-span-8">
          <p>The job titles have changed—Technical Account Manager, Customer Success leader, Solution Engineer, partner leader, governance advisor, and now Customer Success Engineering leader—but the problem I’ve been solving has been remarkably consistent:</p>
          <p className="rounded-xl border-l-4 border-macri-primary bg-orange-50 p-6 text-xl font-semibold text-slate-900">How do you help people and organizations get real value from complex technology?</p>
          <p>I tend to gravitate toward products that aren’t being adopted, teams that need a clearer way to operate, customer signals that aren’t leading to action, or programs that work for ten customers but not one hundred.</p>
          <p>That breadth is useful because technical Customer Success rarely has a purely technical problem. The issue might be product adoption, organizational alignment, customer expectations, technical architecture, commercial timing, risk—or several of those at once.</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Button className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild><Link to="/leadership">Leadership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button variant="outline" className="border-macri-primary text-macri-primary" asChild><Link to="/experience">Experience</Link></Button>
            <Button variant="outline" className="border-macri-primary text-macri-primary" asChild><Link to="/selected-work">Selected Work</Link></Button>
          </div>
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">One Problem, Broader Perspective</h2>
            <ol className="space-y-3">
              {careerPath.map(([stage, lesson], index) => (
                <li key={stage} className="flex gap-3 text-sm leading-6 text-gray-700"><span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-macri-primary text-xs font-bold text-white">{index + 1}</span><span><strong className="block text-slate-900">{stage}</strong>{lesson}</span></li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  </>
);

export default About;

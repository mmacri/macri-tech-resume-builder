import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { careerProgression } from '@/data/careerData';

const About: React.FC = () => (
  <>
    <SEOHead
      title="About | Mike Macri"
      description="The through-line behind Mike Macri’s career: turning technical complexity into operating clarity, platform adoption, and stronger customer outcomes."
      url="https://mikemacri.com/about"
      type="profile"
    />
    <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-5 font-saira text-4xl font-bold text-slate-900 sm:text-5xl">About Mike</h1>
        <p className="max-w-4xl text-xl leading-9 text-gray-700">I tend to gravitate toward complicated problems: technical products that aren’t being adopted, teams that need a repeatable operating model, customer signals that aren’t leading to action, or programs that work well for ten customers but won’t work for one hundred.</p>
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 text-lg leading-8 text-gray-700 lg:col-span-8">
          <p>My role is usually to make the complexity understandable, build a system around it, and help the people involved execute it consistently.</p>
          <p>My career started with a technical foundation and moved through strategic Technical Account Management, Customer Success leadership, Solution Engineering, partner and GSI leadership, governance and AI, and now Customer Success Engineering leadership at GitLab.</p>
          <p>The titles may look broad, but the through-line is consistent:</p>
          <p className="rounded-xl border-l-4 border-macri-primary bg-orange-50 p-5 font-semibold text-slate-900">technical complexity → operating clarity → adoption → customer outcomes</p>
          <p>That breadth is useful because technical Customer Success rarely succeeds inside one function. It depends on how people lead, how Product and Engineering signals travel, how Sales and Renewals coordinate, and whether the customer can connect technology to the result they actually need.</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Button className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild><Link to="/leadership">Leadership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button variant="outline" className="border-macri-primary text-macri-primary" asChild><Link to="/experience">Experience</Link></Button>
            <Button variant="outline" className="border-macri-primary text-macri-primary" asChild><Link to="/selected-work">Selected Work</Link></Button>
          </div>
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Career Arc</h2>
            <ol className="space-y-3">
              {careerProgression.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-gray-700"><span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-macri-primary text-xs font-bold text-white">{index + 1}</span>{step}</li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  </>
);

export default About;

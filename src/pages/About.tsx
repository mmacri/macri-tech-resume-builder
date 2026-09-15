import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { careerProgression, profile } from '@/data/careerData';

const About: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About | Mike Macri MBA"
        description="About Michael Macri, MBA, a Customer Success Engineering and Technology Leader at GitLab with experience across customer success, solution engineering, partner ecosystems, AI governance, security, and enterprise platforms."
        url="https://mikemacri.com/about"
      />
      <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 font-saira text-4xl font-bold text-macri-primary lg:text-5xl">About Mike</h1>
          <p className="max-w-3xl text-xl leading-8 text-gray-700">
            Mike operates at the intersection of technology, customers, people, and business outcomes.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <div className="space-y-6 text-lg leading-8 text-gray-700">
              <p>
                Mike's career started with a technical foundation and grew through Technical Account Management, Customer Success leadership, Solution Engineering, partner and GSI leadership, enterprise governance, AI, and now Customer Success Engineering leadership at GitLab.
              </p>
              <p>
                Across GitLab, ServiceNow, VMware, and independent advisory work, the pattern has stayed consistent: build technical teams, programs, operating models, and reusable assets that help customers adopt complex platforms and connect that adoption to business value.
              </p>
              <p>
                His work spans DevSecOps, cloud platforms, security, GRC, AI governance, solution engineering, scaled customer success, partner ecosystems, and commercial alignment. Those are the arenas; the through-line is helping organizations turn technical complexity into clearer decisions, stronger adoption, and better customer outcomes.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
                <Link to="/selected-work">Explore My Work <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
              </Button>
            </div>
          </div>
          <aside className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-4 font-saira text-xl font-bold text-macri-primary">Career Arc</h2>
            <ol className="space-y-3">
              {careerProgression.map((step) => (
                <li key={step} className="rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800">{step}</li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
};

export default About;

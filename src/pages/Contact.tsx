import React from 'react';
import { Linkedin } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/careerData';

const Contact: React.FC = () => (
  <>
    <SEOHead
      title="Contact | Mike Macri"
      description="Connect with Mike Macri on LinkedIn to discuss Customer Success Engineering, technical leadership, DevSecOps adoption, AI/platform adoption, and customer-success operating models."
      url="https://mikemacri.com/contact"
    />
    <section className="min-h-[70vh] bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-macri-primary">Professional networking</p>
          <h1 className="mb-5 font-saira text-4xl font-bold text-slate-900 sm:text-5xl">Let’s Connect</h1>
          <p className="max-w-3xl text-xl leading-8 text-gray-700">The easiest way to reach me is LinkedIn.</p>
          <p className="max-w-3xl leading-7 text-gray-700">I’m always glad to connect around technology leadership, Customer Success Engineering, DevSecOps and AI adoption, or the systems that help technical organizations scale.</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn</a>
            </Button>
            <p className="mb-0 text-sm text-gray-600">linkedin.com/in/mikemacri</p>
          </div>

          <p className="mt-8 mb-0 text-sm text-gray-500">Direct website messaging is not currently enabled.</p>
        </div>
      </div>
    </section>
  </>
);

export default Contact;

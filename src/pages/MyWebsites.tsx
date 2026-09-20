import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/careerData';

const featuredOrder = ['gitlab-health', 'framework-fusion', 'cip-audit-ready', 'audit101', 'momentum-edge'];

const narratives: Record<string, { problem: string; why: string; demonstrates: string }> = {
  'gitlab-health': {
    problem: 'Customer teams need a shared way to interpret adoption, utilization, health, and renewal readiness.',
    why: 'To test how account signals can be turned into a clearer technical-success conversation and next action.',
    demonstrates: 'Customer-health reasoning, CSE operating design, data visualization, and DevSecOps context.',
  },
  'framework-fusion': {
    problem: 'Teams working across multiple compliance frameworks repeatedly interpret overlapping controls by hand.',
    why: 'To explore a reusable way to organize frameworks and surface common control relationships.',
    demonstrates: 'Systems thinking, control mapping, information architecture, and governance translation.',
  },
  'cip-audit-ready': {
    problem: 'Utility professionals need practical guidance that connects NERC CIP requirements to evidence and audit readiness.',
    why: 'To turn a dense compliance domain into a structured learning and preparation experience.',
    demonstrates: 'Technical enablement, regulated-industry context, curriculum design, and workflow clarity.',
  },
  audit101: {
    problem: 'New practitioners often learn frameworks in isolation instead of understanding the common control concepts beneath them.',
    why: 'To make audit fundamentals easier to understand through guided, reusable learning paths.',
    demonstrates: 'Enablement design, governance concepts, structured content, and audience empathy.',
  },
  'momentum-edge': {
    problem: 'Regulated organizations need concise advisory tools that connect governance requirements to practical operating decisions.',
    why: 'To support limited independent advisory work with reusable assessments, roadmaps, and learning assets.',
    demonstrates: 'Advisory communication, AI governance, cybersecurity compliance, and operating-model design.',
  },
  'customer-success-dashboard': {
    problem: 'Customer engagement and adoption signals are difficult to act on when they are fragmented.',
    why: 'To prototype a focused view of account activity, risk, and technical-success planning.',
    demonstrates: 'Customer-success analytics, signal design, and rapid prototyping.',
  },
  'mec-grc': {
    problem: 'Broad governance capabilities can be difficult to explain without a concrete, navigable model.',
    why: 'To experiment with interactive capability mapping and portfolio communication.',
    demonstrates: 'Information design, governance domain knowledge, and front-end experimentation.',
  },
  'homefit-recovery': {
    problem: 'Product research content benefits from consistent structure and comparison patterns.',
    why: 'To learn content modeling, search-oriented information design, and product comparison workflows.',
    demonstrates: 'Product experimentation, structured content, and audience research.',
  },
  'hoa-community': {
    problem: 'Community information is often fragmented across informal channels.',
    why: 'To explore private forums, resident feedback, and local communication patterns.',
    demonstrates: 'Community-product thinking, interface prototyping, and user-flow design.',
  },
};

const ProjectCard: React.FC<{ project: (typeof projects)[number]; compact?: boolean }> = ({ project, compact = false }) => {
  const narrative = narratives[project.id];
  return (
    <article id={project.id} className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className={`${compact ? 'aspect-[16/7]' : 'aspect-video'} border-b border-gray-200 bg-gray-100`}>
        <img src={project.image} alt={`${project.name} interface preview`} className="h-full w-full object-cover object-top" loading="lazy" width="640" height="360" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="secondary" className="mb-3 w-fit">{project.category}</Badge>
        <h3 className="mb-4 text-xl font-semibold text-slate-900">{project.name}</h3>
        <dl className="space-y-4 text-sm leading-6 text-gray-700">
          <div><dt className="font-semibold text-slate-900">Problem</dt><dd>{narrative.problem}</dd></div>
          <div><dt className="font-semibold text-slate-900">Why I built it</dt><dd>{narrative.why}</dd></div>
          <div><dt className="font-semibold text-slate-900">What it demonstrates</dt><dd>{narrative.demonstrates}</dd></div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Supporting technologies and domains">
          {project.technologies.slice(0, 4).map((technology) => <span key={technology} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">{technology}</span>)}
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
          <Button className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">View project <ExternalLink className="ml-2 h-4 w-4" /></a>
          </Button>
          {project.caseStudyUrl && (
            <Button variant="outline" className="border-macri-primary text-macri-primary" asChild>
              <Link to={project.caseStudyUrl}>Case study <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

const MyWebsites: React.FC = () => {
  const featured = featuredOrder.map((id) => projects.find((project) => project.id === id)).filter((project): project is (typeof projects)[number] => Boolean(project));
  const other = projects.filter((project) => !featuredOrder.includes(project.id));

  return (
    <>
      <SEOHead
        title="Projects | Mike Macri"
        description="Professional tools and technical experiments by Mike Macri spanning Customer Success Engineering, customer health, DevSecOps, governance, and enablement."
        url="https://mikemacri.com/projects"
      />

      <section className="border-b border-gray-200 bg-gradient-to-br from-macri-primary/5 via-white to-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-5 font-saira text-4xl font-bold text-slate-900 sm:text-5xl">Projects</h1>
          <p className="max-w-4xl text-xl leading-8 text-gray-700">I build tools and prototypes to turn ideas into working systems. Some support professional operating models; others are experiments that help me learn new technologies and approaches.</p>
          <p className="mb-0 max-w-3xl text-sm leading-6 text-gray-600">These projects demonstrate technical systems thinking and rapid prototyping. They do not position software development as Mike’s primary profession.</p>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="featured-projects-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="featured-projects-heading" className="mb-8 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Featured Professional Work</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {featured.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14" aria-labelledby="other-projects-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 id="other-projects-heading" className="mb-3 font-saira text-3xl font-bold text-slate-900 sm:text-4xl">Other Builds & Experiments</h2>
            <p className="mb-0 text-gray-700">Smaller explorations in customer engagement, content systems, community products, and interactive portfolio design.</p>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {other.map((project) => <ProjectCard key={project.id} project={project} compact />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyWebsites;

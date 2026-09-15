import React, { useMemo, useState } from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projectCategories, projects } from '@/data/careerData';

const MyWebsites: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <SEOHead
        title="Projects & Experiments | Mike Macri MBA"
        description="Platforms, tools, dashboards, and experiments Mike Macri has built to explore better ways of solving customer, security, governance, and operational problems."
        keywords="Mike Macri projects, GitLab health, CSM dashboard, CIP audit ready, Framework Fusion, AI governance, GRC tools"
        url="https://mikemacri.com/projects"
      />

      <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-saira text-4xl font-bold text-macri-primary">Projects & Experiments</h1>
            <p className="mx-auto max-w-3xl text-xl leading-8 text-gray-700">
              Platforms, tools, dashboards, and experiments I have built to explore better ways of solving customer, security, governance, and operational problems.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-macri-primary ${
                  activeCategory === category
                    ? 'bg-macri-primary text-white'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-macri-primary hover:text-macri-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="aspect-video border-b border-gray-200 bg-gray-100">
                  <img src={project.image} alt={`${project.name} preview`} className="h-full w-full object-cover object-top" loading="lazy" />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">{project.category}</Badge>
                  <h2 className="mb-2 font-saira text-xl font-bold text-macri-primary">{project.name}</h2>
                  <p className="mb-4 text-sm leading-6 text-gray-700">{project.description}</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((technology) => (
                      <span key={technology} className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">{technology}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button className="bg-macri-primary text-white hover:bg-macri-primary-dark" asChild>
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <Layers className="mr-2 h-4 w-4" /> View Project <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    {project.caseStudyUrl && (
                      <Button variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild>
                        <a href={project.caseStudyUrl}>View Case Study</a>
                      </Button>
                    )}
                    {project.sourceUrl && (
                      <Button variant="ghost" className="text-macri-primary" asChild>
                        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Source
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyWebsites;

import React from 'react';

export const PhilosophySection = () => {
  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Partnerships That Create Measurable Business Outcomes
        </h2>

        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-lg leading-relaxed mb-6">
            I see partner development not as deal management — but as <strong>ecosystem architecture</strong>. A strong partner strategy unites technology, enablement, and customer outcomes.
          </p>
          
          <p className="text-lg leading-relaxed mb-4">
            I build ecosystems that:
          </p>
          
          <ul className="space-y-3 text-lg">
            <li>Align with corporate strategy and solution priorities.</li>
            <li>Empower partners through repeatable frameworks, playbooks, and enablement.</li>
            <li>Leverage co-innovation to create differentiated customer value.</li>
            <li>Focus on measurable outcomes: pipeline growth, revenue influence, and customer success.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

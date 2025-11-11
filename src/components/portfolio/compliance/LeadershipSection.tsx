import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const LeadershipSection = () => {
  const approaches = [
    'Coaching teams to understand compliance as a shared responsibility.',
    'Structuring review cycles that emphasize transparency over bureaucracy.',
    'Aligning internal audit, security, and risk teams around shared success metrics.',
    'Fostering cross-functional alignment between compliance and business operations.'
  ];

  return (
    <section className="py-16 md:py-20 bg-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Leading Compliance Teams Toward Continuous Improvement
        </h2>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed mb-6 text-center">
            I build collaborative compliance cultures where technology, people, and processes work together seamlessly.
          </p>
          
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">My leadership approach focuses on:</h3>
            <ul className="space-y-4">
              {approaches.map((approach, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-macri-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground text-lg">{approach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

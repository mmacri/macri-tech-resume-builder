
import React from 'react';
import { Quote } from 'lucide-react';

interface ReferencesSectionProps {
  references: string[];
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({ references }) => {
  if (references.length === 0) {
    return null;
  }

  return (
    <div className="my-10 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold mb-6 text-macri-primary">References</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {references.map((reference, index) => (
          <blockquote 
            key={`ref-${index}`} 
            className="relative pl-6 pr-4 py-4 bg-gray-50 rounded-lg border-l-4 border-macri-primary italic"
          >
            <Quote className="absolute top-4 left-2 h-4 w-4 text-macri-primary opacity-40" />
            <p className="text-gray-700">{reference}</p>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default ReferencesSection;

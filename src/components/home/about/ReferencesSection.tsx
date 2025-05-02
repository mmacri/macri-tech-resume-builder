
import React from 'react';

interface ReferencesSectionProps {
  references: string[];
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({ references }) => {
  if (references.length === 0) {
    return null;
  }

  return (
    <div className="my-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold mb-6 text-macri-primary">References</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {references.map((reference, index) => (
          <blockquote key={`ref-${index}`} className="blockquote">
            "{reference}"
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default ReferencesSection;

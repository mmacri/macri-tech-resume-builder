import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { organizationModel } from '@/data/careerData';

export const Flow: React.FC<{ steps: string[]; label?: string }> = ({ steps, label }) => (
  <div className="grid grid-cols-1 gap-2 md:grid-flow-col md:auto-cols-fr md:items-center" aria-label={label}>
    {steps.map((step, index) => (
      <React.Fragment key={step}>
        <div className="flex min-h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm">
          {step}
        </div>
        {index < steps.length - 1 && (
          <>
            <ArrowDown className="mx-auto h-5 w-5 text-macri-primary md:hidden" aria-hidden="true" />
            <ArrowRight className="mx-auto hidden h-5 w-5 text-macri-primary md:block" aria-hidden="true" />
          </>
        )}
      </React.Fragment>
    ))}
  </div>
);

export const OrganizationFramework: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Technical organization operating framework">
      {organizationModel.map((item, index) => (
        <div key={item.stage} className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-macri-primary">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.stage}</h3>
          <p className="mb-0 text-sm leading-6 text-gray-700">{item.question}</p>
          {index < organizationModel.length - 1 && (index + 1) % 4 !== 0 && (
            <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-white text-macri-primary lg:block" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
    {!compact && (
      <p className="mt-5 mb-0 text-sm font-medium text-gray-600">The loop is deliberate: measurement should change the model, not merely report on it.</p>
    )}
  </div>
);

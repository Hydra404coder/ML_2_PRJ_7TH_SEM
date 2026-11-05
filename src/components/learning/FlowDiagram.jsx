import React from 'react';
import { Database, Cpu, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export function FlowDiagram() {
  const steps = [
    {
      title: 'Labelled Examples',
      desc: 'Observed instances with YES / NO classifications',
      icon: Database,
      badge: 'Data D',
    },
    {
      title: 'Boundary Updates',
      desc: 'S generalizes upwards ↑, G specializes downwards ↓',
      icon: Cpu,
      badge: 'Algorithm',
    },
    {
      title: 'Version Space',
      desc: 'Conjunctive hypotheses bounded between S and G',
      icon: ShieldCheck,
      badge: 'VS_{H,D}',
    },
    {
      title: 'Prediction Query',
      desc: 'YES, NO, or UNCERTAIN based on consensus',
      icon: Zap,
      badge: 'Output',
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-xl border theme-border theme-surface shadow-subtle">
      <div className="mb-5">
        <h3 className="text-sm font-bold theme-text-primary flex items-center gap-2">
          <span>End-to-End Concept Learning Pipeline</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
            Flow
          </span>
        </h3>
        <p className="text-xs theme-text-muted mt-0.5">
          Logical sequence from training observations to guaranteed deductive predictions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative flex flex-col justify-between p-3.5 rounded-lg theme-surface-subtle border theme-border">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border theme-border theme-surface theme-text-muted">
                    {step.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold theme-text-primary mb-0.5">{step.title}</h4>
                <p className="text-[11px] theme-text-muted leading-relaxed">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 p-0.5 rounded-full theme-surface border theme-border theme-text-muted">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

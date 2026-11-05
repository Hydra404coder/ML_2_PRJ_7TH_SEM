import React from 'react';
import { BookOpen, Layers, Eye, RefreshCw, Zap, ChevronRight } from 'lucide-react';

export function JourneySteps({ onSelectStep }) {
  const steps = [
    {
      number: '01',
      title: 'Theory Notes',
      desc: 'Understand attributes, instances, wildcards, and general-to-specific ordering.',
      icon: BookOpen,
      action: () => onSelectStep('fundamentals'),
    },
    {
      number: '02',
      title: 'Select Scenario',
      desc: 'Choose from 4 discrete educational domains with defined attribute spaces.',
      icon: Layers,
      action: () => onSelectStep('scenarios'),
    },
    {
      number: '03',
      title: 'Feed Examples',
      desc: 'Step through positive and negative observations one instance at a time.',
      icon: Eye,
      action: () => onSelectStep('scenarios'),
    },
    {
      number: '04',
      title: 'Observe Updates',
      desc: 'Watch S generalize upwards and G specialize downwards across the lattice.',
      icon: RefreshCw,
      action: () => onSelectStep('scenarios'),
    },
    {
      number: '05',
      title: 'Test Query',
      desc: 'Evaluate unseen instances against the surviving version space.',
      icon: Zap,
      action: () => onSelectStep('scenarios'),
    },
  ];

  return (
    <div className="py-10 border-b theme-border theme-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight theme-text-primary">
              The 5-Stage Learning Sequence
            </h2>
            <p className="text-xs theme-text-muted mt-0.5">
              A structured workflow for understanding boundary convergence
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                onClick={step.action}
                className="group p-4 rounded-xl theme-surface border theme-border hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer flex flex-col justify-between shadow-subtle hover:shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      {step.number}
                    </span>
                    <Icon className="w-4 h-4 theme-text-muted group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold theme-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] theme-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t theme-border flex items-center justify-between text-[11px] theme-text-muted group-hover:theme-text-primary">
                  <span>Open step</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

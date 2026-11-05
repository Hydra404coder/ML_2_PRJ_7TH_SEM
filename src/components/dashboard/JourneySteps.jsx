import React from 'react';
import { BookOpen, Layers, Eye, RefreshCw, Sparkles, ChevronRight } from 'lucide-react';

export function JourneySteps({ onSelectStep }) {
  const steps = [
    {
      number: '01',
      title: 'Learn the Basics',
      desc: 'Understand attributes, hypotheses, boundaries, and version spaces.',
      icon: BookOpen,
      action: () => onSelectStep('fundamentals'),
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30',
    },
    {
      number: '02',
      title: 'Choose a Scenario',
      desc: 'Select from 4 real-world simplified tasks with predefined attributes.',
      icon: Layers,
      action: () => onSelectStep('scenarios'),
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    },
    {
      number: '03',
      title: 'Explore Examples',
      desc: 'Observe positive and negative instances entering the learning process.',
      icon: Eye,
      action: () => onSelectStep('scenarios'),
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      number: '04',
      title: 'Watch Updates',
      desc: 'See S generalize and G specialize dynamically across the hypothesis lattice.',
      icon: RefreshCw,
      action: () => onSelectStep('scenarios'),
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    },
    {
      number: '05',
      title: 'Test Predictions',
      desc: 'Classify unseen inputs and discover when the model is certain or uncertain.',
      icon: Sparkles,
      action: () => onSelectStep('scenarios'),
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    },
  ];

  return (
    <div className="py-12 border-b border-slate-800/60 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Student Learning Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Follow this 5-step path to master general-to-specific concept learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                onClick={step.action}
                className="group relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-indigo-400 transition-colors">
                      {step.number}
                    </span>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${step.color} border`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-slate-300">
                  <span>Explore step</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

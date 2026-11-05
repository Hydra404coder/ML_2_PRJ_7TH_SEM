import React from 'react';
import { Database, Cpu, GitCommit, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export function FlowDiagram() {
  const steps = [
    {
      title: 'Labelled Examples',
      desc: 'Instances with YES / NO labels',
      icon: Database,
      badge: 'Input D',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Boundary Updates',
      desc: 'S generalizes ↑, G specializes ↓',
      icon: Cpu,
      badge: 'Algorithm',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Version Space',
      desc: 'S ⊆ Surviving Hypotheses ⊆ G',
      icon: ShieldCheck,
      badge: 'VS_{H,D}',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Prediction Query',
      desc: 'YES, NO, or UNCERTAIN vote',
      icon: Sparkles,
      badge: 'Output',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
      <div className="mb-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>End-to-End Concept Learning Flow</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Pipeline
          </span>
        </h3>
        <p className="text-xs text-slate-400">
          How Candidate Elimination converts observations into guaranteed classifications
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative flex flex-col justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg border ${step.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                    {step.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-slate-900 border border-slate-700 text-slate-400">
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

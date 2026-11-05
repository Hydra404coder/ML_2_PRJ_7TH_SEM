import React from 'react';
import { PlusCircle, MinusCircle, ShieldCheck, HelpCircle, ArrowUpRight } from 'lucide-react';

export function DiscoverySection({ onOpenFundamentals }) {
  const discoveries = [
    {
      title: 'Positive Examples',
      label: 'Generalizes S Boundary',
      icon: PlusCircle,
      color: 'emerald',
      badge: 'YES / +',
      desc: 'Each positive example reveals features that MUST be accommodated. The specific boundary S is forced upwards to generalize, expanding coverage while remaining consistent with observed positives.',
    },
    {
      title: 'Negative Examples',
      label: 'Specializes G Boundary',
      icon: MinusCircle,
      color: 'rose',
      badge: 'NO / -',
      desc: 'Negative examples provide counterevidence. The general boundary G must specialize downwards to carve away regions that incorrectly cover negative instances, keeping hypotheses strictly consistent.',
    },
    {
      title: 'The Version Space',
      label: 'Target Concept Enclosure',
      icon: ShieldCheck,
      color: 'indigo',
      badge: 'S ⊆ VS ⊆ G',
      desc: 'The version space represents the exact subset of all candidate hypotheses that perfectly classify every observed training example so far. It systematically contracts as more data is introduced.',
    },
    {
      title: 'Uncertain Predictions',
      label: 'Epistemic Ambiguity',
      icon: HelpCircle,
      color: 'amber',
      badge: 'YES vs NO Split',
      desc: 'When an unseen query instance is covered by some surviving hypotheses but rejected by others, the system honestly outputs UNCERTAIN, proving that more evidence is required to break the tie.',
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">What You Will Discover</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Core concepts of Machine Learning Module 1 visualized in real time
            </p>
          </div>
          <button
            onClick={onOpenFundamentals}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Read Complete Theory</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {discoveries.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-0.5">{item.title}</h3>
                  <div className="text-xs font-medium text-indigo-400 mb-2.5">{item.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

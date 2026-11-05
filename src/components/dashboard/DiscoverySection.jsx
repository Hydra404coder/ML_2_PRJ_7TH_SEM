import React from 'react';
import { PlusCircle, MinusCircle, ShieldCheck, HelpCircle, ArrowUpRight } from 'lucide-react';

export function DiscoverySection({ onOpenFundamentals }) {
  const discoveries = [
    {
      title: 'Positive Examples',
      label: 'Generalizes S Boundary',
      icon: PlusCircle,
      badge: 'YES / (+)',
      desc: 'Each positive example establishes an instance that the target concept MUST cover. S is forced upwards into minimal generalizations.',
    },
    {
      title: 'Negative Examples',
      label: 'Specializes G Boundary',
      icon: MinusCircle,
      badge: 'NO / (-)',
      desc: 'Negative instances provide counterevidence. G must specialize downwards into minimal sub-rules that exclude the negative instance.',
    },
    {
      title: 'The Version Space',
      label: 'Concept Enclosure',
      icon: ShieldCheck,
      badge: 'S ⊆ VS ⊆ G',
      desc: 'The complete set of all hypotheses consistent with every observed training example, bounded symmetrically between S and G.',
    },
    {
      title: 'Uncertain Predictions',
      label: 'Epistemic Ambiguity',
      icon: HelpCircle,
      badge: 'YES vs NO Split',
      desc: 'When surviving hypotheses disagree on an unseen test example, the learner outputs UNCERTAIN, proving that more data is required.',
    },
  ];

  return (
    <div className="py-10 theme-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight theme-text-primary">
              Core Theoretical Takeaways
            </h2>
            <p className="text-xs theme-text-muted mt-0.5">
              Key mechanics that you will observe in the workbench
            </p>
          </div>
          <button
            onClick={onOpenFundamentals}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Read Complete Theory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {discoveries.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-4 rounded-xl theme-surface border theme-border shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border theme-border theme-surface-subtle theme-text-secondary">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold theme-text-primary mb-0.5">{item.title}</h3>
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mb-2">{item.label}</div>
                  <p className="text-xs theme-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

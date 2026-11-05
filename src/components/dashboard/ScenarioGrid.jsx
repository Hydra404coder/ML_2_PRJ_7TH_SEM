import React from 'react';
import {
  Sun,
  Apple,
  GraduationCap,
  Sprout,
  ArrowRight,
  Database,
  Sliders,
} from 'lucide-react';
import { SCENARIOS } from '../../data/scenarios.js';

export function ScenarioGrid({ onSelectScenario }) {
  const iconMap = {
    Sun,
    Apple,
    GraduationCap,
    Sprout,
  };

  return (
    <div className="py-10 border-b theme-border theme-surface-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400 mb-1">
              Laboratory Exercises
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight theme-text-primary">
              Predefined Concept Learning Scenarios
            </h2>
            <p className="text-xs theme-text-muted mt-0.5">
              Select a scenario to inspect its finite hypothesis space, dataset, and live algorithm execution.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCENARIOS.map((scenario) => {
            const Icon = iconMap[scenario.icon] || Sun;

            return (
              <div
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.id)}
                className="group p-5 rounded-xl theme-surface border theme-border hover:border-blue-500/60 shadow-subtle hover:shadow-card transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-semibold text-blue-600 dark:text-blue-400">
                          {scenario.category}
                        </span>
                        <h3 className="text-base font-bold theme-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {scenario.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs theme-text-secondary leading-relaxed mb-4">
                    {scenario.description}
                  </p>

                  {/* Target Concept Box */}
                  <div className="p-3 rounded-lg theme-surface-subtle border theme-border mb-4">
                    <div className="text-[10px] font-semibold theme-text-muted uppercase tracking-wider mb-0.5">
                      Target Concept
                    </div>
                    <div className="text-xs font-semibold theme-text-primary">
                      "{scenario.targetConceptQuestion}"
                    </div>
                    <div className="mt-1 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
                      Rule: {scenario.targetConceptHypothesis}
                    </div>
                  </div>

                  {/* Attributes list */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {scenario.attributes.map((attr) => (
                      <span
                        key={attr.name}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border theme-border text-[11px] theme-text-secondary"
                      >
                        <strong className="theme-text-primary">{attr.name}:</strong> {attr.values.join(', ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t theme-border flex items-center justify-between">
                  <span className="text-[11px] theme-text-muted flex items-center gap-1.5 font-mono">
                    <Database className="w-3.5 h-3.5 opacity-60" />
                    <span>{scenario.baseDataset.length} Predefined Examples</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectScenario(scenario.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                  >
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

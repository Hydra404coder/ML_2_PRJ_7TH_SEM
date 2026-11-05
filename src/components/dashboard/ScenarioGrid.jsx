import React from 'react';
import {
  Sun,
  Apple,
  GraduationCap,
  Sprout,
  ArrowRight,
  Database,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { SCENARIOS } from '../../data/scenarios.js';

export function ScenarioGrid({ onSelectScenario }) {
  const iconMap = {
    Sun,
    Apple,
    GraduationCap,
    Sprout,
  };

  const colorStyles = {
    indigo: {
      border: 'hover:border-indigo-500/50',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      glow: 'group-hover:shadow-indigo-500/10',
      button: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    },
    amber: {
      border: 'hover:border-amber-500/50',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'group-hover:shadow-amber-500/10',
      button: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    sky: {
      border: 'hover:border-sky-500/50',
      badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      glow: 'group-hover:shadow-sky-500/10',
      button: 'bg-sky-600 hover:bg-sky-500 text-white',
    },
    emerald: {
      border: 'hover:border-emerald-500/50',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:shadow-emerald-500/10',
      button: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
  };

  return (
    <div className="py-12 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium mb-2">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive Domains</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Explore the 4 Predefined Scenarios</h2>
            <p className="text-sm text-slate-400 mt-1">
              Select an educational scenario to examine its attribute space, training data, and version space convergence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCENARIOS.map((scenario) => {
            const Icon = iconMap[scenario.icon] || Sun;
            const style = colorStyles[scenario.accentColor] || colorStyles.indigo;

            return (
              <div
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.id)}
                className={`group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 ${style.border} ${style.glow} shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.badge}`}>
                          {scenario.category}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                          {scenario.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                    {scenario.description}
                  </p>

                  {/* Target Concept Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-5">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Target Concept
                    </div>
                    <div className="text-xs font-medium text-slate-200">
                      "{scenario.targetConceptQuestion}"
                    </div>
                    <div className="mt-2 text-xs font-mono text-indigo-300 font-semibold flex items-center gap-2">
                      <span className="text-slate-500">True Rule:</span> {scenario.targetConceptHypothesis}
                    </div>
                  </div>

                  {/* Attribute tags */}
                  <div className="mb-5">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sliders className="w-3 h-3 text-slate-400" />
                      <span>Attributes & Domain Values</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {scenario.attributes.map((attr) => (
                        <div
                          key={attr.name}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-1.5"
                        >
                          <span className="font-medium text-white">{attr.name}:</span>
                          <span className="text-slate-400 text-[11px]">({attr.values.join(', ')})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-slate-500" />
                    <span>{scenario.baseDataset.length} Predefined Examples</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectScenario(scenario.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${style.button} shadow-md transition-all group-hover:gap-2.5`}
                  >
                    <span>Open Scenario</span>
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

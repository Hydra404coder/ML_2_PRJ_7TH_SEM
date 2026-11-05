import React from 'react';
import { EXPERIMENT_MODES } from '../../data/scenarios.js';
import { Compass, PlusCircle, MinusCircle, Layers, Check } from 'lucide-react';

export function ModeSelector({ selectedMode, onSelectMode }) {
  const iconMap = {
    Compass,
    PlusCircle,
    MinusCircle,
    Layers,
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Select Experiment Mode
        </label>
        <span className="text-xs text-slate-500">Pick how data is fed into the learner</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {EXPERIMENT_MODES.map((mode) => {
          const Icon = iconMap[mode.icon] || Compass;
          const isSelected = selectedMode === mode.id;

          return (
            <div
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg border ${
                        isSelected
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">{mode.name}</span>
                  </div>

                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {mode.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-indigo-200/90 font-medium mb-1">{mode.tagline}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">{mode.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

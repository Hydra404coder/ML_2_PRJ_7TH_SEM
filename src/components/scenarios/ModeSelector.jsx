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
        <label className="text-xs font-bold uppercase tracking-wider theme-text-primary">
          Select Learning Mode
        </label>
        <span className="text-xs theme-text-muted">Choose training observation filter</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {EXPERIMENT_MODES.map((mode) => {
          const Icon = iconMap[mode.icon] || Compass;
          const isSelected = selectedMode === mode.id;

          return (
            <div
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                  : 'theme-surface border theme-border hover:theme-surface-subtle'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-md border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'theme-surface-subtle border theme-border theme-text-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold theme-text-primary">{mode.name}</span>
                  </div>

                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded border theme-border theme-surface-subtle theme-text-muted font-medium">
                      {mode.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">{mode.tagline}</p>
                <p className="text-[11px] theme-text-secondary leading-relaxed">{mode.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

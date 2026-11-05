import React from 'react';
import { Badge } from '../common/Badge.jsx';
import {
  PlusCircle,
  MinusCircle,
  Sparkles,
  Info,
  Sliders,
} from 'lucide-react';
import { formatHypothesis } from '../../engine/hypothesis.js';

export function CurrentExampleCard({ currentExample, currentStep, totalSteps, attributes }) {
  if (!currentExample || currentStep === 0) {
    return (
      <div className="p-4 sm:p-5 rounded-xl border theme-border theme-surface shadow-subtle flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase theme-text-muted">
              Observation Feed
            </span>
            <Badge size="sm" variant="default">Awaiting Input</Badge>
          </div>

          <h3 className="text-sm font-bold theme-text-primary mb-1">State: Prior to Observation</h3>
          <p className="text-xs theme-text-secondary leading-relaxed mb-4">
            Hypothesis space initialized. Boundary <strong className="text-blue-600 dark:text-blue-400">G₀</strong> starts at the maximally general hypothesis <code className="font-mono font-semibold">⟨?, ?, ...⟩</code>, while boundary <strong className="text-emerald-600 dark:text-emerald-400">S₀</strong> starts at the maximally specific null hypothesis <code className="font-mono font-semibold">⟨Ø, Ø, ...⟩</code>.
          </p>
        </div>

        <div className="p-3 rounded-lg theme-surface-subtle border theme-border text-center text-xs theme-text-muted">
          Click <strong className="theme-text-primary">"Next"</strong> or <strong className="theme-text-primary">"Autoplay"</strong> to introduce Example 1.
        </div>
      </div>
    );
  }

  const isPos = currentExample.label === 'YES' || currentExample.label === '+';
  const instanceValues = attributes.map(a => currentExample.values[a.name]);

  return (
    <div className="p-4 sm:p-5 rounded-xl border theme-border theme-surface shadow-subtle flex flex-col justify-between h-full">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold theme-text-primary">
            <span>Example #{currentExample.id}</span>
            <span className="text-[10px] theme-text-muted">({currentStep}/{totalSteps})</span>
          </div>

          <Badge variant={isPos ? 'positive' : 'negative'} size="md">
            {isPos ? (
              <>
                <PlusCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>POSITIVE (YES)</span>
              </>
            ) : (
              <>
                <MinusCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>NEGATIVE (NO)</span>
              </>
            )}
          </Badge>
        </div>

        {/* Instance Vector */}
        <div className="mb-3.5">
          <div className="text-[10px] font-semibold uppercase theme-text-muted mb-1">
            Observed Instance Vector
          </div>
          <div className="p-2.5 rounded-lg theme-surface-subtle border theme-border flex items-center justify-between font-mono text-xs sm:text-sm font-bold theme-text-primary">
            <span>{formatHypothesis(instanceValues)}</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded font-sans ${isPos ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300' : 'text-rose-700 bg-rose-100 dark:bg-rose-950 dark:text-rose-300'}`}>
              Class: {currentExample.label}
            </span>
          </div>
        </div>

        {/* Attribute Breakdown */}
        <div className="space-y-1.5 mb-3.5">
          <div className="text-[10px] font-semibold uppercase theme-text-muted">
            Attribute Values
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {attributes.map((attr) => (
              <div
                key={attr.name}
                className="p-2 rounded-md theme-surface-subtle border theme-border flex flex-col text-xs"
              >
                <span className="text-[10px] theme-text-muted">{attr.name}</span>
                <span className="font-mono font-bold theme-text-primary mt-0.5">
                  {currentExample.values[attr.name]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        {currentExample.note && (
          <div className="p-2.5 rounded-lg theme-surface-subtle border theme-border text-xs theme-text-secondary flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{currentExample.note}</span>
          </div>
        )}
      </div>

      {/* Footer step status */}
      <div className="mt-3 pt-2.5 border-t theme-border flex items-center justify-between text-[11px] theme-text-muted font-mono">
        <span className="flex items-center gap-1.5 font-sans">
          <span className={`w-2 h-2 rounded-full ${isPos ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          Candidate Elimination Step Active
        </span>
        <span>Step {currentStep}</span>
      </div>
    </div>
  );
}

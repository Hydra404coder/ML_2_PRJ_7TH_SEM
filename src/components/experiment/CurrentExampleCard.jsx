import React from 'react';
import { Badge } from '../common/Badge.jsx';
import {
  PlusCircle,
  MinusCircle,
  Eye,
  ArrowDown,
  Sparkles,
  Info,
} from 'lucide-react';
import { formatHypothesis } from '../../engine/hypothesis.js';

export function CurrentExampleCard({ currentExample, currentStep, totalSteps, attributes }) {
  if (!currentExample || currentStep === 0) {
    return (
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Initial State (Step 0)
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] border border-slate-700">
              Awaiting Input
            </span>
          </div>

          <h3 className="text-base font-bold text-white mb-2">Hypothesis Space Initialized</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            No training examples have been observed yet. Boundary <strong className="text-indigo-400">G₀</strong> starts at the most general hypothesis <code className="text-indigo-300 font-mono">⟨?, ?, ...⟩</code>, while boundary <strong className="text-emerald-400">S₀</strong> starts at the most specific hypothesis <code className="text-emerald-300 font-mono">⟨Ø, Ø, ...⟩</code>.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-indigo-400 mx-auto mb-1 animate-bounce" />
          Click <strong className="text-white">"Next"</strong> or <strong className="text-white">"Autoplay"</strong> to introduce Example 1.
        </div>
      </div>
    );
  }

  const isPos = currentExample.label === 'YES' || currentExample.label === '+';
  const instanceValues = attributes.map(a => currentExample.values[a.name]);

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between h-full ${
        isPos
          ? 'bg-gradient-to-b from-emerald-950/30 to-slate-900/90 border-emerald-500/40 glow-emerald'
          : 'bg-gradient-to-b from-rose-950/30 to-slate-900/90 border-rose-500/40'
      }`}
    >
      <div>
        {/* Header: Example ID & Label */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">
              Example #{currentExample.id}
            </span>
            <span className="text-[10px] text-slate-500">
              ({currentStep} of {totalSteps})
            </span>
          </div>

          <Badge variant={isPos ? 'positive' : 'negative'} size="md">
            {isPos ? (
              <>
                <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>POSITIVE (YES)</span>
              </>
            ) : (
              <>
                <MinusCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>NEGATIVE (NO)</span>
              </>
            )}
          </Badge>
        </div>

        {/* Tuple Display */}
        <div className="mb-4">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
            Instance Vector
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-white px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <span>{formatHypothesis(instanceValues)}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono ${
                isPos ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'
              }`}
            >
              Label: {currentExample.label}
            </span>
          </div>
        </div>

        {/* Attribute Breakdown */}
        <div className="space-y-2 mb-4">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Attribute Values
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {attributes.map((attr) => (
              <div
                key={attr.name}
                className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 flex flex-col"
              >
                <span className="text-[10px] text-slate-500">{attr.name}</span>
                <span className="text-xs font-bold text-white font-mono mt-0.5">
                  {currentExample.values[attr.name]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pedagogical Note */}
        {currentExample.note && (
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{currentExample.note}</span>
          </div>
        )}
      </div>

      {/* Animation / Step effect footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full animate-ping ${
              isPos ? 'bg-emerald-400' : 'bg-rose-400'
            }`}
          />
          Processed in Candidate Elimination
        </span>
        <span className="font-mono text-slate-500">Step {currentStep}</span>
      </div>
    </div>
  );
}

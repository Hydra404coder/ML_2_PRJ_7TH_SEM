import React from 'react';
import {
  Lightbulb,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Info,
} from 'lucide-react';

export function ExplanationCard({
  explanation,
  actions = [],
  summary,
  currentStep,
  previousVsCount,
  currentVsCount,
}) {
  const countDelta = previousVsCount !== null ? previousVsCount - currentVsCount : 0;

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Step #{currentStep} Learning Explanation
            </h3>
          </div>

          {previousVsCount !== null && (
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">Version Space:</span>
              <span className="text-white font-bold">{currentVsCount}</span>
              {countDelta > 0 && (
                <span className="text-emerald-400 font-semibold flex items-center">
                  (-{countDelta})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Primary Explanation */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 mb-4">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {explanation || 'Awaiting training data to begin Candidate Elimination.'}
          </p>
        </div>

        {/* Algorithm Action Steps */}
        {actions.length > 0 && (
          <div className="space-y-2 mb-4">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Exact Algorithmic Operations
            </div>
            <ul className="space-y-1.5">
              {actions.map((act, i) => (
                <li
                  key={i}
                  className="text-xs text-slate-300 p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-2 leading-relaxed"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Summary status pill */}
      {summary && (
        <div className="pt-3 border-t border-slate-800/80 text-xs font-medium text-indigo-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
          <span>{summary}</span>
        </div>
      )}
    </div>
  );
}

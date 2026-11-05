import React from 'react';
import {
  Lightbulb,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
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
    <div className="p-4 rounded-xl border theme-border theme-surface shadow-subtle flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider theme-text-primary">
              Step #{currentStep} Algorithmic Commentary
            </h3>
          </div>

          {previousVsCount !== null && (
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="theme-text-muted">|VS|:</span>
              <span className="font-bold theme-text-primary">{currentVsCount}</span>
              {countDelta > 0 && (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  (-{countDelta})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Narrative text */}
        <p className="text-xs theme-text-secondary leading-relaxed mb-3">
          {explanation || 'Awaiting training data to start algorithm.'}
        </p>

        {/* Actions list */}
        {actions.length > 0 && (
          <div className="space-y-1 mb-3">
            <div className="text-[10px] font-semibold uppercase theme-text-muted">
              Executed Boundary Actions
            </div>
            <ul className="space-y-1">
              {actions.map((act, i) => (
                <li
                  key={i}
                  className="text-xs theme-text-secondary p-1.5 rounded theme-surface-subtle border theme-border flex items-start gap-1.5 leading-snug"
                >
                  <ArrowRight className="w-3 h-3 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="pt-2 border-t theme-border text-xs font-medium text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span>{summary}</span>
        </div>
      )}
    </div>
  );
}

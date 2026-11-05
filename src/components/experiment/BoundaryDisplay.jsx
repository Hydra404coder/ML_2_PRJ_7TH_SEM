import React from 'react';
import { formatHypothesis } from '../../engine/hypothesis.js';
import { ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export function BoundaryDisplay({ S, G, isConsistent, versionSpaceCount }) {
  const isConverged = S.length === 1 && G.length === 1 && formatHypothesis(S[0]) === formatHypothesis(G[0]);

  return (
    <div className="space-y-3">
      {/* Convergence Alert */}
      {isConverged && isConsistent && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-emerald-900 dark:text-emerald-200">
              Version Space Converged:
            </span>{' '}
            <span className="theme-text-secondary">
              S and G are identical at <strong className="font-mono text-emerald-800 dark:text-emerald-300">{formatHypothesis(S[0])}</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Inconsistency Alert */}
      {(!isConsistent || S.length === 0 || G.length === 0) && (
        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-rose-900 dark:text-rose-200">
              Inconsistent Version Space:
            </span>{' '}
            <span className="theme-text-secondary">
              No single conjunction in this hypothesis space satisfies all observations.
            </span>
          </div>
        </div>
      )}

      {/* Boundary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* G Boundary */}
        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 theme-surface shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                G Boundary (Maximally General)
              </h4>
            </div>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
              |G| = {G.length}
            </span>
          </div>

          <p className="text-[11px] theme-text-muted mb-2">
            Broadest rules excluding all observed negative counterexamples.
          </p>

          <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
            {G.length === 0 ? (
              <div className="text-xs text-rose-600 font-mono italic">∅ (Empty set)</div>
            ) : (
              G.map((hyp, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 font-mono text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between"
                >
                  <span>{formatHypothesis(hyp)}</span>
                  <span className="text-[10px] font-sans font-normal theme-text-muted">General</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* S Boundary */}
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900 theme-surface shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                S Boundary (Maximally Specific)
              </h4>
            </div>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
              |S| = {S.length}
            </span>
          </div>

          <p className="text-[11px] theme-text-muted mb-2">
            Tightest rules covering all observed positive examples.
          </p>

          <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
            {S.length === 0 ? (
              <div className="text-xs text-rose-600 font-mono italic">∅ (Empty set)</div>
            ) : (
              S.map((hyp, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 font-mono text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between"
                >
                  <span>{formatHypothesis(hyp)}</span>
                  <span className="text-[10px] font-sans font-normal theme-text-muted">Specific</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

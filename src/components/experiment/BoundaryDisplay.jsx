import React from 'react';
import { formatHypothesis } from '../../engine/hypothesis.js';
import { ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export function BoundaryDisplay({ S, G, isConsistent, versionSpaceCount }) {
  const isConverged = S.length === 1 && G.length === 1 && formatHypothesis(S[0]) === formatHypothesis(G[0]);

  return (
    <div className="space-y-4">
      {/* Convergence Banner if S and G meet */}
      {isConverged && isConsistent && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 via-indigo-950/40 to-slate-900 border border-emerald-500/50 flex items-center gap-3 animate-in fade-in">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-300">
              Version Space Converged to 1 Unique Hypothesis!
            </div>
            <div className="text-xs text-slate-300">
              S and G are identical: <span className="font-mono font-bold text-white">{formatHypothesis(S[0])}</span>. The target concept is completely learned.
            </div>
          </div>
        </div>
      )}

      {/* Inconsistent banner if empty */}
      {(!isConsistent || S.length === 0 || G.length === 0) && (
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-rose-300">
              Version Space is Empty (Inconsistent Observations)
            </div>
            <div className="text-xs text-slate-300">
              No single conjunctive hypothesis can satisfy all training examples.
            </div>
          </div>
        </div>
      )}

      {/* Boundaries Grid: G (General) on Top, S (Specific) on Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* G Boundary Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/40 shadow-md">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                G Boundary (Maximally General)
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
              {G.length} Hypothesis{G.length !== 1 ? 'es' : ''}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Upper bound: most general rules that exclude all observed negative examples.
          </p>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {G.length === 0 ? (
              <div className="text-xs text-rose-400 font-mono italic">∅ (Empty set)</div>
            ) : (
              G.map((hyp, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 font-mono text-xs font-semibold text-indigo-200 flex items-center justify-between"
                >
                  <span>{formatHypothesis(hyp)}</span>
                  <span className="text-[10px] text-indigo-400 font-sans">General Boundary</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* S Boundary Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 shadow-md">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                S Boundary (Maximally Specific)
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              {S.length} Hypothesis{S.length !== 1 ? 'es' : ''}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Lower bound: most specific rules that cover all observed positive examples.
          </p>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {S.length === 0 ? (
              <div className="text-xs text-rose-400 font-mono italic">∅ (Empty set)</div>
            ) : (
              S.map((hyp, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 font-mono text-xs font-semibold text-emerald-200 flex items-center justify-between"
                >
                  <span>{formatHypothesis(hyp)}</span>
                  <span className="text-[10px] text-emerald-400 font-sans">Specific Boundary</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

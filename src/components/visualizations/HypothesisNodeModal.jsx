import React from 'react';
import { X, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { formatHypothesis } from '../../engine/hypothesis.js';

export function HypothesisNodeModal({ node, attributes, onClose }) {
  if (!node) return null;

  const isConsistent = node.isConsistent;
  const inS = node.inS;
  const inG = node.inG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg theme-surface border theme-border rounded-xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b theme-border">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded border theme-border bg-slate-100 dark:bg-slate-800 theme-text-muted">
              {node.id}
            </span>
            <h3 className="text-sm font-bold theme-text-primary">Hypothesis Inspector</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg theme-text-muted hover:theme-text-primary hover:theme-surface-subtle transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vector Display */}
        <div className="my-4 p-4 rounded-lg theme-surface-subtle border theme-border text-center">
          <div className="text-[10px] uppercase font-bold theme-text-muted mb-0.5">Hypothesis Vector</div>
          <div className="text-xl font-mono font-bold text-blue-700 dark:text-blue-300">
            {node.label || formatHypothesis(node.values)}
          </div>
          <div className="text-xs theme-text-muted mt-1">
            Generality Tier: {node.level === -1 ? 'Null (Bottom)' : `${node.level} Wildcards`}
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border ${
              isConsistent
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
            }`}
          >
            {isConsistent ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Consistent (In Version Space)
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                Eliminated
              </>
            )}
          </span>

          {inS && (
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 border border-emerald-400 dark:border-emerald-700">
              S Boundary (Maximally Specific)
            </span>
          )}

          {inG && (
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 border border-blue-400 dark:border-blue-700">
              G Boundary (Maximally General)
            </span>
          )}
        </div>

        {/* Constraints breakdown */}
        <div className="space-y-1.5 mb-4">
          <div className="text-xs font-semibold theme-text-secondary">Attribute Constraints:</div>
          <div className="grid grid-cols-1 gap-1.5">
            {attributes.map((attr, idx) => {
              const val = node.values ? node.values[idx] : '?';
              return (
                <div
                  key={attr.name}
                  className="px-3 py-1.5 rounded-md theme-surface-subtle border theme-border flex items-center justify-between text-xs"
                >
                  <span className="theme-text-muted">{attr.name}</span>
                  <span className="font-mono font-bold theme-text-primary">
                    {val === '?' ? 'Wildcard (? - Any)' : val === 'Ø' ? 'Null (Ø - None)' : val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Elimination explanation */}
        {!isConsistent && node.eliminatedReason && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 mb-4 text-xs text-rose-800 dark:text-rose-200">
            <div className="font-bold mb-0.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Elimination Reason</span>
            </div>
            <p className="leading-relaxed">{node.eliminatedReason}</p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t theme-border text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium theme-surface border theme-border hover:theme-surface-subtle theme-text-primary rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}

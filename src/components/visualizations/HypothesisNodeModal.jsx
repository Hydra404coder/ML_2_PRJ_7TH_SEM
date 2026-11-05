import React from 'react';
import { X, Check, AlertCircle, ShieldCheck, ArrowUp, ArrowDown } from 'lucide-react';
import { formatHypothesis } from '../../engine/hypothesis.js';

export function HypothesisNodeModal({ node, attributes, onClose }) {
  if (!node) return null;

  const isConsistent = node.isConsistent;
  const inS = node.inS;
  const inG = node.inG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {node.id}
            </span>
            <h3 className="text-base font-bold text-white">Hypothesis Inspection</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hypothesis Vector Display */}
        <div className="my-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
          <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Vector Representation</div>
          <div className="text-xl font-mono font-bold text-white">
            {node.label || formatHypothesis(node.values)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Generality Level: {node.level === -1 ? 'Null (Bottom)' : `${node.level} Wildcards`}
          </div>
        </div>

        {/* Boundary & Consistency Status Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              isConsistent
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                : 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
            }`}
          >
            {isConsistent ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Consistent (In Version Space)
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Eliminated
              </>
            )}
          </span>

          {inS && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50">
              S Boundary (Maximally Specific)
            </span>
          )}

          {inG && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-500/50">
              G Boundary (Maximally General)
            </span>
          )}
        </div>

        {/* Constraint Breakdown */}
        <div className="space-y-2 mb-5">
          <div className="text-xs font-semibold text-slate-300">Attribute Constraints:</div>
          <div className="grid grid-cols-1 gap-2">
            {attributes.map((attr, idx) => {
              const val = node.values ? node.values[idx] : '?';
              return (
                <div
                  key={attr.name}
                  className="px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-400">{attr.name}</span>
                  <span className="font-mono font-bold text-white">
                    {val === '?' ? 'Any value (?)' : val === 'Ø' ? 'No value (Ø)' : val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Elimination details if eliminated */}
        {!isConsistent && node.eliminatedReason && (
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 mb-5 text-xs text-rose-200">
            <div className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Why Was This Hypothesis Eliminated?</span>
            </div>
            <p className="leading-relaxed">{node.eliminatedReason}</p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

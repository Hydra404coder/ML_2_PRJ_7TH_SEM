import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function HierarchyDiagram() {
  return (
    <div className="p-5 sm:p-6 rounded-xl border theme-border theme-surface shadow-subtle">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="text-sm font-bold theme-text-primary flex items-center gap-2">
            <span>Visual General-to-Specific Lattice Structure</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
              Poset
            </span>
          </h3>
          <p className="text-xs theme-text-muted mt-0.5">
            Hypothesis partial order arranged from maximally general (top) to maximally specific (bottom)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs theme-text-muted">
          <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
            <ArrowUp className="w-3.5 h-3.5" /> More General (G)
          </span>
          <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            <ArrowDown className="w-3.5 h-3.5" /> More Specific (S)
          </span>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-3 max-w-xl mx-auto py-2">
        {/* Level 3: G0 */}
        <div className="w-full p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 text-center">
          <div className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-0.5">
            Level 3: Maximally General Boundary (G₀)
          </div>
          <div className="text-base font-mono font-bold text-blue-950 dark:text-blue-200">
            ⟨?, ?, ?⟩
          </div>
          <div className="text-[11px] theme-text-muted mt-0.5">
            3 wildcards. Accepts 100% of all possible instances in X.
          </div>
        </div>

        {/* Transition arrow */}
        <div className="flex items-center gap-1 text-[11px] theme-text-muted">
          <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Minimal Specialization (replacing ? with specific value)</span>
        </div>

        {/* Level 2: 2 wildcards */}
        <div className="w-full grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-lg theme-surface-subtle border theme-border text-center">
            <div className="text-[10px] font-semibold theme-text-muted">1 Constraint</div>
            <div className="text-xs font-mono font-bold theme-text-primary">⟨Sunny, ?, ?⟩</div>
            <div className="text-[10px] theme-text-muted mt-0.5">Accepts any day where Sky = Sunny</div>
          </div>
          <div className="p-2.5 rounded-lg theme-surface-subtle border theme-border text-center">
            <div className="text-[10px] font-semibold theme-text-muted">1 Constraint</div>
            <div className="text-xs font-mono font-bold theme-text-primary">⟨?, Warm, ?⟩</div>
            <div className="text-[10px] theme-text-muted mt-0.5">Accepts any day where Temp = Warm</div>
          </div>
        </div>

        {/* Transition arrow */}
        <div className="flex items-center gap-1 text-[11px] theme-text-muted">
          <ArrowDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Further Specialization</span>
        </div>

        {/* Level 1: 1 wildcard */}
        <div className="w-full p-2.5 rounded-lg theme-surface-subtle border border-emerald-300 dark:border-emerald-800 text-center">
          <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
            Level 1: 2 Constraints
          </div>
          <div className="text-sm font-mono font-bold theme-text-primary">
            ⟨Sunny, Warm, ?⟩
          </div>
          <div className="text-[11px] theme-text-muted mt-0.5">
            Requires Sky = Sunny AND Temp = Warm. Strictly more specific than either parent.
          </div>
        </div>

        {/* Transition arrow */}
        <div className="flex items-center gap-1 text-[11px] theme-text-muted">
          <ArrowDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Grounded Instance Level</span>
        </div>

        {/* Level 0: Fully specific */}
        <div className="w-full p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center">
          <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
            Level 0: Ground Hypothesis (0 Wildcards)
          </div>
          <div className="text-sm font-mono font-bold text-emerald-950 dark:text-emerald-200">
            ⟨Sunny, Warm, Weak⟩
          </div>
          <div className="text-[11px] theme-text-muted mt-0.5">
            Accepts exactly one single combination in the instance space.
          </div>
        </div>

        {/* Level -1: Null */}
        <div className="w-full p-2 rounded-lg border theme-border theme-surface text-center">
          <div className="text-[10px] font-bold theme-text-muted uppercase tracking-wider">
            Level -1: Maximally Specific Boundary (S₀)
          </div>
          <div className="text-xs font-mono font-bold theme-text-secondary">⟨Ø, Ø, Ø⟩</div>
          <div className="text-[10px] theme-text-muted">The empty hypothesis: covers zero instances.</div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowUp, ArrowDown, HelpCircle, Check, Sparkles } from 'lucide-react';

export function HierarchyDiagram() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Visual General-to-Specific Hierarchy</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Lattice Order
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            How hypotheses are arranged from most general (top) to most specific (bottom)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" /> More General
          </span>
          <span className="flex items-center gap-1">
            <ArrowDown className="w-3.5 h-3.5 text-emerald-400" /> More Specific
          </span>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-4 py-4 max-w-xl mx-auto">
        {/* Level 3: Most General */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full p-3.5 rounded-xl bg-indigo-950/60 border-2 border-indigo-500/60 text-center shadow-lg shadow-indigo-500/10">
            <div className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase mb-1">
              Top Level: Maximally General (G₀)
            </div>
            <div className="text-base sm:text-lg font-mono font-bold text-indigo-200">
              ⟨?, ?, ?⟩
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Wildcards for all attributes. Accepts 100% of instances in the universe.
            </div>
          </div>
        </div>

        {/* Connector arrow */}
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <ArrowDown className="w-4 h-4 text-indigo-400/80" />
          <span className="text-[11px]">Specialization (replacing ? with specific values)</span>
          <ArrowDown className="w-4 h-4 text-indigo-400/80" />
        </div>

        {/* Level 2: Partially General */}
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <div className="text-[10px] font-semibold text-slate-400 mb-0.5">1 Constraint</div>
            <div className="text-sm font-mono font-bold text-slate-200">⟨Sunny, ?, ?⟩</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Accepts any Warm/Cold or Weak/Strong day as long as Sky is Sunny</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <div className="text-[10px] font-semibold text-slate-400 mb-0.5">1 Constraint</div>
            <div className="text-sm font-mono font-bold text-slate-200">⟨?, Warm, ?⟩</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Accepts any Sky or Wind as long as Temperature is Warm</div>
          </div>
        </div>

        {/* Connector arrow */}
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <ArrowDown className="w-4 h-4 text-emerald-400/80" />
          <span className="text-[11px]">Further Specialization</span>
          <ArrowDown className="w-4 h-4 text-emerald-400/80" />
        </div>

        {/* Level 1: More Specific */}
        <div className="w-full p-3.5 rounded-xl bg-slate-800/90 border border-emerald-500/40 text-center">
          <div className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mb-1">
            2 Constraints
          </div>
          <div className="text-base font-mono font-bold text-emerald-200">
            ⟨Sunny, Warm, ?⟩
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Requires Sky=Sunny AND Temp=Warm. More specific than ⟨Sunny, ?, ?⟩ and ⟨?, Warm, ?⟩.
          </div>
        </div>

        {/* Connector arrow */}
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <ArrowDown className="w-4 h-4 text-emerald-400/80" />
          <span className="text-[11px]">Fully Grounded (0 Wildcards)</span>
          <ArrowDown className="w-4 h-4 text-emerald-400/80" />
        </div>

        {/* Level 0: Fully specific */}
        <div className="w-full p-3.5 rounded-xl bg-emerald-950/60 border-2 border-emerald-500/60 text-center shadow-lg shadow-emerald-500/10">
          <div className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mb-1">
            Single Instance Hypotheses
          </div>
          <div className="text-base font-mono font-bold text-emerald-200">
            ⟨Sunny, Warm, Weak⟩
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Accepts only the exact single combination where Sky=Sunny, Temp=Warm, and Wind=Weak.
          </div>
        </div>

        {/* Level -1: Null hypothesis */}
        <div className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center text-slate-500">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Bottom Level: Maximally Specific (S₀)
          </div>
          <div className="text-sm font-mono font-semibold text-slate-400">⟨Ø, Ø, Ø⟩</div>
          <div className="text-[10px] text-slate-500">The null hypothesis: accepts zero instances.</div>
        </div>
      </div>
    </div>
  );
}

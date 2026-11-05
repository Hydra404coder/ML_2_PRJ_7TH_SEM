import React, { useState } from 'react';
import { Badge } from '../common/Badge.jsx';
import { Search, Filter, ShieldCheck, AlertCircle, Check, X } from 'lucide-react';
import { formatHypothesis } from '../../engine/hypothesis.js';

export function HypothesisTable({ hypothesisStatusList, S, G, onInspectNode }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'consistent' | 'eliminated' | 'S' | 'G'
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = hypothesisStatusList.filter((item) => {
    // Status filter
    if (filter === 'consistent' && !item.isConsistent) return false;
    if (filter === 'eliminated' && item.isConsistent) return false;
    if (filter === 'S' && !item.inS) return false;
    if (filter === 'G' && !item.inG) return false;

    // Search query
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const label = (item.label || formatHypothesis(item.values)).toLowerCase();
      const id = item.id.toLowerCase();
      const reason = (item.eliminatedReason || '').toLowerCase();
      return label.includes(term) || id.includes(term) || reason.includes(term);
    }
    return true;
  });

  const getGeneralityText = (level) => {
    if (level === -1) return 'Null (Bottom)';
    if (level === 3) return 'Level 3 (Top General)';
    if (level === 2) return 'Level 2 (Partially General)';
    if (level === 1) return 'Level 1 (Partially Specific)';
    return 'Level 0 (Fully Specific)';
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl flex flex-col">
      {/* Header & Filter Controls */}
      <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Hypothesis Space Registry</span>
            <span className="text-xs font-normal text-slate-400">
              ({filtered.length} of {hypothesisStatusList.length} shown)
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Real-time status of every candidate rule in the defined hypothesis space
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-44">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search hypotheses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700 text-xs">
            {['all', 'consistent', 'eliminated', 'S', 'G'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded-md capitalize transition-colors ${
                  filter === f
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 z-10 bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-4 font-semibold text-slate-500 w-16">ID</th>
              <th className="py-2.5 px-4 font-semibold text-slate-300">Hypothesis Tuple</th>
              <th className="py-2.5 px-4 font-semibold text-slate-300">Generality Level</th>
              <th className="py-2.5 px-4 font-semibold text-slate-300">Status</th>
              <th className="py-2.5 px-4 font-semibold text-slate-300">Boundary</th>
              <th className="py-2.5 px-4 font-semibold text-slate-400">Elimination Reason / Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No hypotheses match the selected filter.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isBoth = item.inS && item.inG;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onInspectNode && onInspectNode(item)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-4 font-mono text-slate-500">{item.id}</td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`font-mono font-bold text-xs ${
                          item.isConsistent ? 'text-white' : 'text-slate-500 line-through'
                        }`}
                      >
                        {item.label || formatHypothesis(item.values)}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-400 text-[11px]">
                      {getGeneralityText(item.level)}
                    </td>
                    <td className="py-2.5 px-4">
                      <Badge variant={item.isConsistent ? 'positive' : 'eliminated'} size="sm">
                        {item.isConsistent ? 'Consistent' : 'Eliminated'}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4">
                      {isBoth ? (
                        <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40 font-mono font-bold text-[10px]">
                          S & G (Converged)
                        </span>
                      ) : item.inG ? (
                        <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 font-mono font-bold text-[10px]">
                          G Boundary
                        </span>
                      ) : item.inS ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-[10px]">
                          S Boundary
                        </span>
                      ) : (
                        <span className="text-slate-600 font-mono text-[10px]">Neither</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-slate-400 text-[11px] max-w-xs truncate">
                      {item.eliminatedReason || (
                        <span className="text-emerald-400/80 font-medium">Consistent with all observed examples</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

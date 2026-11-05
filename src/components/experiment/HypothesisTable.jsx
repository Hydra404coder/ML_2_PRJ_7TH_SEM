import React, { useState } from 'react';
import { Badge } from '../common/Badge.jsx';
import { Search, Filter, ShieldCheck, AlertCircle } from 'lucide-react';
import { formatHypothesis } from '../../engine/hypothesis.js';

export function HypothesisTable({ hypothesisStatusList, S, G, onInspectNode }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'consistent' | 'eliminated' | 'S' | 'G'
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = hypothesisStatusList.filter((item) => {
    if (filter === 'consistent' && !item.isConsistent) return false;
    if (filter === 'eliminated' && item.isConsistent) return false;
    if (filter === 'S' && !item.inS) return false;
    if (filter === 'G' && !item.inG) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const label = (item.label || formatHypothesis(item.values)).toLowerCase();
      const id = item.id.toLowerCase();
      const reason = (item.eliminatedReason || '').toLowerCase();
      return label.includes(term) || id.includes(term) || reason.includes(term);
    }
    return true;
  });

  const getGeneralityTier = (level) => {
    if (level === -1) return 'Null (Level -1)';
    if (level === 3) return 'Level 3 (Top)';
    if (level === 2) return 'Level 2 (High)';
    if (level === 1) return 'Level 1 (Mid)';
    return 'Level 0 (Ground)';
  };

  return (
    <div className="rounded-xl border theme-border theme-surface shadow-subtle overflow-hidden">
      {/* Table Header Controls */}
      <div className="px-5 py-3 border-b theme-border theme-surface-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold theme-text-primary">
            Hypothesis Matrix Registry ({filtered.length} of {hypothesisStatusList.length})
          </h3>
          <p className="text-[11px] theme-text-muted">
            Enumerated conjunctive hypothesis space and active status
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-44">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 theme-text-muted" />
            <input
              type="text"
              placeholder="Search hypotheses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1 theme-surface border theme-border rounded-lg text-xs theme-text-primary placeholder:theme-text-muted focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center rounded-lg border theme-border theme-surface p-0.5 text-xs">
            {['all', 'consistent', 'eliminated', 'S', 'G'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded-md capitalize transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'theme-text-muted hover:theme-text-primary'
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
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900 border-b theme-border theme-text-muted">
            <tr>
              <th className="py-2.5 px-4 font-semibold w-16">ID</th>
              <th className="py-2.5 px-4 font-semibold">Hypothesis Tuple</th>
              <th className="py-2.5 px-4 font-semibold">Generality</th>
              <th className="py-2.5 px-4 font-semibold">Status</th>
              <th className="py-2.5 px-4 font-semibold">Boundary Role</th>
              <th className="py-2.5 px-4 font-semibold">Elimination Reason / Status</th>
            </tr>
          </thead>
          <tbody className="divide-y theme-border font-sans">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center theme-text-muted">
                  No hypotheses match the current filter.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isBoth = item.inS && item.inG;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onInspectNode && onInspectNode(item)}
                    className="hover:theme-surface-subtle transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-4 font-mono text-[11px] theme-text-muted">{item.id}</td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`font-mono font-bold text-xs ${
                          item.isConsistent ? 'theme-text-primary' : 'theme-text-muted line-through opacity-60'
                        }`}
                      >
                        {item.label || formatHypothesis(item.values)}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 theme-text-muted text-[11px]">
                      {getGeneralityTier(item.level)}
                    </td>
                    <td className="py-2.5 px-4">
                      <Badge variant={item.isConsistent ? 'positive' : 'eliminated'} size="sm">
                        {item.isConsistent ? 'Consistent' : 'Eliminated'}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4">
                      {isBoth ? (
                        <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-mono font-bold text-[10px]">
                          S & G Converged
                        </span>
                      ) : item.inG ? (
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-mono font-bold text-[10px]">
                          G Boundary
                        </span>
                      ) : item.inS ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-mono font-bold text-[10px]">
                          S Boundary
                        </span>
                      ) : (
                        <span className="theme-text-muted font-mono text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 theme-text-muted text-[11px] max-w-xs truncate">
                      {item.eliminatedReason || (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Consistent with all observations</span>
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

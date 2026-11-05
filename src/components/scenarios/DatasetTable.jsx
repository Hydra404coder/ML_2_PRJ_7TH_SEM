import React from 'react';
import { Badge } from '../common/Badge.jsx';
import { Database, PlusCircle, MinusCircle } from 'lucide-react';

export function DatasetTable({ dataset, attributes }) {
  return (
    <div className="overflow-hidden rounded-xl border theme-border theme-surface shadow-subtle">
      <div className="px-5 py-3 theme-surface-subtle border-b theme-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider theme-text-primary">
            Predefined Training Dataset ({dataset.length} Instances)
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
            <PlusCircle className="w-3.5 h-3.5" />
            {dataset.filter(d => d.label === 'YES' || d.label === '+').length} Positive
          </span>
          <span className="flex items-center gap-1 text-rose-700 dark:text-rose-400 font-medium">
            <MinusCircle className="w-3.5 h-3.5" />
            {dataset.filter(d => d.label === 'NO' || d.label === '-').length} Negative
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b theme-border theme-text-muted">
            <tr>
              <th className="py-2.5 px-4 font-semibold w-12 text-center">#</th>
              {attributes.map((attr) => (
                <th key={attr.name} className="py-2.5 px-4 font-semibold">
                  {attr.name}
                </th>
              ))}
              <th className="py-2.5 px-4 font-semibold w-28 text-center">Class Label</th>
              <th className="py-2.5 px-4 font-semibold">Pedagogical Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y theme-border font-sans">
            {dataset.map((row) => {
              const isPos = row.label === 'YES' || row.label === '+';
              return (
                <tr
                  key={row.id}
                  className={`hover:theme-surface-subtle transition-colors ${
                    isPos ? 'hover:bg-emerald-50/30' : 'hover:bg-rose-50/30'
                  }`}
                >
                  <td className="py-2.5 px-4 text-center font-mono theme-text-muted font-medium">
                    {row.id}
                  </td>
                  {attributes.map((attr) => (
                    <td key={attr.name} className="py-2.5 px-4 theme-text-primary font-medium">
                      <span className="px-2 py-0.5 rounded theme-surface-subtle border theme-border font-mono text-[11px]">
                        {row.values[attr.name]}
                      </span>
                    </td>
                  ))}
                  <td className="py-2.5 px-4 text-center">
                    <Badge variant={isPos ? 'positive' : 'negative'} size="sm">
                      {isPos ? 'YES (Pos)' : 'NO (Neg)'}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-4 theme-text-secondary text-[11px] leading-relaxed">
                    {row.note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

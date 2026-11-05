import React from 'react';
import { Badge } from '../common/Badge.jsx';
import { Database, PlusCircle, MinusCircle } from 'lucide-react';

export function DatasetTable({ dataset, attributes }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-md">
      <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Predefined Training Dataset ({dataset.length} Examples)
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <PlusCircle className="w-3.5 h-3.5" />
            {dataset.filter(d => d.label === 'YES' || d.label === '+').length} Positive
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-medium">
            <MinusCircle className="w-3.5 h-3.5" />
            {dataset.filter(d => d.label === 'NO' || d.label === '-').length} Negative
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/40 text-slate-400 border-b border-slate-800/80">
            <tr>
              <th className="py-2.5 px-4 font-semibold text-slate-500 w-12 text-center">#</th>
              {attributes.map((attr) => (
                <th key={attr.name} className="py-2.5 px-4 font-semibold text-slate-300">
                  {attr.name}
                </th>
              ))}
              <th className="py-2.5 px-4 font-semibold text-slate-300 w-28 text-center">Target Label</th>
              <th className="py-2.5 px-4 font-semibold text-slate-400">Pedagogical Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {dataset.map((row) => {
              const isPos = row.label === 'YES' || row.label === '+';
              return (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    isPos ? 'hover:bg-emerald-950/10' : 'hover:bg-rose-950/10'
                  }`}
                >
                  <td className="py-2.5 px-4 text-center font-mono text-slate-500 font-medium">
                    {row.id}
                  </td>
                  {attributes.map((attr) => (
                    <td key={attr.name} className="py-2.5 px-4 text-slate-200 font-medium">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 font-mono text-[11px]">
                        {row.values[attr.name]}
                      </span>
                    </td>
                  ))}
                  <td className="py-2.5 px-4 text-center">
                    <Badge variant={isPos ? 'positive' : 'negative'} size="sm">
                      {isPos ? (
                        <>
                          <PlusCircle className="w-3 h-3 text-emerald-400" />
                          <span>YES (Pos)</span>
                        </>
                      ) : (
                        <>
                          <MinusCircle className="w-3 h-3 text-rose-400" />
                          <span>NO (Neg)</span>
                        </>
                      )}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-4 text-slate-400 text-[11px] leading-relaxed">
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

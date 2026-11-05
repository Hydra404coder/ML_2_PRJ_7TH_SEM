import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from 'recharts';
import { TrendingDown, Info, ShieldCheck } from 'lucide-react';

export function VersionSpaceChart({ history = [], currentStep }) {
  // Format data for chart
  const data = history.map((h, idx) => ({
    step: `Step ${idx}`,
    count: h.vsCount,
    label: idx === 0 ? 'Init' : `Ex #${idx} (${h.exampleLabel})`,
    isPositive: h.exampleLabel === 'YES' || h.exampleLabel === '+',
    isCurrent: idx === currentStep,
    stepNum: idx,
  }));

  const currentVsCount = history[currentStep]?.vsCount ?? 0;
  const initialVsCount = history[0]?.vsCount ?? 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-xl text-xs font-sans">
          <div className="font-bold text-white mb-1">{d.label}</div>
          <div className="text-slate-300 flex items-center gap-2">
            <span>Surviving Hypotheses:</span>
            <span className="font-mono font-bold text-indigo-400">{d.count}</span>
          </div>
          {d.stepNum > 0 && (
            <div className="text-[10px] text-slate-400 mt-1">
              Label: <span className={d.isPositive ? 'text-emerald-400' : 'text-rose-400'}>{d.isPositive ? 'Positive (YES)' : 'Negative (NO)'}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white">Version Space Contraction Curve</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              |VS| over Time
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Number of surviving consistent hypotheses after each training example
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">Positive Example</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="text-slate-400">Negative Example</span>
          </div>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="w-full h-48 sm:h-56 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="vsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="step"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#818cf8"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#vsGradient)"
              activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Explanatory footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-indigo-400" />
          <span>
            {currentVsCount === 1
              ? 'Version space has contracted to a single target hypothesis!'
              : currentVsCount === 0
              ? 'Version space is empty (no hypothesis satisfies all constraints).'
              : `Version space reduced from ${initialVsCount} to ${currentVsCount} candidate rules.`}
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          Current Step: {currentStep} / {Math.max(0, history.length - 1)}
        </div>
      </div>
    </div>
  );
}

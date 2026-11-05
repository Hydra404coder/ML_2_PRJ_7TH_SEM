import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { TrendingDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export function VersionSpaceChart({ history = [], currentStep }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = history.map((h, idx) => ({
    step: `Step ${idx}`,
    count: h.vsCount,
    label: idx === 0 ? 'Init (Step 0)' : `Ex #${idx} (${h.exampleLabel})`,
    isPositive: h.exampleLabel === 'YES' || h.exampleLabel === '+',
    isCurrent: idx === currentStep,
    stepNum: idx,
  }));

  const currentVsCount = history[currentStep]?.vsCount ?? 0;
  const initialVsCount = history[0]?.vsCount ?? 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="p-3 rounded-lg border theme-border theme-surface shadow-md text-xs font-sans">
          <div className="font-bold theme-text-primary mb-1">{d.label}</div>
          <div className="flex items-center gap-2 theme-text-secondary">
            <span>Consistent Hypotheses:</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{d.count}</span>
          </div>
          {d.stepNum > 0 && (
            <div className="text-[10px] theme-text-muted mt-1">
              Class: <span className={d.isPositive ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>{d.isPositive ? 'Positive (YES)' : 'Negative (NO)'}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-xl border theme-border theme-surface shadow-subtle flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold theme-text-primary">
              Version Space Contraction Curve (|VS| over time)
            </h3>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border theme-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              Time Series
            </span>
          </div>
          <p className="text-[11px] theme-text-muted mt-0.5">
            Surviving hypothesis count across sequential observation steps
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] theme-text-muted">Positive Example</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-[11px] theme-text-muted">Negative Example</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-48 sm:h-56 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="vsBlueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e2e8f0'} vertical={false} />
            <XAxis
              dataKey="step"
              stroke={isDark ? '#64748b' : '#94a3b8'}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
            />
            <YAxis
              stroke={isDark ? '#64748b' : '#94a3b8'}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#vsBlueGrad)"
              activeDot={{ r: 5, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2.5 border-t theme-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs theme-text-muted">
        <div className="flex items-center gap-1.5">
          <TrendingDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>
            {currentVsCount === 1
              ? 'Version space converged to a single unique hypothesis!'
              : currentVsCount === 0
              ? 'Version space is empty (target concept cannot be represented).'
              : `Version space reduced from ${initialVsCount} to ${currentVsCount} candidate rules.`}
          </span>
        </div>
        <div className="text-[11px] font-mono">
          Current Step: {currentStep} / {Math.max(0, history.length - 1)}
        </div>
      </div>
    </div>
  );
}

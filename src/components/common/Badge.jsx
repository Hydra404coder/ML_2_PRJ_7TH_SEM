import React from 'react';

export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const variantClasses = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    positive: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    negative: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    uncertain: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    indigo: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    sky: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
    boundaryS: 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/50 font-mono font-medium',
    boundaryG: 'bg-indigo-950/70 text-indigo-300 border border-indigo-500/50 font-mono font-medium',
    eliminated: 'bg-slate-900/60 text-slate-500 border border-slate-800 line-through',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-colors ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.default} ${className}`}
    >
      {children}
    </span>
  );
}

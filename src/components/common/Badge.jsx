import React from 'react';

export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-xs px-3 py-1.5 font-semibold',
  };

  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    positive: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    negative: 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    uncertain: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    blue: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    boundaryS: 'bg-emerald-100/80 text-emerald-900 border-emerald-400 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-600 font-mono font-semibold',
    boundaryG: 'bg-blue-100/80 text-blue-900 border-blue-400 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-600 font-mono font-semibold',
    converged: 'bg-purple-100 text-purple-900 border-purple-400 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-600 font-mono font-bold',
    eliminated: 'bg-slate-100 text-slate-400 border-slate-200 line-through dark:bg-slate-900 dark:text-slate-600 dark:border-slate-800',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium transition-colors ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.default} ${className}`}
    >
      {children}
    </span>
  );
}

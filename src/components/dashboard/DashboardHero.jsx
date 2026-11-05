import React from 'react';
import { BookOpen, Layers, ArrowRight, CheckCircle2, GitBranch, Cpu, ShieldCheck } from 'lucide-react';

export function DashboardHero({ onStartLearning, onExploreScenarios }) {
  return (
    <div className="border-b theme-border theme-surface-subtle py-10 sm:py-14 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Institutional Tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Interactive Machine Learning Laboratory • Module 1</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight theme-text-primary leading-tight">
            General-to-Specific Ordering & <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">Hypothesis-Space Search</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg theme-text-secondary mt-3 leading-relaxed">
            An interactive simulator demonstrating the Candidate Elimination Algorithm. Observe how positive and negative examples systematically prune candidate hypotheses across structured partially ordered sets (posets).
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={onStartLearning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-98"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Theory Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onExploreScenarios}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg theme-surface border theme-border hover:theme-surface-subtle theme-text-primary font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-98"
            >
              <Layers className="w-4 h-4 theme-text-muted" />
              <span>Launch Lab Scenarios</span>
            </button>
          </div>
        </div>

        {/* Lab Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-6 border-t theme-border text-left">
          <div className="p-3 rounded-lg theme-surface border theme-border shadow-subtle">
            <div className="text-[11px] theme-text-muted font-medium">Search Strategy</div>
            <div className="text-xs sm:text-sm font-semibold theme-text-primary mt-0.5">Candidate Elimination</div>
          </div>
          <div className="p-3 rounded-lg theme-surface border theme-border shadow-subtle">
            <div className="text-[11px] theme-text-muted font-medium">Boundary Tracking</div>
            <div className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Dual S & G Sets</div>
          </div>
          <div className="p-3 rounded-lg theme-surface border theme-border shadow-subtle">
            <div className="text-[11px] theme-text-muted font-medium">Mathematical Model</div>
            <div className="text-xs sm:text-sm font-semibold theme-text-primary mt-0.5">Finite Poset Lattice</div>
          </div>
          <div className="p-3 rounded-lg theme-surface border theme-border shadow-subtle">
            <div className="text-[11px] theme-text-muted font-medium">Inference Output</div>
            <div className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 mt-0.5">YES / NO / UNCERTAIN</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2, Cpu } from 'lucide-react';

export function DashboardHero({ onStartLearning, onExploreScenarios }) {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-indigo-950/30 via-slate-900/40 to-transparent border-b border-slate-800/60">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 shadow-sm shadow-indigo-500/5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Machine Learning — Module 1</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none mb-4">
          Hypothesis <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Lab</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-6">
          Explore how machines learn concepts
        </p>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
          Step inside the mind of the Candidate Elimination algorithm. Witness how a machine forms, specializes, and generalizes candidate rules across structured hypothesis spaces using positive and negative examples.
        </p>

        {/* Primary and Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onExploreScenarios}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Explore Scenarios</span>
          </button>
        </div>

        {/* Live Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-slate-800/60 text-left">
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/40">
            <div className="text-xs text-slate-400">Search Strategy</div>
            <div className="text-sm font-semibold text-slate-200">Candidate Elimination</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/40">
            <div className="text-xs text-slate-400">Boundary Duality</div>
            <div className="text-sm font-semibold text-emerald-400">S (Specific) & G (General)</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/40">
            <div className="text-xs text-slate-400">Hypothesis Space</div>
            <div className="text-sm font-semibold text-indigo-400">Full Lattice Poset</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/40">
            <div className="text-xs text-slate-400">Test Predictions</div>
            <div className="text-sm font-semibold text-amber-400">YES / NO / UNCERTAIN</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { FlaskConical, GitBranch, BookOpen, ExternalLink } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">Hypothesis Lab — Module 1 Concept Learning Explorer</p>
            <p className="text-slate-500 text-[11px]">General-to-Specific Ordering & Candidate Elimination Algorithm</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <button onClick={() => onNavigate('fundamentals')} className="hover:text-slate-200 transition-colors">
            Fundamentals
          </button>
          <button onClick={() => onNavigate('scenarios')} className="hover:text-slate-200 transition-colors">
            Scenarios
          </button>
          <button onClick={() => onNavigate('quiz')} className="hover:text-slate-200 transition-colors">
            Knowledge Check
          </button>
        </div>

        <div className="text-right text-slate-500 text-[11px]">
          <p>Deterministic local machine learning simulation</p>
          <p>No external APIs or tracking required</p>
        </div>
      </div>
    </footer>
  );
}

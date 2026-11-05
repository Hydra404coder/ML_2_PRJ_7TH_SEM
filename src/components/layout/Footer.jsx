import React from 'react';
import { FlaskConical } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer className="w-full border-t theme-border theme-surface-subtle py-8 px-4 sm:px-6 mt-16 text-xs theme-text-muted">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            H
          </div>
          <div>
            <p className="font-semibold theme-text-primary">Hypothesis Lab • Machine Learning Module 1</p>
            <p className="text-[11px] theme-text-muted">General-to-Specific Poset Search & Candidate Elimination</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('fundamentals')} className="hover:theme-text-primary transition-colors">
            Theory Notes
          </button>
          <button onClick={() => onNavigate('scenarios')} className="hover:theme-text-primary transition-colors">
            Scenarios
          </button>
          <button onClick={() => onNavigate('quiz')} className="hover:theme-text-primary transition-colors">
            Knowledge Check
          </button>
        </div>

        <div className="text-right text-[11px] theme-text-muted">
          <span>Deterministic local execution • Open Educational Resource</span>
        </div>
      </div>
    </footer>
  );
}

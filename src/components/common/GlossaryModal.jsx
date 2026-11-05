import React, { useState } from 'react';
import { X, BookOpen, Search, HelpCircle } from 'lucide-react';
import { GLOSSARY_TERMS } from '../../data/glossary.js';

export function GlossaryModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_TERMS.filter(
    item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] theme-surface border theme-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b theme-border theme-surface">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold theme-text-primary">Concept Learning Terminology</h2>
              <p className="text-xs theme-text-muted">Definitions and notation for Mitchell Chapter 2</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg theme-text-muted hover:theme-text-primary hover:theme-surface-subtle transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b theme-border theme-surface-subtle">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
            <input
              type="text"
              placeholder="Filter terms (e.g. version space, boundary, wildcard)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 theme-surface border theme-border rounded-lg text-xs theme-text-primary placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Term List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y theme-border">
          {filtered.length === 0 ? (
            <div className="text-center py-12 theme-text-muted">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No glossary terms match "{searchTerm}"</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div key={item.term} className={idx > 0 ? 'pt-4' : ''}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-sm font-semibold theme-text-primary">{item.term}</h3>
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 font-mono text-[11px] font-semibold">
                    {item.symbol}
                  </span>
                </div>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">{item.shortDef}</p>
                <p className="text-xs theme-text-muted leading-relaxed">{item.fullDef}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t theme-border theme-surface-subtle text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium theme-surface border theme-border hover:theme-surface-subtle theme-text-primary rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

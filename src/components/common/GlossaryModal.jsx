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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Concept Learning Glossary</h2>
              <p className="text-xs text-slate-400">Key definitions, mathematical symbols, and rules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/40">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search concepts (e.g., version space, wildcard, boundary)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Term List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-800/60">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No glossary terms matching "{searchTerm}"</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div key={item.term} className={idx > 0 ? 'pt-4' : ''}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-base font-semibold text-white">{item.term}</h3>
                  <span className="px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-500/30 font-mono text-xs font-semibold">
                    {item.symbol}
                  </span>
                </div>
                <p className="text-sm font-medium text-indigo-200/90 mb-1.5">{item.shortDef}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.fullDef}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
}

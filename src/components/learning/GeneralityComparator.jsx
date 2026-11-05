import React, { useState } from 'react';
import {
  isMoreGeneralOrEqual,
  areEqual,
  formatHypothesis,
} from '../../engine/hypothesis.js';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';

export function GeneralityComparator() {
  const PRESET_PAIRS = [
    {
      name: 'General vs Constrained',
      h1: ['?', 'Warm', '?'],
      h2: ['Sunny', 'Warm', 'Weak'],
      explanation: '⟨?, Warm, ?⟩ accepts any Sky and Wind as long as Temp is Warm. Because ⟨Sunny, Warm, Weak⟩ has Temp=Warm, every instance accepted by h₂ is also accepted by h₁.',
    },
    {
      name: 'Incomparable (Different Attributes)',
      h1: ['Sunny', '?', '?'],
      h2: ['?', 'Warm', '?'],
      explanation: 'Neither is more general! h₁ covers ⟨Sunny, Cold, Weak⟩ (which h₂ rejects), while h₂ covers ⟨Rainy, Warm, Weak⟩ (which h₁ rejects). In a poset lattice, they sit on separate incomparable branches.',
    },
    {
      name: 'Wildcard Dominance',
      h1: ['?', '?', '?'],
      h2: ['Sunny', 'Warm', '?'],
      explanation: '⟨?, ?, ?⟩ has wildcards everywhere, making it strictly more general than any non-empty hypothesis containing specific constraints.',
    },
    {
      name: 'Specific vs Partially Constrained',
      h1: ['Sunny', 'Warm', 'Strong'],
      h2: ['Sunny', 'Warm', '?'],
      explanation: 'h₁ is actually MORE SPECIFIC than h₂! h₂ permits both Weak and Strong wind, whereas h₁ restricts Wind strictly to Strong.',
    },
  ];

  const [h1, setH1] = useState(['?', 'Warm', '?']);
  const [h2, setH2] = useState(['Sunny', 'Warm', 'Weak']);
  const [revealed, setRevealed] = useState(false);

  const attributes = [
    { name: 'Sky', options: ['?', 'Sunny', 'Cloudy', 'Rainy'] },
    { name: 'Temperature', options: ['?', 'Warm', 'Cold'] },
    { name: 'Wind', options: ['?', 'Weak', 'Strong'] },
  ];

  const h1GeqH2 = isMoreGeneralOrEqual(h1, h2);
  const h2GeqH1 = isMoreGeneralOrEqual(h2, h1);
  const identical = areEqual(h1, h2);

  const handleSelectPreset = (preset) => {
    setH1([...preset.h1]);
    setH2([...preset.h2]);
    setRevealed(true);
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl border theme-border theme-surface shadow-subtle">
      <div className="mb-4">
        <h3 className="text-sm font-bold theme-text-primary flex items-center gap-2">
          <span>Interactive Tool: "Is Hypothesis A More General Than B?"</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
            Order Tester
          </span>
        </h3>
        <p className="text-xs theme-text-muted mt-0.5">
          Select hypotheses to evaluate the partial order relation h₁ ≥_g h₂ attribute by attribute.
        </p>
      </div>

      {/* Preset pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {PRESET_PAIRS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handleSelectPreset(preset)}
            className="px-2.5 py-1 rounded-md text-xs font-medium theme-surface-subtle border theme-border hover:theme-border-strong theme-text-secondary transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* H1 Box */}
        <div className="p-3.5 rounded-lg theme-surface-subtle border border-blue-300 dark:border-blue-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              Hypothesis h₁
            </span>
            <span className="font-mono text-xs font-bold theme-text-primary">{formatHypothesis(h1)}</span>
          </div>
          <div className="space-y-1.5">
            {attributes.map((attr, idx) => (
              <div key={attr.name} className="flex items-center justify-between text-xs">
                <span className="theme-text-muted">{attr.name}:</span>
                <select
                  value={h1[idx]}
                  onChange={(e) => {
                    const next = [...h1];
                    next[idx] = e.target.value;
                    setH1(next);
                    setRevealed(false);
                  }}
                  className="theme-surface border theme-border rounded px-2 py-0.5 text-xs theme-text-primary font-mono focus:outline-none focus:border-blue-500"
                >
                  {attr.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* H2 Box */}
        <div className="p-3.5 rounded-lg theme-surface-subtle border border-emerald-300 dark:border-emerald-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Hypothesis h₂
            </span>
            <span className="font-mono text-xs font-bold theme-text-primary">{formatHypothesis(h2)}</span>
          </div>
          <div className="space-y-1.5">
            {attributes.map((attr, idx) => (
              <div key={attr.name} className="flex items-center justify-between text-xs">
                <span className="theme-text-muted">{attr.name}:</span>
                <select
                  value={h2[idx]}
                  onChange={(e) => {
                    const next = [...h2];
                    next[idx] = e.target.value;
                    setH2(next);
                    setRevealed(false);
                  }}
                  className="theme-surface border theme-border rounded px-2 py-0.5 text-xs theme-text-primary font-mono focus:outline-none focus:border-emerald-500"
                >
                  {attr.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setRevealed(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <span>Evaluate Generality Ordering (h₁ ≥_g h₂)</span>
        </button>
      </div>

      {/* Answer */}
      {revealed && (
        <div className="p-3.5 rounded-lg border theme-border theme-surface-subtle animate-in fade-in duration-150">
          <div className="flex items-center gap-2 mb-2 font-bold text-xs sm:text-sm">
            {identical ? (
              <span className="text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                h₁ and h₂ are identical (equally general)
              </span>
            ) : h1GeqH2 ? (
              <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                TRUE: h₁ is strictly more general than h₂ (h₁ &gt;_g h₂)
              </span>
            ) : h2GeqH1 ? (
              <span className="text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4" />
                FALSE: h₁ is actually more SPECIFIC than h₂ (h₂ &gt;_g h₁)
              </span>
            ) : (
              <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <X className="w-4 h-4" />
                INCOMPARABLE: Neither hypothesis is more general than the other
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 my-2 text-[11px] font-mono">
            {attributes.map((attr, idx) => {
              const c1 = h1[idx];
              const c2 = h2[idx];
              const ok = c1 === '?' || c1 === c2;
              return (
                <div
                  key={attr.name}
                  className={`p-1.5 rounded border text-center ${
                    ok
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                  }`}
                >
                  <div className="text-[10px] theme-text-muted">{attr.name}</div>
                  <div className="font-bold">{c1} vs {c2}</div>
                  <div className="text-[10px]">{ok ? '✓ covers' : '✗ mismatch'}</div>
                </div>
              );
            })}
          </div>

          <p className="text-xs theme-text-secondary leading-relaxed mt-2">
            {identical
              ? 'Both hypotheses place identical constraints on all attributes, covering the exact same set of instances.'
              : h1GeqH2
              ? `Every instance accepted by ${formatHypothesis(h2)} is guaranteed to be accepted by ${formatHypothesis(h1)}.`
              : h2GeqH1
              ? `${formatHypothesis(h2)} is broader than ${formatHypothesis(h1)}. All instances accepted by h₁ are also accepted by h₂.`
              : `Because h₁ and h₂ constrain different attributes to specific values without overlapping wildcards, neither encompasses the other.`}
          </p>
        </div>
      )}
    </div>
  );
}

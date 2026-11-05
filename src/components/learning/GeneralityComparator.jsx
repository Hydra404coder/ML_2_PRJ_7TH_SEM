import React, { useState } from 'react';
import {
  isMoreGeneralOrEqual,
  isStrictlyMoreGeneral,
  areEqual,
  formatHypothesis,
  ANY,
} from '../../engine/hypothesis.js';
import { Check, X, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

export function GeneralityComparator() {
  const PRESET_PAIRS = [
    {
      name: 'General vs Constrained',
      h1: ['?', 'Warm', '?'],
      h2: ['Sunny', 'Warm', 'Weak'],
      explanation: '⟨?, Warm, ?⟩ accepts any Sky and Wind as long as Temp is Warm. Since ⟨Sunny, Warm, Weak⟩ has Temp=Warm, every instance covered by h₂ is also covered by h₁.',
    },
    {
      name: 'Incomparable (Different Attributes)',
      h1: ['Sunny', '?', '?'],
      h2: ['?', 'Warm', '?'],
      explanation: 'Neither is more general! h₁ covers ⟨Sunny, Cold, Weak⟩ (which h₂ rejects), while h₂ covers ⟨Rainy, Warm, Weak⟩ (which h₁ rejects). They are incomparable in the partial ordering.',
    },
    {
      name: 'Wildcard Dominance',
      h1: ['?', '?', '?'],
      h2: ['Sunny', 'Warm', '?'],
      explanation: '⟨?, ?, ?⟩ has wildcards everywhere, so it is strictly more general than any non-empty hypothesis with specific values.',
    },
    {
      name: 'Specific vs Partially Constrained',
      h1: ['Sunny', 'Warm', 'Strong'],
      h2: ['Sunny', 'Warm', '?'],
      explanation: 'h₁ is actually MORE SPECIFIC than h₂! h₂ allows both Weak and Strong wind, whereas h₁ restricts wind strictly to Strong.',
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
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Interactive Tool: "Is Hypothesis A More General Than B?"</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Interactive Poset
            </span>
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Configure two hypotheses or pick a preset pair to examine whether h₁ ≥_g h₂.
        </p>
      </div>

      {/* Preset pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESET_PAIRS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handleSelectPreset(preset)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Hypothesis Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* H1 Box */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Hypothesis h₁</span>
            <span className="font-mono text-xs font-semibold text-indigo-300">{formatHypothesis(h1)}</span>
          </div>
          <div className="space-y-2">
            {attributes.map((attr, idx) => (
              <div key={attr.name} className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{attr.name}:</span>
                <select
                  value={h1[idx]}
                  onChange={(e) => {
                    const next = [...h1];
                    next[idx] = e.target.value;
                    setH1(next);
                    setRevealed(false);
                  }}
                  className="bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
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
        <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Hypothesis h₂</span>
            <span className="font-mono text-xs font-semibold text-emerald-300">{formatHypothesis(h2)}</span>
          </div>
          <div className="space-y-2">
            {attributes.map((attr, idx) => (
              <div key={attr.name} className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{attr.name}:</span>
                <select
                  value={h2[idx]}
                  onChange={(e) => {
                    const next = [...h2];
                    next[idx] = e.target.value;
                    setH2(next);
                    setRevealed(false);
                  }}
                  className="bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
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

      {/* Action / Reveal Button */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => setRevealed(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Compare Generality Relationship</span>
        </button>
      </div>

      {/* Answer & Explanation Box */}
      {revealed && (
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm">
            {identical ? (
              <span className="text-purple-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-purple-400" />
                h₁ and h₂ are identical (equally general)
              </span>
            ) : h1GeqH2 ? (
              <span className="text-emerald-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                YES: h₁ is strictly more general than h₂ (h₁ &gt;_g h₂)
              </span>
            ) : h2GeqH1 ? (
              <span className="text-amber-300 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-amber-400" />
                NO: h₁ is actually more SPECIFIC than h₂ (h₂ &gt;_g h₁)
              </span>
            ) : (
              <span className="text-rose-300 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-400" />
                INCOMPARABLE: Neither hypothesis is more general than the other
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 my-3 text-[11px] font-mono">
            {attributes.map((attr, idx) => {
              const c1 = h1[idx];
              const c2 = h2[idx];
              const ok = c1 === '?' || c1 === c2;
              return (
                <div
                  key={attr.name}
                  className={`p-2 rounded-lg border text-center ${
                    ok
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 mb-0.5">{attr.name}</div>
                  <div>
                    {c1} vs {c2}
                  </div>
                  <div className="text-[10px] mt-0.5">{ok ? '✓ covers' : '✗ fails'}</div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            {identical
              ? 'Both hypotheses place identical constraints on all attributes, covering the exact same set of instances.'
              : h1GeqH2
              ? `Every instance accepted by ${formatHypothesis(h2)} is guaranteed to be accepted by ${formatHypothesis(h1)}, because h₁ has wildcards or matching values at every constraint.`
              : h2GeqH1
              ? `${formatHypothesis(h2)} is broader than ${formatHypothesis(h1)}. All instances accepted by h₁ are also accepted by h₂.`
              : `Because h₁ and h₂ constrain different attributes to specific values without overlapping wildcards, neither encompasses the other. In a lattice poset, they sit on separate incomparable branches.`}
          </p>
        </div>
      )}
    </div>
  );
}

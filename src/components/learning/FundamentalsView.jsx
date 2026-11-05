import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Layers,
  ArrowRight,
  PlusCircle,
  MinusCircle,
} from 'lucide-react';
import { HierarchyDiagram } from './HierarchyDiagram.jsx';
import { GeneralityComparator } from './GeneralityComparator.jsx';
import { FlowDiagram } from './FlowDiagram.jsx';

export function FundamentalsView({ onExploreScenarios }) {
  const definitions = [
    {
      num: 1,
      title: 'Concept Learning',
      desc: 'Inferring a boolean-valued function from training examples of its inputs and outputs. Formally, given an instance space X, learn a target rule c: X → {0, 1}.',
    },
    {
      num: 2,
      title: 'Attributes',
      desc: 'Features or properties used to describe every situation or object. For example: Sky, Temperature, and Wind.',
    },
    {
      num: 3,
      title: 'Attribute Values',
      desc: 'The discrete set of possible values each attribute can take. For example, Sky can be Sunny, Cloudy, or Rainy.',
    },
    {
      num: 4,
      title: 'Training Example',
      desc: 'A specific instance described by an attribute tuple together with a target classification: positive (YES / +) or negative (NO / -).',
    },
    {
      num: 5,
      title: 'Hypothesis (h)',
      desc: 'A candidate rule that classifies instances. In conjunctive representations, written as ⟨c₁, c₂, ...⟩ where each constraint cᵢ is a specific value, "?", or "Ø".',
    },
    {
      num: 6,
      title: 'Hypothesis Space (H)',
      desc: 'The set of all candidate hypotheses the learner can consider. In our finite domains, this is the complete set of all valid conjunctions.',
    },
    {
      num: 7,
      title: 'General-to-Specific Ordering (≥_g)',
      desc: 'h₁ is more general than or equal to h₂ (h₁ ≥_g h₂) if every instance covered by h₂ is also covered by h₁. This creates a natural partial order (lattice).',
    },
    {
      num: 8,
      title: 'Positive Example',
      desc: 'An instance that belongs to the target concept. It proves that the true rule must be broad enough to cover it, forcing specific hypotheses to generalize.',
    },
    {
      num: 9,
      title: 'Negative Example',
      desc: 'An instance that does not belong to the target concept. It proves that the true rule must exclude it, forcing general hypotheses to specialize.',
    },
    {
      num: 10,
      title: 'S Boundary (Specific)',
      desc: 'The set of maximally specific hypotheses consistent with all observed data. Starts at S₀ = {⟨Ø, Ø, ...⟩} and generalizes upwards.',
    },
    {
      num: 11,
      title: 'G Boundary (General)',
      desc: 'The set of maximally general hypotheses consistent with all observed data. Starts at G₀ = {⟨?, ?, ...⟩} and specializes downwards.',
    },
    {
      num: 12,
      title: 'Version Space (VS)',
      desc: 'The set of all hypotheses in H that are completely consistent with every observed training example. Formally bounded between S and G.',
    },
    {
      num: 13,
      title: 'Prediction via Version Space',
      desc: 'To classify an unseen instance: if all surviving hypotheses in VS agree, the prediction is certain (YES or NO). If they disagree, the prediction is UNCERTAIN.',
    },
  ];

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-xl border theme-border theme-surface shadow-subtle">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mitchell Chapter 2 • Concept Learning Notes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight theme-text-primary">
            Theory & Formal Foundations
          </h1>
          <p className="text-xs sm:text-sm theme-text-secondary mt-1.5 leading-relaxed">
            A comprehensive reference guide on General-to-Specific Partial Orders, Dual S & G Boundaries, Version Spaces, and Candidate Elimination.
          </p>
        </div>
      </div>

      {/* 13 Key Concepts Grid */}
      <div>
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold theme-text-primary">The 13 Theoretical Foundations</h2>
          <p className="text-xs theme-text-muted mt-0.5">
            Key formalisms and terminology used throughout this laboratory
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {definitions.map((item) => (
            <div
              key={item.num}
              className="p-3.5 rounded-lg theme-surface border theme-border shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    Def #{String(item.num).padStart(2, '0')}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 theme-text-muted opacity-40" />
                </div>
                <h3 className="text-xs font-bold theme-text-primary mb-1">{item.title}</h3>
                <p className="text-xs theme-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Hierarchy */}
      <HierarchyDiagram />

      {/* Boundary update mechanics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Positive box */}
        <div className="p-5 rounded-xl border border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
              Positive Instances: Upward Generalization
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs theme-text-secondary leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Generalize S minimally:</strong> If a hypothesis in S fails to cover the positive instance, replace mismatched constraints with wildcards <code className="font-mono font-bold text-emerald-700 dark:text-emerald-300">"?"</code>.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Prune G:</strong> Any hypothesis in G that fails to cover the positive instance is permanently eliminated.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Effect:</strong> Discards hypotheses that are overly specific to encompass positive data.</span>
            </li>
          </ul>
        </div>

        {/* Negative box */}
        <div className="p-5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <MinusCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <h3 className="text-xs sm:text-sm font-bold text-rose-950 dark:text-rose-200">
              Negative Instances: Downward Specialization
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs theme-text-secondary leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Specialize G minimally:</strong> If a hypothesis in G covers the negative instance, replace wildcards with specific values that exclude the negative instance while remaining more general than some member of S.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Prune S:</strong> If any hypothesis in S accidentally covers the negative instance, it is eliminated as inconsistent.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Effect:</strong> Discards hypotheses that are overly general and permissive.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Comparator */}
      <GeneralityComparator />

      {/* Pipeline */}
      <FlowDiagram />

      {/* Action */}
      <div className="p-5 rounded-xl border theme-border theme-surface text-center">
        <h3 className="text-sm font-bold theme-text-primary mb-1">Ready to test in the laboratory workbench?</h3>
        <p className="text-xs theme-text-muted mb-4 max-w-lg mx-auto">
          Launch any of the 4 predefined scenarios to step through Candidate Elimination and watch version space contractions live.
        </p>
        <button
          onClick={onExploreScenarios}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Launch Lab Scenarios</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

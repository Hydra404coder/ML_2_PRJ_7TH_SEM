import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  PlusCircle,
  MinusCircle,
  Lightbulb,
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
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-purple-950/40 to-slate-900 border border-indigo-500/30">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Module 1 Theory Guide</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn the Fundamentals of Concept Learning
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Discover how machines learn rules from observations using General-to-Specific Ordering, S and G Boundaries, and Candidate Elimination.
          </p>
        </div>
      </div>

      {/* The 13 Key Concepts Grid */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">13 Core Building Blocks</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Essential definitions in Mitchell's Concept Learning framework
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {definitions.map((item) => (
            <div
              key={item.num}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    Concept #{String(item.num).padStart(2, '0')}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Hierarchy / Lattice */}
      <HierarchyDiagram />

      {/* Positive vs Negative Boundary Mechanism Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive box */}
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">How Positive Examples Update Boundaries</h3>
              <span className="text-xs font-semibold text-emerald-400">Forces Generalization (S expands ↑)</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            A positive example represents an instance that the target concept MUST cover.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Generalize S minimally:</strong> If a hypothesis in S does not cover the positive example, replace its mismatched attributes with wildcards <code className="text-emerald-300 font-mono">"?"</code> so it covers the example.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Prune G:</strong> Any hypothesis in G that fails to cover the positive instance is immediately eliminated.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Eliminates overly specific rules:</strong> Hypotheses below the new S are discarded because they are too restrictive.</span>
            </li>
          </ul>
        </div>

        {/* Negative box */}
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <MinusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">How Negative Examples Update Boundaries</h3>
              <span className="text-xs font-semibold text-rose-400">Forces Specialization (G contracts ↓)</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            A negative example represents an instance that the target concept MUST NOT cover.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Specialize G minimally:</strong> If a hypothesis in G covers the negative example, replace its wildcards with specific values that exclude the negative instance while remaining more general than some member of S.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Prune S:</strong> If any hypothesis in S accidentally covers the negative instance, it is discarded as inconsistent.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Eliminates overly general rules:</strong> Hypotheses above the new G are discarded because they are too permissive.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Generality Comparator */}
      <GeneralityComparator />

      {/* Pipeline Flow Diagram */}
      <FlowDiagram />

      {/* Bottom CTA to Scenarios */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Ready to test these principles live?</h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-5 max-w-xl mx-auto">
          Choose one of the 4 educational scenarios to watch the Candidate Elimination algorithm process examples and update boundaries step by step.
        </p>
        <button
          onClick={onExploreScenarios}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
        >
          <Layers className="w-4 h-4" />
          <span>Explore Scenarios</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}

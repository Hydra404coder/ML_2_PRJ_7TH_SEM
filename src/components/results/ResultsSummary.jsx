import React from 'react';
import { formatHypothesis } from '../../engine/hypothesis.js';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Layers,
  Award,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export function ResultsSummary({
  scenario,
  modeId,
  trajectory,
  currentStep,
  onReplay,
  onTryAnother,
  onOpenQuiz,
}) {
  const currentStepData = trajectory[currentStep] || trajectory[trajectory.length - 1];
  const finalS = currentStepData.S;
  const finalG = currentStepData.G;
  const vsCount = currentStepData.vsCount;
  const isConsistent = currentStepData.isConsistent;

  const totalProcessed = currentStep;
  const posCount = trajectory.slice(1, currentStep + 1).filter(t => t.exampleLabel === 'YES' || t.exampleLabel === '+').length;
  const negCount = trajectory.slice(1, currentStep + 1).filter(t => t.exampleLabel === 'NO' || t.exampleLabel === '-').length;

  const isConverged = finalS.length === 1 && finalG.length === 1 && formatHypothesis(finalS[0]) === formatHypothesis(finalG[0]);
  const isEmpty = !isConsistent || vsCount === 0 || finalS.length === 0 || finalG.length === 0;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Experiment Synthesis
            </span>
            <span className="text-xs text-slate-400 capitalize">• {modeId.replace('-', ' ')} Mode</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Results & Model Interpretation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Scenario: <strong className="text-white">{scenario.title}</strong>
          </p>
        </div>

        {/* Big Status Badge */}
        <div
          className={`px-4 py-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-bold ${
            isConverged
              ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
              : isEmpty
              ? 'bg-rose-950/60 border-rose-500/60 text-rose-300'
              : 'bg-indigo-950/60 border-indigo-500/60 text-indigo-300'
          }`}
        >
          {isConverged && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isEmpty && <XCircle className="w-5 h-5 text-rose-400" />}
          {!isConverged && !isEmpty && <HelpCircle className="w-5 h-5 text-indigo-400" />}
          <span>
            {isConverged
              ? 'Concept Uniquely Learned'
              : isEmpty
              ? 'Inconsistent / Empty VS'
              : `${vsCount} Hypotheses Remain in VS`}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">Examples Processed</div>
          <div className="text-xl font-mono font-bold text-white">{totalProcessed}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {posCount} Pos / {negCount} Neg
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">Surviving Hypotheses</div>
          <div className="text-xl font-mono font-bold text-indigo-400">{vsCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Initial: {trajectory[0].vsCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">S Boundary Size</div>
          <div className="text-xl font-mono font-bold text-emerald-400">{finalS.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {finalS.map(formatHypothesis).join(', ') || '∅'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">G Boundary Size</div>
          <div className="text-xl font-mono font-bold text-indigo-400">{finalG.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {finalG.map(formatHypothesis).join(', ') || '∅'}
          </div>
        </div>
      </div>

      {/* What the Learner CAN and CANNOT Conclude */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What Can Be Concluded */}
        <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>What the Learner CAN Conclude</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Every surviving hypothesis in the version space correctly classifies 100% of the training instances observed so far.</span>
            </li>
            {isConverged && (
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Both S and G converged on <strong className="text-white font-mono">{formatHypothesis(finalS[0])}</strong>. Under the assumption that the true concept is a conjunction in this attribute space, this is the exact and only true rule.</span>
              </li>
            )}
            {!isConverged && !isEmpty && (
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Unseen examples covered by all surviving hypotheses or rejected by all surviving hypotheses can be predicted with 100% certainty.</span>
              </li>
            )}
            {isEmpty && (
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>The algorithm detected that the training labels cannot be explained by a single conjunction in this representation.</span>
              </li>
            )}
          </ul>
        </div>

        {/* What Can NOT Be Concluded */}
        <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>What the Learner CANNOT Conclude</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            {!isConverged && !isEmpty && (
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>The learner cannot pick which of the {vsCount} surviving hypotheses is the "real" one without additional discriminating training examples.</span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✗</span>
              <span>The learner cannot guarantee performance if the real-world concept requires disjunctions (OR rules) or negation not representable in this conjunctive hypothesis space.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✗</span>
              <span>Candidate Elimination assumes zero noise. If any training label was corrupted or noisy, the version space may become empty or discard the true rule.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Assumptions & Limitations Note */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-200">Inductive Bias & Real-World Caveat: </strong>
          Candidate Elimination relies on the inductive bias that the target concept belongs to H (the conjunctive hypothesis space). In real applications (e.g. medical diagnosis, plant health, weather), concepts often involve continuous thresholds, probabilistic interactions, and non-linear boundaries.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={onReplay}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Experiment</span>
          </button>

          <button
            onClick={onTryAnother}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Try Another Scenario</span>
          </button>
        </div>

        <button
          onClick={onOpenQuiz}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
        >
          <Award className="w-4 h-4" />
          <span>Test Your Knowledge (Quiz)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

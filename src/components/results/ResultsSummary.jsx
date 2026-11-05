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
    <div className="p-6 rounded-xl border theme-border theme-surface shadow-subtle space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b theme-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Experiment Synthesis
            </span>
            <span className="text-xs theme-text-muted capitalize">• {modeId.replace('-', ' ')} Mode</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight theme-text-primary">
            Candidate Elimination Results & Interpretation
          </h2>
          <p className="text-xs theme-text-muted mt-0.5">
            Scenario: <strong className="theme-text-primary">{scenario.title}</strong>
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`px-3.5 py-2 rounded-lg border flex items-center gap-2 text-xs font-bold ${
            isConverged
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : isEmpty
              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              : 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200'
          }`}
        >
          {isConverged && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          {isEmpty && <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
          {!isConverged && !isEmpty && <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
          <span>
            {isConverged
              ? 'Target Concept Uniquely Learned'
              : isEmpty
              ? 'Inconsistent / Empty Version Space'
              : `${vsCount} Consistent Hypotheses in VS`}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg theme-surface-subtle border theme-border">
          <div className="text-[11px] theme-text-muted">Examples Ingested</div>
          <div className="text-lg font-mono font-bold theme-text-primary mt-0.5">{totalProcessed}</div>
          <div className="text-[10px] theme-text-muted mt-0.5">
            {posCount} Positive / {negCount} Negative
          </div>
        </div>

        <div className="p-3.5 rounded-lg theme-surface-subtle border theme-border">
          <div className="text-[11px] theme-text-muted">Surviving Hypotheses</div>
          <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">{vsCount}</div>
          <div className="text-[10px] theme-text-muted mt-0.5">
            Initial: {trajectory[0].vsCount} candidate rules
          </div>
        </div>

        <div className="p-3.5 rounded-lg theme-surface-subtle border theme-border">
          <div className="text-[11px] theme-text-muted">S Boundary Cardinality</div>
          <div className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{finalS.length}</div>
          <div className="text-[10px] theme-text-muted mt-0.5 font-mono truncate">
            {finalS.map(formatHypothesis).join(', ') || '∅'}
          </div>
        </div>

        <div className="p-3.5 rounded-lg theme-surface-subtle border theme-border">
          <div className="text-[11px] theme-text-muted">G Boundary Cardinality</div>
          <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">{finalG.length}</div>
          <div className="text-[10px] theme-text-muted mt-0.5 font-mono truncate">
            {finalG.map(formatHypothesis).join(', ') || '∅'}
          </div>
        </div>
      </div>

      {/* What the Learner CAN and CANNOT Conclude */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Can Conclude */}
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>What the Model CAN Conclude</span>
          </div>
          <ul className="space-y-1.5 text-xs theme-text-secondary leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Every surviving hypothesis in the version space correctly classifies 100% of the training instances observed so far without error.</span>
            </li>
            {isConverged && (
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Both S and G converged on <strong className="font-mono theme-text-primary">{formatHypothesis(finalS[0])}</strong>. Under the assumption that the target concept is conjunctive, this is the exact true rule.</span>
              </li>
            )}
            {!isConverged && !isEmpty && (
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Any unseen instance covered by all surviving hypotheses or rejected by all surviving hypotheses can be predicted with 100% mathematical certainty.</span>
              </li>
            )}
          </ul>
        </div>

        {/* Cannot Conclude */}
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 space-y-2.5">
          <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>What the Model CANNOT Conclude</span>
          </div>
          <ul className="space-y-1.5 text-xs theme-text-secondary leading-relaxed">
            {!isConverged && !isEmpty && (
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span>The algorithm cannot determine which of the remaining {vsCount} hypotheses is the true real-world rule without additional discriminating counterexamples.</span>
              </li>
            )}
            <li className="flex items-start gap-1.5">
              <span className="text-rose-600 font-bold">•</span>
              <span>The algorithm cannot accommodate noise: if any training label was corrupted, the version space can collapse to empty or prune the true concept.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-rose-600 font-bold">•</span>
              <span>If the true concept requires disjunctions (OR rules) or continuous curves, a conjunctive hypothesis space will fail to represent it.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t theme-border">
        <div className="flex items-center gap-2">
          <button
            onClick={onReplay}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium theme-surface border theme-border hover:theme-surface-subtle theme-text-secondary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Simulation</span>
          </button>

          <button
            onClick={onTryAnother}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium theme-surface border theme-border hover:theme-surface-subtle theme-text-secondary transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Try Another Scenario</span>
          </button>
        </div>

        <button
          onClick={onOpenQuiz}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
        >
          <Award className="w-4 h-4" />
          <span>Self-Assessment Quiz</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { predictInstance } from '../../engine/prediction.js';
import { formatHypothesis } from '../../engine/hypothesis.js';
import {
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  History,
  Trash2,
} from 'lucide-react';

export function PredictionExplorer({ attributes, consistentHypotheses, scenarioTitle }) {
  const attrNames = attributes.map(a => a.name);

  const [selectedValues, setSelectedValues] = useState(() => {
    const initial = {};
    attributes.forEach(attr => {
      initial[attr.name] = attr.values[0];
    });
    return initial;
  });

  const [testHistory, setTestHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(() => {
    const initial = {};
    attributes.forEach(attr => {
      initial[attr.name] = attr.values[0];
    });
    return predictInstance(initial, attrNames, consistentHypotheses);
  });

  const handleAttributeChange = (attrName, value) => {
    const updated = { ...selectedValues, [attrName]: value };
    setSelectedValues(updated);
    const result = predictInstance(updated, attrNames, consistentHypotheses);
    setCurrentResult(result);
  };

  const handleSaveToHistory = () => {
    if (!currentResult) return;
    setTestHistory(prev => [
      {
        id: Date.now(),
        values: { ...selectedValues },
        result: currentResult,
      },
      ...prev.slice(0, 7),
    ]);
  };

  const handleClearHistory = () => {
    setTestHistory([]);
  };

  const handleRestoreFromHistory = (item) => {
    setSelectedValues({ ...item.values });
    setCurrentResult(item.result);
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl border theme-border theme-surface shadow-subtle space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b theme-border">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold theme-text-primary">Unseen Instance Query Sandbox</h3>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border theme-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              Inference Bench
            </span>
          </div>
          <p className="text-xs theme-text-muted mt-0.5">
            Query surviving hypotheses in the version space to test classifications of novel examples.
          </p>
        </div>

        <div className="text-xs font-mono px-2.5 py-1 rounded-lg theme-surface-subtle border theme-border theme-text-secondary">
          Active Version Space: <strong className="text-blue-600 dark:text-blue-400">{consistentHypotheses.filter(h => !h.isNone).length} Hypotheses</strong>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Input Selection (5 cols) */}
        <div className="lg:col-span-5 p-4 rounded-xl theme-surface-subtle border theme-border flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold theme-text-primary uppercase tracking-wider mb-2">
              Select Instance Attributes
            </div>
            <p className="text-xs theme-text-muted mb-3.5">
              Pick one discrete value per attribute domain:
            </p>

            <div className="space-y-3">
              {attributes.map((attr) => (
                <div key={attr.name} className="space-y-1">
                  <label className="text-xs font-semibold theme-text-secondary flex items-center justify-between">
                    <span>{attr.name}</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                      {selectedValues[attr.name]}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {attr.values.map((val) => {
                      const isSelected = selectedValues[attr.name] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleAttributeChange(attr.name, val)}
                          className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white font-bold shadow-sm'
                              : 'theme-surface hover:theme-surface-subtle border theme-border theme-text-secondary'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t theme-border flex items-center justify-between">
            <div className="text-xs font-mono theme-text-muted">
              Query: {formatHypothesis(attrNames.map(n => selectedValues[n]))}
            </div>
            <button
              onClick={handleSaveToHistory}
              className="px-2.5 py-1 rounded-md theme-surface border theme-border hover:theme-surface-subtle theme-text-primary text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <History className="w-3.5 h-3.5" />
              <span>Log Test</span>
            </button>
          </div>
        </div>

        {/* Right: Outcome (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 rounded-xl theme-surface-subtle border theme-border">
          <div>
            <div className="text-xs font-bold theme-text-muted uppercase tracking-wider mb-2">
              Version Space Consensus Outcome
            </div>

            {/* Status Banner */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3.5 ${
                currentResult.prediction === 'YES'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : currentResult.prediction === 'NO'
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : currentResult.prediction === 'UNCERTAIN'
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'theme-surface border theme-border theme-text-muted'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {currentResult.prediction === 'YES' && <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
                {currentResult.prediction === 'NO' && <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
                {currentResult.prediction === 'UNCERTAIN' && <HelpCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
                {currentResult.prediction === 'EMPTY' && <AlertTriangle className="w-6 h-6 text-slate-500" />}
                <div>
                  <div className="text-base font-bold tracking-tight">
                    {currentResult.label}
                  </div>
                  <div className="text-xs opacity-90">
                    {currentResult.summary}
                  </div>
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <div className="opacity-70 text-[10px]">Vote Split:</div>
                <div className="font-bold">
                  {currentResult.yesCount} YES / {currentResult.noCount} NO
                </div>
              </div>
            </div>

            {/* Scientific Explanation */}
            <div className="p-3 rounded-lg theme-surface border theme-border text-xs theme-text-secondary leading-relaxed mb-3">
              <strong className="theme-text-primary">Consensus Explanation: </strong>
              {currentResult.explanation}
            </div>

            {/* Individual hypothesis vote list */}
            <div className="space-y-1">
              <div className="text-[10px] font-semibold theme-text-muted uppercase tracking-wider mb-1">
                Individual Hypothesis Votes ({currentResult.details.length})
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                {currentResult.details.map((d) => (
                  <div
                    key={d.id}
                    className="px-2.5 py-1 rounded theme-surface border theme-border flex items-center justify-between text-xs font-mono"
                  >
                    <span className="theme-text-secondary">{d.hypothesis}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        d.vote === 'YES'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {d.vote}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t theme-border text-[10px] theme-text-muted">
            * Pure logical deduction based on surviving version space constraints.
          </div>
        </div>
      </div>

      {/* History */}
      {testHistory.length > 0 && (
        <div className="pt-3 border-t theme-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold theme-text-primary uppercase tracking-wider">
              Recent Queries ({testHistory.length})
            </h4>
            <button
              onClick={handleClearHistory}
              className="text-xs theme-text-muted hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Log</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {testHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => handleRestoreFromHistory(item)}
                className="p-2 rounded-lg theme-surface border theme-border hover:border-blue-400 transition-all cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-mono font-bold theme-text-primary text-[11px]">
                    {formatHypothesis(attrNames.map(n => item.values[n]))}
                  </div>
                  <div className="text-[10px] theme-text-muted">
                    {item.result.yesCount} YES / {item.result.noCount} NO
                  </div>
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                    item.result.prediction === 'YES'
                      ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950'
                      : item.result.prediction === 'NO'
                      ? 'text-rose-700 bg-rose-100 dark:bg-rose-950'
                      : 'text-amber-700 bg-amber-100 dark:bg-amber-950'
                  }`}
                >
                  {item.result.prediction}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { predictInstance } from '../../engine/prediction.js';
import { formatHypothesis } from '../../engine/hypothesis.js';
import {
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  History,
  Trash2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export function PredictionExplorer({ attributes, consistentHypotheses, scenarioTitle }) {
  const attrNames = attributes.map(a => a.name);

  // Default selection: first value of each attribute
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
      ...prev.slice(0, 9), // Keep latest 10
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
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Prediction Explorer</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Version Space Query
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Query the remaining consistent hypotheses to classify any unseen test instance.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
          Surviving Hypotheses: <span className="font-bold text-indigo-400">{consistentHypotheses.filter(h => !h.isNone).length}</span>
        </div>
      </div>

      {/* Main Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Selection (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Configure Unseen Test Instance
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Select one value for each attribute to evaluate against the version space.
            </p>

            <div className="space-y-4">
              {attributes.map((attr) => (
                <div key={attr.name} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>{attr.name}</span>
                    <span className="font-mono text-indigo-400 text-[11px]">
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
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-500/20'
                              : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
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

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              Query: {formatHypothesis(attrNames.map(n => selectedValues[n]))}
            </div>
            <button
              onClick={handleSaveToHistory}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <History className="w-3.5 h-3.5" />
              <span>Save Result</span>
            </button>
          </div>
        </div>

        {/* Right: Prediction Output & Consensus (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Model Prediction Outcome
            </div>

            {/* Big Status Banner */}
            <div
              className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 ${
                currentResult.prediction === 'YES'
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                  : currentResult.prediction === 'NO'
                  ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                  : currentResult.prediction === 'UNCERTAIN'
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-current">
                  {currentResult.prediction === 'YES' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                  {currentResult.prediction === 'NO' && <XCircle className="w-6 h-6 text-rose-400" />}
                  {currentResult.prediction === 'UNCERTAIN' && <HelpCircle className="w-6 h-6 text-amber-400" />}
                  {currentResult.prediction === 'EMPTY' && <AlertTriangle className="w-6 h-6 text-slate-400" />}
                </div>
                <div>
                  <div className="text-xl font-extrabold tracking-tight">
                    {currentResult.label}
                  </div>
                  <div className="text-xs opacity-90 mt-0.5">
                    {currentResult.summary}
                  </div>
                </div>
              </div>

              {/* Vote Ratio Pill */}
              <div className="text-right font-mono text-xs">
                <div className="text-slate-400">Consensus:</div>
                <div className="font-bold text-sm">
                  {currentResult.yesCount} YES / {currentResult.noCount} NO
                </div>
              </div>
            </div>

            {/* Explanation text */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
              <strong className="text-white">Why this prediction? </strong>
              {currentResult.explanation}
            </div>

            {/* Breakdown per surviving hypothesis */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Surviving Hypotheses Vote Breakdown ({currentResult.details.length})
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                {currentResult.details.map((d) => (
                  <div
                    key={d.id}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-slate-300">{d.hypothesis}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.vote === 'YES'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {d.vote}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            * This is an educational hypothesis space prediction, not a real-world decision.
          </div>
        </div>
      </div>

      {/* Test History */}
      {testHistory.length > 0 && (
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span>Query History ({testHistory.length} Saved)</span>
            </h4>
            <button
              onClick={handleClearHistory}
              className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {testHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => handleRestoreFromHistory(item)}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-mono text-slate-200">
                    {formatHypothesis(attrNames.map(n => item.values[n]))}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {item.result.yesCount} YES / {item.result.noCount} NO
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                    item.result.prediction === 'YES'
                      ? 'text-emerald-400 bg-emerald-950/60'
                      : item.result.prediction === 'NO'
                      ? 'text-rose-400 bg-rose-950/60'
                      : 'text-amber-400 bg-amber-950/60'
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

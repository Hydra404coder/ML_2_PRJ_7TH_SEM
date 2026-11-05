import React, { useState } from 'react';
import {
  Sun,
  Apple,
  GraduationCap,
  Sprout,
  ArrowRight,
  Database,
  Sliders,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { DatasetTable } from './DatasetTable.jsx';
import { ModeSelector } from './ModeSelector.jsx';

export function ScenarioDetailPage({ scenario, onStartExperiment, onBack }) {
  const [selectedMode, setSelectedMode] = useState('guided');

  const iconMap = {
    Sun,
    Apple,
    GraduationCap,
    Sprout,
  };

  const Icon = iconMap[scenario.icon] || Sun;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Top Breadcrumb navigation and back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>← Back to All Scenarios</span>
        </button>
        <span className="text-xs text-slate-500 font-mono">Scenario ID: {scenario.id}</span>
      </div>

      {/* Main Scenario Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {scenario.category}
                </span>
                <span className="text-xs text-slate-400">• {scenario.attributes.length} Attributes</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {scenario.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {scenario.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartExperiment(scenario.id, selectedMode)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Experiment</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Target Concept Spotlight */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Target Concept Question
            </div>
            <div className="text-base font-bold text-white">
              "{scenario.targetConceptQuestion}"
            </div>
            <p className="text-xs text-slate-400 mt-1">{scenario.targetExplanation}</p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                Conjunctive Target Hypothesis
              </div>
              <div className="text-lg font-mono font-bold text-indigo-200">
                {scenario.targetConceptHypothesis}
              </div>
            </div>
            <div className="text-[11px] text-indigo-300/80 mt-2">
              The deterministic rule generating labels in the guided dataset
            </div>
          </div>
        </div>
      </div>

      {/* Attribute Space Breakdown */}
      <div>
        <div className="mb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Attribute Domains</span>
          </h2>
          <p className="text-xs text-slate-400">
            Properties describing every instance in this scenario's hypothesis space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenario.attributes.map((attr) => (
            <div
              key={attr.name}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">{attr.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {attr.values.length} values
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{attr.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {attr.values.map((val) => (
                  <span
                    key={val}
                    className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono text-xs font-medium"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
        <ModeSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />
      </div>

      {/* Predefined Dataset Table */}
      <DatasetTable dataset={scenario.baseDataset} attributes={scenario.attributes} />

      {/* Educational Disclaimer / Limitations */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300/90">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-amber-200">Educational Model Disclaimer: </strong>
          {scenario.disclaimer}
        </div>
      </div>

      {/* Bottom CTA to start */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={() => onStartExperiment(scenario.id, selectedMode)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/25 transition-all hover:scale-105"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Experiment with {selectedMode.toUpperCase()} mode</span>
        </button>
      </div>
    </div>
  );
}

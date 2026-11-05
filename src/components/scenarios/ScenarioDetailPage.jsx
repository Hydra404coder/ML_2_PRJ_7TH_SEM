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
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold theme-text-muted hover:theme-text-primary flex items-center gap-1 transition-colors"
        >
          <span>← Back to Lab Scenarios</span>
        </button>
        <span className="text-xs theme-text-muted font-mono">Module: {scenario.id}</span>
      </div>

      {/* Main Scenario Header Card */}
      <div className="p-6 rounded-xl border theme-border theme-surface shadow-subtle">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {scenario.category}
                </span>
                <span className="text-xs theme-text-muted">• {scenario.attributes.length} Discrete Attributes</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold theme-text-primary">
                {scenario.title}
              </h1>
              <p className="text-xs sm:text-sm theme-text-secondary mt-1 max-w-2xl leading-relaxed">
                {scenario.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartExperiment(scenario.id, selectedMode)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Open Workbench</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Target Concept Box */}
        <div className="mt-5 pt-5 border-t theme-border grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-lg theme-surface-subtle border theme-border">
            <div className="text-[10px] font-semibold theme-text-muted uppercase tracking-wider mb-1">
              Target Concept Question
            </div>
            <div className="text-sm font-bold theme-text-primary">
              "{scenario.targetConceptQuestion}"
            </div>
            <p className="text-xs theme-text-secondary mt-1">{scenario.targetExplanation}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">
                True Conjunctive Rule
              </div>
              <div className="text-base font-mono font-bold text-blue-900 dark:text-blue-200">
                {scenario.targetConceptHypothesis}
              </div>
            </div>
            <div className="text-[11px] theme-text-muted mt-2">
              Underlying rule consistent with the dataset
            </div>
          </div>
        </div>
      </div>

      {/* Attribute Space Breakdown */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-bold theme-text-primary flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Attribute Domains & Discrete Values</span>
          </h2>
          <p className="text-xs theme-text-muted">
            The instance space X is formed by the Cartesian product of these discrete attribute sets
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenario.attributes.map((attr) => (
            <div
              key={attr.name}
              className="p-3.5 rounded-lg theme-surface border theme-border shadow-subtle"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold theme-text-primary">{attr.name}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border theme-border theme-surface-subtle theme-text-muted">
                  {attr.values.length} values
                </span>
              </div>
              <p className="text-[11px] theme-text-muted mb-2.5">{attr.description}</p>
              <div className="flex flex-wrap gap-1">
                {attr.values.map((val) => (
                  <span
                    key={val}
                    className="px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-mono text-[11px] font-medium"
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
      <div className="p-5 rounded-xl border theme-border theme-surface shadow-subtle">
        <ModeSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />
      </div>

      {/* Predefined Dataset Table */}
      <DatasetTable dataset={scenario.baseDataset} attributes={scenario.attributes} />

      {/* Educational Disclaimer */}
      <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-900/50 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Educational Model Note: </strong>
          {scenario.disclaimer}
        </div>
      </div>

      {/* Bottom Start Action */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="px-3.5 py-2 rounded-lg text-xs font-medium theme-surface border theme-border hover:theme-surface-subtle theme-text-muted transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={() => onStartExperiment(scenario.id, selectedMode)}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Launch Workbench ({selectedMode})</span>
        </button>
      </div>
    </div>
  );
}

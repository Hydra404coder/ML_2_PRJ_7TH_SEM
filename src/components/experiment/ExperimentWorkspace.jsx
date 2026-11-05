import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  initializeBoundaries,
  stepCandidateElimination,
} from '../../engine/candidateElimination.js';
import {
  generateHypothesisSpace,
  formatHypothesis,
} from '../../engine/hypothesis.js';
import { computeVersionSpaceState } from '../../engine/versionSpace.js';
import { ControlBar } from './ControlBar.jsx';
import { CurrentExampleCard } from './CurrentExampleCard.jsx';
import { BoundaryDisplay } from './BoundaryDisplay.jsx';
import { ExplanationCard } from './ExplanationCard.jsx';
import { HypothesisTable } from './HypothesisTable.jsx';
import { VersionSpaceChart } from './VersionSpaceChart.jsx';
import { HypothesisSpaceLattice } from '../visualizations/HypothesisSpaceLattice.jsx';
import { PredictionExplorer } from '../prediction/PredictionExplorer.jsx';
import { ResultsSummary } from '../results/ResultsSummary.jsx';
import {
  ArrowLeft,
  Table,
  Zap,
  Sparkles,
  Sliders,
  Database,
} from 'lucide-react';

export function ExperimentWorkspace({
  scenario,
  modeId = 'guided',
  onBackToScenarios,
  onNavigateToQuiz,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showExplanation, setShowExplanation] = useState(true);
  const [activeBottomView, setActiveBottomView] = useState('table'); // 'table' | 'chart' | 'prediction' | 'results'

  const autoplayTimerRef = useRef(null);

  // Filter dataset based on mode
  const activeDataset = useMemo(() => {
    if (modeId === 'positive-only') {
      return scenario.baseDataset.filter(d => d.label === 'YES' || d.label === '+');
    }
    if (modeId === 'negative-only') {
      return scenario.baseDataset.filter(d => d.label === 'NO' || d.label === '-');
    }
    return scenario.baseDataset;
  }, [scenario, modeId]);

  const attrNames = useMemo(() => scenario.attributes.map(a => a.name), [scenario]);

  const fullHypothesisSpace = useMemo(() => {
    return generateHypothesisSpace(scenario.attributes);
  }, [scenario]);

  // Precompute complete deterministic simulation trajectory (Step 0 to Step N)
  const trajectory = useMemo(() => {
    const steps = [];

    // Step 0: Initial state
    const initBoundaries = initializeBoundaries(scenario.attributes.length);
    const step0State = computeVersionSpaceState(
      fullHypothesisSpace,
      [],
      attrNames,
      initBoundaries.S,
      initBoundaries.G
    );

    steps.push({
      step: 0,
      example: null,
      exampleLabel: 'INITIAL',
      S: initBoundaries.S,
      G: initBoundaries.G,
      isConsistent: true,
      explanation: 'Hypothesis space initialized. G₀ contains the most general hypothesis ⟨?, ?, ...⟩ covering all possible instances. S₀ contains the most specific hypothesis ⟨Ø, Ø, ...⟩ covering no instances.',
      actions: [
        'Initialized G₀ = { ⟨?, ?, ...⟩ }',
        'Initialized S₀ = { ⟨Ø, Ø, ...⟩ }',
        `Generated ${fullHypothesisSpace.length} candidate hypotheses in space H`,
      ],
      summary: 'Ready to process training examples.',
      versionSpaceState: step0State,
      vsCount: step0State.count,
    });

    let currentBoundaries = {
      S: initBoundaries.S.map(h => [...h]),
      G: initBoundaries.G.map(h => [...h]),
    };

    const processedExamples = [];

    for (let i = 0; i < activeDataset.length; i++) {
      const ex = activeDataset[i];
      processedExamples.push(ex);

      const stepResult = stepCandidateElimination(
        currentBoundaries,
        ex,
        scenario.attributes,
        attrNames
      );

      currentBoundaries = {
        S: stepResult.S,
        G: stepResult.G,
      };

      const vsState = computeVersionSpaceState(
        fullHypothesisSpace,
        processedExamples,
        attrNames,
        stepResult.S,
        stepResult.G
      );

      steps.push({
        step: i + 1,
        example: ex,
        exampleLabel: ex.label,
        S: stepResult.S,
        G: stepResult.G,
        isConsistent: stepResult.isConsistent,
        explanation: stepResult.explanation,
        actions: stepResult.actions,
        summary: stepResult.summary,
        versionSpaceState: vsState,
        vsCount: vsState.count,
      });
    }

    return steps;
  }, [scenario, fullHypothesisSpace, activeDataset, attrNames]);

  const totalSteps = activeDataset.length;
  const currentStepData = trajectory[currentStep] || trajectory[0];
  const previousStepData = currentStep > 0 ? trajectory[currentStep - 1] : null;

  useEffect(() => {
    if (isPlaying) {
      if (currentStep >= totalSteps) {
        setIsPlaying(false);
        return;
      }

      const speedMap = { 1: 2000, 1.5: 1300, 2: 800 };
      const intervalMs = speedMap[playbackSpeed] || 2000;

      autoplayTimerRef.current = setTimeout(() => {
        setCurrentStep(prev => {
          if (prev < totalSteps) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, intervalMs);

      return () => clearTimeout(autoplayTimerRef.current);
    }
  }, [isPlaying, currentStep, totalSteps, playbackSpeed]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleTogglePlay = () => {
    if (currentStep >= totalSteps) {
      setCurrentStep(0);
    }
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border theme-border theme-surface shadow-subtle">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToScenarios}
            className="p-1.5 rounded-lg border theme-border theme-surface-subtle hover:theme-border-strong theme-text-secondary transition-colors"
            title="Return to scenarios list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold theme-text-primary">{scenario.title}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 capitalize">
                {modeId.replace('-', ' ')} Mode
              </span>
            </div>
            <p className="text-xs theme-text-muted">
              Target Concept Question: <span className="font-medium theme-text-secondary">"{scenario.targetConceptQuestion}"</span>
            </p>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center rounded-lg border theme-border theme-surface-subtle p-0.5 text-xs font-semibold">
          <button
            onClick={() => setActiveBottomView('table')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              activeBottomView === 'table'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'theme-text-secondary hover:theme-surface'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Matrix Registry</span>
          </button>

          <button
            onClick={() => setActiveBottomView('chart')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              activeBottomView === 'chart'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'theme-text-secondary hover:theme-surface'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Contraction Curve</span>
          </button>

          <button
            onClick={() => setActiveBottomView('prediction')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              activeBottomView === 'prediction'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'theme-text-secondary hover:theme-surface'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Test Query</span>
          </button>

          <button
            onClick={() => setActiveBottomView('results')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              activeBottomView === 'results'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'theme-text-secondary hover:theme-surface'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Summary</span>
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <ControlBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        onPrev={handlePrev}
        onNext={handleNext}
        onTogglePlay={handleTogglePlay}
        onChangeSpeed={setPlaybackSpeed}
        onReset={handleReset}
        showExplanation={showExplanation}
        onToggleExplanation={() => setShowExplanation(prev => !prev)}
        onOpenPrediction={() => setActiveBottomView('prediction')}
        onOpenResults={() => setActiveBottomView('results')}
      />

      {/* Split Observation Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Active Training Instance (4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <CurrentExampleCard
            currentExample={currentStepData.example}
            currentStep={currentStep}
            totalSteps={totalSteps}
            attributes={scenario.attributes}
          />
        </div>

        {/* Right: S & G Boundaries + Commentary (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <BoundaryDisplay
            S={currentStepData.S}
            G={currentStepData.G}
            isConsistent={currentStepData.isConsistent}
            versionSpaceCount={currentStepData.vsCount}
          />

          {showExplanation && (
            <ExplanationCard
              explanation={currentStepData.explanation}
              actions={currentStepData.actions}
              summary={currentStepData.summary}
              currentStep={currentStep}
              previousVsCount={previousStepData ? previousStepData.vsCount : null}
              currentVsCount={currentStepData.vsCount}
            />
          )}
        </div>
      </div>

      {/* Centerpiece: The Hypothesis Lattice Workbench */}
      <HypothesisSpaceLattice
        hypothesisStatusList={currentStepData.versionSpaceState.allHypotheses}
        attributes={scenario.attributes}
        S={currentStepData.S}
        G={currentStepData.G}
        currentStep={currentStep}
      />

      {/* Bottom Collapsible Section: Matrix Table / Chart / Prediction / Results */}
      <div className="mt-4">
        {activeBottomView === 'table' && (
          <HypothesisTable
            hypothesisStatusList={currentStepData.versionSpaceState.allHypotheses}
            S={currentStepData.S}
            G={currentStepData.G}
          />
        )}

        {activeBottomView === 'chart' && (
          <VersionSpaceChart
            history={trajectory.slice(0, currentStep + 1)}
            currentStep={currentStep}
          />
        )}

        {activeBottomView === 'prediction' && (
          <PredictionExplorer
            attributes={scenario.attributes}
            consistentHypotheses={currentStepData.versionSpaceState.consistentHypotheses}
            scenarioTitle={scenario.title}
          />
        )}

        {activeBottomView === 'results' && (
          <ResultsSummary
            scenario={scenario}
            modeId={modeId}
            trajectory={trajectory}
            currentStep={currentStep}
            onReplay={handleReset}
            onTryAnother={onBackToScenarios}
            onOpenQuiz={onNavigateToQuiz}
          />
        )}
      </div>
    </div>
  );
}

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Info,
  Sliders,
} from 'lucide-react';

export function ControlBar({
  currentStep,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onPrev,
  onNext,
  onTogglePlay,
  onChangeSpeed,
  onReset,
  showExplanation,
  onToggleExplanation,
  onOpenPrediction,
  onOpenResults,
}) {
  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep === totalSteps;

  return (
    <div className="p-3.5 sm:p-4 rounded-xl border theme-border theme-surface shadow-subtle flex flex-wrap items-center justify-between gap-3">
      {/* Step Tracker & Scrubber */}
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg border theme-border theme-surface-subtle hover:theme-border-strong theme-text-secondary transition-colors"
          title="Reset to Step 0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[11px] theme-text-muted font-medium">Trajectory:</span>
            <span className="text-xs font-bold theme-text-primary font-mono">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          {/* Progress track */}
          <div className="w-28 sm:w-40 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-blue-600 transition-all duration-200"
              style={{ width: `${(currentStep / Math.max(1, totalSteps)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Primary Playback Button Group */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onPrev}
          disabled={isAtStart}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isAtStart
              ? 'opacity-40 cursor-not-allowed theme-surface theme-border theme-text-muted'
              : 'theme-surface theme-border hover:theme-surface-subtle theme-text-primary active:scale-95'
          }`}
          title="Previous Example"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title={isPlaying ? 'Pause simulation' : 'Autoplay through dataset'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Autoplay</span>
            </>
          )}
        </button>

        <button
          onClick={onNext}
          disabled={isAtEnd}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isAtEnd
              ? 'opacity-40 cursor-not-allowed theme-surface theme-border theme-text-muted'
              : 'theme-surface theme-border hover:theme-surface-subtle theme-text-primary active:scale-95'
          }`}
          title="Next Example"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Speed toggle */}
        <div className="flex items-center rounded-lg border theme-border theme-surface-subtle p-0.5 text-[11px] font-mono ml-1">
          {[1, 1.5, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => onChangeSpeed(spd)}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                playbackSpeed === spd
                  ? 'bg-blue-600 text-white font-bold'
                  : 'theme-text-muted hover:theme-text-primary'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Right Actions: Test Query & Summary */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onToggleExplanation}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            showExplanation
              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
              : 'theme-surface border theme-border hover:theme-surface-subtle theme-text-muted'
          }`}
          title="Toggle algorithm explanation notes"
        >
          <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="hidden md:inline">{showExplanation ? 'Hide Notes' : 'Show Notes'}</span>
        </button>

        <button
          onClick={onOpenPrediction}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          title="Open Prediction Sandbox"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Test Query</span>
        </button>
      </div>
    </div>
  );
}

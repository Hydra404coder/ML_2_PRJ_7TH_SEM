import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Info,
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
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
      {/* Progress & Step Info */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Simulation Progress:</span>
            <span className="text-sm font-bold text-white font-mono">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-36 sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden mt-1.5 border border-slate-700/60">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${(currentStep / Math.max(1, totalSteps)) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={onReset}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/80"
          title="Reset to initial state (Step 0)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Playback Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={isAtStart}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            isAtStart
              ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 active:scale-95'
          }`}
          title="Go back to previous example"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
          }`}
          title={isPlaying ? 'Pause autoplay' : 'Start autoplay through examples'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Autoplay</span>
            </>
          )}
        </button>

        <button
          onClick={onNext}
          disabled={isAtEnd}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            isAtEnd
              ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 active:scale-95'
          }`}
          title="Process next training example"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Speed Selector */}
        <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-0.5 text-[11px] font-mono">
          {[1, 1.5, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => onChangeSpeed(spd)}
              className={`px-2 py-1 rounded-lg transition-colors ${
                playbackSpeed === spd
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Auxiliary Actions: Toggle Explanation, Jump to Predict, Results */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleExplanation}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
            showExplanation
              ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
          title="Toggle Algorithm Explanation Panel"
        >
          <Info className="w-4 h-4 text-indigo-400" />
          <span className="hidden md:inline">
            {showExplanation ? 'Hide Guide' : 'Show Guide'}
          </span>
        </button>

        <button
          onClick={onOpenPrediction}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-colors"
          title="Test an unseen instance on current Version Space"
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Predict</span>
        </button>

        {isAtEnd && (
          <button
            onClick={onOpenResults}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>View Summary</span>
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizQuestions.js';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function KnowledgeCheck({ onBackToDashboard, onOpenFundamentals }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionId, optionIndex) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      const selectedIdx = selectedAnswers[q.id];
      if (selectedIdx !== undefined && q.options[selectedIdx]?.isCorrect) {
        score++;
      }
    });
    return score;
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    const score = calculateScore();
    if (score >= Math.ceil(totalQuestions * 0.75)) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback gracefully if canvas-confetti is unavailable
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-purple-950/40 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Self-Assessment</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Module 1 Knowledge Check
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Test your understanding of General-to-Specific Ordering and Version Spaces.
          </p>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="text-slate-400">Progress: </span>
          <span className="font-bold text-indigo-400 text-sm">
            {answeredCount} / {totalQuestions} Answered
          </span>
        </div>
      </div>

      {/* Results Score Banner if Finished */}
      {showResults && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Assessment Complete
              </div>
              <h2 className="text-2xl font-black text-white">
                Score: {score} / {totalQuestions} ({percentage}%)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {percentage >= 80
                  ? 'Outstanding! You have mastered the Candidate Elimination concept learning fundamentals.'
                  : percentage >= 50
                  ? 'Good work! Review the explanations below to refine your understanding of boundaries.'
                  : 'Keep learning! Check the Fundamentals guide to review boundary specialization and generalization.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRetake}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onOpenFundamentals}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Review Theory</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const selectedOptionIdx = selectedAnswers[q.id];
          const isAnswered = selectedOptionIdx !== undefined;

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    Q{qIndex + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {q.question}
                  </h3>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedOptionIdx === optIdx;
                  let optStyle =
                    'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300';

                  if (showResults) {
                    if (option.isCorrect) {
                      optStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-semibold';
                    } else if (isSelected && !option.isCorrect) {
                      optStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="font-mono text-slate-500 text-[11px] mt-0.5">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1">{option.text}</span>

                      {showResults && option.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      {showResults && isSelected && !option.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note after submitting or selecting */}
              {showResults && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-white">Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Button */}
      {!showResults && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {answeredCount === totalQuestions
              ? 'All questions answered! Ready to grade.'
              : `${totalQuestions - answeredCount} question(s) remaining`}
          </span>

          <button
            onClick={handleFinishQuiz}
            disabled={answeredCount === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
              answeredCount > 0
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <span>Submit Quiz & View Score</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

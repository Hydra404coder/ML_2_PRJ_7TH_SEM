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
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback
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
    <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-xl border theme-border theme-surface shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Interactive Self-Assessment</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight theme-text-primary">
            Module 1 Knowledge Check
          </h1>
          <p className="text-xs theme-text-muted mt-0.5">
            Test your understanding of General-to-Specific Ordering and Version Space Mechanics.
          </p>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="theme-text-muted">Progress: </span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {answeredCount} / {totalQuestions} Answered
          </span>
        </div>
      </div>

      {/* Score Banner if finished */}
      {showResults && (
        <div className="p-5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-base">
              {percentage}%
            </div>
            <div>
              <div className="text-xs font-semibold theme-text-muted uppercase tracking-wider">
                Evaluation Complete
              </div>
              <h2 className="text-lg font-bold theme-text-primary">
                Score: {score} of {totalQuestions} Correct
              </h2>
              <p className="text-xs theme-text-secondary mt-0.5">
                {percentage >= 80
                  ? 'Strong mastery of Candidate Elimination, S/G boundaries, and version spaces.'
                  : percentage >= 50
                  ? 'Good foundation! Review the explanations below to clarify boundary specialization.'
                  : 'Review the Theory Notes to reinforce how positive and negative examples prune hypotheses.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRetake}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold theme-surface border theme-border hover:theme-surface-subtle theme-text-secondary transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onOpenFundamentals}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Review Theory</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const selectedOptionIdx = selectedAnswers[q.id];

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border theme-border theme-surface shadow-subtle space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border theme-border theme-surface-subtle theme-text-muted">
                  Q{qIndex + 1}
                </span>
                <h3 className="text-xs sm:text-sm font-bold theme-text-primary leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-1.5">
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedOptionIdx === optIdx;
                  let optStyle =
                    'theme-surface border theme-border hover:theme-surface-subtle theme-text-secondary';

                  if (showResults) {
                    if (option.isCorrect) {
                      optStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (isSelected && !option.isCorrect) {
                      optStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-blue-200 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${optStyle}`}
                    >
                      <span className="font-mono theme-text-muted text-[11px] mt-0.5">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1">{option.text}</span>

                      {showResults && option.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      {showResults && isSelected && !option.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Note */}
              {showResults && (
                <div className="p-3 rounded-lg theme-surface-subtle border theme-border text-xs theme-text-secondary flex items-start gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="theme-text-primary">Reasoning: </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResults && (
        <div className="p-4 rounded-xl border theme-border theme-surface flex items-center justify-between">
          <span className="text-xs theme-text-muted">
            {answeredCount === totalQuestions
              ? 'All 8 questions answered.'
              : `${totalQuestions - answeredCount} question(s) left to answer`}
          </span>

          <button
            onClick={handleFinishQuiz}
            disabled={answeredCount === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              answeredCount > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                : 'theme-surface-subtle theme-text-muted border theme-border cursor-not-allowed'
            }`}
          >
            <span>Grade Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

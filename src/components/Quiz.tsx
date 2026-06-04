'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/lib/types';

interface QuizProps {
  questions: QuizQuestion[];
  chapterId: string;
}

export default function Quiz({ questions, chapterId }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const score = questions.filter(q => answers[q.id] === q.correctIndex).length;
  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="bg-[#1e1e2e] rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 bg-[#16162a] border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" />
          </svg>
          <h3 className="font-semibold text-white">Knowledge Check</h3>
          {showResults && (
            <span className="text-sm text-slate-400">
              ({score}/{questions.length} correct)
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                allAnswered
                  ? 'bg-[#326CE5] text-white hover:bg-[#2957C4]'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
            >
              Retry
            </button>
          )}
        </div>
      </div>
      <div className="p-6 space-y-6">
        {questions.map((q, qIdx) => {
          const selectedIdx = answers[q.id];
          const isCorrect = selectedIdx === q.correctIndex;
          const showExplanation = showResults && selectedIdx !== undefined;

          return (
            <div key={q.id} className="space-y-3">
              <p className="text-white font-medium">
                {qIdx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, oIdx) => {
                  let optionStyle = 'bg-[#252538] border-slate-600 hover:border-slate-500 text-slate-300';
                  
                  if (showResults) {
                    if (oIdx === q.correctIndex) {
                      optionStyle = 'bg-green-900/30 border-green-500 text-green-300';
                    } else if (oIdx === selectedIdx && !isCorrect) {
                      optionStyle = 'bg-red-900/30 border-red-500 text-red-300';
                    } else {
                      optionStyle = 'bg-[#252538] border-slate-600 text-slate-500';
                    }
                  } else if (selectedIdx === oIdx) {
                    optionStyle = 'bg-[#326CE5]/20 border-[#326CE5] text-white';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition ${optionStyle}`}
                    >
                      <span className="text-sm">{option}</span>
                    </button>
                  );
                })}
              </div>
              {showExplanation && (
                <div className={`p-3 rounded-lg text-sm ${
                  isCorrect ? 'bg-green-900/20 text-green-300 border border-green-800' : 'bg-red-900/20 text-red-300 border border-red-800'
                }`}>
                  <span className="font-medium">{isCorrect ? '✓ Correct! ' : '✗ Not quite. '}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

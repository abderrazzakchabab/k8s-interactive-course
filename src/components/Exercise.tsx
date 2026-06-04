'use client';

import { useState } from 'react';
import { Exercise as ExerciseType } from '@/lib/types';

interface ExerciseProps {
  exercise: ExerciseType;
  chapterId: string;
}

export default function Exercise({ exercise, chapterId }: ExerciseProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ pass: boolean; output: string } | null>(null);

  const handleVerify = async () => {
    if (!exercise.verificationCommand) return;
    setVerifying(true);
    setVerifyResult(null);
    try {
      const res = await fetch('/api/terminal/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: exercise.verificationCommand }),
      });
      const data = await res.json();
      const output = (data.output || data.stdout || '') as string;

      let pass = false;
      if (exercise.expectedOutput) {
        try {
          const re = new RegExp(exercise.expectedOutput, 'i');
          pass = re.test(output);
        } catch {
          pass = output.includes(exercise.expectedOutput);
        }
      } else {
        pass = output.trim().length > 0 && !data.stderr;
      }

      setVerifyResult({ pass, output: output || data.stderr || '(no output)' });
      if (pass) setCompleted(true);
    } catch {
      setVerifyResult({ pass: false, output: 'Connection error' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className={`bg-[#1e1e2e] rounded-xl border overflow-hidden transition ${
      completed ? 'border-green-700' : 'border-slate-700'
    }`}>
      <div className="px-6 py-4 bg-[#16162a] border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className={`w-5 h-5 ${completed ? 'text-green-400' : 'text-[#F77F00]'}`} fill="currentColor" viewBox="0 0 20 20">
            {completed ? (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            )}
          </svg>
          <h3 className="font-semibold text-white">{exercise.title}</h3>
          {completed && <span className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded">Done</span>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
          >
            {showHint ? 'Hide Hint' : 'Hint'}
          </button>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
          >
            {showSolution ? 'Hide Solution' : 'Solution'}
          </button>
          <button
            onClick={() => setCompleted(!completed)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              completed
                ? 'bg-slate-700 text-slate-400'
                : 'bg-green-700 text-white hover:bg-green-600'
            }`}
          >
            {completed ? 'Undo' : '✓ Done'}
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-slate-300 text-sm">{exercise.description}</p>

        <div className="bg-[#0f172a] rounded-lg p-4 border border-slate-700">
          <p className="text-white text-sm font-medium mb-2">📋 Instruction:</p>
          <p className="text-slate-300 text-sm">{exercise.instruction}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`/terminal?cmd=${encodeURIComponent(exercise.initialCommand || '')}&exercise=${exercise.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#326CE5] text-white rounded-lg text-sm font-medium hover:bg-[#2957C4] transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Open Terminal & Try
          </a>
          {exercise.verificationCommand && (
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition disabled:opacity-50"
            >
              {verifying ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verify on Cluster
                </>
              )}
            </button>
          )}
        </div>

        {verifyResult && (
          <div className={`rounded-lg p-4 border ${
            verifyResult.pass
              ? 'bg-emerald-900/20 border-emerald-700'
              : 'bg-red-900/20 border-red-700'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              {verifyResult.pass ? (
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className={`text-sm font-medium ${verifyResult.pass ? 'text-emerald-300' : 'text-red-300'}`}>
                {verifyResult.pass ? '✓ Correct! The cluster matches the expected state.' : '✗ Not quite. Keep trying!'}
              </span>
            </div>
            <pre className="text-xs text-slate-400 mt-1 font-mono whitespace-pre-wrap">{verifyResult.output}</pre>
          </div>
        )}

        {showHint && (
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
            <p className="text-yellow-300 text-sm font-medium mb-1">💡 Hint:</p>
            <code className="text-yellow-200 text-sm">{exercise.hint}</code>
          </div>
        )}

        {showSolution && (
          <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-4">
            <p className="text-emerald-300 text-sm font-medium mb-2">✅ Solution:</p>
            <pre className="text-emerald-200 text-sm font-mono whitespace-pre-wrap">{exercise.solution}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

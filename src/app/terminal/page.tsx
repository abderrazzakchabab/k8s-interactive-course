'use client';

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Terminal from '@/components/Terminal';
import { useSearchParams } from 'next/navigation';
import { chapters } from '@/lib/chapters';

function TerminalContent() {
  const searchParams = useSearchParams();
  const initialCmd = searchParams.get('cmd') || '';
  const exerciseId = searchParams.get('exercise') || '';

  const exercise = exerciseId
    ? chapters.flatMap(ch => ch.exercises).find(ex => ex.id === exerciseId)
    : null;

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Kubernetes Terminal</h1>
          <p className="text-slate-400">Run kubectl commands in your browser</p>
        </div>

        {exercise && (
          <div className="mb-6 bg-[#1e1e2e] rounded-xl border border-[#F77F00]/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#F77F00]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <h3 className="font-medium text-white">Exercise: {exercise.title}</h3>
            </div>
            <p className="text-sm text-slate-400 mb-2">{exercise.description}</p>
            <p className="text-sm text-slate-300"><strong>Instruction:</strong> {exercise.instruction}</p>
            <details className="mt-2">
              <summary className="text-sm text-[#60a5fa] cursor-pointer hover:text-[#326CE5]">Show Hint</summary>
              <code className="block mt-2 text-sm text-yellow-300 bg-yellow-900/20 p-2 rounded">{exercise.hint}</code>
            </details>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Terminal initialCommand={initialCmd} height="500px" />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#1e1e2e] rounded-xl border border-slate-700 p-4">
              <h3 className="font-semibold text-white text-sm mb-3">Quick Commands</h3>
              <div className="space-y-2">
                {[
                  { cmd: 'kubectl get nodes', desc: 'List nodes' },
                  { cmd: 'kubectl get pods', desc: 'List pods' },
                  { cmd: 'kubectl get services', desc: 'List services' },
                  { cmd: 'kubectl get deployments', desc: 'List deployments' },
                  { cmd: 'kubectl cluster-info', desc: 'Cluster info' },
                ].map((item) => (
                  <button
                    key={item.cmd}
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('terminal-execute', { detail: { command: item.cmd } }));
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-xs"
                  >
                    <code className="text-[#60a5fa] block">{item.cmd}</code>
                    <span className="text-slate-400 text-xs">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700">
                <h3 className="font-semibold text-white text-sm mb-2">Useful Links</h3>
                <a
                  href="https://kubernetes.io/docs/reference/kubectl/cheatsheet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-[#60a5fa] hover:text-[#326CE5] transition"
                >
                  📋 kubectl Cheat Sheet
                </a>
                <a
                  href="https://kubernetes.io/docs/tutorials/kubernetes-basics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-[#60a5fa] hover:text-[#326CE5] transition mt-1"
                >
                  📚 Official K8s Tutorials
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TerminalPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
        <div className="animate-spin w-8 h-8 border-2 border-[#326CE5] border-t-transparent rounded-full" />
      </div>
    }>
      <TerminalContent />
    </Suspense>
  );
}

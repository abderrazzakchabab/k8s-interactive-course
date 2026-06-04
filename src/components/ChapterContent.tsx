'use client';

import { Chapter } from '@/lib/types';
import Quiz from './Quiz';
import Exercise from './Exercise';
import Diagram from './Diagram';

interface ChapterContentProps {
  chapter: Chapter;
}

export default function ChapterContent({ chapter }: ChapterContentProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Chapter Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-10 h-10 bg-[#326CE5] rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {chapter.number}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">{chapter.title}</h1>
            <p className="text-slate-400">{chapter.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {chapter.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {chapter.quiz.length} questions
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {chapter.exercises.length} exercises
          </span>
        </div>
      </div>

      {/* Chapter Sections */}
      <div className="space-y-8 mb-12">
        {chapter.sections.map((section, idx) => (
          <div key={idx} className="bg-[#1e1e2e] rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 bg-[#16162a] border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            </div>
            <div className="p-6">
              <div className="prose prose-invert max-w-none prose-slate">
                {section.content.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={i} className="text-white font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>;
                  }
                  if (line.startsWith('- **')) {
                    const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
                    if (match) {
                      return <li key={i} className="text-slate-300 ml-4"><strong className="text-white">{match[1]}</strong>: {match[2]}</li>;
                    }
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} className="text-slate-300 ml-4">{line.slice(2)}</li>;
                  }
                  if (line.startsWith('| ')) {
                    return <span key={i} className="text-slate-300 font-mono text-xs">{line}{'\n'}</span>;
                  }
                  if (line.trim() === '') {
                    return <br key={i} />;
                  }
                  return <p key={i} className="text-slate-300 mb-2">{line}</p>;
                })}
              </div>
              
              {section.diagramId && (
                <Diagram diagramId={section.diagramId} />
              )}
              
              {section.codeExample && (
                <div className="mt-4 bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700">
                  <div className="px-4 py-2 bg-[#161b22] border-b border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-400">📄 Example</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(section.codeExample || '')}
                      className="text-xs text-slate-500 hover:text-slate-300 transition"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                    <code>{section.codeExample}</code>
                  </pre>
                  <div className="px-4 py-2 bg-[#161b22] border-t border-slate-700">
                    <a
                      href={`/terminal?cmd=${encodeURIComponent(section.codeExample.split('\n')[0])}`}
                      className="text-xs text-[#326CE5] hover:text-[#60a5fa] transition flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Try it in Terminal
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Exercises Section */}
      {chapter.exercises.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-[#F77F00]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Practice Exercises
          </h2>
          <div className="space-y-4">
            {chapter.exercises.map((ex) => (
              <Exercise key={ex.id} exercise={ex} chapterId={chapter.id} />
            ))}
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {chapter.quiz.length > 0 && (
        <div className="mb-8">
          <Quiz questions={chapter.quiz} chapterId={chapter.id} />
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-between items-center py-6 border-t border-slate-700">
        <div />
        <div className="flex gap-3">
          <a
            href="/terminal"
            className="px-4 py-2 bg-[#326CE5] text-white rounded-lg text-sm font-medium hover:bg-[#2957C4] transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Open Terminal
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Chapter } from '@/lib/types';
import Quiz from './Quiz';
import Exercise from './Exercise';
import Diagram from './Diagram';
import MarkdownRenderer from './MarkdownRenderer';

interface ChapterContentProps {
  chapter: Chapter;
}

function detectCodeLang(code: string): string {
  const trimmed = code.trimStart();
  if (trimmed.startsWith('apiVersion:') || trimmed.startsWith('kind:') || trimmed.startsWith('metadata:') || /^\s*(spec|selector|template):/.test(trimmed)) return 'yaml';
  if (trimmed.startsWith('kubectl') || trimmed.startsWith('docker') || trimmed.startsWith('curl') || trimmed.startsWith('helm')) return 'bash';
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  return '';
}

// ── Syntax-highlighted code example block ──

// Key/value colour map for YAML rendering
const YAML_COLORS: Record<string, string> = {
  key: '#79c0ff',       // blue
  string: '#a5d6ff',    // light blue
  boolean: '#d2a8ff',   // purple
  number: '#79c0ff',    // blue
  null: '#f97583',      // red
  comment: '#8b949e',   // grey
  punctuation: '#484f58', // dim grey
  directive: '#58a6ff',  // bright blue
  listMarker: '#f0883e', // orange
  command: '#f0883e',    // orange
  flag: '#79c0ff',       // blue
  variable: '#d2a8ff',   // purple
  operator: '#484f58',   // dim
};

function highlightLine(line: string, lang: string): string {
  const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  if (lang === 'yaml') {
    if (/^\s*#/.test(line)) return `<span style="color:${YAML_COLORS.comment}">${esc(line)}</span>`;
    if (/^---/.test(line)) return `<span style="color:${YAML_COLORS.directive};font-weight:600">${esc(line)}</span>`;

    const kv = line.match(/^(\s*)([\w.-]+)(\s*:\s*)(.*)$/);
    if (kv) {
      const [, indent, key, sep, val] = kv;
      let styledVal = esc(val);
      const tv = val.trim();
      if (/^["'].*["']$/.test(tv)) styledVal = `<span style="color:${YAML_COLORS.string}">${esc(val)}</span>`;
      else if (/^(true|false|yes|no)$/i.test(tv)) styledVal = `<span style="color:${YAML_COLORS.boolean}">${esc(val)}</span>`;
      else if (/^\d+(\.\d+)?$/.test(tv)) styledVal = `<span style="color:${YAML_COLORS.number}">${esc(val)}</span>`;
      else if (/^(null|~)$/i.test(tv)) styledVal = `<span style="color:${YAML_COLORS.null}">${esc(val)}</span>`;
      return `${esc(indent)}<span style="color:${YAML_COLORS.key}">${esc(key)}</span><span style="color:${YAML_COLORS.punctuation}">${esc(sep)}</span>${styledVal}`;
    }

    const li = line.match(/^(\s*-\s+)(.*)$/);
    if (li) return `${esc(li[1])}<span style="color:${YAML_COLORS.listMarker}">${esc(li[2])}</span>`;

    return esc(line);
  }

  if (lang === 'bash') {
    if (/^\s*#/.test(line)) return `<span style="color:${YAML_COLORS.comment}">${esc(line)}</span>`;
    const cmd = line.match(/^(\s*)(kubectl|docker|curl|wget|cat|echo|ls|cd|mkdir|rm|cp|mv|git|npm|npx|node|python|helm|k)(\s+.*)$/);
    if (cmd) {
      return `${esc(cmd[1])}<span style="color:${YAML_COLORS.command};font-weight:500">${esc(cmd[2])}</span>${highlightBashArgs(cmd[3], esc)}`;
    }
    return esc(line);
  }

  if (lang === 'json') {
    return esc(line)
      .replace(/"([^"]+)"\s*:/g, `<span style="color:${YAML_COLORS.key}">"$1"</span><span style="color:${YAML_COLORS.punctuation}">:</span>`)
      .replace(/:\s*"([^"]*)"/g, `: <span style="color:${YAML_COLORS.string}">"$1"</span>`)
      .replace(/:\s*(\d+\.?\d*)/g, `: <span style="color:${YAML_COLORS.number}">$1</span>`)
      .replace(/:\s*(true|false|null)/g, `: <span style="color:${YAML_COLORS.boolean}">$1</span>`);
  }

  return esc(line);
}

function highlightBashArgs(rest: string, esc: (s: string) => string): string {
  return rest
    .replace(/(--[\w-]+|-\w+)/g, `<span style="color:${YAML_COLORS.flag}">$1</span>`)
    .replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, `<span style="color:${YAML_COLORS.string}">$1</span>`)
    .replace(/\$\{?\w+\}?/g, `<span style="color:${YAML_COLORS.variable}">$&</span>`);
}

function CodeExampleWithHighlight({ code }: { code: string }) {
  const lang = detectCodeLang(code);
  const lines = code.split('\n');
  const firstCmd = code.trim().split('\n')[0] || '';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700">
      <div className="px-4 py-2 bg-[#161b22] border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">{lang || 'bash'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="text-xs text-slate-500 hover:text-slate-300 transition">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="p-4 text-sm overflow-x-auto leading-relaxed">
        <code className="block font-mono">
          {lines.map((line, li) => (
            <span
              key={li}
              className="block hover:bg-white/[0.02]"
              dangerouslySetInnerHTML={{ __html: highlightLine(line, lang) }}
            />
          ))}
        </code>
      </pre>
      <div className="px-4 py-2 bg-[#161b22] border-t border-slate-700 flex items-center gap-3">
        <a
          href={`/terminal?cmd=${encodeURIComponent(firstCmd)}`}
          className="text-xs text-[#326CE5] hover:text-[#60a5fa] transition flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Try it in Terminal
        </a>
      </div>
    </div>
  );
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
              {/* Inline content with proper markdown + YAML rendering */}
              <div className="max-w-none">
                <MarkdownRenderer content={section.content} />
              </div>

              {section.diagramId && (
                <Diagram diagramId={section.diagramId} />
              )}

              {/* Code Example with syntax highlighting */}
              {section.codeExample && (
                <CodeExampleWithHighlight code={section.codeExample} />
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

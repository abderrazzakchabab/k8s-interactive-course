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

// ── Syntax-highlighted code example block ──

const C2 = {
  key:      '#7ee3f8', // cyan
  str:      '#98c379', // green
  val:      '#e6edf3', // white (unquoted YAML values)
  bool:     '#d2a8ff', // purple
  num:      '#f5a623', // amber
  comment:  '#636d83', // dim grey
  punct:    '#636d83', // dim grey for colons, dashes
  list:     '#f0883e', // orange for list markers
  cmd:      '#f0883e', // orange for commands
  flag:     '#7ee3f8', // cyan for flags
  var:      '#d2a8ff', // purple for variables
};

const hlCommands = new Set([
  'kubectl', 'docker', 'docker-compose', 'helm', 'curl', 'wget',
  'cat', 'echo', 'ls', 'cd', 'mkdir', 'rm', 'cp', 'mv', 'chmod', 'chown',
  'git', 'npm', 'npx', 'node', 'python', 'python3', 'go', 'cargo',
  'grep', 'sed', 'awk', 'sort', 'uniq', 'wc', 'head', 'tail',
  'k', 'minikube', 'kind', 'terraform', 'ansible', 'env', 'which', 'ps',
]);

function esc2(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sp2(color: string, text: string): string {
  if (!text || text.startsWith('<span')) return text;
  return '<span style="color:' + color + '">' + text + '</span>';
}

function hlYamlLine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('#')) return sp2(C2.comment, esc2(line));
  if (trimmed === '---') return '<span style="color:' + C2.comment + '">' + esc2(line) + '</span>';

  const indent = line.match(/^(\s*)/)![1];
  const content = line.slice(indent.length);

  // List item: "- key: value" or "- value"
  if (/^-\s/.test(content)) {
    const rest = content.slice(2);
    const kv = rest.match(/^([\w.-]+)(\s*:\s*)(.*)$/);
    if (kv) {
      return esc2(indent) + sp2(C2.list, '- ') + sp2(C2.key, esc2(kv[1])) + sp2(C2.punct, esc2(kv[2])) + hlYamlVal2(kv[3]);
    }
    return esc2(indent) + sp2(C2.list, '- ') + sp2(C2.val, esc2(rest));
  }

  // Key: value
  const kv = content.match(/^([\w.-]+)(\s*:\s*)(.*)$/);
  if (kv) {
    return esc2(indent) + sp2(C2.key, esc2(kv[1])) + sp2(C2.punct, esc2(kv[2])) + hlYamlVal2(kv[3]);
  }

  if (/^[|>]\s*$/.test(trimmed)) return sp2(C2.punct, esc2(line));
  return esc2(line);
}

function hlYamlVal2(val: string): string {
  const trimmed = val.trim();
  if (!trimmed) return esc2(val);
  const leading = val.slice(0, val.length - val.trimStart().length);
  const trailing = val.slice(val.trimEnd().length);
  const inner = trimmed;

  let colored: string;
  if (/^["'].*["']$/.test(inner)) colored = sp2(C2.str, esc2(inner));
  else if (/^(true|false|yes|no|on|off)$/i.test(inner)) colored = sp2(C2.bool, esc2(inner));
  else if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(inner)) colored = sp2(C2.num, esc2(inner));
  else if (/^(null|Null|NULL|~)$/.test(inner)) colored = sp2(C2.bool, esc2(inner));
  else if (inner.length > 0) colored = sp2(C2.val, esc2(inner));
  else colored = esc2(inner);

  return esc2(leading) + colored + esc2(trailing);
}

function hlBashLine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('#')) return sp2(C2.comment, esc2(line));

  const cmdMatch = line.match(/^(\s*)([\w][\w-]*)((?:\s|$).*)?$/);
  if (cmdMatch && hlCommands.has(cmdMatch[2])) {
    const ind = cmdMatch[1];
    const cmd = cmdMatch[2];
    const rest = cmdMatch[3] || '';
    return esc2(ind) + sp2(C2.cmd, esc2(cmd)) + hlArgs2(rest);
  }
  return esc2(line);
}

function hlArgs2(args: string): string {
  let r = esc2(args);
  r = r.replace(/(\s|^)(--[\w-]+|-\w+)(?=\s|$)/g, (m: string, ws: string, flag: string) => ws + '<span style="color:' + C2.flag + '">' + flag + '</span>');
  r = r.replace(/"([^"\\]|\\.)*"/g, '<span style="color:' + C2.str + '">$&</span>');
  r = r.replace(/'([^'\\]|\\.)*'/g, '<span style="color:' + C2.str + '">$&</span>');
  r = r.replace(/\$\{?\w+\}?/g, '<span style="color:' + C2.var + '">$&</span>');
  return r;
}

function hlJsonLine(line: string): string {
  let r = esc2(line);
  r = r.replace(/"([^"]+)"\s*:/g, '<span style="color:' + C2.key + '">"$1"</span><span style="color:' + C2.punct + '">:</span>');
  r = r.replace(/:\s*"([^"]*)"/g, ': <span style="color:' + C2.str + '">"$1"</span>');
  r = r.replace(/:\s*(-?\d+(\.\d+)?([eE][+-]?\d+)?)/g, ': <span style="color:' + C2.num + '">$1</span>');
  r = r.replace(/:\s*(true|false|null)\b/g, ': <span style="color:' + C2.bool + '">$1</span>');
  return r;
}

function detectCodeLang2(code: string): string {
  const trimmed = code.trimStart();
  if (trimmed.startsWith('apiVersion:') || trimmed.startsWith('kind:') || trimmed.startsWith('metadata:') || /^\s*(spec|selector|template):/.test(trimmed)) return 'yaml';
  if (trimmed.startsWith('kubectl') || trimmed.startsWith('docker') || trimmed.startsWith('curl')) return 'bash';
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  return '';
}

function codeHighlightLine(line: string, lang: string): string {
  if (lang === 'yaml' || lang === 'yml') return hlYamlLine(line);
  if (lang === 'bash' || lang === 'sh' || lang === 'shell') return hlBashLine(line);
  if (lang === 'json') return hlJsonLine(line);
  return esc2(line);
}

function CodeExampleWithHighlight({ code }: { code: string }) {
  const lang = detectCodeLang2(code);
  const lines = code.split('\n');
  const firstCmd = code.trim().split('\n')[0] || '';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mt-4 bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700">
      <div className="px-4 py-2 bg-[#161b22] border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">{lang || 'bash'}</span>
        </div>
        <button onClick={handleCopy} className="text-xs text-slate-500 hover:text-slate-300 transition font-mono">
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto leading-relaxed">
        <code className="block font-mono">
          {lines.map((line, li) => (
            <span
              key={li}
              className="block hover:bg-white/[0.02] whitespace-pre"
              dangerouslySetInnerHTML={{ __html: codeHighlightLine(line, lang) || ' ' }}
            />
          ))}
        </code>
      </pre>
      <div className="px-4 py-2 bg-[#161b22] border-t border-slate-700">
        <a
          href={'/terminal?cmd=' + encodeURIComponent(firstCmd)}
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

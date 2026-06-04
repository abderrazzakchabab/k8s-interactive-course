'use client';

import React, { useState } from 'react';

// ═══════════════════════════════════════════
// MarkdownRenderer - parses markdown into blocks
// ═══════════════════════════════════════════

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseBlocks(content);
  return <>{blocks.map((block, i) => renderBlock(block, i))}</>;
}

type ContentBlock =
  | { type: 'code'; lang: string; code: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; lines: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'list'; items: string[] }
  | { type: 'empty' };

function parseBlocks(content: string): ContentBlock[] {
  const lines = content.split('\n');
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^```(\w*)$/.test(line)) {
      const lang = line.match(/^```(\w*)$/)![1];
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#{1,3})\s/)![1].length;
      blocks.push({ type: 'heading', level, text: line.replace(/^#{1,3}\s+/, '') });
      i++;
      continue;
    }

    if (line.trim() === '') {
      if (blocks.length > 0 && blocks[blocks.length - 1].type !== 'empty') {
        blocks.push({ type: 'empty' });
      }
      i++;
      continue;
    }

    if (line.trimStart().startsWith('|') && line.includes('|')) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trimStart().startsWith('|') && lines[i].includes('|')) {
        const cells = lines[i].split('|').filter(c => {
          const t = c.trim();
          return t !== '' && t !== '---' && t !== ':---' && t !== '---:' && t !== ':---:';
        }).map(c => c.trim());
        if (cells.length > 0) tableRows.push(cells);
        i++;
      }
      blocks.push({ type: 'table', rows: tableRows });
      continue;
    }

    if (/^[-*]\s/.test(line.trimStart())) {
      const items: string[] = [line.replace(/^[-*]\s+/, '')];
      i++;
      while (i < lines.length && /^[-*]\s/.test(lines[i].trimStart())) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    const paraLines: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,3}\s|```|[-*]\s|\|)/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'paragraph', lines: paraLines });
  }
  return blocks;
}

function renderBlock(block: ContentBlock, key: number) {
  switch (block.type) {
    case 'code':    return <CodeBlock key={key} lang={block.lang} code={block.code} />;
    case 'heading': return <Heading key={key} level={block.level} text={block.text} />;
    case 'paragraph': return <Paragraph key={key} lines={block.lines} />;
    case 'list':    return <ListBlock key={key} items={block.items} />;
    case 'table':   return <TableBlock key={key} rows={block.rows} />;
    case 'empty':   return <div key={key} className="h-3" />;
  }
}

// ── Heading ──
function Heading({ level, text }: { level: number; text: string }) {
  const sizes = ['text-xl font-bold', 'text-lg font-semibold', 'text-base font-semibold'];
  const cls = `text-white mt-5 mb-3 ${sizes[level - 1] || 'text-sm font-semibold'}`;
  return <div className={cls}>{renderInline(text)}</div>;
}

// ── Paragraph ──
function Paragraph({ lines }: { lines: string[] }) {
  return (
    <p className="text-slate-300 mb-3 leading-relaxed">
      {lines.map((ln, i) => (
        <span key={i}>
          {renderInline(ln)}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

// ── List ──
function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
      {items.map((item, i) => (
        <li key={i} className="text-slate-300 text-sm">{renderInline(item)}</li>
      ))}
    </ul>
  );
}

// ── Table ──
function TableBlock({ rows }: { rows: string[][] }) {
  if (!rows.length) return null;
  const [header, ...body] = rows;
  return (
    <div className="overflow-x-auto mb-4 border border-slate-700 rounded-lg">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-800/50">
            {header.map((cell, ci) => (
              <th key={ci} className="px-4 py-2.5 text-left text-slate-200 font-semibold whitespace-nowrap border-b border-slate-700">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/20">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2 text-slate-300 whitespace-nowrap">{renderInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Code Block (component with hooks) ──
function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="my-4 bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700">
      <div className="px-4 py-2.5 bg-[#161b22] border-b border-slate-700 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500">{lang || 'text'}</span>
        <button onClick={handleCopy} className="text-xs text-slate-500 hover:text-slate-300 transition font-mono">
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto leading-6">
        <code className="block font-mono">
          {lines.map((line, i) => (
            <CodeLine key={i} line={line} lang={lang} />
          ))}
        </code>
      </pre>
    </div>
  );
}

function CodeLine({ line, lang }: { line: string; lang: string }) {
  const html = highlightLine(line, lang);
  return (
    <span className="block hover:bg-white/[0.02] whitespace-pre" dangerouslySetInnerHTML={{ __html: html || ' ' }} />
  );
}

// ═══════════════════════════════════════════
// Inline formatting
// ═══════════════════════════════════════════

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 bg-slate-800 text-[#e879f9] rounded text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// ═══════════════════════════════════════════
// YAML / Bash / JSON Syntax Highlighting
// ═══════════════════════════════════════════

const C = {
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

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sp(color: string, text: string): string {
  if (!text || text.startsWith('<span')) return text;
  return `<span style="color:${color}">${text}</span>`;
}

function highlightLine(line: string, lang: string): string {
  if (lang === 'yaml' || lang === 'yml') return hlYaml(line);
  if (lang === 'bash' || lang === 'sh' || lang === 'shell') return hlBash(line);
  if (lang === 'json') return hlJson(line);
  return esc(line);
}

// ── YAML ──

function hlYaml(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return '';

  // Comment
  if (trimmed.startsWith('#')) return sp(C.comment, esc(line));

  // Document separator
  if (trimmed === '---') return `<span style="color:${C.comment}">${esc(line)}</span>`;

  // Extract leading whitespace
  const indent = line.match(/^(\s*)/)![1];
  const content = line.slice(indent.length);

  // ── List item: "- key: value" or "- value" ──
  if (/^-\s/.test(content)) {
    const rest = content.slice(2); // after "- "
    // Check for "key: value" after the dash
    const kv = rest.match(/^([\w.-]+)(\s*:\s*)(.*)$/);
    if (kv) {
      return (
        esc(indent) +
        sp(C.list, '- ') +
        sp(C.key, esc(kv[1])) +
        sp(C.punct, esc(kv[2])) +
        hlYamlVal(kv[3])
      );
    }
    // Plain list item
    return esc(indent) + sp(C.list, '- ') + sp(C.val, esc(rest));
  }

  // ── Key: value ──
  const kv = content.match(/^([\w.-]+)(\s*:\s*)(.*)$/);
  if (kv) {
    return (
      esc(indent) +
      sp(C.key, esc(kv[1])) +
      sp(C.punct, esc(kv[2])) +
      hlYamlVal(kv[3])
    );
  }

  // Block scalar indicator
  if (/^[|>]\s*$/.test(trimmed)) return sp(C.punct, esc(line));

  return esc(line);
}

function hlYamlVal(val: string): string {
  const trimmed = val.trim();
  if (!trimmed) return esc(val);

  const leading = val.slice(0, val.length - val.trimStart().length);
  const trailing = val.slice(val.trimEnd().length);
  const inner = trimmed;

  let colored: string;

  if (/^["'].*["']$/.test(inner)) {
    colored = sp(C.str, esc(inner));
  } else if (/^(true|false|yes|no|on|off)$/i.test(inner)) {
    colored = sp(C.bool, esc(inner));
  } else if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(inner)) {
    colored = sp(C.num, esc(inner));
  } else if (/^(null|Null|NULL|~)$/.test(inner)) {
    colored = sp(C.bool, esc(inner));
  } else if (inner.length > 0) {
    // Anything else is an unquoted string
    colored = sp(C.val, esc(inner));
  } else {
    colored = esc(inner);
  }

  return esc(leading) + colored + esc(trailing);
}

// ── Bash ──

const COMMANDS = new Set([
  'kubectl', 'docker', 'docker-compose', 'helm', 'curl', 'wget',
  'cat', 'echo', 'ls', 'cd', 'mkdir', 'rm', 'cp', 'mv', 'chmod', 'chown',
  'git', 'npm', 'npx', 'node', 'python', 'python3', 'go', 'cargo',
  'grep', 'sed', 'awk', 'sort', 'uniq', 'wc', 'head', 'tail',
  'k', 'minikube', 'kind', 'terraform', 'ansible', 'env', 'which',
  'ps', 'top', 'htop', 'df', 'du', 'ping', 'ssh', 'scp', 'rsync',
]);

function hlBash(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('#')) return sp(C.comment, esc(line));

  const cmdMatch = line.match(/^(\s*)([\w][\w-]*)((?:\s|$).*)?$/);
  if (cmdMatch && COMMANDS.has(cmdMatch[2])) {
    const ind = cmdMatch[1];
    const cmd = cmdMatch[2];
    const rest = cmdMatch[3] || '';
    return esc(ind) + sp(C.cmd, esc(cmd)) + hlArgs(rest);
  }

  return esc(line);
}

function hlArgs(args: string): string {
  let r = esc(args);

  // Flags: --word or -x (but not part of a word)
  r = r.replace(/(\s|^)(--[\w-]+|-\w+)(?=\s|$)/g, (m, ws, flag) => ws + `<span style="color:${C.flag}">${flag}</span>`);

  // Quoted strings
  r = r.replace(/"([^"\\]|\\.)*"/g, `<span style="color:${C.str}">$&</span>`);
  r = r.replace(/'([^'\\]|\\.)*'/g, `<span style="color:${C.str}">$&</span>`);

  // Variables: $VAR, ${VAR}
  r = r.replace(/\$\{?\w+\}?/g, `<span style="color:${C.var}">$&</span>`);

  return r;
}

// ── JSON ──

function hlJson(line: string): string {
  let r = esc(line);

  // Keys
  r = r.replace(/"([^"]+)"\s*:/g, `<span style="color:${C.key}">"$1"</span><span style="color:${C.punct}">:</span>`);

  // String values
  r = r.replace(/:\s*"([^"]*)"/g, `: <span style="color:${C.str}">"$1"</span>`);

  // Numbers
  r = r.replace(/:\s*(-?\d+(\.\d+)?([eE][+-]?\d+)?)/g, `: <span style="color:${C.num}">$1</span>`);

  // Booleans / null
  r = r.replace(/:\s*(true|false|null)\b/g, `: <span style="color:${C.bool}">$1</span>`);

  return r;
}

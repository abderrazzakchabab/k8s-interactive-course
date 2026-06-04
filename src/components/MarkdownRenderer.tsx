'use client';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Converts markdown text to rendered JSX with YAML/Bash syntax highlighting.
 * Handles: fenced code blocks (```yaml, ```bash), inline code, bold, lists, tables, links.
 */
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

    // Fenced code block
    if (/^```(\w*)$/.test(line)) {
      const lang = line.match(/^```(\w*)$/)![1];
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    // Heading: starts with #
    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#{1,3})\s/)![1].length;
      const text = line.replace(/^#{1,3}\s+/, '');
      blocks.push({ type: 'heading', level, text });
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      blocks.push({ type: 'empty' });
      i++;
      continue;
    }

    // Table row: | col1 | col2 |
    if (line.trimStart().startsWith('|') && line.includes('|')) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trimStart().startsWith('|') && lines[i].includes('|')) {
        const cells = lines[i]
          .split('|')
          .filter(c => c.trim() !== '---' && c.trim() !== ':---' && c.trim() !== '---:' && c.trim() !== ':---:')
          .map(c => c.trim());
        if (cells.length > 0) {
          tableRows.push(cells);
        }
        i++;
      }
      blocks.push({ type: 'table', rows: tableRows });
      continue;
    }

    // Unordered list
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

    // Paragraph
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
    case 'code':
      return renderCodeBlock(block.lang, block.code, key);
    case 'heading':
      return renderHeading(block.level, block.text, key);
    case 'paragraph':
      return renderParagraph(block.lines, key);
    case 'list':
      return renderList(block.items, key);
    case 'table':
      return renderTable(block.rows, key);
    case 'empty':
      return <div key={key} className="h-3" />;
    default:
      return null;
  }
}

// ── Heading ──
function renderHeading(level: number, text: string, key: number) {
  const sizes = ['text-lg', 'text-base', 'text-sm'];
  const size = sizes[level - 1] || 'text-sm';
  const cls = `text-white font-semibold mt-5 mb-2 ${size}`;
  const inner = renderInline(text);
  switch (level) {
    case 1: return <h1 key={key} className={cls}>{inner}</h1>;
    case 2: return <h2 key={key} className={cls}>{inner}</h2>;
    case 3: return <h3 key={key} className={cls}>{inner}</h3>;
    default: return <h4 key={key} className={cls}>{inner}</h4>;
  }
}

// ── Paragraph with inline formatting ──
function renderParagraph(lines: string[], key: number) {
  if (lines.length === 1 && lines[0].trim() === '') return <div key={key} className="h-3" />;
  return (
    <p key={key} className="text-slate-300 mb-2 leading-relaxed">
      {lines.map((ln, li) => (
        <span key={li}>
          {renderInline(ln)}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

// ── List ──
function renderList(items: string[], key: number) {
  return (
    <ul key={key} className="list-disc list-inside space-y-1 mb-3 ml-1">
      {items.map((item, i) => (
        <li key={i} className="text-slate-300 text-sm">
          {renderInline(item)}
        </li>
      ))}
    </ul>
  );
}

// ── Table ──
function renderTable(rows: string[][], key: number) {
  if (rows.length === 0) return null;
  const [header, ...body] = rows;
  return (
    <div key={key} className="overflow-x-auto mb-3">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-600">
            {header.map((cell, ci) => (
              <th key={ci} className="px-3 py-2 text-left text-slate-200 font-semibold whitespace-nowrap">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className="border-b border-slate-700/50 hover:bg-slate-800/30">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-slate-300 whitespace-nowrap">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Code Block with Syntax Highlighting ──
function renderCodeBlock(lang: string, code: string, key: number) {
  const langLabel = lang || 'text';
  const highlighted = highlightCode(code, lang);

  return (
    <div key={key} className="my-4 bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700">
      <div className="px-4 py-2 bg-[#161b22] border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">{langLabel}</span>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs text-slate-500 hover:text-slate-300 transition"
        >
          Copy
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto leading-relaxed">
        <code className="block font-mono">
          {highlighted.split('\n').map((line, li) => (
            <span key={li} className="block hover:bg-white/[0.02]">
              {line || ' '}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

// ── Inline content ──
function renderInline(text: string) {
  // Parse bold + inline code mixed
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
    return part;
  });
}

// ── YAML / Bash / JSON Syntax Highlighter ──
function highlightCode(code: string, lang: string): string {
  switch (lang.toLowerCase()) {
    case 'yaml':
    case 'yml':
      return highlightYaml(code);
    case 'bash':
    case 'sh':
    case 'shell':
    case 'zsh':
      return highlightBash(code);
    case 'json':
      return highlightJson(code);
    default:
      return escapeHtml(code);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightYaml(code: string): string {
  return code.split('\n').map(line => {
    const escaped = escapeHtml(line);

    // Comment
    if (/^\s*#/.test(line)) {
      return `<span style="color:#8b949e">${escaped}</span>`;
    }

    // Document separator
    if (/^---/.test(line)) {
      return `<span style="color:#58a6ff;font-weight:bold">${escaped}</span>`;
    }

    // Key: value — highlight key
    const match = line.match(/^(\s*)([\w.-]+)(\s*:\s*)(.*)$/);
    if (match) {
      const indent = escapeHtml(match[1]);
      const key = escapeHtml(match[2]);
      const colon = escapeHtml(match[3]);
      const value = match[4];
      const highlightedValue = highlightYamlValue(value);
      return `${indent}<span style="color:#79c0ff">${key}</span>${colon}${highlightedValue}`;
    }

    // List item
    if (/^\s*-\s/.test(line)) {
      const listMatch = line.match(/^(\s*-\s+)(.*)$/);
      if (listMatch) {
        return `${escapeHtml(listMatch[1])}<span style="color:#f0883e">${escapeHtml(listMatch[2])}</span>`;
      }
    }

    return escaped;
  }).join('\n');
}

function highlightYamlValue(value: string): string {
  const trimmed = value.trim();

  // String with quotes
  if (/^["'].*["']$/.test(trimmed)) {
    return `<span style="color:#a5d6ff">${escapeHtml(value)}</span>`;
  }

  // Boolean
  if (/^(true|false|yes|no|on|off)$/i.test(trimmed)) {
    return `<span style="color:#d2a8ff">${escapeHtml(value)}</span>`;
  }

  // Number
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return `<span style="color:#79c0ff">${escapeHtml(value)}</span>`;
  }

  // Null
  if (/^(null|~)$/i.test(trimmed)) {
    return `<span style="color:#f97583">${escapeHtml(value)}</span>`;
  }

  // Multi-line indicator (| or >)
  if (/^\s*[|>]\s*$/.test(value)) {
    return `<span style="color:#d2a8ff">${escapeHtml(value)}</span>`;
  }

  return escapeHtml(value);
}

function highlightBash(code: string): string {
  return code.split('\n').map(line => {
    const escaped = escapeHtml(line);

    // Comment
    if (/^\s*#/.test(line)) {
      return `<span style="color:#8b949e">${escaped}</span>`;
    }

    // Command: kubectl, docker, curl, etc.
    if (/^\s*(kubectl|docker|curl|wget|cat|echo|ls|cd|mkdir|rm|cp|mv|git|npm|npx|node|python)/.test(line)) {
      return escaped.replace(
        /^(\s*)(kubectl|docker|curl|wget|cat|echo|ls|cd|mkdir|rm|cp|mv|git|npm|npx|node|python)(.*)$/,
        (_, indent, cmd, rest) => {
          return `${indent}<span style="color:#f0883e;font-weight:500">${cmd}</span>${highlightBashArgs(rest)}`;
        }
      );
    }

    // Variable assignment: VAR=value
    if (/^\s*[A-Z_]+=/.test(line)) {
      return escaped.replace(/^(\s*)([A-Z_]+)(=)(.*)$/,
        (_, indent, varName, eq, val) =>
          `${indent}<span style="color:#79c0ff">${varName}</span><span style="color:#484f58">${eq}</span><span style="color:#a5d6ff">${escapeHtml(val)}</span>`
      );
    }

    // Pipe at start
    if (/^\s*\|/.test(line)) {
      return `<span style="color:#484f58">│</span> ${escaped.slice(escaped.indexOf('|') + 1)}`;
    }

    return escaped;
  }).join('\n');
}

function highlightBashArgs(rest: string): string {
  // Highlight flags (--flag, -f)
  return rest.replace(/(--[\w-]+|-\w+)/g, '<span style="color:#79c0ff">$1</span>')
    // Highlight quoted strings
    .replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, '<span style="color:#a5d6ff">$1</span>')
    // Highlight variables
    .replace(/\$\{?\w+\}?/g, '<span style="color:#d2a8ff">$&</span>');
}

function highlightJson(code: string): string {
  return code.split('\n').map(line => {
    const escaped = escapeHtml(line);
    // Keys
    return escaped
      .replace(/"([^"]+)"\s*:/g, '<span style="color:#79c0ff">"$1"</span><span style="color:#484f58">:</span>')
      // String values
      .replace(/:\s*"([^"]*)"/g, ': <span style="color:#a5d6ff">"$1"</span>')
      // Numbers
      .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color:#79c0ff">$1</span>')
      // Booleans / null
      .replace(/:\s*(true|false|null)/g, ': <span style="color:#d2a8ff">$1</span>');
  }).join('\n');
}

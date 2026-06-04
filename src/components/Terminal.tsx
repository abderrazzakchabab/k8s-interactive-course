'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalProps {
  initialCommand?: string;
  height?: string;
  readOnly?: boolean;
}

export default function Terminal({ initialCommand, height = '400px', readOnly = false }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Fallback: Simple terminal UI using fetch to Docker API
  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;
    
    setOutput(prev => [...prev, `$ ${cmd}`]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    try {
      // Try to execute via Docker API
      const response = await fetch('/api/terminal/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const result = data.output || data.stdout || '';
        if (result) {
          setOutput(prev => [...prev, result]);
        }
        if (data.stderr) {
          setOutput(prev => [...prev, `\x1b[31m${data.stderr}\x1b[0m`]);
        }
      } else {
        setOutput(prev => [...prev, '\x1b[31mCommand execution failed\x1b[0m']);
      }
    } catch (err) {
      setOutput(prev => [...prev, `\x1b[31mConnection error. Running locally...\x1b[0m`]);
      // Fallback: Show the command for reference
      setOutput(prev => [...prev, `\x1b[33m[To run this command, use your local terminal]\x1b[0m`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  // Run initial command if provided
  useEffect(() => {
    if (initialCommand && commandHistory.length === 0) {
      executeCommand(initialCommand);
    }
  }, [initialCommand]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-[#0d1117] rounded-xl border border-slate-700 overflow-hidden font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-slate-400 ml-2">
            {isConnected ? '● Connected' : '○ Terminal'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOutput([])}
            className="text-xs text-slate-500 hover:text-slate-300 transition"
          >
            Clear
          </button>
          {!readOnly && (
            <span className="text-xs text-slate-500">kubectl</span>
          )}
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="p-4 overflow-y-auto"
        style={{ height, backgroundColor: '#0d1117' }}
        onClick={() => inputRef.current?.focus()}
      >
        {output.length === 0 && !readOnly && (
          <div className="text-slate-500 text-sm space-y-1 mb-4">
            <p>Welcome to the Kubernetes Learning Terminal!</p>
            <p>Type kubectl commands and press Enter to execute them.</p>
            <p className="text-xs text-slate-600">Note: Commands run in a simulated environment.</p>
          </div>
        )}
        {output.map((line, i) => (
          <div key={i} className="text-sm whitespace-pre-wrap">
            {line.startsWith('$ ') ? (
              <span>
                <span className="text-green-400">┌──(</span>
                <span className="text-[#326CE5]">k8s-learn</span>
                <span className="text-green-400">)-[~]\n└─$ </span>
                <span className="text-white">{line.slice(2)}</span>
              </span>
            ) : line.includes('\\x1b[31m') ? (
              <span className="text-red-400">
                {line.replace(/\\x1b\[31m|\\x1b\[0m/g, '')}
              </span>
            ) : line.includes('\\x1b[33m') ? (
              <span className="text-yellow-400">
                {line.replace(/\\x1b\[33m|\\x1b\[0m/g, '')}
              </span>
            ) : (
              <span className="text-slate-300">{line}</span>
            )}
          </div>
        ))}
        
        {!readOnly && (
          <div className="flex items-center mt-1">
            <span className="text-green-400 shrink-0">┌──(</span>
            <span className="text-[#326CE5] shrink-0">k8s-learn</span>
            <span className="text-green-400 shrink-0">)-[~]\n└─$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none border-none ml-1 text-sm"
              placeholder="type a command..."
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}

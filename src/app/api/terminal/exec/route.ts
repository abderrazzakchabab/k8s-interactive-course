import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

// Common kubectl installation paths
const KUBECTL_PATHS = [
  '/home/isc-cha/bin/kubectl',
  '/usr/local/bin/kubectl',
  '/usr/bin/kubectl',
  '/bin/kubectl',
  '/snap/bin/kubectl',
];

function findKubectl(): string {
  for (const p of KUBECTL_PATHS) {
    if (existsSync(p)) return p;
  }
  return 'kubectl'; // fallback — rely on PATH
}

const KUBECTL = findKubectl();

// Known commands that don't need the kubectl binary prepended
const SHELL_BUILTINS = new Set([
  'echo', 'cat', 'ls', 'pwd', 'cd', 'clear', 'which', 'env', 'ps', 'top',
  'help', 'whoami', 'id', 'date', 'uname', 'df', 'du', 'free',
]);

// Build a PATH that includes common kubectl locations
const EXEC_ENV = {
  ...process.env,
  PATH: [
    '/home/isc-cha/bin',
    '/usr/local/bin',
    '/usr/bin',
    '/bin',
    '/snap/bin',
    process.env.PATH || '',
  ].join(':'),
  HOME: process.env.HOME || '/root',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command } = body;

    if (!command || typeof command !== 'string') {
      return NextResponse.json({ error: 'No command provided' }, { status: 400 });
    }

    const trimmed = command.trim();

    // Security: block dangerous shell metacharacters and commands
    const dangerous = ['sudo', 'su ', 'passwd', 'mkfs', 'dd '];
    for (const bad of dangerous) {
      if (trimmed.startsWith(bad) || trimmed.includes(` ${bad}`)) {
        return NextResponse.json({
          output: '',
          stderr: `Command blocked: "${bad.trim()}" is not allowed in this environment.`,
        });
      }
    }

    // Rewrite the command: prepend full kubectl path if it's a kubectl command
    let finalCmd = trimmed;
    if (trimmed.startsWith('kubectl ') || trimmed === 'kubectl') {
      finalCmd = KUBECTL + trimmed.slice('kubectl'.length);
    } else if (trimmed.startsWith('k ') || trimmed === 'k') {
      finalCmd = KUBECTL + trimmed.slice('k'.length);
    }
    // else: pass through as-is (echo, ls, etc.)

    const result = await execAsync(finalCmd, {
      timeout: 15000,
      maxBuffer: 4 * 1024 * 1024, // 4MB
      env: EXEC_ENV,
      shell: '/bin/bash',
    });

    return NextResponse.json({
      output: result.stdout,
      stderr: result.stderr,
      exitCode: 0,
    });
  } catch (error: any) {
    if (error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') {
      return NextResponse.json({ output: '(output too large)', stderr: '' });
    }

    // If kubectl wasn't found, give a helpful message
    const isKubectlCmd = (error.cmd || '').includes(KUBECTL) || (error.cmd || '').includes('kubectl');
    const stderr = error.stderr || error.message || 'Command failed';

    if (isKubectlCmd && (stderr.includes('not found') || stderr.includes('No such file'))) {
      return NextResponse.json({
        output: '',
        stderr: 'kubectl is not installed or not in PATH.\nInstall it from: https://kubernetes.io/docs/tasks/tools/',
      });
    }

    return NextResponse.json({
      output: error.stdout || '',
      stderr,
      exitCode: error.code || 1,
    });
  }
}

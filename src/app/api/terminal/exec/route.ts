import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command } = body;

    if (!command || typeof command !== 'string') {
      return NextResponse.json({ error: 'No command provided' }, { status: 400 });
    }

    const allowedPrefixes = ['kubectl', 'k', 'echo', 'cat', 'ls', 'pwd', 'cd', 'help', 'clear', 'which', 'env', 'ps', 'top'];
    const cmd = command.trim();
    
    const isAllowed = allowedPrefixes.some(prefix => cmd.startsWith(prefix));
    
    if (!isAllowed) {
      return NextResponse.json({
        output: '',
        stderr: `Command not allowed: ${cmd}\nOnly kubectl and basic commands are permitted.`,
      });
    }

    const result = await execAsync(cmd, {
      timeout: 10000,
      maxBuffer: 1024 * 1024,
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
    
    return NextResponse.json({
      output: error.stdout || '',
      stderr: error.stderr || error.message || 'Command failed',
      exitCode: error.code || 1,
    });
  }
}

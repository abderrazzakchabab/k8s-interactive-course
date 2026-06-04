/**
 * Docker-based terminal execution
 * This provides a sandboxed environment for running kubectl commands.
 * The terminal container has kubectl pre-installed and can connect to minikube.
 */

export interface DockerExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

const TERMINAL_CONTAINER_NAME = 'k8s-learn-terminal';

export async function ensureTerminalContainer(): Promise<boolean> {
  try {
    // Check if container exists
    const { execSync } = require('child_process');
    
    try {
      execSync(`docker inspect ${TERMINAL_CONTAINER_NAME} 2>/dev/null`, { stdio: 'pipe' });
      return true; // Container exists
    } catch {
      // Create the terminal container
      execSync(
        `docker run -d --name ${TERMINAL_CONTAINER_NAME} ` +
        `--network host ` +
        `-v /home/isc-cha/.kube:/root/.kube:ro ` +
        `-v /var/run/docker.sock:/var/run/docker.sock ` +
        `bitnami/kubectl:latest tail -f /dev/null`,
        { stdio: 'pipe', timeout: 30000 }
      );
      return true;
    }
  } catch (err) {
    console.error('Failed to ensure terminal container:', err);
    return false;
  }
}

export async function execInContainer(command: string): Promise<DockerExecResult> {
  const { execSync } = require('child_process');
  
  try {
    const result = execSync(
      `docker exec ${TERMINAL_CONTAINER_NAME} sh -c ${JSON.stringify(command)}`,
      { stdio: 'pipe', timeout: 15000, maxBuffer: 1024 * 1024 }
    );
    
    return {
      stdout: result.stdout?.toString() || '',
      stderr: result.stderr?.toString() || '',
      exitCode: 0,
    };
  } catch (err: any) {
    return {
      stdout: err.stdout?.toString() || '',
      stderr: err.stderr?.toString() || err.message || 'Command failed',
      exitCode: err.status || 1,
    };
  }
}

export async function cleanupContainer(): Promise<void> {
  const { execSync } = require('child_process');
  try {
    execSync(`docker rm -f ${TERMINAL_CONTAINER_NAME} 2>/dev/null`, { stdio: 'pipe' });
  } catch {
    // Ignore cleanup errors
  }
}

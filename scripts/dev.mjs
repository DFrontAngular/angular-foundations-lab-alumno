import { spawn, spawnSync } from 'node:child_process';

const windows = process.platform === 'win32';
const npmCommand = windows ? 'npm.cmd' : 'npm';
const children = [
  spawn(npmCommand, ['run', 'api'], { stdio: 'inherit', shell: windows }),
  spawn(npmCommand, ['run', 'start'], { stdio: 'inherit', shell: windows }),
];

let closing = false;

function stopChild(child) {
  if (child.killed || child.exitCode !== null || child.pid === undefined) return;

  if (windows) {
    spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' });
    return;
  }

  child.kill('SIGTERM');
}

function close(exitCode = 0) {
  if (closing) return;
  closing = true;
  for (const child of children) stopChild(child);
  setTimeout(() => process.exit(exitCode), 150).unref();
}

for (const child of children) {
  child.on('error', () => close(1));
  child.on('exit', (code) => {
    if (!closing) close(code ?? 0);
  });
}

process.on('SIGINT', () => close(0));
process.on('SIGTERM', () => close(0));

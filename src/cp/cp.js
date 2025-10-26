import { spawn } from 'node:child_process';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const spawnChildProcess = async (args) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  const filePath = join(dirName, 'files', 'script.js');

  const child = spawn('node', [filePath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'], 
  });

  stdin.pipe(child.stdin);
  child.stdout.pipe(stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
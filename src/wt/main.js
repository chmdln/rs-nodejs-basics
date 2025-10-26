import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const performCalculations = async () => {

  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  const workerPath = join(dirName, 'worker.js');
  const numCores = cpus().length;
  const nums = Array.from({ length: numCores }, (_, i) => 10 + i);

  const results = await Promise.all(
    nums.map((n) => {
      return new Promise((resolve) => {
        const worker = new Worker(workerPath);
        worker.postMessage(n);

        worker.on('message', (result) => {
          resolve({ status: 'resolved', data: result });
          worker.terminate();
        });

        worker.on('error', () => {
          resolve({ status: 'error', data: null });
          worker.terminate();
        });

        worker.on('exit', (code) => {
          if (code !== 0) {
            resolve({ status: 'error', data: null });
          }
        });
      });
    })
  );

  console.log(results);
};

await performCalculations();

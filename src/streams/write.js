import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const write = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const filePath = path.join(dirName, 'files', 'fileToWrite.txt');

  const fileStream = createWriteStream(filePath);
  process.stdin.pipe(fileStream);
};

await write();

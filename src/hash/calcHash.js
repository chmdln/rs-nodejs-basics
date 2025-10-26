import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const calculateHash = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const filePath = path.join(dirName, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');

  await pipeline(
    createReadStream(filePath),
    hash
  );
  console.log(hash.digest('hex'));
};

await calculateHash();

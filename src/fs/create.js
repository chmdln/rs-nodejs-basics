import { writeFile } from 'fs/promises';
import { access } from 'fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const create = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const filePath = path.join(dirName, 'files', 'fresh.txt');
  try {
    await access(filePath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    await writeFile(filePath, 'I am fresh and young', 'utf8');
  }
};

await create();

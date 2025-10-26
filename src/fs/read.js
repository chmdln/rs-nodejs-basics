import { access, constants, readFile } from 'fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const read = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const filePath = path.join(dirName, 'files', 'fileToRead.txt');

  try {
    // Check if file exists
    await access(filePath, constants.F_OK);
    const content = await readFile(filePath, 'utf8');
    console.log(content);

  } catch {
    throw new Error('FS operation failed');
  }
};

await read();

import { access, constants, rename as fileRename } from 'fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rename = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const srcPath = path.join(dirName, 'files', 'wrongFilename.txt');
  const destPath = path.join(dirName, 'files', 'properFilename.md');

  try {
    await access(srcPath, constants.F_OK);
    try {
      await access(destPath, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
      await fileRename(srcPath, destPath); 
    }
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await rename();

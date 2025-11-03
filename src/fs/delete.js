import { access, constants, unlink } from 'fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const remove = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const srcPath = path.join(dirName, 'files', 'fileToRemove.txt');
  
  try {
      await access(srcPath, constants.F_OK);
      await unlink(srcPath);
    } catch {
      throw new Error('FS operation failed'); 
    }
  
};

await remove();



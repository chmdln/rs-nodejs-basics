import { access, constants, readdir} from 'fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const list = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const srcPath = path.join(dirName, 'files');
  
  try {
    await access(srcPath, constants.F_OK);
    await recurse(srcPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};


async function recurse(src) {
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    if (entry.isDirectory()) {
      await recurse(srcPath);
    } else {
      console.log(entry.name);
    }
  }
}

await list();

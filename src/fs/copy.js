import { access, constants, mkdir, readdir, copyFile } from 'fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const copy = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const sourceDir = path.join(dirName, 'files');
  const destDir = path.join(dirName, 'files_copy');

  try {
    await access(sourceDir, constants.F_OK);
  } catch {
    throw new Error('FS operation failed'); 
  }

  try {
    await access(destDir, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    await mkdir(destDir, { recursive: true });
    await copyDirectory(sourceDir, destDir);
  }
};

async function copyDirectory(src, dest) {
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await mkdir(destPath);
      await copyDirectory(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

await copy();

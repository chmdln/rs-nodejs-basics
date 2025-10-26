import { createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const decompress = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  const srcPath = join(dirName, 'files', 'archive.gz');
  const destPath = join(dirName, 'files', 'fileToCompress.txt');

  const readableStream = createReadStream(srcPath);
  const gunzipStream = createGunzip();
  const writableStream = createWriteStream(destPath);
  
  readableStream.pipe(gunzipStream).pipe(writableStream);
};

await decompress();

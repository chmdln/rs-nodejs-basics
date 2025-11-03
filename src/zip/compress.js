import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const compress = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  const srcPath = join(dirName, 'files', 'fileToCompress.txt');
  const destPath = join(dirName, 'files', 'archive.gz');

  const readableStream = createReadStream(srcPath);
  const gzipStream = createGzip();
  const writableStream = createWriteStream(destPath);
  
  readableStream.pipe(gzipStream).pipe(writableStream);
};

await compress();

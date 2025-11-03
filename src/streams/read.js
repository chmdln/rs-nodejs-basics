import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const read = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  const filePath = path.join(dirName, 'files', 'fileToRead.txt');

  const addNewline = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk); 
      callback();
    },
    final(callback) {
      this.push('\n');  
      callback();
    }
  });

  await pipeline(
    createReadStream(filePath),
    addNewline,
    process.stdout
  );
};

await read();

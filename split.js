// split.js
const fs = require('fs');
const path = require('path');

const FILE_PATH = 'largefile.zip';        // File gốc
const CHUNK_DIR = './chunks';             // Nơi chứa các phần
const CHUNK_SIZE = 1024 * 1024;           // 1MB

if (!fs.existsSync(CHUNK_DIR)) {
    fs.mkdirSync(CHUNK_DIR);
}

function splitFile(filePath, chunkSize) {
    const readStream = fs.createReadStream(filePath, { highWaterMark: chunkSize });
    let chunkIndex = 0;

    readStream.on('data', (chunk) => {
        const chunkFile = path.join(CHUNK_DIR, `chunk-${chunkIndex}`);
        fs.writeFileSync(chunkFile, chunk);
        console.log(`Created: ${chunkFile}`);
        chunkIndex++;
    });

    readStream.on('end', () => {
        console.log('✅ Split complete!');
    });

    readStream.on('error', (err) => {
        console.error('❌ Error reading file:', err);
    });
}

splitFile(FILE_PATH, CHUNK_SIZE);

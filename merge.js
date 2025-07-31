// merge.js
const fs = require('fs');
const path = require('path');
const { calculateChecksum } = require('./checksum');

const CHUNK_DIR = './chunks';
const OUTPUT_FILE = 'mergedfile.zip';
const ORIGINAL_FILE = 'largefile.zip';

async function mergeChunks(chunkDir, outputFile) {
    const chunkFiles = fs.readdirSync(chunkDir)
        .filter(name => name.startsWith('chunk-'))
        .sort((a, b) => {
            const numA = parseInt(a.split('-')[1]);
            const numB = parseInt(b.split('-')[1]);
            return numA - numB;
        });

    const writeStream = fs.createWriteStream(outputFile);

    for (const chunkFile of chunkFiles) {
        const chunkPath = path.join(chunkDir, chunkFile);
        const readStream = fs.createReadStream(chunkPath);

        await new Promise((resolve, reject) => {
            readStream.pipe(writeStream, { end: false });
            readStream.on('end', resolve);
            readStream.on('error', reject);
        });

        console.log(`Merged: ${chunkFile}`);
    }

    // Close stream after all chunks written
    writeStream.end();

    writeStream.on('close', async () => {
        console.log('✅ Merge complete!');
        const [originalChecksum, mergedChecksum] = await Promise.all([
            calculateChecksum(ORIGINAL_FILE),
            calculateChecksum(OUTPUT_FILE),
        ]);

        console.log(`🔍 Original SHA256: ${originalChecksum}`);
        console.log(`🔍 Merged   SHA256: ${mergedChecksum}`);

        if (originalChecksum === mergedChecksum) {
            console.log('✅ Checksum match: Merge verified!');
        } else {
            console.warn('❌ Checksum mismatch: Merge corrupted!');
        }
    });
}

mergeChunks(CHUNK_DIR, OUTPUT_FILE);

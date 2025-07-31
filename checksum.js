// checksum.js
const fs = require('fs');
const crypto = require('crypto');

function calculateChecksum(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => {
            hash.update(data);
        });

        stream.on('end', () => {
            const result = hash.digest('hex');
            resolve(result);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = { calculateChecksum };

// Example usage:
// (async () => {
//   const hash = await calculateChecksum('largefile.txt');
//   console.log('SHA256:', hash);
// })();

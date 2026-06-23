import fs from 'fs';

const files = ['d2.png', 'd3.png', 'd3 (2).png', 'd4.png', 'd5.png', 'd6.png'];
const results = [];

function readPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG signature is 8 bytes, IHDR chunk starts at byte 8.
  // Chunk length (4 bytes), Chunk type 'IHDR' (4 bytes), Width (4 bytes), Height (4 bytes)
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height, size: buffer.length };
}

files.forEach(file => {
  try {
    const info = readPngDimensions(`public/${file}`);
    results.push({ file, ...info });
  } catch (err) {
    results.push({ file, error: err.message });
  }
});

fs.writeFileSync('analysis.txt', JSON.stringify(results, null, 2));
console.log('Analysis written to analysis.txt');

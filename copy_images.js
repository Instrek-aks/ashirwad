import fs from 'fs';
import path from 'path';

const srcDir = 'c:/Users/Hp/ashirwad/public';
const destDir = 'C:/Users/Hp/.gemini/antigravity-ide/brain/479bb4b5-1ae7-4946-aea8-6badbdc9813a';

const files = ['d2.png', 'd3.png', 'd3 (2).png', 'd4.png', 'd5.png', 'd6.png'];

files.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} successfully`);
  } catch (err) {
    console.error(`Error copying ${file}:`, err);
  }
});

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_DIR = path.join(__dirname, 'src');

async function convertImages() {
  console.log('Finding images in public directory...');
  
  const files = await fs.readdir(PUBLIC_DIR);
  const images = files.filter(f => /\.(png|jpe?g)$/i.test(f));
  
  if (images.length === 0) {
    console.log('No PNG/JPG images found in public/ folder.');
  } else {
    console.log(`Found ${images.length} images. Starting conversion...`);
  }

  for (const img of images) {
    const oldPath = path.join(PUBLIC_DIR, img);
    const newFileName = img.replace(/\.(png|jpe?g)$/i, '.webp');
    const newPath = path.join(PUBLIC_DIR, newFileName);
    
    console.log(`Converting ${img} -> ${newFileName}`);
    try {
      await sharp(oldPath)
        .webp({ quality: 80 })
        .toFile(newPath);
      
      // Delete old file
      await fs.unlink(oldPath);
      console.log(`✓ Deleted original ${img}`);
    } catch (err) {
      console.error(`✗ Failed to convert ${img}:`, err.message);
    }
  }

  console.log('\n--- Updating codebase references in src/ ---');
  await updateReferences(SRC_DIR);
  console.log('\n✅ Process complete! All images converted and code updated.');
}

async function updateReferences(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await updateReferences(fullPath);
    } else if (/\.(jsx?|css|html)$/i.test(entry.name)) {
      const content = await fs.readFile(fullPath, 'utf8');
      
      // Regex replaces .png, .jpg, .jpeg with .webp
      const newContent = content.replace(/\.(png|jpe?g)/gi, '.webp');
      
      if (content !== newContent) {
        await fs.writeFile(fullPath, newContent, 'utf8');
        console.log(`✓ Updated references in src/${path.relative(SRC_DIR, fullPath).replace(/\\/g, '/')}`);
      }
    }
  }
}

// Ensure the process starts
convertImages().catch(console.error);

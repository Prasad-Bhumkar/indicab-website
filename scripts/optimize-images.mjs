import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGE_DIRS = [
  'public/assets/cities',
  'public/assets/cars'
];

const OPTIMIZE_OPTIONS = {
  quality: 80,
  effort: 6
};

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp(OPTIMIZE_OPTIONS)
      .toFile(outputPath);
    console.log(`Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      await optimizeImage(inputPath, outputPath);
    }
  }
}

async function main() {
  for (const dir of IMAGE_DIRS) {
    if (fs.existsSync(dir)) {
      await processDirectory(dir);
    } else {
      console.warn(`Directory not found: ${dir}`);
    }
  }
}

main().catch(console.error);
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const galleryDir = path.join(__dirname, 'public', 'gallery');

function optimizeImages() {
  console.log('Optimizing gallery images to reduce size...');
  
  const folders = ['2023', '2024 CHRISTMAS', 'HALLOWEEN 2024', 'MAY 2024', 'SANTA CLAUS PARADE 2024'];
  let totalSaved = 0;
  let processed = 0;
  
  for (const folder of folders) {
    const folderPath = path.join(galleryDir, folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder not found: ${folder}`);
      continue;
    }
    
    const files = fs.readdirSync(folderPath);
    const jpgFiles = files.filter(file => file.toLowerCase().endsWith('.jpg'));
    
    console.log(`\nOptimizing ${folder}: ${jpgFiles.length} images`);
    
    for (const jpgFile of jpgFiles) {
      const imagePath = path.join(folderPath, jpgFile);
      const stats = fs.statSync(imagePath);
      const originalSize = stats.size;
      
      try {
        // Use ImageMagick to resize and compress
        const tempPath = imagePath + '.temp.jpg';
        const cmd = `"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe" "${imagePath}" -resize 1920x1080 -quality 75 -strip "${tempPath}"`;
        
        try {
          execSync(cmd, { stdio: 'ignore' });
          
          if (fs.existsSync(tempPath)) {
            const newStats = fs.statSync(tempPath);
            const saved = originalSize - newStats.size;
            
            if (saved > 0) {
              fs.unlinkSync(imagePath);
              fs.renameSync(tempPath, imagePath);
              totalSaved += saved;
              console.log(`✓ ${jpgFile}: saved ${(saved / 1024 / 1024).toFixed(1)} MB`);
            } else {
              fs.unlinkSync(tempPath);
              console.log(`- ${jpgFile}: no optimization needed`);
            }
          }
        } catch (error) {
          // If ImageMagick fails, skip this file
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          console.log(`✗ ${jpgFile}: optimization failed`);
        }
        
        processed++;
      } catch (error) {
        console.error(`✗ Failed to process ${jpgFile}:`, error.message);
      }
    }
  }
  
  console.log(`\nOptimization complete: ${processed} files processed, ${(totalSaved / 1024 / 1024).toFixed(1)} MB saved`);
}

optimizeImages();

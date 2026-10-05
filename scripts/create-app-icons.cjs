const path = require('node:path');
const fs = require('node:fs/promises');
// Optional artwork tooling; this dependency is not part of the app runtime.
const sharp = require(process.env.DRAGON_ASSET_SHARP_PATH || 'sharp');
const { generateFaviconAsync } = require('@expo/image-utils');

const folder = path.resolve(__dirname, '../assets/brand');
const publicFolder = path.resolve(__dirname, '../public');
const createIcons = async () => {
  await fs.mkdir(path.join(publicFolder, 'brand'), { recursive: true });
  await sharp(path.join(folder, 'app-icon.svg'))
    .flatten({ background: '#e8ebef' })
    .png()
    .toFile(path.join(folder, 'app-icon.png'));
  await sharp(path.join(folder, 'adaptive-icon.svg')).png().toFile(path.join(folder, 'adaptive-icon.png'));
  const favicon = await sharp(path.join(folder, 'app-icon.svg')).resize(192, 192).png().toBuffer();
  await fs.writeFile(path.join(folder, 'favicon.png'), favicon);
  await fs.writeFile(path.join(publicFolder, 'brand/favicon.png'), favicon);
  await fs.writeFile(path.join(publicFolder, 'favicon.ico'), await generateFaviconAsync(favicon, [16, 32, 48]));
  await sharp(path.join(folder, 'app-icon.svg'))
    .resize(180, 180)
    .flatten({ background: '#e8ebef' })
    .png()
    .toFile(path.join(publicFolder, 'apple-touch-icon.png'));
  console.log(`Saved App Icons`);
};

createIcons().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});

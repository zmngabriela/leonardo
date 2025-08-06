const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, '../src/assets/images-original');
const outputDir = path.join(__dirname, '../public/optimized-images');

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    sharp(inputPath)
        .resize({ width: 1920 }) // ou outro valor
        .toFormat("webp")
        .toFile(outputPath.replace(/\.\w+$/, ".webp"))
        .then(() => console.log(`Optimized ${file}`))
        .catch(console.error);
});

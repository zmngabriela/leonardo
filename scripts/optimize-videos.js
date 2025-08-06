const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../src/assets/videos-original');
const outputDir = path.join(__dirname, '../public/optimized-videos');

// Garante que a pasta exista
fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `${baseName}.mp4`);

    ffmpeg(inputPath)
        // força container MP4
        .format('mp4')
        // converte vídeo com H.264
        .videoCodec('libx264')
        // converte áudio para AAC (compatível com MP4)
        .audioCodec('aac')
        // quality e preset
        .outputOptions([
        '-crf 28',
        '-preset slow',
        // movflags para colocar o índice no início do arquivo,
        // permitindo streaming progressivo/quick start
        '-movflags +faststart'
        ])
        .on('start', cmdLine => {
        console.log(`🚀 Iniciando conversão de ${file}:`);
        console.log(cmdLine);
        })
        .on('progress', progress => {
        process.stdout.write(`  converting ${file}: ${progress.percent?.toFixed(1)}% \r`);
        })
        .on('end', () => {
        console.log(`\n✔️  ${file} otimizado como ${baseName}.mp4`);
        })
        .on('error', err => {
        console.error(`❌ Erro convertendo ${file}:`, err.message);
        })
        .save(outputPath);
});

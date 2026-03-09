const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../src/assets/videos-original');
const outputMobileDir = path.join(__dirname, '../public/optimized-videos-mobile');
const outputLargeDir = path.join(__dirname, '../public/optimized-videos-large');
const SUPPORTED_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.avi', '.webm']);

fs.mkdirSync(outputMobileDir, { recursive: true });
fs.mkdirSync(outputLargeDir, { recursive: true });

const probe = (inputPath) =>
    new Promise((resolve, reject) => {
        ffmpeg.ffprobe(inputPath, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });

const getScaleFilter = (width, height, longestEdge) => {
    if (width >= height) {
        return `scale='min(${longestEdge},iw)':-2`;
    }
    return `scale=-2:'min(${longestEdge},ih)'`;
};

const transcode = (inputPath, outputPath, profile) =>
    new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .format('mp4')
            .videoCodec('libx264')
            .noAudio()
            .outputOptions([
                '-vf', `${profile.scaleFilter},fps=${profile.fps}`,
                `-crf ${profile.crf}`,
                `-preset ${profile.preset}`,
                '-pix_fmt yuv420p',
                '-profile:v high',
                '-level 4.0',
                '-movflags +faststart',
                '-tune fastdecode'
            ])
            .on('start', () => {
                console.log(`🚀 ${profile.name}: ${path.basename(inputPath)}`);
            })
            .on('progress', (progress) => {
                if (progress.percent) {
                    process.stdout.write(`  ${profile.name} ${path.basename(inputPath)}: ${progress.percent.toFixed(1)}%\r`);
                }
            })
            .on('end', () => {
                process.stdout.write('\n');
                console.log(`✔️  Saved ${path.basename(outputPath)}`);
                resolve();
            })
            .on('error', (err) => reject(err))
            .save(outputPath);
    });

const run = async () => {
    if (!fs.existsSync(inputDir)) {
        console.log(`Source directory not found: ${inputDir}`);
        return;
    }

    const files = fs
        .readdirSync(inputDir)
        .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()));

    if (!files.length) {
        console.log('No source videos found.');
        return;
    }

    for (const file of files) {
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const inputPath = path.join(inputDir, file);

        try {
            const metadata = await probe(inputPath);
            const videoStream = metadata.streams.find((stream) => stream.codec_type === 'video');
            const width = videoStream?.width || 1280;
            const height = videoStream?.height || 720;

            const mobileProfile = {
                name: 'mobile',
                scaleFilter: getScaleFilter(width, height, 1080),
                fps: 27,
                crf: 31,
                preset: 'faster',
            };

            const largeProfile = {
                name: 'large',
                scaleFilter: getScaleFilter(width, height, 1366),
                fps: 30,
                crf: 28,
                preset: 'slow',
            };

            await transcode(inputPath, path.join(outputMobileDir, `${baseName}.mp4`), mobileProfile);
            await transcode(inputPath, path.join(outputLargeDir, `${baseName}.mp4`), largeProfile);
        } catch (err) {
            console.error(`❌ Error converting ${file}:`, err.message);
        }
    }
};

run();

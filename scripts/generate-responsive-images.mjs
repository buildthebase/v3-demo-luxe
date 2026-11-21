import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const output = path.join(root, 'public/images/responsive');
const widths = [320, 480, 768, 1024, 1440, 1920, 2560];
const quality = 88;
const sources = new Set();
const pattern = /["'`]((?:\/images\/|\/media\/)[^"'`\s]+?\.(?:avif|webp|png|jpe?g))["'`]/gi;

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'generated') continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (/\.(?:tsx?|json)$/.test(entry.name)) {
      for (const match of (await readFile(file, 'utf8')).matchAll(pattern)) sources.add(match[1]);
    }
  }
}
await scan(path.join(root, 'app'));
for (const match of (await readFile(path.join(root, 'content/blog/published/articles.json'), 'utf8')).matchAll(pattern)) sources.add(match[1]);
await mkdir(output, { recursive: true });
sharp.cache({ memory: 64 });
sharp.concurrency(1);
const manifest = {};
let generated = 0;
for (const src of [...sources].sort()) {
  const file = path.join(root, 'public', src);
  let input;
  try { input = await readFile(file); } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  const metadata = await sharp(input).metadata();
  const rotated = metadata.orientation >= 5 && metadata.orientation <= 8;
  const originalWidth = rotated ? metadata.height : metadata.width;
  const originalHeight = rotated ? metadata.width : metadata.height;
  if (!originalWidth || originalWidth < 480 || metadata.pages > 1) continue;
  const fingerprint = createHash('sha256').update(input).update(`responsive-v1-webp-${quality}`).digest('hex').slice(0, 20);
  const targets = widths.filter(width => width < originalWidth);
  if (originalWidth <= widths.at(-1)) targets.push(originalWidth);
  const variants = [];
  for (const width of targets) {
    const name = `${fingerprint}-${width}.webp`;
    const destination = path.join(output, name);
    let bytes;
    try { bytes = (await stat(destination)).size; } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const result = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 4, smartSubsample: true }).toFile(destination);
      bytes = result.size;
      generated++;
    }
    // Already-efficient originals should never be replaced by larger files.
    if (bytes < input.byteLength) variants.push({ src: `/images/responsive/${name}`, width, bytes });
  }
  if (variants.length) manifest[src] = { width: originalWidth, height: originalHeight, bytes: input.byteLength, variants };
}
await mkdir(path.join(root, 'app/generated'), { recursive: true });
const manifestPath = path.join(root, 'app/generated/responsive-images.json');
const serialized = JSON.stringify(manifest, null, 2) + '\n';
let existing;
try { existing = await readFile(manifestPath, 'utf8'); } catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
if (existing !== serialized) {
  await writeFile(`${manifestPath}.tmp`, serialized);
  await rename(`${manifestPath}.tmp`, manifestPath);
}
const activeFiles = new Set(Object.values(manifest).flatMap(entry => entry.variants.map(variant => path.basename(variant.src))));
for (const name of await readdir(output)) {
  if (/^[a-f0-9]{20}-[0-9]+\.webp$/.test(name) && !activeFiles.has(name)) await unlink(path.join(output, name));
}
console.log(JSON.stringify({ sources: sources.size, optimized: Object.keys(manifest).length, generated, variants: Object.values(manifest).reduce((n, entry) => n + entry.variants.length, 0) }));

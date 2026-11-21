import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ts from 'typescript';

// The content graph uses extensionless TypeScript imports. Transpile locally for
// this asset utility without changing the app's runtime or bundler configuration.
const require = createRequire(import.meta.url);
const original = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { galleryGroups } = require('../app/gallery/gallery-content.ts');
require.extensions['.ts'] = original;
const publicRoot = new URL('../public/', import.meta.url);
await mkdir(new URL('images/gallery/previews/', publicRoot), { recursive: true });
const media = [...new Map(galleryGroups.flatMap(group => group.media)
  .filter(item => item.src).map(item => [item.previewSrc, item])).values()];
let bytes = 0;
for (const item of media) {
  const info = await sharp(fileURLToPath(new URL(item.src.slice(1), publicRoot)))
    .resize(176, 220, { fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(fileURLToPath(new URL(item.previewSrc.slice(1), publicRoot)));
  bytes += info.size;
}
console.log(`Generated ${media.length} gallery previews (${Math.round(bytes / 1024)} KB total).`);

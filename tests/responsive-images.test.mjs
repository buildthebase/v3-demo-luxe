import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const previous = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);
const { responsiveImageSources, optimizedPosterSource } = require('../app/responsive-image-sources.ts');
require.extensions['.ts'] = previous;
const manifest = require('../app/generated/responsive-images.json');

test('responsive renditions exist, are smaller, preserve framing and never upscale', async () => {
  for (const [src, entry] of Object.entries(manifest)) {
    assert(existsSync(new URL('../public' + src, import.meta.url)), src);
    for (const variant of entry.variants) {
      const file = new URL('../public' + variant.src, import.meta.url);
      const metadata = await sharp(file.pathname).metadata();
      assert.equal(metadata.width, variant.width);
      assert(variant.width <= entry.width);
      assert(variant.bytes < entry.bytes);
      assert(Math.abs(metadata.height - entry.height * variant.width / entry.width) <= 1);
      assert.match(variant.src, /^\/images\/responsive\/[a-f0-9]{20}-\d+\.webp$/);
    }
  }
});

test('browser candidates are ordered and retain native-resolution availability', () => {
  for (const [src, entry] of Object.entries(manifest)) {
    const result = responsiveImageSources(src);
    const candidates = result.srcSet.split(', ').map(value => Number(value.match(/ (\d+)w$/)[1]));
    assert.deepEqual(candidates, [...new Set(candidates)].sort((a, b) => a - b));
    assert.equal(candidates.at(-1), entry.width);
    assert(existsSync(new URL('../public' + result.src, import.meta.url)));
  }
});

test('unknown, remote, and tiny assets keep their original source', () => {
  for (const src of ['/images/unknown.webp', 'https://example.com/photo.jpg', '/icon.svg']) {
    assert.equal(responsiveImageSources(src), null);
    assert.equal(optimizedPosterSource(src), src);
  }
  assert.equal(optimizedPosterSource(null), undefined);
});

test('repeat visits can cache content-hashed renditions without serving stale edits', () => {
  const headers = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');
  assert.match(headers, /\/images\/responsive\/\*\n\s+Cache-Control: public, max-age=31536000, immutable/);
});

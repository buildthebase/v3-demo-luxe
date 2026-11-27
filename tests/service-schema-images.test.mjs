import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';
const require = createRequire(import.meta.url);
const original = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { serviceSchemaImages } = require('../app/service-schema-images.ts');
const { createServicePageSchema } = require('../app/schema-builders.ts');
const { pageMetadata } = require('../app/metadata-config.ts');
require.extensions['.ts'] = original;

test('service schema links to approved, available photographs with accurate dimensions', async () => {
  assert.equal(Object.keys(serviceSchemaImages).length, 10);
  for (const [path, image] of Object.entries(serviceSchemaImages)) {
    assert.equal(image.status, 'approved', path);
    assert.ok(image.alt.trim(), path);
    const file = new URL(`../public${image.src}`, import.meta.url);
    assert.ok(existsSync(file), image.src);
    const metadata = await sharp(file.pathname).metadata();
    assert.equal(image.width, metadata.width, path);
    assert.equal(image.height, metadata.height, path);
    const graph = createServicePageSchema({ path, serviceName: 'Event service', serviceType: 'Event service', serviceDescription: 'Event service', pageName: pageMetadata[path].title, pageDescription: pageMetadata[path].description })['@graph'];
    const service = graph.find(node => node['@type'] === 'Service');
    const page = graph.find(node => node['@type'] === 'WebPage');
    const photo = graph.find(node => node['@type'] === 'ImageObject');
    assert.equal(service.image['@id'], photo['@id'], path);
    assert.equal(page.primaryImageOfPage['@id'], photo['@id'], path);
    assert.match(photo.url, /^https:\/\/experiencesbyluxe\.ca\/images\//);
    assert.equal(photo.caption, image.alt);
  }
});

test('page titles and descriptions remain distinct and useful', () => {
  const pages = Object.values(pageMetadata);
  assert.equal(new Set(pages.map(page => page.title)).size, pages.length);
  assert.equal(new Set(pages.map(page => page.description)).size, pages.length);
  for (const page of pages) {
    assert.ok(page.title.trim());
    assert.ok(page.description.length < 190, page.title);
  }
});

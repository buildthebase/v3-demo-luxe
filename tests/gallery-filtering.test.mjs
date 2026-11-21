import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// Load the content graph so regression checks use real gallery metadata.
const original = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { galleryGroups, approvedGalleryImages } = require('../app/gallery/gallery-content.ts');
const { imageAssets } = require('../app/image-system.ts');
const { weddingHeroPhotos } = require('../app/wedding-hero-media.ts');
const { weddingBrandingPhotos } = require('../app/wedding-branding-media.ts');
const { filterGalleryGroups, galleryPhotosForGroups } = require('../app/gallery/gallery-filtering.ts');
require.extensions['.ts'] = original;
const results = filters => filterGalleryGroups(galleryGroups, filters).flatMap(group => group.media);

test('service and occasion narrow the same media, with OR within each category', () => {
  const weddingCoffee = results(['coffee-bar', 'weddings']);
  assert.ok(weddingCoffee.length > 0);
  assert.ok(weddingCoffee.every(item => item.tags.includes('coffee-bar') && item.tags.includes('weddings')));
  const eitherService = results(['coffee-bar', 'sweet-cart', 'weddings']);
  assert.ok(eitherService.length > weddingCoffee.length);
  assert.ok(eitherService.every(item => item.tags.includes('weddings') && (item.tags.includes('coffee-bar') || item.tags.includes('sweet-cart'))));
});

test('bunny photos appear for baby showers and never corporate or brand activations', () => {
  const bunny = item => item.src.includes('baby-shower-bunny');
  assert.equal(results(['coffee-bar', 'baby-showers']).filter(bunny).length, 2);
  assert.equal(results(['corporate']).filter(bunny).length, 0);
  assert.equal(results(['brand-activations']).filter(bunny).length, 0);
});

test('unknown event types are not inferred from the range of occasions a service supports', () => {
  assert.equal(results(['sweet-cart', 'bridal-showers']).length, 0);
  assert.equal(results(['coffee-bar', 'birthdays']).length, 0);
  assert.ok(results(['sweet-cart']).length > 0);
});

test('clearing filters restores every collection and filtering never mutates content', () => {
  const before = JSON.stringify(galleryGroups);
  results(['coffee-bar', 'weddings']);
  assert.equal(filterGalleryGroups(galleryGroups, []).length, galleryGroups.length);
  assert.equal(JSON.stringify(galleryGroups), before);
});

test('every collapsed preview resolves to a small local thumbnail', () => {
  for (const item of galleryGroups.flatMap(group => group.media)) {
    const bytes = readFileSync(new URL('../public' + item.previewSrc, import.meta.url));
    assert.ok(bytes.byteLength < 30000, `${item.id} thumbnail should remain lightweight`);
  }
});


test('event heroes, wedding collections, and churro photo remain represented in the gallery', () => {
  const photos = new Set(results([]).filter(item => !item.video).map(item => item.src));
  for (const asset of [...weddingHeroPhotos, ...weddingBrandingPhotos,
    imageAssets.experiences.bridalHero, imageAssets.experiences.birthdayHero,
    imageAssets.experiences.privateHero, imageAssets.experiences.sweetChurroService]) {
    assert.ok(photos.has(asset.src), `${asset.id} must remain in the gallery`);
  }
});

test('new occasion photos match only the service pictured in them', () => {
  assert.ok(results(['coffee-bar', 'bridal-showers']).some(item => item.id === imageAssets.experiences.bridalHero.id));
  assert.ok(results(['sweet-cart', 'birthdays']).some(item => item.id === imageAssets.experiences.birthdayHero.id));
  assert.ok(results(['coffee-bar', 'private-events']).some(item => item.id === imageAssets.experiences.privateHero.id));
  assert.ok(results(['coffee-bar', 'weddings']).some(item => item.id === 'wedding-hero-couple-coffee-cheers'));
  assert.ok(!results(['sweet-cart', 'weddings']).some(item => item.id === 'wedding-hero-couple-coffee-cheers'));
});

test('five supplied guest photos appear in their service and occasion collections', () => {
  const expected = [
    ['bridal-guest-matcha', ['coffee-bar', 'bridal-showers']],
    ['birthday-guest-dessert', ['sweet-cart', 'birthdays']],
    ['cafe-dea-three-guests', ['coffee-bar']],
    ['cafe-dea-guests-dark-outfits', ['coffee-bar']],
    ['cafe-dea-host-coffee', ['coffee-bar']],
  ];
  for (const [id, filters] of expected) {
    assert.equal(results(filters).filter(item => item.id === id).length, 1, id);
    assert.equal(results(['seating-rentals']).filter(item => item.id === id).length, 0, id);
  }
});


test('detail collections reuse existing photos and their verified tags', () => {
  const ids = ['custom-branding-signage', 'cups-menus-signature-drinks', 'styled-setups-event-details'];
  const originalGroups = galleryGroups.filter(group => !ids.includes(group.id));
  const originals = new Map(originalGroups.flatMap(group => group.media).map(item => [item.src, item]));
  for (const id of ids) {
    const group = galleryGroups.find(item => item.id === id);
    assert.ok(group && group.media.length > 0, id);
    assert.equal(new Set(group.media.map(item => item.src)).size, group.media.length);
    for (const item of group.media) {
      assert.ok(originals.has(item.src), item.id);
      assert.deepEqual(item.tags, originals.get(item.src).tags, item.id);
      assert.ok(!item.video);
    }
  }
  const filtered = filterGalleryGroups(galleryGroups, ['coffee-bar', 'weddings']);
  const branding = filtered.find(group => group.id === 'custom-branding-signage');
  assert.ok(branding && branding.media.length > 0);
  assert.ok(branding.media.every(item => item.tags.includes('coffee-bar') && item.tags.includes('weddings')));
});

test('shared detail photos never create duplicate popup slides or metadata images', () => {
  const detailIds = ['custom-branding-signage', 'cups-menus-signature-drinks', 'styled-setups-event-details'];
  const originalGroups = galleryGroups.filter(group => !detailIds.includes(group.id));
  const photos = galleryPhotosForGroups(galleryGroups);
  assert.equal(photos.length, galleryPhotosForGroups(originalGroups).length);
  assert.equal(photos.length, new Set(photos.map(item => item.src)).size);
  assert.equal(approvedGalleryImages.length, photos.length);
  for (const group of galleryGroups.filter(group => detailIds.includes(group.id))) {
    for (const item of group.media) assert.equal(photos.filter(photo => photo.src === item.src).length, 1);
  }
});

import sharp from "sharp";

// Original pixels remain the base. Use only the restored cart script from the
// built-in image edit; its reconstructed menu text is deliberately excluded.
const original = "outputs/case-studies/baby-shower-original-frame.png";
const edited = "outputs/case-studies/baby-shower-generated-lettering-reference.png";
const targetWidth = 2160;
const targetHeight = 3840;
const scale = targetWidth / 941;
const lettering = { left: Math.round(286 * scale), top: Math.round(1005 * scale), width: Math.round(330 * scale), height: Math.round(116 * scale) };
const restored = await sharp(edited).resize(targetWidth, targetHeight, { fit: "fill" }).extract(lettering).png().toBuffer();
// Retain the original panel's illumination, so the inserted script cannot
// introduce a pale rectangular patch around the lettering.
const originalTone = await sharp(original).extract(lettering).blur(30).removeAlpha().raw().toBuffer();
const restoredTone = await sharp(restored).blur(30).removeAlpha().raw().toBuffer();
const restoredPixels = await sharp(restored).removeAlpha().raw().toBuffer();
for (let index = 0; index < restoredPixels.length; index += 1) {
  restoredPixels[index] = Math.max(0, Math.min(255, restoredPixels[index] + originalTone[index] - restoredTone[index]));
}
const colourMatched = await sharp(restoredPixels, { raw: { width: lettering.width, height: lettering.height, channels: 3 } }).png().toBuffer();
const feather = 20;
const mask = Buffer.from(`<svg width="${lettering.width}" height="${lettering.height}"><defs><filter id="f"><feGaussianBlur stdDeviation="${feather / 2}"/></filter></defs><rect x="${feather}" y="${feather}" width="${lettering.width - feather * 2}" height="${lettering.height - feather * 2}" rx="10" fill="white" filter="url(#f)"/></svg>`);
const scriptPatch = await sharp(colourMatched).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
const menu = { left: 1570, top: 1690, width: 390, height: 620 };
const menuPatch = await sharp(original).extract(menu).sharpen({ sigma: 0.7, m1: 0.8, m2: 1.5 }).png().toBuffer();
const master = await sharp(original).composite([
  { input: scriptPatch, left: lettering.left, top: lettering.top },
  { input: menuPatch, left: menu.left, top: menu.top },
]).png().toBuffer();
await sharp(master).toFile("outputs/case-studies/baby-shower-lettering-master-v1.png");

const base = "public/images/case-studies/";
for (const width of [480, 768, 1024, 1440]) {
  const file = `${base}baby-shower-cart-portrait-lettering-v4-${width}.avif`;
  const result = await sharp(master).resize({ width }).sharpen({ sigma: 0.5, m1: 0.4, m2: 1 }).avif({ quality: 66, effort: 6, chromaSubsampling: "4:4:4" }).toFile(file);
  console.log(file, result.size);
}
for (const width of [960, 1440, 1920]) {
  const file = `${base}baby-shower-cart-landscape-lettering-v3-${width}.avif`;
  const result = await sharp(master).extract({ left: 0, top: 1660, width: 2160, height: 1440 }).resize({ width }).sharpen({ sigma: 0.5, m1: 0.4, m2: 1 }).avif({ quality: 66, effort: 6, chromaSubsampling: "4:4:4" }).toFile(file);
  console.log(file, result.size);
}
await sharp(master).resize({ width: 1440 }).webp({ quality: 92, effort: 6 }).toFile(`${base}baby-shower-cart-portrait-lettering-v4.webp`);
await sharp(master).extract({ left: 0, top: 1660, width: 2160, height: 1440 }).resize({ width: 1920 }).webp({ quality: 92, effort: 6 }).toFile(`${base}baby-shower-cart-landscape-lettering-v3.webp`);

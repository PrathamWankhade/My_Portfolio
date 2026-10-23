/**
 * Generates PW-branded icon assets from src/app/icon.svg:
 *  - favicon.ico   (16/32/48 PNG frames, replacing the default create-next-app "N")
 *  - apple-icon.png (180x180, square corners for iOS masking)
 * Run: node tools/gen-icons.mjs   (requires sharp, provided by Next.js)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.join(__dirname, "..", "src", "app");
const svg = fs.readFileSync(path.join(APP_DIR, "icon.svg"));

// --- favicon.ico: PNG frames are valid in ICO since Vista ---
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) {
  pngs.push(await sharp(svg).resize(s, s).png().toBuffer());
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);

let offset = 6 + 16 * sizes.length;
const entries = [];
sizes.forEach((s, i) => {
  const e = Buffer.alloc(16);
  e[0] = s; // width
  e[1] = s; // height
  e[2] = 0; // palette colors
  e[3] = 0; // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  entries.push(e);
});

const icoPath = path.join(APP_DIR, "favicon.ico");
fs.writeFileSync(icoPath, Buffer.concat([header, ...entries, ...pngs]));
console.log("favicon.ico:", fs.statSync(icoPath).size, "bytes");

// --- apple-icon.png: full-bleed square (iOS applies its own mask) ---
const square = Buffer.from(svg.toString().replace('rx="14"', 'rx="0"'));
const applePath = path.join(APP_DIR, "apple-icon.png");
await sharp(square).resize(180, 180).png().toFile(applePath);
console.log("apple-icon.png:", fs.statSync(applePath).size, "bytes");

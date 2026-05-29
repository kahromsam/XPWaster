#!/usr/bin/env node
// Generates minimal valid PNG icon files for PWA — no external deps required

import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

function crc32(buf) {
  let crc = 0xffffffff;
  for (const b of buf) {
    crc ^= b;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function u32(n) {
  return Buffer.from([(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]);
}

function chunk(type, data) {
  const t = Buffer.from(type);
  return Buffer.concat([u32(data.length), t, data, u32(crc32(Buffer.concat([t, data])))]);
}

function solidPNG(size, r, g, b) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = chunk('IHDR', Buffer.from([...u32(size), ...u32(size), 8, 2, 0, 0, 0]));

  const row = Buffer.alloc(1 + size * 3);
  for (let x = 0; x < size; x++) {
    row[1 + x * 3] = r; row[2 + x * 3] = g; row[3 + x * 3] = b;
  }
  const idat = chunk('IDAT', deflateSync(Buffer.concat(Array(size).fill(row))));
  const iend = chunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

mkdirSync(publicDir, { recursive: true });

// App background color: #0d0d1a = (13, 13, 26)
writeFileSync(join(publicDir, 'pwa-192x192.png'), solidPNG(192, 13, 13, 26));
writeFileSync(join(publicDir, 'pwa-512x512.png'), solidPNG(512, 13, 13, 26));
writeFileSync(join(publicDir, 'apple-touch-icon.png'), solidPNG(180, 13, 13, 26));

console.log('Icons generated in public/');

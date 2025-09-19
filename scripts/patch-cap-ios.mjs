#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const files = [
  join(root, 'node_modules', '@capacitor', 'ios', 'Capacitor', 'Capacitor', 'Codable', 'JSValueDecoder.swift'),
  join(root, 'node_modules', '@capacitor', 'ios', 'Capacitor', 'Capacitor', 'Codable', 'JSValueEncoder.swift'),
];

let changed = 0;
for (const file of files) {
  if (!existsSync(file)) continue;
  const src = readFileSync(file, 'utf8');
  if (src.includes('MSEC_PER_SEC')) {
    const out = src.replaceAll('MSEC_PER_SEC', '1000.0');
    writeFileSync(file, out);
    changed++;
    console.log(`Patched: ${file}`);
  } else {
    // already patched or not needed
  }
}

if (changed === 0) {
  console.log('No iOS Capacitor patches needed.');
}

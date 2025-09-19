#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const decoder = join(root, 'node_modules', '@capacitor', 'ios', 'Capacitor', 'Capacitor', 'Codable', 'JSValueDecoder.swift');
const encoder = join(root, 'node_modules', '@capacitor', 'ios', 'Capacitor', 'Capacitor', 'Codable', 'JSValueEncoder.swift');
const files = [decoder, encoder];

let changed = 0;
for (const file of files) {
  if (!existsSync(file)) continue;
  const src = readFileSync(file, 'utf8');
  let out = src;
  let fileChanged = false;
  if (out.includes('MSEC_PER_SEC')) {
    out = out.replaceAll('MSEC_PER_SEC', '1000.0');
    fileChanged = true;
  }
  if (file === encoder) {
    // Ensure switch returns String in EncodingContainer.type
    out = out.replace(
      /case \.singleValue:\s*"SingleValueContainer"/m,
      'case .singleValue:\n            return "SingleValueContainer"'
    );
    out = out.replace(
      /case \.unkeyed:\s*"UnkeyedContainer"/m,
      'case .unkeyed:\n            return "UnkeyedContainer"'
    );
    out = out.replace(
      /case \.keyed:\s*"KeyedContainer"/m,
      'case .keyed:\n            return "KeyedContainer"'
    );
    if (out !== src) fileChanged = true;
  }
  if (fileChanged) {
    writeFileSync(file, out);
    changed++;
    console.log(`Patched: ${file}`);
  }
}

if (changed === 0) {
  console.log('No iOS Capacitor patches needed.');
}

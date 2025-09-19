#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const srcLogo = join(root, 'src', 'assets', 'logo.png');

if (!existsSync(srcLogo)) {
  console.error('Logo não encontrado em src/assets/logo.png');
  process.exit(1);
}

// Android: substituir todos os splash.png existentes e garantir nodpi
const androidDirs = [
  'android/app/src/main/res/drawable',
  'android/app/src/main/res/drawable-land-hdpi',
  'android/app/src/main/res/drawable-land-mdpi',
  'android/app/src/main/res/drawable-land-xhdpi',
  'android/app/src/main/res/drawable-land-xxhdpi',
  'android/app/src/main/res/drawable-land-xxxhdpi',
  'android/app/src/main/res/drawable-port-hdpi',
  'android/app/src/main/res/drawable-port-mdpi',
  'android/app/src/main/res/drawable-port-xhdpi',
  'android/app/src/main/res/drawable-port-xxhdpi',
  'android/app/src/main/res/drawable-port-xxxhdpi',
  'android/app/src/main/res/drawable-nodpi',
];

for (const d of androidDirs) {
  const dir = join(root, d);
  mkdirSync(dir, { recursive: true });
  cpSync(srcLogo, join(dir, 'splash.png'));
}

// iOS: substituir imagens do Splash.imageset
const iosDir = join(root, 'ios', 'App', 'App', 'Assets.xcassets', 'Splash.imageset');
const iosTargets = [
  'splash-2732x2732.png',
  'splash-2732x2732-1.png',
  'splash-2732x2732-2.png',
];
try {
  for (const f of iosTargets) {
    cpSync(srcLogo, join(iosDir, f));
  }
} catch (e) {
  // ignore if iOS folder not present
}

console.log('Logo aplicado às pastas de splash (Android/iOS).');
console.log('Execute: npx cap sync para propagar para os projetos nativos.');

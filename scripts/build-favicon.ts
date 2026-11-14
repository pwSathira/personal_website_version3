// Writes public/favicon.svg from the SS monogram in src/lib/logo.ts.
// The solid version: dots blur together at 16–32 px.
import { writeFileSync } from 'node:fs';
import { markSolid } from '../src/lib/logo.ts';

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 108 108">` +
  `<style>path{fill:#161512}@media(prefers-color-scheme:dark){path{fill:#ece8df}}</style>` +
  `<path d="${markSolid()}"/></svg>\n`;

writeFileSync(new URL('../public/favicon.svg', import.meta.url), svg);
console.log(`favicon.svg: ${svg.length} bytes`);

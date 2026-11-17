// Generate the shared-link banner from the site's existing monogram and palette.
import sharp from 'sharp';
import { markSolid } from '../src/lib/logo.ts';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f0e0c"/>
  <g fill="none" stroke="#34312b">
    <path d="M64 64H1136V566H64Z"/>
    <circle cx="1040" cy="315" r="260"/>
    <circle cx="1040" cy="315" r="190"/>
    <circle cx="1040" cy="315" r="120"/>
    <path d="M780 315H1200M1040 55V575"/>
  </g>
  <path d="${markSolid()}" transform="translate(88 92) scale(.68)" fill="#ece8df"/>
  <g font-family="sans-serif">
    <text x="88" y="294" fill="#ece8df" font-size="70" font-weight="600" letter-spacing="-2">Sathira Williams</text>
    <text x="92" y="356" fill="#b6b0a4" font-size="32">Full-stack developer · Vancouver</text>
    <path d="M92 408H156" stroke="#d6ad60" stroke-width="3"/>
    <text x="92" y="463" fill="#d6ad60" font-size="22" letter-spacing="2">CODE. SYSTEMS. ORBITS.</text>
    <text x="92" y="528" fill="#b6b0a4" font-size="20">pwsathira.polywertz.com</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/social-card.png', import.meta.url).pathname);
console.log('social-card.png: 1200 × 630');

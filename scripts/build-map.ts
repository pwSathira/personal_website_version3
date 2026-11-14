// Builds the land mask the hero map draws as dots: one bit per cell,
// LAT_TOP..LAT_BOTTOM by -180..180, at STEP degrees. Run once; the output is committed.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';
import { MAP } from '../src/lib/map.ts';

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve('world-atlas/land-110m.json'), 'utf8'));
const land = feature(topo, topo.objects.land);

const { cols, rows, step, latTop } = MAP;
const bits = new Uint8Array(Math.ceil((cols * rows) / 8));
let count = 0;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const lon = -180 + (c + 0.5) * step;
    const lat = latTop - (r + 0.5) * step;
    if (geoContains(land, [lon, lat])) {
      const i = r * cols + c;
      bits[i >> 3] |= 1 << (i & 7);
      count++;
    }
  }
}
const out = new URL('../src/data/landmask.json', import.meta.url);
writeFileSync(out, JSON.stringify({ cols, rows, bits: Buffer.from(bits).toString('base64') }) + '\n');
console.log(`landmask.json: ${cols}x${rows}, ${count} land cells, ${bits.length} bytes`);

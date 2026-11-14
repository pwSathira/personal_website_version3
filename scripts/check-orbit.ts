// Checks src/lib/orbit.ts against SGP4 (satellite.js) for the committed TLE.
// Fails if the sub-satellite point drifts more than LIMIT_KM within a week.
import { readFileSync } from 'node:fs';
import * as sat from 'satellite.js';
import { parseTle, propagate } from '../src/lib/orbit.ts';

const LIMIT_KM = 150;
const tle = JSON.parse(readFileSync(new URL('../src/data/tle.json', import.meta.url), 'utf8'));
const rec = sat.twoline2satrec(tle.line1, tle.line2);
const el = parseTle(tle.line1, tle.line2);

const R = 6371;
const toRad = Math.PI / 180;
function greatCircleKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const h = Math.sin(((lat2 - lat1) * toRad) / 2) ** 2 +
    Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(((lon2 - lon1) * toRad) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

let worst = 0;
for (const days of [0, 0.5, 1, 2, 3, 5, 7]) {
  let max = 0;
  for (let s = 0; s < 6000; s += 60) {
    const t = el.epoch + days * 86_400_000 + s * 1000;
    const pv = sat.propagate(rec, new Date(t));
    if (!pv || typeof pv.position === 'boolean') throw new Error('SGP4 failed');
    const geo = sat.eciToGeodetic(pv.position, sat.gstime(new Date(t)));
    const mine = propagate(el, t);
    max = Math.max(max, greatCircleKm(sat.degreesLat(geo.latitude), sat.degreesLong(geo.longitude), mine.lat, mine.lon));
  }
  console.log(`day ${String(days).padEnd(3)} max error ${max.toFixed(1)} km`);
  worst = Math.max(worst, max);
}
if (worst > LIMIT_KM) {
  console.error(`orbit check failed: ${worst.toFixed(1)} km > ${LIMIT_KM} km`);
  process.exit(1);
}
console.log('orbit check passed');

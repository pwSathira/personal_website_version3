// Fetches the current RCM-1 TLE from CelesTrak for the hero ground track.
// If CelesTrak is down, the build keeps the committed tle.json.
import { writeFileSync } from 'node:fs';

const NORAD = 44322; // RCM-1, one of the satellites in Star-Sync's demo fleet
const url = `https://celestrak.org/NORAD/elements/gp.php?CATNR=${NORAD}&FORMAT=TLE`;
const out = new URL('../src/data/tle.json', import.meta.url);

try {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const [name, line1, line2] = (await res.text()).trim().split(/\r?\n/).map((l) => l.trim());
  if (!line1?.startsWith('1 ') || !line2?.startsWith('2 ')) throw new Error('unexpected response');
  writeFileSync(out, JSON.stringify({ name, line1, line2, fetched: new Date().toISOString() }, null, 2) + '\n');
  console.log(`tle.json: ${name} epoch ${line1.slice(18, 32)}`);
} catch (err) {
  console.warn(`tle.json not refreshed (${(err as Error).message}); using the committed copy`);
}

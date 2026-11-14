// Copies the master CV from CV Tailor into src/data/cv.json.
// The build machine can't read ~/.local/share, so the JSON is committed.
// Fields the site must never publish (phone) are dropped here.
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { parse } from 'yaml';

const source = process.env.CV_PATH ?? join(homedir(), '.local/share/cv-tailor/cv.yaml');
const cv = parse(readFileSync(source, 'utf8'));

delete cv.basics.phone;

const out = new URL('../src/data/cv.json', import.meta.url);
writeFileSync(out, JSON.stringify(cv, null, 2) + '\n');
console.log(`cv.json written from ${source}`);

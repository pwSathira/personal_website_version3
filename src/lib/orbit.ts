// A small orbit propagator for the hero ground track.
// Keplerian motion plus the J2 drift of the node and perigee. Against SGP4 it
// stays within about 35 km over a week for RCM-1 (scripts/check-orbit.ts), well under one map dot,
// and it costs about 1 KB instead of shipping satellite.js to every visitor.

const MU = 398600.4418; // km^3/s^2
const RE = 6378.137; // km
const J2 = 1.08262668e-3;
const DEG = Math.PI / 180;
const TAU = 2 * Math.PI;

export interface Elements {
  epoch: number; // ms since Unix epoch
  inc: number; // rad
  raan: number; // rad
  ecc: number;
  argp: number; // rad
  m0: number; // rad
  n: number; // rad/s
  a: number; // km
  raanDot: number; // rad/s
  argpDot: number; // rad/s
}

export interface SubPoint {
  lat: number; // deg
  lon: number; // deg, -180..180
  alt: number; // km
  ecef: [number, number, number]; // km
}

export function parseTle(line1: string, line2: string): Elements {
  const yy = Number(line1.slice(18, 20));
  const day = Number(line1.slice(20, 32));
  const year = yy < 57 ? 2000 + yy : 1900 + yy;
  const epoch = Date.UTC(year, 0, 1) + (day - 1) * 86_400_000;

  const inc = Number(line2.slice(8, 16)) * DEG;
  const raan = Number(line2.slice(17, 25)) * DEG;
  const ecc = Number('0.' + line2.slice(26, 33).trim());
  const argp = Number(line2.slice(34, 42)) * DEG;
  const m0 = Number(line2.slice(43, 51)) * DEG;
  const n = (Number(line2.slice(52, 63)) * TAU) / 86_400;

  const a = Math.cbrt(MU / (n * n));
  const p = a * (1 - ecc * ecc);
  const k = n * J2 * (RE / p) ** 2;
  const raanDot = -1.5 * k * Math.cos(inc);
  const argpDot = 0.75 * k * (5 * Math.cos(inc) ** 2 - 1);

  return { epoch, inc, raan, ecc, argp, m0, n, a, raanDot, argpDot };
}

// Greenwich mean sidereal time, radians.
export function gmst(ms: number): number {
  const d = ms / 86_400_000 + 2440587.5 - 2451545.0;
  return (((280.46061837 + 360.98564736629 * d) % 360) + 360) % 360 * DEG;
}

export function propagate(el: Elements, ms: number): SubPoint {
  const dt = (ms - el.epoch) / 1000;
  const M = el.m0 + el.n * dt;
  let E = M;
  for (let i = 0; i < 6; i++) E -= (E - el.ecc * Math.sin(E) - M) / (1 - el.ecc * Math.cos(E));
  const nu = 2 * Math.atan2(Math.sqrt(1 + el.ecc) * Math.sin(E / 2), Math.sqrt(1 - el.ecc) * Math.cos(E / 2));
  const r = el.a * (1 - el.ecc * Math.cos(E));
  const u = el.argp + el.argpDot * dt + nu;
  const O = el.raan + el.raanDot * dt;

  const cu = Math.cos(u), su = Math.sin(u), cO = Math.cos(O), sO = Math.sin(O), ci = Math.cos(el.inc);
  const x = r * (cO * cu - sO * su * ci);
  const y = r * (sO * cu + cO * su * ci);
  const z = r * su * Math.sin(el.inc);

  // Rotate into the Earth-fixed frame.
  const g = gmst(ms);
  const xe = x * Math.cos(g) + y * Math.sin(g);
  const ye = -x * Math.sin(g) + y * Math.cos(g);

  const lon = Math.atan2(ye, xe) / DEG;
  const lat = Math.atan2(z, Math.hypot(xe, ye)) / DEG;
  return { lat, lon, alt: r - RE, ecef: [xe, ye, z] };
}

// Elevation of the satellite above a station's horizon, degrees (spherical Earth).
export function elevation(sat: SubPoint, latDeg: number, lonDeg: number): number {
  const la = latDeg * DEG, lo = lonDeg * DEG;
  const up: [number, number, number] = [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)];
  const rx = sat.ecef[0] - RE * up[0], ry = sat.ecef[1] - RE * up[1], rz = sat.ecef[2] - RE * up[2];
  const range = Math.hypot(rx, ry, rz);
  return Math.asin((rx * up[0] + ry * up[1] + rz * up[2]) / range) / DEG;
}

// Earth central angle of a station's visibility circle for a satellite at alt km
// above a mask of maskDeg, in degrees.
export function footprintRadius(alt: number, maskDeg: number): number {
  const m = maskDeg * DEG;
  return (Math.acos((RE * Math.cos(m)) / (RE + alt)) - m) / DEG;
}

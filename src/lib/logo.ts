// The SS monogram, "dotted matrix" version.
//
// Geometry, on a 100 × 100 square (y down): four rings, inner radius 14 and
// outer radius 28, centred at (28,28), (72,28), (28,72) and (72,72). Picking
// quadrants from them gives the mark:
//   top-left ring      everything except its bottom-right quadrant
//   bottom-right ring  everything except its top-left quadrant
//   bottom-left ring   top-right quadrant (the lower S-bend), bottom-left quadrant (corner piece)
//   top-right ring     bottom-left quadrant (the upper S-bend), top-right quadrant (corner piece)
// The two S-bends pass within ~3 units of each other at the centre, which
// leaves the thin slit between the two counters.

const R_IN = 14;
const R_OUT = 28;
const LO = 28;
const HI = 72;

type Quad = 'tl' | 'tr' | 'bl' | 'br';
const RINGS: { cx: number; cy: number; quads: Quad[] }[] = [
  { cx: LO, cy: LO, quads: ['tl', 'tr', 'bl'] },
  { cx: HI, cy: HI, quads: ['tr', 'bl', 'br'] },
  { cx: LO, cy: HI, quads: ['tr', 'bl'] },
  { cx: HI, cy: LO, quads: ['tr', 'bl'] },
];

export function inMark(x: number, y: number): boolean {
  for (const { cx, cy, quads } of RINGS) {
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.hypot(dx, dy);
    if (d < R_IN || d > R_OUT) continue;
    const q = `${dy < 0 ? 't' : 'b'}${dx < 0 ? 'l' : 'r'}` as Quad;
    if (quads.includes(q)) return true;
  }
  return false;
}

// Centres of the grid cells that fall inside the mark, in reading order.
export function markPoints(cells: number): { x: number; y: number }[] {
  const cell = 100 / cells;
  const r = (n: number) => +n.toFixed(2);
  const out = [];
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      const x = (i + 0.5) * cell;
      const y = (j + 0.5) * cell;
      if (inMark(x, y)) out.push({ x: r(x), y: r(y) });
    }
  }
  return out;
}

// One dot per grid cell whose centre falls inside the mark, drawn as
// zero-length path segments with round caps: a single <path> instead of
// hundreds of <circle>s. Stroke it with stroke-width = cell × dot.
export function markDots(cells: number): { d: string; cell: number } {
  const d = markPoints(cells).map(({ x, y }) => `M${x} ${y}h0`).join('');
  return { d, cell: 100 / cells };
}

// The same mark as solid shapes: one annular sector per run of quadrants,
// matching the solid SS from the 2024 logo. Overlapping sectors share a fill,
// so they merge without seams. Angles are degrees, clockwise from +x (y down).
const SECTORS: [cx: number, cy: number, from: number, to: number][] = [
  [LO, LO, 90, 360], // top-left ring: bl, tl, tr
  [HI, HI, -90, 180], // bottom-right ring: tr, br, bl
  [LO, HI, 270, 360], // bottom-left ring: tr (lower S-bend)
  [LO, HI, 90, 180], //                   bl (corner piece)
  [HI, LO, 90, 180], // top-right ring: bl (upper S-bend)
  [HI, LO, 270, 360], //                tr (corner piece)
];

export function markSolid(): string {
  const r = (n: number) => +n.toFixed(3);
  const pt = (cx: number, cy: number, rad: number, deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${r(cx + rad * Math.cos(a))} ${r(cy + rad * Math.sin(a))}`;
  };
  return SECTORS.map(([cx, cy, a0, a1]) => {
    const large = a1 - a0 > 180 ? 1 : 0;
    return (
      `M${pt(cx, cy, R_OUT, a0)}A${R_OUT} ${R_OUT} 0 ${large} 1 ${pt(cx, cy, R_OUT, a1)}` +
      `L${pt(cx, cy, R_IN, a1)}A${R_IN} ${R_IN} 0 ${large} 0 ${pt(cx, cy, R_IN, a0)}Z`
    );
  }).join('');
}

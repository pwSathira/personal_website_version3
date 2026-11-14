// Equirectangular map window shared by the land-mask build and the hero canvas.
export const MAP = {
  step: 1.5, // degrees per cell
  latTop: 81,
  latBottom: -60,
  cols: 240,
  rows: 94,
} as const;

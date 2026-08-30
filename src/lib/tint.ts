// src/lib/tint.ts
// Build-time dominant-colour helpers for the featured card (index.astro).
export interface Tint {
  from: number[];
  to: number[];
}

function rgb(c: number[]): string {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export function tintBg(c: Tint): string {
  return `linear-gradient(135deg, ${rgb(c.from)}, ${rgb(c.to)})`;
}

function lum(c: number[]): number {
  return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
}

/** True when the tint is bright — pick dark text, else white text. */
export function isLightTint(c: Tint): boolean {
  return (lum(c.from) + lum(c.to)) / 2 > 0.52;
}
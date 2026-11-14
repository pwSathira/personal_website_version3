import cv from '../data/cv.json';
import { site, featuredWork, otherWork, education } from '../data/site';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const BUILD_TIME = new Date();

// "Oct 2025 -- Present" -> [Date, Date | null]
export function parseRange(range: string): [Date, Date | null] {
  const [a, b] = range.split(/\s*--\s*/);
  return [parseMonth(a), /present/i.test(b) ? null : parseMonth(b)];
}

function parseMonth(s: string): Date {
  const [m, y] = s.trim().split(/\s+/);
  return new Date(Date.UTC(Number(y), MONTHS.indexOf(m.slice(0, 3).toLowerCase()), 1));
}

export function formatRange(range: string): string {
  return range.replace(/\s*--\s*/, ' – ');
}

export interface Pass {
  id: string;
  lane: 'study' | 'software' | 'other';
  label: string;
  title: string;
  org: string;
  dates: string;
  start: Date;
  end: Date | null;
  location?: string;
  bullets: string[];
  details?: string;
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function passes(): Pass[] {
  const out: Pass[] = [];
  for (const job of cv.experience) {
    const f = featuredWork[job.company];
    const o = otherWork[job.company];
    if (!f && !o) continue;
    const [start, end] = parseRange(job.dates);
    out.push({
      id: slug(job.company),
      lane: f ? 'software' : 'other',
      label: (f ?? o).label,
      title: (f ?? o).role,
      org: job.company.replace(/\s*\(Agence spatiale canadienne\)/, ''),
      dates: job.dates,
      start,
      end,
      location: job.location,
      bullets: f ? f.bullets.map((i) => job.bullets[i]).filter(Boolean) : [],
    });
  }
  for (const ed of cv.education) {
    const e = education[ed.school];
    if (!e) continue;
    const dates = e.dates ?? (ed as { dates?: string }).dates!;
    const [start, end] = parseRange(dates);
    out.push({
      id: slug(ed.school),
      lane: 'study',
      label: e.label,
      title: ed.degree,
      org: ed.school,
      dates,
      start,
      end,
      bullets: [],
      details: (ed.details ?? '').trim(),
    });
  }
  return out.sort((a, b) => b.start.getTime() - a.start.getTime());
}

export const basics = { ...cv.basics, ...site };
export const certifications: string[] = cv.certifications;
export const awards: string[] = cv.awards;

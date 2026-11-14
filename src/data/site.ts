// Website-only choices layered over cv.json (synced from CV Tailor).
// cv.yaml offers several titles and framings per job; this file picks one set.
// Bullet numbers are indexes into that job's `bullets` list in cv.yaml.

export const site = {
  url: 'https://pwsathira.polywertz.com',
  title: 'Sathira Williams',
  role: 'Full-stack developer',
  // One sentence under the name. Keep it to what a recruiter can verify.
  intro:
    'I build and maintain web applications end to end. My work spans production web development, satellite scheduling, and tools people use to learn.',
  status: { open: true, text: 'Open to full-stack roles', where: 'Vancouver or remote' },
  // Swap for '/Sathira_Williams_Resume.pdf' once a general full-stack PDF from CV Tailor is in public/.
  resumeUrl: 'https://drive.google.com/file/d/1AfqHo7Ysz6C7jYDawVSYnAzfehm02uEb/view',
  station: { code: 'GS-VAN', name: 'Vancouver', lat: 49.2827, lon: -123.1207, mask: 5, tz: 'America/Vancouver' },
  links: {
    github: 'https://github.com/pwSathira',
    linkedin: 'https://www.linkedin.com/in/pwSathira/',
    x: 'https://x.com/polywertz',
  },
};

// Jobs shown with full detail in the pass log, keyed by cv.yaml `company`.
export const featuredWork: Record<string, { role: string; label: string; bullets: number[] }> = {
  'Verus Human Optimization': { role: 'Full-Stack Developer', label: 'Verus', bullets: [2, 0, 3] },
  'Canadian Space Agency (Agence spatiale canadienne) Capstone Project': {
    role: 'Full-Stack Developer (Capstone)',
    label: 'CSA capstone',
    bullets: [2, 3, 5],
  },
  'Dnipro Electric Inc.': { role: 'Software Engineer Intern', label: 'Dnipro', bullets: [4, 5] },
};

// Jobs shown as thin bars only, so the timeline has no gaps.
export const otherWork: Record<string, { role: string; label: string }> = {
  'Ocean Spray': { role: 'Data Entry & Records Clerk', label: 'Ocean Spray' },
  'Outlier AI': { role: 'AI Data Annotator', label: 'Outlier' },
  'Chuck E Cheese': { role: 'Gameroom Attendant', label: 'Chuck E Cheese' },
};

export const education: Record<string, { label: string; dates?: string }> = {
  'Georgia Institute of Technology': { label: 'Georgia Tech', dates: 'Jan 2026 -- Present' },
  'York University': { label: 'York' },
};

// Spec sheet: every item must appear in cv.yaml's skills.
export const skills: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Vue / Nuxt', 'TailwindCSS'] },
  { group: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Java', 'Spring Boot', 'tRPC, Prisma, Zod'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ', 'MinIO'] },
  { group: 'Infrastructure', items: ['Docker & Compose', 'GitHub Actions', 'Linux', 'Azure', 'Vercel & Cloudflare Pages'] },
  { group: 'Practice', items: ['PyTest & JUnit', 'Structured logging', 'Agile sprints in JIRA', 'Technical writing'] },
];

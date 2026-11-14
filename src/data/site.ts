// Website-only choices layered over cv.json (synced from CV Tailor).
// cv.yaml offers several titles and framings per job; this file picks one set.
// Bullet numbers are indexes into that job's `bullets` list in cv.yaml.

export const site = {
  url: 'https://pwsathira.polywertz.com',
  title: 'Sathira Williams',
  role: 'Full-stack developer',
  // One sentence under the name. Keep it to what a recruiter can verify.
  intro:
    'I turn complex requirements into working software: web applications at Verus, satellite scheduling for a CSA capstone, and tools used by language learners.',
  status: { open: true, text: 'Open to full-stack roles', where: 'Vancouver or remote' },
  resumeUrl: '/Sathira_Williams_Resume.pdf',
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

// Short, factual summaries for recruiters; the case studies hold the detail.
export const projectBriefs: Record<string, { category: string; contribution: string; outcome: string; context: string; lessons: string[] }> = {
  'star-sync': {
    category: 'Full-stack · Satellite scheduling',
    contribution: 'Built Next.js interfaces and FastAPI integrations in a five-person CSA capstone; independently rebuilt the scheduler and browser demo in 2026.',
    outcome: 'Valid satellite visibility across 100% of booked time, up from 16% on the benchmark workload.',
    context: 'Measured on a generated workload of 6 satellites, 3 stations, and 150 requests. This is a correctness benchmark, not a production utilization metric.',
    lessons: ['Model real constraints before optimizing scheduling speed.', 'Make complex software easy to evaluate with a working browser demo.'],
  },
  'anki-audio-extractor': {
    category: 'Developer tool · Language learning',
    contribution: 'Designed and shipped the extraction logic, desktop app, automated installers, and Anki add-on as a solo developer.',
    outcome: '338 AnkiWeb downloads reported in the case study.',
    context: 'Supports legacy packages with a JSON media map. Newer compressed package formats are not supported yet.',
    lessons: ['Ship inside the workflow users already trust.', 'Separate the core extraction logic from its delivery platform.'],
  },
  'blue-link': {
    category: 'Independent project · Java + Azure',
    contribution: 'Took a records-management concept from Illustrator mockups to a Java Swing client and Azure SQL database over eight months.',
    outcome: 'An end-to-end student project covering UI design, relational data, and application services.',
    context: 'A student prototype, not deployed police software. Direct database access informed the API-based design of its successor, NyxOps.',
    lessons: ['Design the screens before building the components.', 'Keep credentials and authorization behind an API boundary.'],
  },
};

export const experienceSummaries: Record<string, string[]> = {
  'Verus Human Optimization': [
    'Own frontend and backend improvements for a small-business web platform. Over a 30-day period, sessions grew 168% and unique visitors grew 213%.',
    'Maintain web infrastructure, diagnose performance issues, and document APIs and operational runbooks.',
  ],
  'Canadian Space Agency Capstone Project': [
    'Built FastAPI endpoints and PostgreSQL integrations for a satellite ground-station scheduling application.',
    'Designed relational data structures and API specifications; coordinated sprints and reviewed pull requests in a five-student team.',
  ],
  'Dnipro Electric Inc.': [
    'Built, deployed, and handed over a production Next.js website with customer inquiry intake and follow-up.',
    'Optimized assets and page delivery, reducing average load time by 30% and increasing engagement metrics by 15%+.',
  ],
};

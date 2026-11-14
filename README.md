# pwsathira.polywertz.com

Source for Sathira Williams's portfolio. It's a static Astro site with about 5 KB of JavaScript, which draws the live satellite ground track on the homepage.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server at `localhost:4321`. |
| `npm run build` | Fetches a fresh TLE, then builds the site into `dist/`. |
| `npm run check` | Type-checks the project and compares the orbit propagator with SGP4. |
| `npm run sync:cv` | Copies the master CV from CV Tailor into `src/data/cv.json`. |
| `npm run build:map` | Rebuilds the land mask for the hero map. You only need this if you change `src/lib/map.ts`. |

You need Node.js 22.18 or later, because the scripts in `scripts/` are TypeScript files run directly by Node.

## Where the content lives

- `src/data/cv.json` holds jobs, education, skills and certificates. Don't edit it by hand: edit `cv.yaml` in CV Tailor, then run `npm run sync:cv`. The sync drops the phone number. Set `CV_PATH` to read a different file.
- `src/data/site.ts` chooses what the website shows from the CV: one title and a few bullets per job, the skill groups, the status line and the résumé link.
- `src/content/missions/*.mdx` holds the case studies. The frontmatter fills the homepage rows; the schema is in `src/content.config.ts`.

Placeholders render with an orange dashed outline (class `todo`) so they're hard to miss.

## The ground track

`scripts/fetch-tle.ts` downloads RCM-1's orbital elements from CelesTrak during each build. If CelesTrak doesn't respond, the build keeps the committed `src/data/tle.json`. In the browser, `src/lib/orbit.ts` propagates the orbit with Kepler's equation plus J2 drift. That's about 1 KB, compared with roughly 40 KB for satellite.js. `npm run check` fails if the propagator drifts more than 150 km from SGP4 within a week; it currently stays under 35 km.

The `Nightly rebuild` workflow calls a deploy hook every night so the elements stay fresh. Add the hook URL as the `DEPLOY_HOOK_URL` repository secret.

## Deploying

The build output is plain files in `dist/`.

| Host | Settings |
| --- | --- |
| Cloudflare Pages | Build command `npm run build`, output directory `dist`. `public/_redirects` and `public/_headers` set redirects and cache headers. |
| Vercel | Import the repository; `vercel.json` sets the same redirects and headers. |

Old `/blog` URLs redirect to the homepage, except the Anki post, which redirects to its case study.

### Résumé

The header and contact links serve `public/Sathira_Williams_Resume.pdf` directly, so readers do not need Google Drive. The print-friendly source is `src/pages/resume.astro`, which uses the site's CV data and editorial experience summaries. After updating the CV or résumé copy, open `/resume`, print to PDF with A4 paper and browser headers/footers disabled, and replace the public PDF. The print stylesheet supplies the page margins.

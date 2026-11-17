# My personal website

My portfolio, built with Astro and TypeScript. It has my projects, work experience, and write-ups about what I built, the decisions I made, and what I'd do differently.

**[Visit the site →](https://pwsathira.polywertz.com)**

## Running it locally

You'll need Node.js 26 LTS (see `.node-version`).

```sh
npm ci
npm run dev
```

The site runs at `http://localhost:4321`.

```sh
npm run check   # Type checks and orbit validation
npm run build   # Build the static site into dist/
npm run preview # Preview the production build
```

## What's on the site

- **Star-Sync:** a satellite ground-station scheduler that started as my Canadian Space Agency capstone. I later rebuilt the scheduler and made a browser demo.
- **Anki Audio Extractor:** a tool I made to pull audio out of Anki decks, available as an add-on and a desktop app.
- **Blue-Link:** a Java desktop prototype for managing records, with an interface I designed in Illustrator and a database on Azure.

There's also a live satellite map. It tracks RCM-1 and shows its upcoming passes over Vancouver. The orbital data comes from CelesTrak at build time, and the browser calculates the position. If the fetch fails, the build uses the saved data.

## Making changes

| What to change | Where to look |
| --- | --- |
| Intro, availability, project summaries, and experience copy | `src/data/site.ts` |
| Project case studies | `src/content/missions/` |
| Homepage sections | `src/components/` |
| Colours, typography, and shared styles | `src/styles/global.css` |
| Page layout and navigation | `src/layouts/Base.astro` |
| Print-friendly résumé | `src/pages/resume.astro` |

I keep the master CV in a separate CV Tailor project. `npm run sync:cv` copies its content into `src/data/cv.json` without the phone number. Set `CV_PATH` if your copy lives somewhere else. The website-specific wording and choices stay in `src/data/site.ts`.

The downloadable résumé is `public/Sathira_Williams_Resume.pdf`. After changing the résumé content, open `/resume` and print to PDF using A4 paper with browser headers and footers turned off. Replace the PDF in `public/` with the new copy.

## Deployment

The site builds to plain files in `dist/`. For Vercel, the build and routing settings are in `vercel.json`. For Cloudflare Pages, use `npm run build` as the build command and `dist` as the output directory.

The old blog URLs redirect to the homepage or the relevant case study.

The weekly TLE rebuild workflow runs on Mondays at 10:17 UTC to keep the satellite data fresh. You can also run it manually from GitHub Actions. In Vercel, create a deploy hook under the project's Settings → Git → Deploy Hooks for the `master` branch, then save its URL as the `DEPLOY_HOOK_URL` repository secret in GitHub. The hook requests a deployment; check Vercel for the build result.


Vercel Web Analytics is included through the shared Astro layout. Enable Web Analytics in the Vercel project dashboard; page views are collected after deployment.

Shared links use `public/social-card.png` for Twitter/X and Open Graph previews. After changing the card design in `scripts/build-social-card.ts`, run `npm run build:social` and commit the generated image.

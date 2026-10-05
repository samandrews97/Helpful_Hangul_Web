# Helpful Hangul Web

[![CI](https://github.com/samandrews97/Helpful_Hangul_Web/actions/workflows/ci.yml/badge.svg)](https://github.com/samandrews97/Helpful_Hangul_Web/actions/workflows/ci.yml)

The React frontend for Helpful Hangul, a reference for Korean pronunciation. It lets you browse the 40 basic jamo (the letters of Hangul) and see how a final consonant changes sound depending on the consonant that follows it.

**Live demo:** https://d1aq0uzqqm175a.cloudfront.net

**API repo:** [Helpful_Hangul](https://github.com/samandrews97/Helpful_Hangul) (Spring Boot, PostgreSQL)

## Tech stack

- React 19, plain JavaScript
- React Router 7
- Vite
- Vitest and React Testing Library
- Oxlint
- Hosted on AWS S3 behind CloudFront

## Pages

| Route | Page | What it shows |
| --- | --- | --- |
| `/` | Home | Links to the two sections |
| `/jamo` | Jamo list | Every jamo, linking to its detail page |
| `/jamo/:id` | Jamo detail | Romanisation, type, manner, and which syllable positions the jamo can occupy |
| `/sound-change-rules` | Rules list | Each jamo that has sound change rules |
| `/sound-change-rules/:id` | Rules detail | Every rule triggered by that jamo: the following jamo, the resulting sound, and the rule type |

In `/sound-change-rules/:id`, the id is a jamo id, not a rule id. The page shows all rules for one final consonant together.

## Project structure

```
src/
  main.jsx        Entry point, sets up the router
  App.jsx         Route definitions
  api.js          fetchJson wrapper around fetch
  pages/          One component per route, with its test beside it
```

## Design decisions

- **One place for API calls.** Every page fetches through `fetchJson` in `src/api.js`, which adds the base URL and throws on a non-2xx response. Tests mock this one module instead of the global `fetch`.
- **API address set by environment.** `VITE_API_BASE_URL` defaults to `http://localhost:8080/api` for local development. The production build sets it to `/api`, a relative path, because CloudFront serves the frontend and forwards `/api/*` to the backend on the same origin. That avoids mixed content errors and cross-origin requests.
- **Rules grouped by jamo.** The API returns a flat list of rules. The rules list page reduces it to one entry per trigger jamo, so you pick a consonant first and then see everything that can happen to it.
- **Tests query the page as a user would.** They look up links and headings by role and visible text, and render pages inside a `MemoryRouter` so route parameters work as they do in the browser.

## Running locally

Requirements: Node.js 24 (or 22.12 and later), and the [API](https://github.com/samandrews97/Helpful_Hangul) running on http://localhost:8080.

```bash
git clone https://github.com/samandrews97/Helpful_Hangul_Web.git
cd Helpful_Hangul_Web
npm install
npm run dev
```

The app starts on http://localhost:5173. The API's CORS configuration allows this origin.

To use an API at a different address, create a `.env.local` file:

```
VITE_API_BASE_URL=http://localhost:9090/api
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm test` | Run the test suite once |
| `npm run lint` | Lint with Oxlint |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |

GitHub Actions runs the linter, the tests and the build on every push.

## Deployment

`npm run build` produces a static site in `dist/`, which is uploaded to a private S3 bucket and served through CloudFront. CloudFront returns `index.html` for unknown paths, so a client-side route such as `/jamo/3` still loads after a refresh or when opened directly.

## Status and roadmap

This is an early version (0.1). All five pages work against the live API. The API currently has sound change rules for ㄱ only, so that is the only entry in the rules section.

- [ ] Error and empty states when a request fails or an id does not exist
- [ ] Styling and layout
- [ ] Audio playback for each jamo

## How this was built

I built this project with Claude Code as a pair programmer, and the commit history reflects that. This was my first React project. I wrote the page components and the data fetching myself, and decided how the pages and routes are organised. AI assistance covered scaffolding, test setup, debugging and documentation. I reviewed every change, and I can explain every design decision in this repo.

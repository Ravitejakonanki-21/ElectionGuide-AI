# ElectionGuide AI (VoteReady AI)

**Tagline**: “ElectionGuide AI – Your simple, interactive guide to understanding elections, timelines, and voting with confidence.”

ElectionGuide AI is a **neutral, non-partisan, beginner-friendly** CivicTech web app that explains the election journey step-by-step using:
- Interactive **process flow**
- Visual **timeline**
- **Eligibility checker**
- Smart **documents checklist** + downloadable summary
- **AI-style assistant** (demo mode: local knowledge base, no external AI calls)
- **First Vote Journey** wizard
- **Readiness quiz**
- **FAQ + Myth vs Fact**
- **Polling Day Confidence Mode**

## Safety + neutrality disclaimer
This platform is for **educational guidance only** and does **not** endorse any political party or candidate. Always verify final rules and dates with your official election authority.

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Zustand (local persistence via `localStorage`)
- Data-driven mock content in `data/*.json`

## Getting started (local dev)
From the `vote/` directory:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## App routes (judge-friendly)
- `/` Home (hero + quick actions + readiness snapshot)
- `/process` Interactive election process flow
- `/timeline` Timeline visualizer + deadline alerts (demo)
- `/first-vote` First Vote Journey wizard
- `/eligibility` Eligibility checker
- `/documents` Documents & checklist + download summary
- `/assistant` AI Election Assistant (demo, local knowledge base)
- `/learn` FAQ + Myth vs Fact
- `/polling-day` Polling Day Confidence Mode
- `/quiz` Election readiness quiz

## Demo walkthrough (2–3 minutes)
1. Open **Home** and point out the **readiness snapshot**.\n+2. Go to **Eligibility** and generate a result.\n+3. Go to **Documents** and tick a few items.\n+4. Open **First Vote Journey** and mark a step complete.\n+5. Use **Ask AI** and click a suggested question.\n+6. Finish the **Quiz** and show the result.\n+7. Open **Polling Day Confidence Mode** for the “last-mile” checklist.\n+
Readiness progress persists on this device via `localStorage`.

## Project structure
- `app/` Next.js routes\n+- `components/` reusable UI + feature components\n+- `data/` mock JSON datasets (steps, timeline, docs, FAQ, myths, regions, quiz, deadlines, chat)\n+- `lib/` typed loaders + readiness scoring + chat engine + persistence helpers


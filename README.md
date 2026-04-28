# ElectionGuide AI

[![CI](https://github.com/Ravitejakonanki-21/ElectionGuide-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/Ravitejakonanki-21/ElectionGuide-AI/actions/workflows/ci.yml)

> **"ElectionGuide AI – Your simple, interactive guide to understanding elections, timelines, and voting with confidence."**

ElectionGuide AI is a **neutral, non-partisan, beginner-friendly** CivicTech web app built with Next.js and powered by **Google Gemini AI**. It explains the election journey step-by-step.

🔗 **Live Demo**: https://election-guide-ai-679254492.us-central1.run.app

---

## Features

- 🤖 **AI Election Assistant** — powered by Google Gemini 2.0 Flash, with local knowledge base fallback
- 📋 **Eligibility Checker** — interactive eligibility assessment
- 📅 **Election Timeline** — visual step-by-step timeline with deadline alerts
- 📄 **Documents Checklist** — smart checklist with downloadable PDF summary
- 🗺️ **First Vote Journey** — guided wizard for first-time voters
- 📊 **Readiness Quiz** — election readiness scoring
- ❓ **FAQ & Myth vs Fact** — civic myth-busting
- 🗳️ **Polling Day Confidence Mode** — last-mile checklist

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| AI | Google Gemini 2.0 Flash (`@google/generative-ai`) |
| Analytics | Google Analytics 4 |
| Deployment | Google Cloud Run |
| Styling | Tailwind CSS + Framer Motion |
| State | Zustand (localStorage persistence) |
| Testing | Jest + ts-jest + Testing Library |

---

## Getting Started

```bash
# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Recommended | Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey)) |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional | Google Analytics 4 Measurement ID |

> Without `GEMINI_API_KEY`, the assistant falls back to the local knowledge base automatically.

---

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Start production server
npm test           # Run unit tests with coverage
npm run lint       # Lint with ESLint
npm run lint:fix   # Auto-fix lint issues
```

---

## Testing

```bash
npm test
```

- **35 unit tests** covering: chat engine, readiness scoring, input sanitization
- Coverage reports in `coverage/` directory
- CI runs tests automatically on every push via GitHub Actions

---

## Security

- **Content Security Policy (CSP)** headers
- **X-Frame-Options: DENY** — prevents clickjacking
- **HSTS** — enforces HTTPS
- **Input sanitization** — strips XSS, enforces 500-char limit
- **Rate limiting** — 30 req/min per IP on `/api/chat`

---

## App Routes

| Route | Description |
|---|---|
| `/` | Home — hero + readiness snapshot |
| `/process` | Interactive election process flow |
| `/timeline` | Timeline visualizer + deadline alerts |
| `/eligibility` | Eligibility checker |
| `/documents` | Documents checklist + download |
| `/assistant` | AI Election Assistant (Gemini) |
| `/first-vote` | First Vote Journey wizard |
| `/learn` | FAQ + Myth vs Fact |
| `/polling-day` | Polling Day Confidence Mode |
| `/quiz` | Election readiness quiz |
| `/sitemap.xml` | XML sitemap for SEO |

---

## Deployment (Google Cloud Run)

```bash
# Build and push image
gcloud builds submit --project election-494710 --tag gcr.io/election-494710/election-guide-ai:latest .

# Deploy to Cloud Run
gcloud run deploy election-guide-ai \
  --image gcr.io/election-494710/election-guide-ai:latest \
  --region us-central1 --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=your_key"
```

---

## Project Structure

```
├── app/                  # Next.js App Router pages + API routes
│   ├── api/chat/         # Gemini AI chat endpoint
│   ├── assistant/        # AI assistant page
│   └── ...               # All other routes
├── components/           # Reusable UI + feature components
├── data/                 # JSON knowledge base (chat, quiz, docs, etc.)
├── lib/                  # Core logic: chatEngine, readiness, sanitize, analytics
├── __tests__/            # Jest unit tests
└── .github/workflows/    # GitHub Actions CI
```

---

## Safety & Neutrality

This platform is for **educational guidance only** and does **not** endorse any political party or candidate. Always verify final rules and dates with your official election authority.

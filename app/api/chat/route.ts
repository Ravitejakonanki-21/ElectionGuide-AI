import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sanitizeChatInput, validateChatInput } from "@/lib/sanitize";
import { answerQuestion } from "@/lib/chatEngine";

// ─── Gemini AI integration ───────────────────────────────────────────────────
// Falls back to local knowledge base if GEMINI_API_KEY is not configured.

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const USE_GEMINI = Boolean(GEMINI_API_KEY);

const GEMINI_SYSTEM_PROMPT = `You are ElectionGuide AI, a neutral, non-partisan assistant that helps first-time voters understand election processes, timelines, eligibility, documents, and polling day procedures.

Rules:
- Only answer questions about election procedures, civic processes, voter eligibility, documents, and timelines.
- Never recommend or endorse any political party, candidate, or political opinion.
- Keep answers concise, beginner-friendly, and step-by-step.
- If asked anything outside elections/civic topics, politely redirect to election-related questions.
- Always remind users to verify final rules with their official election authority.`;

async function askGemini(question: string): Promise<string | null> {
  if (!USE_GEMINI) return null;

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: GEMINI_SYSTEM_PROMPT,
    });

    const result = await model.generateContent(question);
    const text = result.response.text();
    return text ?? null;
  } catch {
    // Gracefully fall back to local knowledge base on any error
    return null;
  }
}

// ─── Rate limiting (simple in-memory, resets on cold start) ─────────────────
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // requests per minute per IP
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

  // Rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("question" in body)) {
    return NextResponse.json({ error: "Missing 'question' field." }, { status: 400 });
  }

  const rawQuestion = (body as Record<string, unknown>).question;
  if (typeof rawQuestion !== "string") {
    return NextResponse.json({ error: "'question' must be a string." }, { status: 400 });
  }

  // Sanitize + validate
  const sanitized = sanitizeChatInput(rawQuestion);
  const validation = validateChatInput(sanitized);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 422 });
  }

  // Try Gemini first, fall back to local engine
  const geminiAnswer = await askGemini(sanitized);
  if (geminiAnswer) {
    return NextResponse.json(
      { source: "gemini", answer: geminiAnswer },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  }

  // Local knowledge base fallback
  const localAnswer = answerQuestion(sanitized);
  return NextResponse.json(
    { source: "local", intentId: localAnswer.intentId, answer: localAnswer.answer, learnMore: localAnswer.learnMore },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}

export async function GET() {
  return NextResponse.json(
    { status: "ok", mode: USE_GEMINI ? "gemini" : "local", version: "1.0.0" },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
}

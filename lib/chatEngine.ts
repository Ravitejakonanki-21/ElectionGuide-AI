import { getChatIntents } from "@/lib/data";
import type { ChatBlock, ChatIntent } from "@/lib/types";

/** Normalizes text for consistent keyword matching. */
function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Scores an intent against a query based on keyword overlap. */
function scoreIntent(q: string, intent: ChatIntent) {
  const nq = normalize(q);
  let score = 0;
  for (const kw of intent.keywords) {
    const nkw = normalize(kw);
    if (!nkw) continue;
    if (nq.includes(nkw)) score += Math.min(8, 2 + Math.floor(nkw.length / 6));
  }
  return score;
}

export type ChatAnswer = {
  intentId: string;
  answer: ChatBlock[];
  learnMore?: ChatBlock[];
};

/** Simple LRU-style cache for repeated identical queries (max 50 entries). */
const answerCache = new Map<string, ChatAnswer>();
const CACHE_MAX = 50;

/**
 * Answers a user question using the local intent knowledge base.
 * Results are cached in-memory so repeated identical questions are O(1).
 *
 * @param question - Raw user question string
 * @returns A ChatAnswer with intentId, answer blocks, and optional learnMore blocks
 */
export function answerQuestion(question: string): ChatAnswer {
  const cacheKey = normalize(question);

  if (answerCache.has(cacheKey)) {
    return answerCache.get(cacheKey)!;
  }

  const intents = getChatIntents() as ChatIntent[];
  const scored = intents
    .map((i) => ({ i, s: scoreIntent(question, i) }))
    .sort((a, b) => b.s - a.s);

  const best = scored[0];
  let result: ChatAnswer;

  if (!best || best.s <= 0) {
    result = {
      intentId: "fallback",
      answer: [
        {
          type: "text",
          content:
            "I can help with eligibility, registration, voter list issues, documents, polling day steps, and counting/results. Try one of the suggested questions.",
        },
      ],
      learnMore: [
        {
          type: "steps",
          title: "Good next questions",
          content: [
            "How do I register as a voter?",
            "What documents do I need on polling day?",
            "What if my name is missing from the voter list?",
          ],
        },
      ],
    };
  } else {
    result = { intentId: best.i.id, answer: best.i.answer, learnMore: best.i.learnMore };
  }

  // Evict oldest entry if cache is full
  if (answerCache.size >= CACHE_MAX) {
    const firstKey = answerCache.keys().next().value;
    if (firstKey !== undefined) answerCache.delete(firstKey);
  }
  answerCache.set(cacheKey, result);

  return result;
}

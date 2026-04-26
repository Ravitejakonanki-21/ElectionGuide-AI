"use client";

import { getChatIntents } from "@/lib/data";
import type { ChatBlock, ChatIntent } from "@/lib/types";

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

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

export function answerQuestion(question: string): ChatAnswer {
  const intents = getChatIntents() as ChatIntent[];
  const scored = intents
    .map((i) => ({ i, s: scoreIntent(question, i) }))
    .sort((a, b) => b.s - a.s);

  const best = scored[0];
  if (!best || best.s <= 0) {
    return {
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
  }

  return { intentId: best.i.id, answer: best.i.answer, learnMore: best.i.learnMore };
}


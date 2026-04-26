"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useChatDraftStore } from "@/components/chat/chatDraftStore";
import { MessageCircleQuestion } from "lucide-react";

const suggestions = [
  "Am I eligible to vote?",
  "How do I register as a voter?",
  "What documents are required?",
  "What if my name is missing from the voter list?",
  "Can I vote without a voter ID card?",
  "What should I carry on polling day?",
  "What happens after I cast my vote?",
];

export function SuggestedQuestions() {
  const { setDraft } = useChatDraftStore();

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Suggested questions"
        description="Tap to load into the chat input."
        right={
          <MessageCircleQuestion
            className="h-5 w-5 text-[var(--color-primary)]"
            aria-hidden="true"
          />
        }
      />
      <CardContent>
        <div className="grid gap-2">
          {suggestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setDraft(q)}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 text-left text-sm text-black/80 transition hover:bg-white/60 dark:text-white/80 dark:hover:bg-white/10"
            >
              {q}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { ChatBlock } from "@/lib/types";
import { useChatDraftStore } from "@/components/chat/chatDraftStore";
import { sanitizeChatInput, MAX_INPUT_LENGTH } from "@/lib/sanitize";
import { trackChatQuestion } from "@/lib/analytics";
import { Bot, ChevronDown, Send, User } from "lucide-react";

type Msg = {
  id: string;
  role: "user" | "assistant";
  blocks: ChatBlock[];
  learnMore?: ChatBlock[];
  geminiText?: string;
};

function renderBlock(b: ChatBlock) {
  if (b.type === "text") {
    return <div className="text-sm text-black/80 dark:text-white/80">{b.content as string}</div>;
  }
  if (b.type === "callout") {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
        {b.title ? <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">{b.title}</div> : null}
        <div className="mt-1 text-sm text-black/80 dark:text-white/80">{b.content as string}</div>
      </div>
    );
  }
  const items = b.content as string[];
  return (
    <div>
      {b.title ? <div className="text-sm font-semibold">{b.title}</div> : null}
      <ul className="mt-2 grid gap-1.5 text-sm text-black/70 dark:text-white/70">
        {items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AIChatPanel() {
  const { draft, setDraft } = useChatDraftStore();
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      blocks: [
        {
          type: "text",
          content:
            "Hi! Ask me about eligibility, registration, documents, polling day steps, voter list issues, or what happens after voting.",
        },
      ],
      learnMore: [
        {
          type: "callout",
          title: "Neutrality note",
          content:
            "I explain process and logistics only. I don't recommend parties or candidates.",
        },
      ],
    },
  ]);

  useMemo(() => {
    if (draft) setInput(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  async function send(text: string) {
    const sanitized = sanitizeChatInput(text);
    if (!sanitized) return;
    setDraft("");
    setInput("");
    setLoading(true);

    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: "user",
      blocks: [{ type: "text", content: sanitized }],
    };
    setMessages((m) => [...m, userMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: sanitized }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json() as {
        source: "gemini" | "local";
        intentId?: string;
        answer: ChatBlock[] | string;
        learnMore?: ChatBlock[];
      };

      trackChatQuestion(data.intentId ?? data.source);

      let assistantMsg: Msg;
      if (data.source === "gemini" && typeof data.answer === "string") {
        assistantMsg = {
          id: `a-${Date.now()}`,
          role: "assistant",
          blocks: [{ type: "text", content: data.answer }],
          geminiText: data.answer,
        };
      } else {
        assistantMsg = {
          id: `a-${Date.now()}`,
          role: "assistant",
          blocks: data.answer as ChatBlock[],
          learnMore: data.learnMore,
        };
      }

      setMessages((m) => [...m, assistantMsg]);
    } catch {
      // Fallback: import local engine dynamically to avoid bundle bloat
      const { answerQuestion } = await import("@/lib/chatEngine");
      const ans = answerQuestion(sanitized);
      trackChatQuestion(ans.intentId);
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: "assistant", blocks: ans.answer, learnMore: ans.learnMore },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Chat"
        description="AI Election Assistant — powered by Gemini."
        right={<Bot className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />}
      />
      <CardContent>
        <div className="grid gap-3">
          {/* aria-live region announces new messages to screen readers */}
          <div
            ref={liveRef}
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions"
            className="max-h-[420px] overflow-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] p-3"
            role="log"
            aria-label="Chat messages"
          >
            <div className="grid gap-3">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={[
                      "max-w-[92%] rounded-2xl border px-4 py-3",
                      m.role === "user"
                        ? "border-[var(--color-border)] bg-[var(--color-card)]"
                        : "border-[var(--color-border)] bg-white/60 dark:bg-white/10",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                      {m.role === "user" ? (
                        <User className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Bot className="h-4 w-4" aria-hidden="true" />
                      )}
                      {m.role === "user" ? "You" : "Election AI"}
                    </div>
                    <div className="mt-2 grid gap-3">
                      {m.blocks.map((b, i) => (
                        <div key={i}>{renderBlock(b)}</div>
                      ))}
                    </div>

                    {m.learnMore?.length ? (
                      <div className="mt-3">
                        <button
                          type="button"
                          aria-expanded={!!expanded[m.id]}
                          aria-controls={`learn-more-${m.id}`}
                          className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-xs font-medium hover:bg-[var(--color-muted)]"
                          onClick={() =>
                            setExpanded((e) => ({ ...e, [m.id]: !e[m.id] }))
                          }
                        >
                          Learn more
                          <ChevronDown
                            className={[
                              "h-4 w-4 transition",
                              expanded[m.id] ? "rotate-180" : "",
                            ].join(" ")}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded[m.id] ? (
                            <motion.div
                              id={`learn-more-${m.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              className="mt-2 grid gap-2 overflow-hidden"
                            >
                              {m.learnMore.map((b, i) => (
                                <div key={i}>{renderBlock(b)}</div>
                              ))}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start" aria-live="polite" aria-label="AI is thinking">
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3 text-sm text-black/60 dark:bg-white/10 dark:text-white/60">
                    Thinking…
                  </div>
                </div>
              )}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <label htmlFor="chat-input" className="sr-only">
              Ask a question about elections
            </label>
            <input
              id="chat-input"
              className="h-11 flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
              placeholder="Ask a question (e.g., What documents do I need?)"
              value={input}
              maxLength={MAX_INPUT_LENGTH}
              aria-label="Your election question"
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)] shadow-sm hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}



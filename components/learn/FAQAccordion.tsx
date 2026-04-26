"use client";

import { useMemo, useState } from "react";
import type { FaqItem, FaqCategory } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories: Array<FaqCategory | "All"> = [
  "All",
  "Eligibility",
  "Registration",
  "Documents",
  "Polling Day",
  "Voter List Issues",
  "Counting & Results",
  "First-Time Voter Help",
];

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const catOk = cat === "All" ? true : i.category === cat;
      if (!catOk) return false;
      if (!q) return true;
      const hay = `${i.question} ${i.answer} ${(i.steps ?? []).join(" ")} ${(i.learnMore ?? []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query, cat]);

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="FAQ knowledge center"
        description="Search + filter. Answers are short and beginner-friendly."
      />
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-black/40 dark:text-white/40" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (e.g., voter list, documents, polling day)"
                className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] pl-10 pr-3 text-sm"
              />
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {!filtered.length ? (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 text-sm text-black/70 dark:text-white/70">
              No results. Try a broader search term like “register” or “ID”.
            </div>
          ) : (
            <div className="grid gap-2">
              {filtered.map((i) => {
                const open = openId === i.id;
                return (
                  <div key={i.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)]">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : i.id)}
                      className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={open}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">{i.question}</div>
                        <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                          Category: {i.category}
                        </div>
                      </div>
                      <ChevronDown
                        className={[
                          "mt-1 h-5 w-5 shrink-0 text-black/60 transition dark:text-white/60",
                          open ? "rotate-180" : "",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-card)]"
                        >
                          <div className="px-4 py-3">
                            <div className="text-sm text-black/80 dark:text-white/80">
                              {i.answer}
                            </div>
                            {i.steps?.length ? (
                              <div className="mt-3">
                                <div className="text-sm font-semibold">Steps</div>
                                <ul className="mt-2 grid gap-1.5 text-sm text-black/70 dark:text-white/70">
                                  {i.steps.map((s) => (
                                    <li key={s} className="flex gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                                      <span>{s}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {i.learnMore?.length ? (
                              <div className="mt-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
                                <div className="text-sm font-semibold">Learn more</div>
                                <ul className="mt-2 grid gap-1.5 text-sm text-black/70 dark:text-white/70">
                                  {i.learnMore.map((s) => (
                                    <li key={s} className="flex gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/40 dark:bg-white/40" />
                                      <span>{s}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ElectionStep } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle2, ChevronDown, Lightbulb, OctagonAlert } from "lucide-react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ElectionStepCard({
  step,
  index,
  total,
}: {
  step: ElectionStep;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const label = useMemo(() => `Step ${index + 1} of ${total}`, [index, total]);

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-start gap-4 px-5 py-4 text-left"
        aria-expanded={open}
        aria-controls={`step-${step.id}`}
      >
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-muted)] text-[var(--color-primary)]">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="text-sm font-semibold">{step.title}</div>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2 py-0.5 text-xs text-black/60 dark:text-white/60">
              {label}
            </span>
          </div>
          <div className="mt-1 text-sm text-black/70 dark:text-white/70">
            {step.short}
          </div>
        </div>
        <div className="mt-1 shrink-0">
          <ChevronDown
            className={cx(
              "h-5 w-5 text-black/60 transition group-hover:text-black dark:text-white/60 dark:group-hover:text-white",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`step-${step.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="border-t border-[var(--color-border)]"
          >
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="text-sm font-semibold">What you should do</div>
                  <ul className="mt-2 grid gap-2 text-sm text-black/70 dark:text-white/70">
                    {step.whatToDo.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 text-sm font-semibold">Why it matters</div>
                  <div className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                    {step.whyItMatters}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <OctagonAlert className="h-4 w-4 text-[var(--color-accent-saffron)]" aria-hidden="true" />
                      Common mistakes
                    </div>
                    <ul className="mt-2 grid gap-2 text-sm text-black/70 dark:text-white/70">
                      {step.commonMistakes.map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/40 dark:bg-white/40" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Lightbulb className="h-4 w-4 text-[var(--color-accent-green)]" aria-hidden="true" />
                      Tips for first-time voters
                    </div>
                    <ul className="mt-2 grid gap-2 text-sm text-black/70 dark:text-white/70">
                      {step.tips.map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/40 dark:bg-white/40" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Card>
  );
}


"use client";

import type { TimelinePhase } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { CalendarClock, Dot } from "lucide-react";

export function ElectionTimeline({ phases }: { phases: TimelinePhase[] }) {
  if (!phases.length) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-5 py-6 text-sm text-black/70 dark:text-white/70">
        No phases available yet.
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Typical election lifecycle"
        description="Tap each phase to scan what it means and what to do."
        right={<CalendarClock className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />}
      />
      <CardContent>
        <div className="relative">
          <div
            className="absolute left-[13px] top-1 bottom-1 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />
          <div className="grid gap-4">
            {phases.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: i * 0.03 }}
                className="grid grid-cols-[28px_1fr] gap-4"
              >
                <div className="pt-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)]">
                    <Dot className="h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2 py-0.5 text-xs text-black/60 dark:text-white/60">
                      {p.typicalDuration}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-black/70 dark:text-white/70">
                    {p.purpose}
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                        What citizens should do
                      </div>
                      <ul className="mt-2 grid gap-1.5 text-sm text-black/70 dark:text-white/70">
                        {p.citizenActions.map((x) => (
                          <li key={x} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                        Reminders
                      </div>
                      <ul className="mt-2 grid gap-1.5 text-sm text-black/70 dark:text-white/70">
                        {p.reminders.map((x) => (
                          <li key={x} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/40 dark:bg-white/40" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


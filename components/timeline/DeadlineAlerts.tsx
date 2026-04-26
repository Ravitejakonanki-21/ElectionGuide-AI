"use client";

import type { DeadlineAlert } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { AlarmClock, BadgeAlert, CalendarDays } from "lucide-react";

function daysUntil(dateISO: string) {
  const target = new Date(dateISO + "T00:00:00");
  const now = new Date();
  const ms = target.getTime() - new Date(now.toDateString()).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function urgencyPill(u: DeadlineAlert["urgency"]) {
  if (u === "high") return "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-200";
  if (u === "medium")
    return "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200";
  return "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200";
}

export function DeadlineAlerts({ alerts }: { alerts: DeadlineAlert[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Important dates (demo)"
        description="Mock reminders structured for future API integration."
        right={<AlarmClock className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />}
      />
      <CardContent>
        {!alerts.length ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 text-sm text-black/70 dark:text-white/70">
            No reminders yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {alerts.map((a) => {
              const d = daysUntil(a.dateISO);
              const countdown =
                d > 1 ? `${d} days left` : d === 1 ? "1 day left" : d === 0 ? "Today" : `${Math.abs(d)} days ago`;
              return (
                <div
                  key={a.id}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold">{a.title}</div>
                        <span
                          className={[
                            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
                            urgencyPill(a.urgency),
                          ].join(" ")}
                        >
                          <BadgeAlert className="h-3.5 w-3.5" aria-hidden="true" />
                          {a.urgency.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                          {a.dateISO}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{countdown}</span>
                      </div>
                      <div className="mt-2 text-sm text-black/70 dark:text-white/70">
                        {a.description}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <ButtonLink href={a.actionHref} variant="secondary" size="sm">
                      {a.actionLabel}
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


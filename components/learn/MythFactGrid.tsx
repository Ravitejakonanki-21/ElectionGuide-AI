"use client";

import type { MythFactItem } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { CheckCircle2, XCircle } from "lucide-react";

export function MythFactGrid({ items }: { items: MythFactItem[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Myth vs Fact"
        description="Quickly correct common misconceptions."
      />
      <CardContent>
        {!items.length ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 text-sm text-black/70 dark:text-white/70">
            No myths yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {items.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3"
              >
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-300" aria-hidden="true" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                        Myth
                      </div>
                      <div className="text-sm font-semibold">{m.myth}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--color-accent-green)]" aria-hidden="true" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                        Fact
                      </div>
                      <div className="text-sm font-semibold">{m.fact}</div>
                    </div>
                  </div>
                  <div className="text-sm text-black/70 dark:text-white/70">
                    {m.explanation}
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm">
                    <span className="font-semibold">What you should do:</span>{" "}
                    <span className="text-black/70 dark:text-white/70">
                      {m.whatToDoTip}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


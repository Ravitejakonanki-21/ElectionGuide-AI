"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { getDocumentSections } from "@/lib/data";
import { computeReadiness } from "@/lib/readiness";
import { useAppStore } from "@/lib/store";
import { Gauge, TrendingUp } from "lucide-react";

export function ReadinessProgress({
  title = "Voter readiness",
  description = "A simple progress snapshot based on what you’ve completed in this app.",
}: {
  title?: string;
  description?: string;
}) {
  const { eligibilityStatus, checklist, firstVoteStep, quizCompleted, quizScore } =
    useAppStore();

  const checklistTotals = useMemo(() => {
    const sections = getDocumentSections();
    const allIds = sections.flatMap((s) => s.items.map((i) => i.id));
    const completed = allIds.filter((id) => checklist[id]).length;
    return { total: allIds.length, completed };
  }, [checklist]);

  const readiness = useMemo(() => {
    return computeReadiness({
      eligibilityStatus,
      checklistCompletedCount: checklistTotals.completed,
      checklistTotalCount: checklistTotals.total,
      firstVoteStep,
      firstVoteTotalSteps: 8,
      quizCompleted,
      quizScore,
    });
  }, [eligibilityStatus, checklistTotals, firstVoteStep, quizCompleted, quizScore]);

  return (
    <Card>
      <CardHeader title={title} description={description} right={<Gauge className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />} />
      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-3xl font-semibold">{readiness.score}%</div>
            <div className="mt-1 text-sm text-black/70 dark:text-white/70">
              {readiness.label}
            </div>
          </div>
          <div className="text-right text-sm text-black/70 dark:text-white/70">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-1">
              <TrendingUp className="h-4 w-4 text-[var(--color-accent-green)]" aria-hidden="true" />
              Checklist: {checklistTotals.completed}/{checklistTotals.total}
            </div>
          </div>
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[var(--color-muted)]">
          <div
            className="h-full rounded-full bg-[var(--color-primary)] transition-all"
            style={{ width: `${readiness.score}%` }}
            aria-hidden="true"
          />
        </div>
      </CardContent>
    </Card>
  );
}


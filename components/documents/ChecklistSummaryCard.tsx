"use client";

import type { DocumentSection } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { downloadText } from "@/lib/downloadChecklist";
import { computeReadiness } from "@/lib/readiness";
import { useAppStore } from "@/lib/store";
import { Download, FileText, RotateCcw } from "lucide-react";

export function ChecklistSummaryCard({ sections }: { sections: DocumentSection[] }) {
  const {
    eligibilityStatus,
    eligibilityNotes,
    checklist,
    firstVoteStep,
    quizCompleted,
    quizScore,
    resetAll,
  } = useAppStore();

  const allItems = sections.flatMap((s) => s.items);
  const completed = allItems.filter((i) => checklist[i.id]).length;
  const total = allItems.length;

  const readiness = computeReadiness({
    eligibilityStatus,
    checklistCompletedCount: completed,
    checklistTotalCount: total,
    firstVoteStep,
    firstVoteTotalSteps: 8,
    quizCompleted,
    quizScore,
  });

  const summaryText = [
    "ElectionGuide AI — My Election Checklist (demo)",
    "",
    `Readiness: ${readiness.score}% (${readiness.label})`,
    `Eligibility status: ${eligibilityStatus}`,
    "",
    "Eligibility notes:",
    ...(eligibilityNotes.length ? eligibilityNotes.map((n) => `- ${n}`) : ["- (Not checked yet)"]),
    "",
    "Checklist:",
    ...sections.flatMap((s) => [
      `${s.title}`,
      ...s.items.map((i) => `- [${checklist[i.id] ? "x" : " "}] ${i.label}${i.optional ? " (Optional)" : ""}`),
      "",
    ]),
    "Generated locally in your browser.",
  ].join("\n");

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="My checklist summary"
        description="Download a simple text summary for demo/judging."
        right={<FileText className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />}
      />
      <CardContent>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
          <div className="text-sm font-semibold">Completion</div>
          <div className="mt-1 text-sm text-black/70 dark:text-white/70">
            {completed}/{total} items marked ready
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[var(--color-card)]">
            <div
              className="h-full rounded-full bg-[var(--color-primary)]"
              style={{ width: `${total ? Math.round((completed / total) * 100) : 0}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)] shadow-sm hover:opacity-95"
            onClick={() => downloadText("my-election-checklist.txt", summaryText)}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download “My Election Checklist”
          </button>

          <ButtonLink href="/first-vote" variant="secondary" className="justify-center">
            Continue First Vote Journey
          </ButtonLink>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm font-medium hover:bg-[var(--color-muted)]"
            onClick={() => resetAll()}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset demo progress
          </button>
        </div>
      </CardContent>
    </Card>
  );
}


"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Award, Sparkles } from "lucide-react";

function band(score: number) {
  if (score >= 90) return { label: "Fully ready", desc: "You’re in great shape. Focus on timing and documents.", cls: "text-emerald-700 dark:text-emerald-200" };
  if (score >= 60) return { label: "Almost ready", desc: "A few quick actions will get you confident for polling day.", cls: "text-amber-800 dark:text-amber-200" };
  return { label: "Needs preparation", desc: "Start with eligibility + registration + voter list verification.", cls: "text-red-700 dark:text-red-200" };
}

export function ResultScoreCard({ score, completed }: { score: number; completed: boolean }) {
  const b = band(score);

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Your result"
        description={completed ? "Saved to your readiness progress." : "Preview (save by finishing the quiz)."}
        right={<Award className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />}
      />
      <CardContent>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
            Score
          </div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div className="text-4xl font-semibold">{score}%</div>
            <div className={["text-sm font-semibold", b.cls].join(" ")}>{b.label}</div>
          </div>
          <div className="mt-2 text-sm text-black/70 dark:text-white/70">{b.desc}</div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[var(--color-card)]">
            <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${Math.max(0, Math.min(100, score))}%` }} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <ButtonLink href="/process" variant="secondary" className="justify-center">
            Open step-by-step process
          </ButtonLink>
          <ButtonLink href="/documents" variant="secondary" className="justify-center">
            Documents checklist
          </ButtonLink>
          <ButtonLink href="/polling-day" className="justify-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Polling day confidence mode
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  );
}


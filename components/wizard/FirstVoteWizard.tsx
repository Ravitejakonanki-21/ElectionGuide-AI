"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProgressTracker } from "@/components/wizard/ProgressTracker";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const steps = [
  {
    id: "s1",
    title: "Check if you’re eligible",
    desc: "Understand age/citizenship/residency requirements in your region.",
    actionHref: "/eligibility",
    actionLabel: "Open eligibility checker",
  },
  {
    id: "s2",
    title: "Register as a voter",
    desc: "Learn how registration works and what you need to submit.",
    actionHref: "/process",
    actionLabel: "Open registration steps",
  },
  {
    id: "s3",
    title: "Verify your voter details",
    desc: "Confirm your name and polling station in the voter list/electoral roll.",
    actionHref: "/process",
    actionLabel: "Open verification step",
  },
  {
    id: "s4",
    title: "Know important dates",
    desc: "Track announcement, deadlines, polling day, counting, and results.",
    actionHref: "/timeline",
    actionLabel: "Open timeline",
  },
  {
    id: "s5",
    title: "Find your polling station",
    desc: "Confirm where you need to go and plan your travel time.",
    actionHref: "/process",
    actionLabel: "Open polling station step",
  },
  {
    id: "s6",
    title: "Prepare required documents",
    desc: "Mark your checklist and keep accepted IDs ready.",
    actionHref: "/documents",
    actionLabel: "Open documents checklist",
  },
  {
    id: "s7",
    title: "Polling day tips",
    desc: "A calm checklist for the final day so you feel confident.",
    actionHref: "/polling-day",
    actionLabel: "Open confidence mode",
  },
  {
    id: "s8",
    title: "Understand counting & results",
    desc: "Know what to expect after voting so you can avoid misinformation.",
    actionHref: "/timeline",
    actionLabel: "Open counting & results",
  },
];

export function FirstVoteWizard() {
  const { firstVoteStep, setFirstVoteStep } = useAppStore();
  const total = steps.length;

  const current = useMemo(() => {
    return steps[Math.min(total - 1, Math.max(0, firstVoteStep))];
  }, [firstVoteStep, total]);

  const completed = Math.max(0, Math.min(total, firstVoteStep));
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="grid gap-4">
      <ProgressTracker current={completed} total={total} />

      <Card className="overflow-hidden">
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--color-accent-saffron)]" aria-hidden="true" />
              {current.title}
            </div>
          }
          description={current.desc}
        />
        <CardContent>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
            <div className="text-sm font-semibold">You are {pct}% Election Ready</div>
            <div className="mt-1 text-sm text-black/70 dark:text-white/70">
              Keep going—each step makes polling day calmer and clearer.
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <ButtonLink href={current.actionHref} className="justify-center">
              {current.actionLabel}
            </ButtonLink>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm font-medium hover:bg-[var(--color-muted)]"
              onClick={() => setFirstVoteStep(Math.min(total, firstVoteStep + 1))}
            >
              <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-green)]" aria-hidden="true" />
              Mark step complete
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm font-medium hover:bg-[var(--color-muted)] disabled:opacity-50"
              onClick={() => setFirstVoteStep(Math.max(0, firstVoteStep - 1))}
              disabled={firstVoteStep <= 0}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-3 text-sm font-medium text-[var(--color-primary-foreground)] shadow-sm hover:opacity-95 disabled:opacity-50"
              onClick={() => setFirstVoteStep(Math.min(total - 1, firstVoteStep + 1))}
              disabled={firstVoteStep >= total - 1}
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 grid gap-2">
            <div className="text-sm font-semibold">All steps</div>
            <div className="grid gap-2">
              {steps.map((s, idx) => {
                const done = idx < firstVoteStep;
                const active = s.id === current.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFirstVoteStep(idx)}
                    className={[
                      "flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition",
                      active
                        ? "border-[var(--color-primary)] bg-[var(--color-muted)]"
                        : "border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-muted)]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl border",
                        done
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                          : "border-[var(--color-border)] bg-[var(--color-muted)] text-black/60 dark:text-white/60",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold">{s.title}</div>
                      <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                        {s.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


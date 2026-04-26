"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { ResultScoreCard } from "@/components/quiz/ResultScoreCard";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export function ElectionQuiz({ questions }: { questions: QuizQuestion[] }) {
  const { quizCompleted, quizScore, setQuizResult } = useAppStore();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalMax = useMemo(() => {
    return questions.reduce((sum, q) => sum + Math.max(...q.choices.map((c) => c.scoreDelta)), 0);
  }, [questions]);

  const computedScore = useMemo(() => {
    const sum = questions.reduce((acc, q) => {
      const choiceId = answers[q.id];
      const chosen = q.choices.find((c) => c.id === choiceId);
      return acc + (chosen ? chosen.scoreDelta : 0);
    }, 0);
    const pct = totalMax > 0 ? (sum / totalMax) * 100 : 0;
    return Math.round(pct);
  }, [answers, questions, totalMax]);

  if (!questions.length) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-5 py-6 text-sm text-black/70 dark:text-white/70">
        No quiz questions available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-7">
        <Card className="overflow-hidden">
          <CardHeader
            title="Quiz"
            description="Multiple choice • beginner-friendly"
            right={<HelpCircle className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />}
          />
          <CardContent>
            <div className="grid gap-4">
              {questions.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: idx * 0.03 }}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3"
                >
                  <div className="text-sm font-semibold">{q.question}</div>
                  <div className="mt-2 grid gap-2">
                    {q.choices.map((c) => {
                      const selected = answers[q.id] === c.id;
                      return (
                        <label
                          key={c.id}
                          className={[
                            "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                            selected
                              ? "border-[var(--color-primary)] bg-[var(--color-card)]"
                              : "border-[var(--color-border)] bg-[var(--color-card)] hover:bg-white/60 dark:hover:bg-white/10",
                          ].join(" ")}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            className="mt-1.5 h-4 w-4 accent-[var(--color-primary)]"
                            checked={selected}
                            onChange={() => setAnswers((a) => ({ ...a, [q.id]: c.id }))}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium">{c.label}</div>
                            {selected && c.feedback ? (
                              <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                                {c.feedback}
                              </div>
                            ) : null}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {q.learnMore?.length ? (
                    <div className="mt-3 text-sm text-black/70 dark:text-white/70">
                      {q.learnMore[0]}
                    </div>
                  ) : null}
                </motion.div>
              ))}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-black/70 dark:text-white/70">
                  Current score estimate: <span className="font-semibold">{computedScore}%</span>
                </div>
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)] shadow-sm hover:opacity-95"
                  onClick={() => setQuizResult(computedScore)}
                >
                  Finish & see result
                </button>
              </div>

              {quizCompleted ? (
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 text-sm text-black/70 dark:text-white/70">
                  Saved your latest score: <span className="font-semibold">{quizScore}%</span>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <ResultScoreCard score={quizCompleted ? quizScore : computedScore} completed={quizCompleted} />
      </div>
    </div>
  );
}


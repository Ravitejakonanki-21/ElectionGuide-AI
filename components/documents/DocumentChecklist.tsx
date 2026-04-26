"use client";

import type { DocumentSection } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, Circle, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

export function DocumentChecklist({ sections }: { sections: DocumentSection[] }) {
  const { checklist, toggleChecklist } = useAppStore();

  return (
    <div className="grid gap-4">
      {sections.map((s, idx) => {
        const completed = s.items.filter((i) => checklist[i.id]).length;
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: idx * 0.03 }}
          >
            <Card className="overflow-hidden">
              <CardHeader
                title={
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
                    {s.title}
                  </div>
                }
                description={`${completed}/${s.items.length} marked ready`}
              />
              <CardContent>
                <div className="grid gap-2">
                  {s.items.map((i) => {
                    const done = !!checklist[i.id];
                    const Icon = done ? CheckCircle2 : Circle;
                    return (
                      <label
                        key={i.id}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10"
                      >
                        <input
                          type="checkbox"
                          className="mt-1.5 h-4 w-4 accent-[var(--color-primary)]"
                          checked={done}
                          onChange={() => toggleChecklist(i.id)}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-sm font-semibold">{i.label}</div>
                            {i.optional ? (
                              <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2 py-0.5 text-xs text-black/60 dark:text-white/60">
                                Optional
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                            {i.explanation}
                          </div>
                        </div>
                        <Icon
                          className={[
                            "mt-1 h-5 w-5 shrink-0",
                            done ? "text-[var(--color-accent-green)]" : "text-black/30 dark:text-white/30",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}


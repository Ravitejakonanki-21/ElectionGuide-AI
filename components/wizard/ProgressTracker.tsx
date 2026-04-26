"use client";

import { motion } from "framer-motion";

export function ProgressTracker({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">Progress</div>
        <div className="text-sm text-black/70 dark:text-white/70">{pct}%</div>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[var(--color-card)]">
        <motion.div
          className="h-full rounded-full bg-[var(--color-primary)]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-2 text-xs text-black/60 dark:text-white/60">
        Step {Math.min(total, current + 1)} of {total}
      </div>
    </div>
  );
}


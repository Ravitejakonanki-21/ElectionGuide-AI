export const dynamic = "force-static";

import type { ElectionStep } from "@/lib/types";
import { ElectionStepCard } from "@/components/process/ElectionStepCard";

export function ElectionProcessFlow({ steps }: { steps: ElectionStep[] }) {
  if (!steps.length) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-5 py-6 text-sm text-black/70 dark:text-white/70">
        No steps available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {steps.map((s, idx) => (
        <ElectionStepCard key={s.id} step={s} index={idx} total={steps.length} />
      ))}
    </div>
  );
}


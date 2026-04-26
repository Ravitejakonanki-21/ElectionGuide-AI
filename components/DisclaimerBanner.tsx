import { Info } from "lucide-react";

export function DisclaimerBanner({ compact }: { compact?: boolean }) {
  return (
    <div
      className={[
        "rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)]",
        compact ? "px-4 py-3" : "px-5 py-4",
      ].join(" ")}
      role="note"
      aria-label="Neutrality disclaimer"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 rounded-xl bg-white/60 p-2 text-[var(--color-primary)] dark:bg-white/10">
          <Info className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold">Educational only</div>
          <div className="mt-1 text-sm text-black/70 dark:text-white/70">
            This platform is for educational guidance only and does not endorse
            any political party or candidate. Always verify final rules and
            dates with your official election authority.
          </div>
        </div>
      </div>
    </div>
  );
}


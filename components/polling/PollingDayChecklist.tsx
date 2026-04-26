"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const items = [
  { id: "poll-verify", label: "Verify your name in the voter list" },
  { id: "poll-id", label: "Carry approved identity proof" },
  { id: "poll-time", label: "Reach the polling station on time" },
  { id: "poll-instructions", label: "Follow polling staff instructions" },
  { id: "poll-careful", label: "Cast your vote carefully" },
  { id: "poll-complete", label: "Confirm completion (ink mark/receipt if applicable)" },
  { id: "poll-calm", label: "Keep calm and follow queue rules" },
];

export function PollingDayChecklist() {
  const { checklist, toggleChecklist } = useAppStore();
  const done = items.filter((i) => checklist[i.id]).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Quick confidence checklist"
        description={`${done}/${items.length} completed`}
        right={<ShieldCheck className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />}
      />
      <CardContent>
        <div className="grid gap-2">
          {items.map((i) => {
            const ok = !!checklist[i.id];
            return (
              <label
                key={i.id}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10"
              >
                <input
                  type="checkbox"
                  className="mt-1.5 h-4 w-4 accent-[var(--color-primary)]"
                  checked={ok}
                  onChange={() => toggleChecklist(i.id)}
                />
                <div className="min-w-0 flex-1 text-sm">
                  <div className="font-semibold">{i.label}</div>
                  <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {pollingTip(i.id)}
                  </div>
                </div>
                <CheckCircle2
                  className={[
                    "mt-1 h-5 w-5 shrink-0",
                    ok ? "text-[var(--color-accent-green)]" : "text-black/20 dark:text-white/20",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </label>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm">
          <div className="font-semibold">If something goes wrong</div>
          <div className="mt-1 text-black/70 dark:text-white/70">
            Ask polling staff for help. They are there to guide you through the
            official steps.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function pollingTip(id: string) {
  switch (id) {
    case "poll-verify":
      return "Re-check close to polling day so last-minute changes don’t surprise you.";
    case "poll-id":
      return "Bring an accepted ID; if your region allows alternates, carry a backup.";
    case "poll-time":
      return "Plan travel time and accessibility needs ahead of time.";
    case "poll-instructions":
      return "If you’re unsure, ask before you finalize any step.";
    case "poll-careful":
      return "Take a moment—rushing can cause avoidable mistakes.";
    case "poll-complete":
      return "Make sure the process is complete before leaving the station.";
    case "poll-calm":
      return "Queues can be long—stay patient and follow local rules.";
    default:
      return "Stay calm and follow the official guidance.";
  }
}


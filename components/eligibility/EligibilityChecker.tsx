"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RegionSelector } from "@/components/region/RegionSelector";
import { useAppStore, type EligibilityStatus } from "@/lib/store";
import { CheckCircle2, HelpCircle, ShieldAlert, TriangleAlert } from "lucide-react";

type FormState = {
  age: string;
  citizenship: "yes" | "no" | "unsure";
  alreadyRegistered: "yes" | "no" | "unsure";
};

function badge(status: EligibilityStatus) {
  if (status === "eligible")
    return {
      label: "Eligible",
      icon: CheckCircle2,
      cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
    };
  if (status === "needsAction")
    return {
      label: "Needs action",
      icon: TriangleAlert,
      cls: "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200",
    };
  if (status === "notEligible")
    return {
      label: "Not eligible (yet)",
      icon: ShieldAlert,
      cls: "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-200",
    };
  return {
    label: "Not checked",
    icon: HelpCircle,
    cls: "border-[var(--color-border)] bg-[var(--color-muted)] text-black/70 dark:text-white/70",
  };
}

export function EligibilityChecker() {
  const { eligibilityStatus, eligibilityNotes, setEligibility } = useAppStore();
  const [form, setForm] = useState<FormState>({
    age: "",
    citizenship: "unsure",
    alreadyRegistered: "unsure",
  });

  const computed = useMemo(() => {
    const notes: string[] = [];
    const ageNum = Number(form.age);
    const hasAge = form.age.trim().length > 0 && Number.isFinite(ageNum);

    if (!hasAge) {
      return { status: "unknown" as EligibilityStatus, notes: ["Enter your age to continue."] };
    }

    if (ageNum < 0) {
      return { status: "unknown" as EligibilityStatus, notes: ["Age must be a positive number."] };
    }

    // Global-generic baseline: many places use 18, but we avoid claiming it's universal.
    if (ageNum < 18) {
      notes.push("Many regions require you to be at least 18 to vote.");
      notes.push("If you are under the minimum age, you can still prepare early.");
      return { status: "notEligible" as EligibilityStatus, notes };
    }

    if (form.citizenship === "no") {
      notes.push("Many regions require citizenship to vote in national elections.");
      notes.push("Some regions allow limited local voting for non-citizens—verify locally.");
      return { status: "needsAction" as EligibilityStatus, notes };
    }

    if (form.citizenship === "unsure") {
      notes.push("Confirm your citizenship/residency status using official documents if possible.");
      return { status: "needsAction" as EligibilityStatus, notes };
    }

    if (form.alreadyRegistered === "no") {
      notes.push("You likely need to register (or create a voter record) before the deadline.");
      notes.push("After registering, verify your name appears correctly in the voter list.");
      return { status: "needsAction" as EligibilityStatus, notes };
    }

    if (form.alreadyRegistered === "unsure") {
      notes.push("If you’re unsure, search the voter list/electoral roll for your details.");
      notes.push("If missing, register or submit a correction request within the allowed window.");
      return { status: "needsAction" as EligibilityStatus, notes };
    }

    notes.push("You likely meet the basic requirements. Next: verify your voter record and polling station.");
    return { status: "eligible" as EligibilityStatus, notes };
  }, [form]);

  const b = badge(eligibilityStatus);
  const Icon = b.icon;

  return (
    <div className="grid gap-4">
      <RegionSelector />

      <Card className="overflow-hidden">
        <CardHeader title="Quick eligibility check" description="Simple inputs → clear next steps." />
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                Age
              </span>
              <input
                inputMode="numeric"
                className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
                placeholder="e.g., 18"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                Citizen?
              </span>
              <select
                className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
                value={form.citizenship}
                onChange={(e) =>
                  setForm((f) => ({ ...f, citizenship: e.target.value as FormState["citizenship"] }))
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">Not sure</option>
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                Already registered?
              </span>
              <select
                className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
                value={form.alreadyRegistered}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    alreadyRegistered: e.target.value as FormState["alreadyRegistered"],
                  }))
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">Not sure</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
              <span className={["inline-flex items-center gap-2 rounded-full border px-3 py-1", b.cls].join(" ")}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                {b.label}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setEligibility(computed.status, computed.notes)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)] shadow-sm hover:opacity-95"
            >
              Get result
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
            <div className="text-sm font-semibold">Your next steps</div>
            <ul className="mt-2 grid gap-2 text-sm text-black/70 dark:text-white/70">
              {(eligibilityNotes.length ? eligibilityNotes : computed.notes).map((n) => (
                <li key={n} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/40 dark:bg-white/40" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <ButtonLink href="/process" variant="secondary" size="sm">
                Open step-by-step process
              </ButtonLink>
              <ButtonLink href="/documents" variant="secondary" size="sm">
                Documents checklist
              </ButtonLink>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


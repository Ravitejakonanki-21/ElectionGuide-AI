"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { useState } from "react";
import { Landmark, Menu, MessageCircle, Route, Sparkles, Timeline, X } from "lucide-react";

const nav = [
  { href: "/process", label: "Process", icon: Route },
  { href: "/timeline", label: "Timeline", icon: Timeline },
  { href: "/first-vote", label: "First Vote Journey", icon: Sparkles },
  { href: "/assistant", label: "Ask AI", icon: MessageCircle },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-muted)] text-[var(--color-primary)]">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">ElectionGuide AI</div>
              <div className="text-xs text-black/60 dark:text-white/60">
                Understand elections in minutes
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[var(--color-muted)] dark:text-white/80"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-muted)]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {open ? (
          <div className="md:hidden pb-4">
            <nav className="grid gap-2" aria-label="Mobile primary">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-3 text-sm font-medium text-black/80 hover:bg-white/60 dark:text-white/80 dark:hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/documents"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-3 text-sm font-medium hover:bg-[var(--color-muted)]"
              >
                Quick documents checklist
              </Link>
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}


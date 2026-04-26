import Link from "next/link";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)]">
      <Container>
        <div className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-black/70 dark:text-white/70">
            <div className="font-semibold text-black dark:text-white">
              ElectionGuide AI
            </div>
            <div className="mt-1">
              Neutral, beginner-friendly election process guidance.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link className="hover:underline" href="/process">
              Process
            </Link>
            <Link className="hover:underline" href="/timeline">
              Timeline
            </Link>
            <Link className="hover:underline" href="/assistant">
              Ask AI
            </Link>
            <Link className="hover:underline" href="/learn">
              FAQ & Myths
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}


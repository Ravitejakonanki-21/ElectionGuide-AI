import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
  } as const;

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm hover:opacity-95",
    secondary:
      "bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-white/60 dark:hover:bg-white/10",
    ghost: "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
  } as const;

  return (
    <Link
      href={href}
      className={cx(base, sizes[size], variants[variant], className)}
    >
      {children}
    </Link>
  );
}


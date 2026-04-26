import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { ReadinessProgress } from "@/components/ReadinessProgress";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ArrowRight, Bot, ClipboardCheck, Compass, Sparkles, Timer } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(29,78,216,0.18),transparent)]">
      <Container>
        <div className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs text-black/70 shadow-sm dark:text-white/70">
                <Sparkles className="h-4 w-4 text-[var(--color-accent-saffron)]" aria-hidden="true" />
                A friendly, neutral guide for first-time voters
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Understand elections in minutes.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-black/70 dark:text-white/70">
                ElectionGuide AI turns complex election procedures into a simple
                step-by-step journey with timelines, checklists, and an AI-style
                help panel — designed for beginners.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/first-vote" className="gap-2">
                  Start your voting journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/eligibility" variant="secondary" className="gap-2">
                  Check eligibility <Compass className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/assistant" variant="ghost" className="gap-2">
                  Ask Election AI <Bot className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>

              <div className="mt-8">
                <DisclaimerBanner />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="overflow-hidden">
                <CardHeader
                  title="Quick actions"
                  description="Jump into the most useful tools."
                />
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ButtonLink href="/process" variant="secondary" className="justify-start gap-2">
                      <RouteIcon />
                      Process guide
                    </ButtonLink>
                    <ButtonLink href="/timeline" variant="secondary" className="justify-start gap-2">
                      <Timer className="h-4 w-4" aria-hidden="true" />
                      Timeline
                    </ButtonLink>
                    <ButtonLink href="/documents" variant="secondary" className="justify-start gap-2">
                      <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                      Documents
                    </ButtonLink>
                    <ButtonLink href="/quiz" variant="secondary" className="justify-start gap-2">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      Readiness quiz
                    </ButtonLink>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 grid gap-4">
                <ReadinessProgress
                  title="Your readiness (demo)"
                  description="Progress persists across pages on this device."
                />
                <Card>
                  <CardHeader title="Premium empty state (demo)" />
                  <CardContent>
                    <div className="text-sm text-black/70 dark:text-white/70">
                      You haven’t started your voting journey yet. Let’s make
                      you election-ready with a calm step-by-step flow.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Eligibility",
                desc: "Know the basics and your next action.",
                href: "/eligibility",
              },
              {
                title: "Registration",
                desc: "Understand how registration works (generally).",
                href: "/process",
              },
              { title: "Timeline", desc: "See the election phases visually.", href: "/timeline" },
              {
                title: "Polling day tips",
                desc: "Walk in confident with a checklist.",
                href: "/polling-day",
              },
            ].map((c) => (
              <Card key={c.title} className="transition hover:shadow-md">
                <CardContent>
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {c.desc}
                  </div>
                  <div className="mt-3">
                    <ButtonLink href={c.href} variant="ghost" size="sm" className="gap-2">
                      Open <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

function RouteIcon() {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/60 text-[var(--color-primary)] dark:bg-white/10"
      aria-hidden="true"
    >
      <span className="block h-3 w-3 rounded-sm border-2 border-current" />
    </span>
  );
}

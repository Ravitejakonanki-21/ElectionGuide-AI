import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FirstVoteWizard } from "@/components/wizard/FirstVoteWizard";
import { ReadinessProgress } from "@/components/ReadinessProgress";

export default function FirstVotePage() {
  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              First Vote Journey
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              A friendly step-by-step wizard for first-time voters. Complete the
              journey and watch your election readiness grow.
            </p>
          </div>

          <DisclaimerBanner compact />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <FirstVoteWizard />
            </div>
            <div className="lg:col-span-5">
              <ReadinessProgress title="You are election-ready" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


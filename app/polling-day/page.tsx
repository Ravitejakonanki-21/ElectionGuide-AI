import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { PollingDayChecklist } from "@/components/polling/PollingDayChecklist";

export default function PollingDayPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Polling Day Confidence Mode
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              A calm, quick checklist to help first-time voters feel prepared
              right before they head out.
            </p>
          </div>

          <DisclaimerBanner compact />

          <PollingDayChecklist />
        </div>
      </Container>
    </main>
  );
}


import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { getDeadlineAlerts, getTimelinePhases } from "@/lib/data";
import { ElectionTimeline } from "@/components/timeline/ElectionTimeline";
import { DeadlineAlerts } from "@/components/timeline/DeadlineAlerts";

export default function TimelinePage() {
  const phases = getTimelinePhases();
  const alerts = getDeadlineAlerts();

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Election timeline visualizer
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              A clear, beginner-friendly view of typical election phases and
              what citizens should do during each one.
            </p>
          </div>

          <DisclaimerBanner compact />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <ElectionTimeline phases={phases} />
            </div>
            <div className="lg:col-span-4">
              <DeadlineAlerts alerts={alerts} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


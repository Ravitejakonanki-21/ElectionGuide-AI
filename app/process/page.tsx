import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { getElectionSteps } from "@/lib/data";
import { ElectionProcessFlow } from "@/components/process/ElectionProcessFlow";

export default function ProcessPage() {
  const steps = getElectionSteps();

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Election process, step-by-step
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              Click any stage to expand. Each step includes what to do, why it
              matters, and common mistakes to avoid.
            </p>
          </div>

          <DisclaimerBanner compact />

          <ElectionProcessFlow steps={steps} />
        </div>
      </Container>
    </main>
  );
}


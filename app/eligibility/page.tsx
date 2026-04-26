import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { EligibilityChecker } from "@/components/eligibility/EligibilityChecker";
import { ReadinessProgress } from "@/components/ReadinessProgress";

export default function EligibilityPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Eligibility checker
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              Answer a few basics for a simple, neutral eligibility outcome and
              next steps. This is educational guidance—final rules vary by
              region.
            </p>
          </div>

          <DisclaimerBanner compact />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <EligibilityChecker />
            </div>
            <div className="lg:col-span-5">
              <ReadinessProgress />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


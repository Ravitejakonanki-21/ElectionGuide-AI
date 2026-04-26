import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { getFaqItems, getMythFactItems } from "@/lib/data";
import { FAQAccordion } from "@/components/learn/FAQAccordion";
import { MythFactGrid } from "@/components/learn/MythFactGrid";

export default function LearnPage() {
  const faq = getFaqItems();
  const myths = getMythFactItems();

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              FAQ + Myth vs Fact
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              Search common questions and quickly correct misconceptions with
              clear, neutral explanations.
            </p>
          </div>

          <DisclaimerBanner compact />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <FAQAccordion items={faq} />
            </div>
            <div className="lg:col-span-5">
              <MythFactGrid items={myths} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


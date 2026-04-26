import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { AIChatPanel } from "@/components/chat/AIChatPanel";
import { SuggestedQuestions } from "@/components/chat/SuggestedQuestions";

export default function AssistantPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              AI Election Assistant
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              Ask election-procedure questions and get short, step-by-step,
              beginner-friendly answers. (Demo mode: structured knowledge base,
              no external AI calls.)
            </p>
          </div>

          <DisclaimerBanner compact />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <SuggestedQuestions />
            </div>
            <div className="lg:col-span-8">
              <AIChatPanel />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


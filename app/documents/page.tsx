import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { getDocumentSections } from "@/lib/data";
import { DocumentChecklist } from "@/components/documents/DocumentChecklist";
import { ChecklistSummaryCard } from "@/components/documents/ChecklistSummaryCard";

export default function DocumentsPage() {
  const sections = getDocumentSections();

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Documents & checklist
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              A smart checklist for registration, verification, and polling day.
              Mark items as ready and download your summary.
            </p>
          </div>

          <DisclaimerBanner compact />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <DocumentChecklist sections={sections} />
            </div>
            <div className="lg:col-span-4">
              <ChecklistSummaryCard sections={sections} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


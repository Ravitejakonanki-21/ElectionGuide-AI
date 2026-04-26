export type RegionId = string;

export type ElectionStep = {
  id: string;
  title: string;
  short: string;
  whyItMatters: string;
  whatToDo: string[];
  commonMistakes: string[];
  tips: string[];
};

export type TimelinePhase = {
  id: string;
  name: string;
  purpose: string;
  typicalDuration: string;
  citizenActions: string[];
  reminders: string[];
};

export type DocumentSection = {
  id: string;
  title: string;
  items: Array<{
    id: string;
    label: string;
    explanation: string;
    optional?: boolean;
  }>;
};

export type FaqCategory =
  | "Eligibility"
  | "Registration"
  | "Documents"
  | "Polling Day"
  | "Voter List Issues"
  | "Counting & Results"
  | "First-Time Voter Help";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  steps?: string[];
  learnMore?: string[];
};

export type MythFactItem = {
  id: string;
  myth: string;
  fact: string;
  explanation: string;
  whatToDoTip: string;
};

export type RegionData = {
  countries: Array<{
    id: string;
    name: string;
    regions: Array<{
      id: RegionId;
      name: string;
      notes: string[];
      sampleSchedule: Array<{
        phaseId: string;
        label: string;
        when: string;
      }>;
    }>;
  }>;
};

export type QuizChoice = {
  id: string;
  label: string;
  scoreDelta: number;
  feedback?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  choices: QuizChoice[];
  learnMore?: string[];
};

export type DeadlineAlert = {
  id: string;
  title: string;
  dateISO: string; // demo data
  urgency: "low" | "medium" | "high";
  actionLabel: string;
  actionHref: string;
  description: string;
};

export type ChatBlock = {
  type: "text" | "steps" | "bullets" | "callout";
  title?: string;
  content: string | string[];
};

export type ChatIntent = {
  id: string;
  keywords: string[];
  answer: ChatBlock[];
  learnMore?: ChatBlock[];
};


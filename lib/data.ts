import electionSteps from "@/data/election_steps.json";
import timelinePhases from "@/data/timeline_phases.json";
import documents from "@/data/documents.json";
import faq from "@/data/faq_data.json";
import myths from "@/data/myth_fact_data.json";
import regions from "@/data/region_data.json";
import quiz from "@/data/quiz_questions.json";
import deadlines from "@/data/deadline_alerts.json";
import chat from "@/data/chat_responses.json";

import type {
  ChatIntent,
  DeadlineAlert,
  DocumentSection,
  ElectionStep,
  FaqItem,
  MythFactItem,
  QuizQuestion,
  RegionData,
  TimelinePhase,
} from "@/lib/types";

export function getElectionSteps(): ElectionStep[] {
  return electionSteps as ElectionStep[];
}

export function getTimelinePhases(): TimelinePhase[] {
  return timelinePhases as TimelinePhase[];
}

export function getDocumentSections(): DocumentSection[] {
  return documents as DocumentSection[];
}

export function getFaqItems(): FaqItem[] {
  return faq as FaqItem[];
}

export function getMythFactItems(): MythFactItem[] {
  return myths as MythFactItem[];
}

export function getRegionData(): RegionData {
  return regions as RegionData;
}

export function getQuizQuestions(): QuizQuestion[] {
  return quiz as QuizQuestion[];
}

export function getDeadlineAlerts(): DeadlineAlert[] {
  return deadlines as DeadlineAlert[];
}

export function getChatIntents(): ChatIntent[] {
  return chat as ChatIntent[];
}


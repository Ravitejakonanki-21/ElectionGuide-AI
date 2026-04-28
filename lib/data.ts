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

// Module-level memoization: JSON is parsed once at module load time
// and the same typed reference is returned on every call (O(1)).
const _electionSteps = electionSteps as ElectionStep[];
const _timelinePhases = timelinePhases as TimelinePhase[];
const _documents = documents as DocumentSection[];
const _faq = faq as FaqItem[];
const _myths = myths as MythFactItem[];
const _regions = regions as RegionData;
const _quiz = quiz as QuizQuestion[];
const _deadlines = deadlines as DeadlineAlert[];
const _chat = chat as ChatIntent[];

/** Returns the list of election process steps (memoized). */
export function getElectionSteps(): ElectionStep[] {
  return _electionSteps;
}

/** Returns the election timeline phases (memoized). */
export function getTimelinePhases(): TimelinePhase[] {
  return _timelinePhases;
}

/** Returns document checklist sections (memoized). */
export function getDocumentSections(): DocumentSection[] {
  return _documents;
}

/** Returns FAQ items (memoized). */
export function getFaqItems(): FaqItem[] {
  return _faq;
}

/** Returns myth vs. fact items (memoized). */
export function getMythFactItems(): MythFactItem[] {
  return _myths;
}

/** Returns region/country data (memoized). */
export function getRegionData(): RegionData {
  return _regions;
}

/** Returns quiz questions (memoized). */
export function getQuizQuestions(): QuizQuestion[] {
  return _quiz;
}

/** Returns deadline alert data (memoized). */
export function getDeadlineAlerts(): DeadlineAlert[] {
  return _deadlines;
}

/** Returns chat intent definitions (memoized). */
export function getChatIntents(): ChatIntent[] {
  return _chat;
}


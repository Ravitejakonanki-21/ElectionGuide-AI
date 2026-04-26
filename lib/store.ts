"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EligibilityStatus = "unknown" | "eligible" | "notEligible" | "needsAction";

export type AppState = {
  countryId: string;
  regionId: string;
  eligibilityStatus: EligibilityStatus;
  eligibilityNotes: string[];

  checklist: Record<string, boolean>;
  firstVoteStep: number;
  quizCompleted: boolean;
  quizScore: number; // 0..100

  setRegion: (countryId: string, regionId: string) => void;
  setEligibility: (status: EligibilityStatus, notes: string[]) => void;
  toggleChecklist: (itemId: string) => void;
  setFirstVoteStep: (step: number) => void;
  setQuizResult: (score: number) => void;
  resetAll: () => void;
};

const DEFAULT_COUNTRY = "global_demo";
const DEFAULT_REGION = "region_alpha";

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      countryId: DEFAULT_COUNTRY,
      regionId: DEFAULT_REGION,
      eligibilityStatus: "unknown",
      eligibilityNotes: [],

      checklist: {},
      firstVoteStep: 0,
      quizCompleted: false,
      quizScore: 0,

      setRegion: (countryId, regionId) => set({ countryId, regionId }),
      setEligibility: (status, notes) =>
        set({ eligibilityStatus: status, eligibilityNotes: notes }),
      toggleChecklist: (itemId) =>
        set({ checklist: { ...get().checklist, [itemId]: !get().checklist[itemId] } }),
      setFirstVoteStep: (step) => set({ firstVoteStep: Math.max(0, step) }),
      setQuizResult: (score) =>
        set({
          quizCompleted: true,
          quizScore: Math.max(0, Math.min(100, Math.round(score))),
        }),
      resetAll: () =>
        set({
          countryId: DEFAULT_COUNTRY,
          regionId: DEFAULT_REGION,
          eligibilityStatus: "unknown",
          eligibilityNotes: [],
          checklist: {},
          firstVoteStep: 0,
          quizCompleted: false,
          quizScore: 0,
        }),
    }),
    {
      name: "electionguide-ai:v1",
      version: 1,
    },
  ),
);


"use client";

import { create } from "zustand";

export const useChatDraftStore = create<{
  draft: string;
  setDraft: (v: string) => void;
}>((set) => ({
  draft: "",
  setDraft: (v) => set({ draft: v }),
}));


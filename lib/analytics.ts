/**
 * Google Analytics 4 (GA4) event tracking helpers.
 * Uses the global gtag function injected by the GA4 script in layout.tsx.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type GtagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

/**
 * Fire a GA4 custom event. Safe to call server-side (no-op).
 */
export function trackEvent(eventName: string, params?: GtagEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}

// ─── Typed event helpers ────────────────────────────────────────────────────

/** Track when a user completes the readiness quiz. */
export function trackQuizCompleted(score: number): void {
  trackEvent("quiz_completed", { event_category: "engagement", value: score });
}

/** Track when a user checks their eligibility. */
export function trackEligibilityChecked(status: string): void {
  trackEvent("eligibility_checked", { event_category: "engagement", event_label: status });
}

/** Track when a user asks the AI assistant a question. */
export function trackChatQuestion(intentId: string): void {
  trackEvent("chat_question_asked", { event_category: "engagement", event_label: intentId });
}

/** Track when a user advances a step in the First Vote wizard. */
export function trackWizardStep(step: number): void {
  trackEvent("wizard_step_advanced", { event_category: "engagement", value: step });
}

/** Track document checklist item toggled. */
export function trackChecklistToggle(itemId: string, checked: boolean): void {
  trackEvent("checklist_item_toggled", {
    event_category: "engagement",
    event_label: itemId,
    value: checked ? 1 : 0,
  });
}

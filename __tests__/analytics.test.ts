import { trackEvent, trackQuizCompleted, trackEligibilityChecked, trackChatQuestion, trackWizardStep, trackChecklistToggle } from "@/lib/analytics";

const gtagMock = jest.fn();

describe("analytics helpers", () => {
  beforeEach(() => {
    gtagMock.mockClear();
    Object.defineProperty(window, "gtag", {
      value: gtagMock,
      writable: true,
      configurable: true,
    });
  });

  describe("trackEvent()", () => {
    it("fires gtag with event name and params", () => {
      trackEvent("test_event", { event_category: "test" });
      expect(gtagMock).toHaveBeenCalledWith("event", "test_event", { event_category: "test" });
    });

    it("fires gtag with empty params when none provided", () => {
      trackEvent("test_event");
      expect(gtagMock).toHaveBeenCalledWith("event", "test_event", {});
    });

    it("does nothing when gtag is not a function", () => {
      Object.defineProperty(window, "gtag", { value: undefined, writable: true, configurable: true });
      expect(() => trackEvent("safe_event")).not.toThrow();
      expect(gtagMock).not.toHaveBeenCalled();
    });
  });

  describe("trackQuizCompleted()", () => {
    it("fires quiz_completed with score", () => {
      trackQuizCompleted(8);
      expect(gtagMock).toHaveBeenCalledWith("event", "quiz_completed", {
        event_category: "engagement",
        value: 8,
      });
    });
  });

  describe("trackEligibilityChecked()", () => {
    it("fires eligibility_checked with status label", () => {
      trackEligibilityChecked("eligible");
      expect(gtagMock).toHaveBeenCalledWith("event", "eligibility_checked", {
        event_category: "engagement",
        event_label: "eligible",
      });
    });
  });

  describe("trackChatQuestion()", () => {
    it("fires chat_question_asked with intentId", () => {
      trackChatQuestion("register");
      expect(gtagMock).toHaveBeenCalledWith("event", "chat_question_asked", {
        event_category: "engagement",
        event_label: "register",
      });
    });
  });

  describe("trackWizardStep()", () => {
    it("fires wizard_step_advanced with step number", () => {
      trackWizardStep(3);
      expect(gtagMock).toHaveBeenCalledWith("event", "wizard_step_advanced", {
        event_category: "engagement",
        value: 3,
      });
    });
  });

  describe("trackChecklistToggle()", () => {
    it("fires checklist_item_toggled with value 1 when checked", () => {
      trackChecklistToggle("voter-id", true);
      expect(gtagMock).toHaveBeenCalledWith("event", "checklist_item_toggled", {
        event_category: "engagement",
        event_label: "voter-id",
        value: 1,
      });
    });

    it("fires checklist_item_toggled with value 0 when unchecked", () => {
      trackChecklistToggle("voter-id", false);
      expect(gtagMock).toHaveBeenCalledWith("event", "checklist_item_toggled", {
        event_category: "engagement",
        event_label: "voter-id",
        value: 0,
      });
    });
  });
});

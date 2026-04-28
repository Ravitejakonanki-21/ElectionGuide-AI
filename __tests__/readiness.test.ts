import { computeReadiness } from "@/lib/readiness";

describe("computeReadiness()", () => {
  const base = {
    eligibilityStatus: "unknown" as const,
    checklistCompletedCount: 0,
    checklistTotalCount: 10,
    firstVoteStep: 0,
    firstVoteTotalSteps: 8,
    quizCompleted: false,
    quizScore: 0,
  };

  it("returns 0% score for fully empty state", () => {
    const { score } = computeReadiness(base);
    expect(score).toBe(0);
  });

  it("returns 25 points for eligible status", () => {
    const { score } = computeReadiness({ ...base, eligibilityStatus: "eligible" });
    expect(score).toBe(25);
  });

  it("returns 15 points for needsAction status", () => {
    const { score } = computeReadiness({ ...base, eligibilityStatus: "needsAction" });
    expect(score).toBe(15);
  });

  it("returns 5 points for notEligible status", () => {
    const { score } = computeReadiness({ ...base, eligibilityStatus: "notEligible" });
    expect(score).toBe(5);
  });

  it("returns 35 points for full checklist completion", () => {
    const { score } = computeReadiness({ ...base, checklistCompletedCount: 10, checklistTotalCount: 10 });
    expect(score).toBe(35);
  });

  it("handles zero total checklist items without dividing by zero", () => {
    const { score } = computeReadiness({ ...base, checklistCompletedCount: 0, checklistTotalCount: 0 });
    expect(score).toBe(0);
  });

  it("returns up to 25 points for completed wizard steps", () => {
    const { score } = computeReadiness({ ...base, firstVoteStep: 8, firstVoteTotalSteps: 8 });
    expect(score).toBe(25);
  });

  it("returns up to 15 points for quiz with perfect score", () => {
    const { score } = computeReadiness({ ...base, quizCompleted: true, quizScore: 100 });
    expect(score).toBe(15);
  });

  it("caps score at 100", () => {
    const { score } = computeReadiness({
      eligibilityStatus: "eligible",
      checklistCompletedCount: 100,
      checklistTotalCount: 100,
      firstVoteStep: 100,
      firstVoteTotalSteps: 8,
      quizCompleted: true,
      quizScore: 100,
    });
    expect(score).toBeLessThanOrEqual(100);
  });

  it("score is never negative", () => {
    const { score } = computeReadiness({ ...base, quizScore: -999 });
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("returns label '20% Ready' for low scores", () => {
    const { label } = computeReadiness(base);
    expect(label).toBe("20% Ready");
  });

  it("returns label '100% Ready' for score >= 95", () => {
    const { label } = computeReadiness({
      eligibilityStatus: "eligible",
      checklistCompletedCount: 10,
      checklistTotalCount: 10,
      firstVoteStep: 8,
      firstVoteTotalSteps: 8,
      quizCompleted: true,
      quizScore: 100,
    });
    expect(label).toBe("100% Ready");
  });

  it("returns label '50% Ready' for mid-range scores", () => {
    // eligible(25) + full checklist(35) = 60 → '80% Ready'
    // eligible(25) + half checklist(17) = 42 → '20% Ready'
    // eligible(25) + half checklist(17) + partial wizard(10) = 52 → '50% Ready'
    const { label } = computeReadiness({
      ...base,
      eligibilityStatus: "eligible",
      checklistCompletedCount: 5,
      checklistTotalCount: 10,
      firstVoteStep: 3,
      firstVoteTotalSteps: 8,
    });
    expect(label).toBe("50% Ready");
  });
});

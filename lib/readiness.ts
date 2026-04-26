import type { EligibilityStatus } from "@/lib/store";

export function computeReadiness(args: {
  eligibilityStatus: EligibilityStatus;
  checklistCompletedCount: number;
  checklistTotalCount: number;
  firstVoteStep: number;
  firstVoteTotalSteps: number;
  quizCompleted: boolean;
  quizScore: number;
}) {
  const {
    eligibilityStatus,
    checklistCompletedCount,
    checklistTotalCount,
    firstVoteStep,
    firstVoteTotalSteps,
    quizCompleted,
    quizScore,
  } = args;

  const eligPoints =
    eligibilityStatus === "eligible"
      ? 25
      : eligibilityStatus === "needsAction"
        ? 15
        : eligibilityStatus === "notEligible"
          ? 5
          : 0;

  const checklistRatio =
    checklistTotalCount > 0 ? checklistCompletedCount / checklistTotalCount : 0;
  const checklistPoints = Math.round(checklistRatio * 35);

  const wizardRatio =
    firstVoteTotalSteps > 0 ? Math.min(1, firstVoteStep / firstVoteTotalSteps) : 0;
  const wizardPoints = Math.round(wizardRatio * 25);

  const quizPoints = quizCompleted ? Math.round((quizScore / 100) * 15) : 0;

  const score = Math.max(0, Math.min(100, eligPoints + checklistPoints + wizardPoints + quizPoints));

  let label: "20% Ready" | "50% Ready" | "80% Ready" | "100% Ready";
  if (score >= 95) label = "100% Ready";
  else if (score >= 75) label = "80% Ready";
  else if (score >= 45) label = "50% Ready";
  else label = "20% Ready";

  return { score, label };
}


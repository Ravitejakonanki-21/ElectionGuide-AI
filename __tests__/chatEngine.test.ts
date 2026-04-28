import { answerQuestion } from "@/lib/chatEngine";

describe("chatEngine – answerQuestion()", () => {
  it("returns a non-empty answer for a known eligibility question", () => {
    const result = answerQuestion("Am I eligible to vote?");
    expect(result).toBeDefined();
    expect(result.intentId).not.toBe("fallback");
    expect(result.answer).toBeInstanceOf(Array);
    expect(result.answer.length).toBeGreaterThan(0);
  });

  it("returns a non-empty answer for a registration question", () => {
    const result = answerQuestion("How do I register as a voter?");
    expect(result.answer.length).toBeGreaterThan(0);
    expect(result.intentId).not.toBe("fallback");
  });

  it("returns a non-empty answer for a documents question", () => {
    const result = answerQuestion("What documents do I need on polling day?");
    expect(result.answer.length).toBeGreaterThan(0);
  });

  it("returns a non-empty answer for a voter list question", () => {
    const result = answerQuestion("What if my name is missing from the voter list?");
    expect(result.answer.length).toBeGreaterThan(0);
  });

  it("returns the fallback answer for an unrelated question", () => {
    const result = answerQuestion("What is the best pizza topping?");
    expect(result.intentId).toBe("fallback");
    expect(result.answer[0].content).toContain("eligibility");
  });

  it("returns fallback for an empty string", () => {
    const result = answerQuestion("");
    expect(result.intentId).toBe("fallback");
  });

  it("returns an answer object with the correct shape", () => {
    const result = answerQuestion("polling day steps");
    expect(result).toHaveProperty("intentId");
    expect(result).toHaveProperty("answer");
    expect(typeof result.intentId).toBe("string");
    expect(Array.isArray(result.answer)).toBe(true);
  });

  it("each answer block has a valid type", () => {
    const result = answerQuestion("How do I vote?");
    const validTypes = ["text", "steps", "bullets", "callout"];
    result.answer.forEach((block) => {
      expect(validTypes).toContain(block.type);
    });
  });

  it("is case-insensitive for keyword matching", () => {
    const lower = answerQuestion("how do i register");
    const upper = answerQuestion("HOW DO I REGISTER");
    expect(lower.intentId).toBe(upper.intentId);
  });

  it("learnMore is undefined or an array", () => {
    const result = answerQuestion("eligibility check");
    expect(result.learnMore === undefined || Array.isArray(result.learnMore)).toBe(true);
  });
});

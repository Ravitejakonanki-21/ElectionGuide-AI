import { sanitizeChatInput, validateChatInput, MAX_INPUT_LENGTH } from "@/lib/sanitize";

describe("sanitizeChatInput()", () => {
  it("returns an empty string for non-string input", () => {
    // @ts-expect-error testing runtime behavior
    expect(sanitizeChatInput(null)).toBe("");
    // @ts-expect-error testing runtime behavior
    expect(sanitizeChatInput(undefined)).toBe("");
    // @ts-expect-error testing runtime behavior
    expect(sanitizeChatInput(123)).toBe("");
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitizeChatInput("  hello world  ")).toBe("hello world");
  });

  it("strips HTML tags", () => {
    expect(sanitizeChatInput("<script>alert('xss')</script>Hello")).toBe("Hello");
    expect(sanitizeChatInput("<b>bold</b> text")).toBe("bold text");
    expect(sanitizeChatInput("<img src=x onerror=alert(1)>")).toBe("");
  });

  it("enforces max length", () => {
    const longInput = "a".repeat(MAX_INPUT_LENGTH + 100);
    expect(sanitizeChatInput(longInput).length).toBe(MAX_INPUT_LENGTH);
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeChatInput("")).toBe("");
  });

  it("strips control characters", () => {
    expect(sanitizeChatInput("hello\x00world")).toBe("helloworld");
    expect(sanitizeChatInput("test\x07bell")).toBe("testbell");
  });

  it("preserves normal question text", () => {
    const q = "What documents do I need to vote?";
    expect(sanitizeChatInput(q)).toBe(q);
  });
});

describe("validateChatInput()", () => {
  it("returns valid: true for normal input", () => {
    const result = validateChatInput("How do I register?");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("returns valid: false for empty string", () => {
    const result = validateChatInput("");
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("returns valid: false for whitespace-only string", () => {
    const result = validateChatInput("   ");
    expect(result.valid).toBe(false);
  });

  it("returns valid: false for input exceeding max length", () => {
    const tooLong = "a".repeat(MAX_INPUT_LENGTH + 1);
    const result = validateChatInput(tooLong);
    expect(result.valid).toBe(false);
    expect(result.error).toContain(String(MAX_INPUT_LENGTH));
  });

  it("returns valid: true for input at exactly max length", () => {
    const exact = "a".repeat(MAX_INPUT_LENGTH);
    const result = validateChatInput(exact);
    expect(result.valid).toBe(true);
  });
});

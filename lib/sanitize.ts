/**
 * Input sanitization utilities for user-provided text.
 * Prevents XSS, enforces length limits, and normalizes whitespace.
 */

const MAX_INPUT_LENGTH = 500;

/**
 * Sanitizes a chat input string:
 * - Strips HTML tags to prevent XSS
 * - Trims whitespace
 * - Enforces maximum character length
 * - Removes control characters
 */
export function sanitizeChatInput(raw: string): string {
  if (typeof raw !== "string") return "";

  return raw
    .replace(/<script[^>]*>.*?<\/script>/gis, "") // strip script tags + content
    .replace(/<style[^>]*>.*?<\/style>/gis, "")   // strip style tags + content
    .replace(/<[^>]*>/g, "") // strip remaining HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control chars
    .trim()
    .slice(0, MAX_INPUT_LENGTH);
}

/**
 * Validates that a chat input is non-empty and within length bounds.
 */
export function validateChatInput(input: string): { valid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: "Input cannot be empty." };
  }
  if (input.length > MAX_INPUT_LENGTH) {
    return { valid: false, error: `Input must be ${MAX_INPUT_LENGTH} characters or fewer.` };
  }
  return { valid: true };
}

export { MAX_INPUT_LENGTH };

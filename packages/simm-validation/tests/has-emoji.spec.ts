import { hasEmoji } from "../src/has-emoji";
import { describe, expect, it } from "vitest";

describe("has-emoji.ts - hasEmoji", () => {
  // returns true for strings containing single emoji
  it("No.1: should return true when string contains single emoji", () => {
    const input = "😊";
    const result = hasEmoji(input);
    expect(result).toBe(true);
  });
  // returns true for strings containing multiple emojis
  it("No.2: should return true when string contains multiple emojis", () => {
    const input = "😊😂";
    const result = hasEmoji(input);
    expect(result).toBe(true);
  });
  // returns true for strings with emojis and other characters
  it("No.3: should return true when string contains emojis and other characters", () => {
    const input = "Hello 😊 World";
    const result = hasEmoji(input);
    expect(result).toBe(true);
  });
  // handles strings with emojis followed by zero-width joiners
  it("No.4: should return true when string contains emojis followed by zero-width joiners", () => {
    const input = "👩‍👩‍👧‍👦";
    const result = hasEmoji(input);
    expect(result).toBe(true);
  });
  // handles strings with emojis and diacritical marks
  it("No.5: should return true when string contains emojis and diacritical marks", () => {
    const input = "👨🏽‍⚕️";
    const result = hasEmoji(input);
    expect(result).toBe(true);
  });
  // returns true for icon ☺️☠️
  it("No.6: should return true for icon ☺️☠️", () => {
    const result = hasEmoji("☺️☠️");
    expect(result).toBe(true);
  });
  // handles strings with emoji-like characters that are not actual emojis
  it("No.7: should return false when string contains emoji-like characters that are not actual emojis", () => {
    const input = ":-)";
    const result = hasEmoji(input);
    expect(result).toBe(false);
  });
  // returns false for empty string input
  it("No.8: should return false when input is an empty string", () => {
    const input = "";
    const result = hasEmoji(input);
    expect(result).toBe(false);
  });
  // returns false for undefined input
  it("No.9: should return false when input is undefined", () => {
    const result = hasEmoji(undefined);
    expect(result).toBe(false);
  });
  // handles strings with only special characters but no emojis
  it("No.10: should return false when string contains only special characters but no emojis", () => {
    const input = "!@#$%^&*()";
    const result = hasEmoji(input);
    expect(result).toBe(false);
  });
  // returns false for null values
  it("No.11: should return false for null values", () => {
    expect(hasEmoji(null)).toBe(false);
  });
});

import { expect, describe, test } from "vitest";
import { isJapanese } from "../src/is-japanese";

describe("isJapanese", () => {
  test("returns true for a string containing only Hiragana characters", () => {
    const testString = "こんにちは"; // Hiragana
    expect(isJapanese(testString)).toBe(true);
  });

  test("returns true for a string containing only Katakana characters", () => {
    const testString = "カタカナ"; // Katakana
    expect(isJapanese(testString)).toBe(true);
  });

  test("returns true for a string containing only Full-width Katakana characters", () => {
    const testString = "ｶﾀｶﾅ"; // Full-width Katakana
    expect(isJapanese(testString)).toBe(true);
  });

  test("returns true for a string containing only Kanji characters", () => {
    const testString = "漢字"; // Kanji
    expect(isJapanese(testString)).toBe(true);
  });

  test("returns true for a string containing mixed Hiragana, Katakana, and Kanji characters", () => {
    const testString = "今日はカタカナと漢字"; // Mixed Hiragana, Katakana, and Kanji
    expect(isJapanese(testString)).toBe(true);
  });

  test("returns false for a string containing mixed Japanese characters", () => {
    const testString = "今日は、Good morning! おはようございます。";
    expect(isJapanese(testString)).toBe(false);
  });

  test("returns false for a string containing non-Japanese characters", () => {
    const testString = "Hello, こんにちは";
    expect(isJapanese(testString)).toBe(false);
  });

  test("returns false for an empty string", () => {
    const testString = "";
    expect(isJapanese(testString)).toBe(false);
  });

  test("returns false for null", () => {
    const testString = null;
    expect(isJapanese(testString)).toBe(false);
  });
});

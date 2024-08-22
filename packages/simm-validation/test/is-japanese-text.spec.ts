import { expect, describe, test } from "vitest";
import { isJapaneseText } from "../src/is-japanese";

describe("isJapaneseText", () => {
  test("returns true for a string containing only Hiragana characters", () => {
    const testString = "こんにちは"; // Hiragana
    expect(isJapaneseText(testString)).toBe(true);
  });

  test("returns true for a string containing only Katakana characters", () => {
    const testString = "カタカナ"; // Katakana
    expect(isJapaneseText(testString)).toBe(true);
  });

  test("returns true for a string containing only Full-width Katakana characters", () => {
    const testString = "ｶﾀｶﾅ"; // Full-width Katakana
    expect(isJapaneseText(testString)).toBe(true);
  });

  test("returns true for a string containing only Kanji characters", () => {
    const testString = "漢字"; // Kanji
    expect(isJapaneseText(testString)).toBe(true);
  });

  test("returns true for a string containing mixed Hiragana, Katakana, and Kanji characters", () => {
    const testString = "今日はカタカナと漢字"; // Mixed Hiragana, Katakana, and Kanji
    expect(isJapaneseText(testString)).toBe(true);
  });

  test("returns false for a string containing mixed Japanese characters", () => {
    const testString = "今日は、Good morning! おはようございます。";
    expect(isJapaneseText(testString)).toBe(false);
  });

  test("returns false for a string containing non-Japanese characters", () => {
    const testString = "Hello, こんにちは";
    expect(isJapaneseText(testString)).toBe(false);
  });

  test("returns false for an empty string", () => {
    const testString = "";
    expect(isJapaneseText(testString)).toBe(false);
  });

  test("returns false for null", () => {
    const testString = null;
    expect(isJapaneseText(testString)).toBe(false);
  });
});

import { expect, describe, test } from "vitest";
import { isJapaneseText } from "../src";

describe("isJapaneseText", () => {
  test("returns true for a string containing only Japanese characters", () => {
    const testString = "こんにちは";
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

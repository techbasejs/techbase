import { describe, it, expect } from "vitest";
import { isHiragana } from "../src/is-hiragana";

describe("isHiragana", () => {
  it("should return true for single Hiragana characters", () => {
    expect(isHiragana("あ")).toBe(true);
    expect(isHiragana("い")).toBe(true);
    expect(isHiragana("う")).toBe(true);
  });

  it("should return true for multiple Hiragana characters", () => {
    expect(isHiragana("あいう")).toBe(true);
    expect(isHiragana("たちつてと")).toBe(true);
  });

  it("should return false for strings containing non-Hiragana characters", () => {
    expect(isHiragana("あa")).toBe(false);
    expect(isHiragana("い1")).toBe(false);
    expect(isHiragana("う!")).toBe(false);
  });

  it("should return false for strings containing Kanji characters", () => {
    expect(isHiragana("あ日")).toBe(false);
    expect(isHiragana("い月")).toBe(false);
    expect(isHiragana("う水")).toBe(false);
  });

  it("should return false for strings containing Katakana characters", () => {
    expect(isHiragana("あア")).toBe(false);
    expect(isHiragana("いイ")).toBe(false);
    expect(isHiragana("うウ")).toBe(false);
  });

  it("should return true for mixed Hiragana characters", () => {
    expect(isHiragana("こんにちは")).toBe(true);
    expect(isHiragana("さようなら")).toBe(true);
  });

  it("should return false for empty strings", () => {
    expect(isHiragana("")).toBe(false);
  });

  it("should return false for strings containing only whitespace", () => {
    expect(isHiragana(" ")).toBe(false);
    expect(isHiragana("　")).toBe(false); // Japanese full-width space
  });

  it("should return false for strings with Hiragana and spaces", () => {
    expect(isHiragana("あ い")).toBe(false);
    expect(isHiragana("た ち つ")).toBe(false);
  });

  it("should return false for null and undefined", () => {
    expect(isHiragana(null as any)).toBe(false);
    expect(isHiragana(undefined as any)).toBe(false);
  });

  it("should return false for strings containing Latin alphabet characters", () => {
    expect(isHiragana("abc")).toBe(false);
    expect(isHiragana("あbc")).toBe(false);
  });

  it("should return true for strings with repeated Hiragana characters", () => {
    expect(isHiragana("あああ")).toBe(true);
    expect(isHiragana("いいい")).toBe(true);
  });

  it("should return true for long Hiragana strings", () => {
    expect(isHiragana("あいうえおかきくけこ")).toBe(true);
    expect(isHiragana("たちつてとなにぬねの")).toBe(true);
  });

  it("should return false for strings with mixed scripts", () => {
    expect(isHiragana("こんにちはHello")).toBe(false);
    expect(isHiragana("さようなら123")).toBe(false);
  });

  it("should return true for Hiragana with diacritics", () => {
    expect(isHiragana("がぎぐげご")).toBe(true);
    expect(isHiragana("ぱぴぷぺぽ")).toBe(true);
  });

  it("should return false for strings with punctuation", () => {
    expect(isHiragana("あ。")).toBe(false);
    expect(isHiragana("い、")).toBe(false);
  });

  it("should return false for strings with emoji", () => {
    expect(isHiragana("あ😊")).toBe(false);
    expect(isHiragana("い🍣")).toBe(false);
  });

  it("should return true for valid Hiragana with small characters", () => {
    expect(isHiragana("ぁぃぅぇぉ")).toBe(true);
    expect(isHiragana("ゃゅょ")).toBe(true);
  });

  it("should return false for mixed Hiragana and Romaji", () => {
    expect(isHiragana("あa")).toBe(false);
    expect(isHiragana("いi")).toBe(false);
  });

  it("should return false for strings with only special characters", () => {
    expect(isHiragana("!@#")).toBe(false);
    expect(isHiragana("^&*")).toBe(false);
  });
});

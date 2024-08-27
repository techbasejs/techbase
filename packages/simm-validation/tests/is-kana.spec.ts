import { describe, expect, it } from "vitest";
import { isKana } from "../src/is-kana";

describe("isKana", () => {
  it("should return true for Hiragana", () => {
    expect(isKana("こんにちは")).toBe(true);
  });

  it("should return true for Katakana", () => {
    expect(isKana("コンニチハ")).toBe(true);
  });

  it("should return false for non-Kana characters", () => {
    expect(isKana("hello")).toBe(false);
  });

  it("should return false for mixed Kana and non-Kana characters", () => {
    expect(isKana("こんにちは123")).toBe(false);
  });

  it("should return false for empty string", () => {
    expect(isKana("")).toBe(false);
  });

  it("should return false for Kanji characters", () => {
    expect(isKana("漢字")).toBe(false);
  });

  it("should return true for full-width Katakana characters", () => {
    expect(isKana("カタカナ")).toBe(true);
  });

  it("should return false for half-width Katakana characters", () => {
    expect(isKana("ｶﾀｶﾅ")).toBe(false);
  });

  it("should return true for a single Hiragana character", () => {
    expect(isKana("あ")).toBe(true);
  });

  it("should return true for a single Katakana character", () => {
    expect(isKana("ア")).toBe(true);
  });

  it("should return false for a mix of Hiragana and Kanji", () => {
    expect(isKana("こんにちは漢字")).toBe(false);
  });

  it("should return false for a mix of Katakana and Kanji", () => {
    expect(isKana("コンニチハ漢字")).toBe(false);
  });

  it("should return false for a string with spaces", () => {
    expect(isKana("こんにちは こんばんは")).toBe(false);
  });

  it("should return true for Hiragana with prolonged sound mark", () => {
    expect(isKana("あー")).toBe(true);
  });

  it("should return true for Katakana with prolonged sound mark", () => {
    expect(isKana("アー")).toBe(true);
  });

  it("should return false for Latin characters mixed with Kana", () => {
    expect(isKana("コンニチハhello")).toBe(false);
  });

  it("should return true for full-width punctuation with Kana", () => {
    expect(isKana("こんにちは、こんばんは。")).toBe(false);
  });
});

import { describe, it, expect } from "vitest";
import { convertFullWidthHiraganaToHalfWidthKatakana } from "../src/fullwidth-hiragana-to-halfwidth-katakana.js";

describe("convertFullWidthHiraganaToHalfWidthKatakana", () => {
  it("should convert full-width Hiragana to half-width Katakana correctly", () => {
    expect(convertFullWidthHiraganaToHalfWidthKatakana("こんにちは")).toBe(
      "ｺﾝﾆﾁﾊ",
    );
    expect(convertFullWidthHiraganaToHalfWidthKatakana("あいうえお")).toBe(
      "ｱｲｳｴｵ",
    );
    expect(convertFullWidthHiraganaToHalfWidthKatakana("がぎぐげご")).toBe(
      "ｶﾞｷﾞｸﾞｹﾞｺﾞ",
    );
    expect(convertFullWidthHiraganaToHalfWidthKatakana("ぱぴぷぺぽ")).toBe(
      "ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ",
    );
    expect(convertFullWidthHiraganaToHalfWidthKatakana("っゃゅょ")).toBe(
      "ｯｬｭｮ",
    );
  });

  it("should return the original string if there is no Hiragana character to convert", () => {
    expect(convertFullWidthHiraganaToHalfWidthKatakana("abc123")).toBe(
      "abc123",
    );
    expect(convertFullWidthHiraganaToHalfWidthKatakana("")).toBe("");
  });

  it("should handle mixed Hiragana and other characters without conversion", () => {
    expect(convertFullWidthHiraganaToHalfWidthKatakana("こんにちは123")).toBe(
      "ｺﾝﾆﾁﾊ123",
    );
    expect(convertFullWidthHiraganaToHalfWidthKatakana("あいうabc")).toBe(
      "ｱｲｳabc",
    );
  });

  it("should return null if the input is null", () => {
    expect(convertFullWidthHiraganaToHalfWidthKatakana(null)).toEqual("");
  });

  it("should return undefined if the input is undefined", () => {
    expect(convertFullWidthHiraganaToHalfWidthKatakana(undefined)).toEqual("");
  });

  it("should return input if the input contains special character", () => {
    expect(
      convertFullWidthHiraganaToHalfWidthKatakana("あいう!@#$%^&*()"),
    ).toBe("ｱｲｳ!@#$%^&*()");
  });
});

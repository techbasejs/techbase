import { describe, expect, it } from "vitest";
import { convertHalfwidthToFullwidth } from "../src/index";

describe("Test convertHalfwidthToFullwidth function", () => {
  it("should convert half width latin characters to full width", () => {
    const input = "abc";
    const output = convertHalfwidthToFullwidth(input);
    expect(output).toBe("ａｂｃ");
  });

  it("should convert half width katakana to full width", () => {
    const katakanaTests = [
      { input: "ｶﾞ", expected: "ガ" },
      { input: "ｷﾞ", expected: "ギ" },
      { input: "ｽﾞ", expected: "ズ" },
      { input: "ﾍﾟ", expected: "ペ" },
      { input: "ｦﾞ", expected: "ヺ" },
    ];

    for (const test of katakanaTests) {
      expect(convertHalfwidthToFullwidth(test.input)).toBe(test.expected);
    }
  });

  it("should convert space to full width", () => {
    const input = " ";
    const output = convertHalfwidthToFullwidth(input);
    expect(output).toBe("\u3000");
  });

  it("should handle empty string without raising error", () => {
    const input = "";
    const output = convertHalfwidthToFullwidth(input);
    expect(output).toBe("");
  });

  it("should handle special character and punctuation", () => {
    const specialCharacterTests = [
      { input: "!", expected: "！" },
      { input: "@", expected: "＠" },
      { input: "#", expected: "＃" },
      { input: "$", expected: "＄" },
      { input: "%", expected: "％" },
      { input: "^", expected: "＾" },
      { input: "&", expected: "＆" },
      { input: "*", expected: "＊" },
    ];

    for (const test of specialCharacterTests) {
      expect(convertHalfwidthToFullwidth(test.input)).toBe(test.expected);
    }
  });

  it("should convert numbers to full width", () => {
    const numberTests = [
      { input: "1", expected: "１" },
      { input: "2", expected: "２" },
      { input: "3", expected: "３" },
      { input: "4", expected: "４" },
      { input: "5", expected: "５" },
      { input: "6", expected: "６" },
    ];
    for (const test of numberTests) {
      expect(convertHalfwidthToFullwidth(test.input)).toBe(test.expected);
    }
  });

  it("should convert long half width text to full width", () => {
    const longTextTests = [
      {
        input: "ｻﾝﾌﾟﾙｻﾝﾌﾟﾙｻﾝﾌﾟﾙｻﾝﾌﾟﾙｻﾝﾌﾟﾙｻﾝﾌﾟﾙ",
        expected: "サンプルサンプルサンプルサンプルサンプルサンプル",
      },
      {
        input: "〒123-4567 東京都渋谷区代々木１丁目１−１ メゾン陽気",
        expected:
          "〒１２３－４５６７　東京都渋谷区代々木１丁目１−１　メゾン陽気",
      },
      {
        input: "佐藤 鈴木",
        expected: "佐藤　鈴木",
      },
      {
        input: "㈱電气通信会社 １２３番地！",
        expected: "㈱電气通信会社　１２３番地！",
      },
    ];
    for (const test of longTextTests) {
      expect(convertHalfwidthToFullwidth(test.input)).toBe(test.expected);
    }
  });
});

import { expect, describe, test } from "vitest";
import { checkRegExp } from "../../src/utils/check-regexp";
describe("checkRegExp", () => {
  test("returns true when the string matches the regular expression pattern", () => {
    const testString =
      "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";
    const pattern = /^[Ａ-Ｚａ-ｚ]+$/;
    expect(checkRegExp(testString, pattern)).toBe(true);
  });

  test("returns false when the string does not match the regular expression pattern", () => {
    const testString = "ABCDＡＢＣＤ";
    const pattern = /^[Ａ-Ｚａ-ｚ]+$/;
    expect(checkRegExp(testString, pattern)).toBe(false);
  });

  test("returns false when the string is null", () => {
    const pattern = /^[Ａ-Ｚａ-ｚ]+$/;
    expect(checkRegExp(null, pattern)).toBe(false);
  });
});

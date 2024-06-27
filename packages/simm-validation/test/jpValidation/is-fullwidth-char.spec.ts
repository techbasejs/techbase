import { expect, describe, test } from "vitest";
import { isFullWidthChar } from "../../src/jpValidation/is-fullwidth-char";

describe("isFullWidthChar", () => {
  test("returns true when the string contains only full-width characters", () => {
    const testString =
      "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";
    expect(isFullWidthChar(testString)).toBe(true);
  });

  test("returns false when the string contains any non-full-width characters", () => {
    const testString = "ABCDＡＢＣＤ";
    expect(isFullWidthChar(testString)).toBe(false);
  });

  test("returns false when the string is null", () => {
    expect(isFullWidthChar(null)).toBe(false);
  });
});

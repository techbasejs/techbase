import { expect, describe, test } from "vitest";
import { isHalfWidthChar } from "../../src/jpValidation/is-halfwidth-char";

describe("isHalfWidthChar", () => {
  test("returns true when the string contains only half-width characters", () => {
    const testString =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    expect(isHalfWidthChar(testString)).toBe(true);
  });

  test("returns false when the string contains any full-width characters", () => {
    const testString =
      "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ１２３４５６７８９０";
    expect(isHalfWidthChar(testString)).toBe(false);
  });

  test("returns false when the string is null", () => {
    expect(isHalfWidthChar(null)).toBe(false);
  });
});

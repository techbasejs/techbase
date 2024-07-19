import { expect, describe, test } from "vitest";
import { isHalfWidthNumeric } from "../src/is-halfwidth-numeric";

describe("isHalfWidthNumeric", () => {
  test("returns true when the input is only half-width numeric (including float and negative)", () => {
    const testString = "1234.56";
    expect(isHalfWidthNumeric(testString)).toEqual(true);

    const testNegativeNumber = "-7890.12";
    expect(isHalfWidthNumeric(testNegativeNumber)).toEqual(true);
  });

  test("returns false when the string contains any non-numeric characters", () => {
    const testString = "ABCD1234";
    expect(isHalfWidthNumeric(testString)).toEqual(false);
  });

  test("returns true when the input is a number type", () => {
    const testNumber = 1_234_567_890;
    expect(isHalfWidthNumeric(testNumber)).toEqual(true);
  });

  test("returns false when the string is null", () => {
    const testString = null;
    expect(isHalfWidthNumeric(testString)).toEqual(false);
  });
});

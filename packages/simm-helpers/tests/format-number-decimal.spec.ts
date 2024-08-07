/* eslint-disable unicorn/numeric-separators-style */
import { formatDecimal } from "./../src/format-number-decimal";
import { describe, expect, it } from "vitest";

describe("formatDecimal", () => {
  it("should return 0 for 0 input", () => {
    expect(formatDecimal(0)).toBe(0);
  });

  it("should return the number rounded to the specified decimal places", () => {
    expect(formatDecimal(123.456789, 2)).toBe(123.46);
  });

  it("should handle negative numbers correctly", () => {
    expect(formatDecimal(-123.456789, 3)).toBe(-123.457);
  });

  it("should return the same number if no fixed value is provided", () => {
    expect(formatDecimal(123.456789)).toBe(123.456789);
  });

  it("should handle large numbers correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    expect(formatDecimal(123456789.123456789, 5)).toBe(123456789.12346);
  });

  it("should handle small numbers correctly", () => {
    expect(formatDecimal(0.000123456789, 7)).toBe(0.0001235);
  });

  it("should handle whole numbers correctly when fixed is not provided", () => {
    expect(formatDecimal(1000)).toBe(1000);
  });
});

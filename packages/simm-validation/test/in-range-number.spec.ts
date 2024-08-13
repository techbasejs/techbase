import { inRangeNumber } from "../../simm-helpers/src/in-range-number";
import { expect, describe, test } from "vitest";

describe("inRangeNumber", () => {
  test("should return true when the number is within the range", () => {
    expect(inRangeNumber(15, 10, 20)).toBe(true);
  });

  test("should return false when the number is below the range", () => {
    expect(inRangeNumber(5, 10, 20)).toBe(false);
  });

  test("should return false when the number is above the range", () => {
    expect(inRangeNumber(25, 10, 20)).toBe(false);
  });

  test("should return true when the number is exactly the minimum of the range", () => {
    expect(inRangeNumber(10, 10, 20)).toBe(true);
  });

  test("should return true when the number is exactly the maximum of the range", () => {
    expect(inRangeNumber(20, 10, 20)).toBe(true);
  });

  test("should return true for negative numbers within the range", () => {
    expect(inRangeNumber(-5, -10, 0)).toBe(true);
  });

  test("should return false for negative numbers below the range", () => {
    expect(inRangeNumber(-15, -10, 0)).toBe(false);
  });

  test("should return true for decimal numbers within the range", () => {
    expect(inRangeNumber(15.5, 10, 20)).toBe(true);
  });

  test("should return false for decimal numbers below the range", () => {
    expect(inRangeNumber(9.9, 10, 20)).toBe(false);
  });

  test("should return true for numbers in different formats within the range", () => {
    expect(inRangeNumber(255, 100, 300)).toBe(true); // Decimal
    expect(inRangeNumber(0xff, 100, 300)).toBe(true); // Hexadecimal
    expect(inRangeNumber(0b1111_1111, 100, 300)).toBe(true); // Binary
    expect(inRangeNumber(0.255e3, 100, 300)).toBe(true); // Exponential
  });

  test("should return true when the number is 255 in different formats and within the range", () => {
    const min = 100;
    const max = 300;

    expect(inRangeNumber(255, min, max)).toBe(true);
    expect(inRangeNumber(255, min, max)).toBe(true);
    expect(inRangeNumber(0xff, min, max)).toBe(true);
    expect(inRangeNumber(0b1111_1111, min, max)).toBe(true);
    expect(inRangeNumber(0.255e3, min, max)).toBe(true);
  });

  test("should return false when value is not a number", () => {
    expect(inRangeNumber(Number.NaN, 10, 20)).toBe(false);
    expect(inRangeNumber(Number("invalid"), 10, 20)).toBe(false);
  });
});

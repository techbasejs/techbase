import { inRange } from "../../simm-helpers/src/in-range";
import { expect, describe, test } from "vitest";

describe("inRange", () => {
  test("returns true for values within the range", () => {
    const isAdult = inRange(18, 65);

    const withinRangeValues = [18, 20, 50, 65];

    for (const value of withinRangeValues) {
      expect(isAdult(value)).toBe(true);
    }
  });

  test("returns false for values outside the range", () => {
    const isAdult = inRange(18, 65);

    const outsideRangeValues = [17, 66, 100, 10];

    for (const value of outsideRangeValues) {
      expect(isAdult(value)).toBe(false);
    }
  });

  test("handles edge cases correctly", () => {
    const isTeenager = inRange(13, 19);

    expect(isTeenager(13)).toBe(true);
    expect(isTeenager(19)).toBe(true);
    expect(isTeenager(12)).toBe(false);
    expect(isTeenager(20)).toBe(false);
  });

  test("returns false for non-number inputs", () => {
    const isValid = inRange(0, 10);

    // Test non-number inputs
    expect(isValid("5" as any)).toBe(false);
    expect(isValid(null as any)).toBe(false);
    expect(isValid(undefined as any)).toBe(false);
    expect(isValid(Number.NaN)).toBe(false);
  });
});

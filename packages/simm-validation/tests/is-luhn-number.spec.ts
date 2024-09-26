import { describe, it, expect } from "vitest";
import { isLuhnNumber } from "../src";

describe("isLuhnNumber", () => {
  it("should be Luhn Number", () => {
    expect(isLuhnNumber("555555-555555-4444")).toBe(true);
    expect(isLuhnNumber("4111111111111111")).toBe(true);
  });

  it("should not be Luhn Number", () => {
    expect(isLuhnNumber(new Date())).toBe(false);
    expect(isLuhnNumber("12345678")).toBe(false);
    expect(isLuhnNumber("invalid")).toBe(false);
  });
});

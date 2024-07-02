import { isDate } from "../../src/utils/date-utils";
import { describe, expect, it } from "vitest";

describe("date-utils.ts - isDate", () => {
  // valid date string in ISO format returns true
  it("No.1: should return true when given a valid date string in ISO format", () => {
    const result = isDate("2023-10-01T00:00:00Z");
    expect(result).toBe(true);
  });
  // valid date string returns true
  it("No.2: should return true when given a valid date string", () => {
    const result = isDate("2023-10-01");
    expect(result).toBe(true);
  });
  // valid date string returns true
  it("No.3: should return true when given a valid date string", () => {
    const result = isDate("July 1, 2021 12:00:00");
    expect(result).toBe(true);
  });
  // valid date number returns true
  it("No.4: should return true when given a valid date number", () => {
    const result = isDate(1_633_046_400_000);
    expect(result).toBe(true);
  });
  it("No.5: should return true when given a valid date number", () => {
    const result = isDate(1_633_046_400_000);
    expect(result).toBe(true);
  });
  it("No.6: should return true when given a valid date string", () => {
    const result = isDate(1_633_046_400_000);
    expect(result).toBe(true);
  });
  // invalid date string returns false
  it("No.7: should return false when given an invalid date string", () => {
    const result = isDate("invalid-date");
    expect(result).toBe(false);
  });
  it("No.8: should return false when given an invalid date string empty", () => {
    const result = isDate("");
    expect(result).toBe(false);
  });
  it("No.9: should return false when given an invalid date number", () => {
    const result = isDate(8_640_000_000_000_001);
    expect(result).toBe(false);
  });
});

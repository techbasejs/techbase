import { isDate, calcDate } from "../src/validate-utils";
import { describe, expect, it } from "vitest";

describe("validate-utils.ts - isDate", () => {
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
  // in
  // invalid date string returns false
  it("No.7: should return false when given an invalid date string", () => {
    const result = isDate("invalid-date");
    expect(result).toBe(false);
  });
  it("No.8: should return false when given an invalid date string empty", () => {
    const result = isDate("");
    expect(result).toBe(false);
  });
});
describe("validate-utils.ts - calcDate", () => {
  // calculates days between two dates within the same month
  it("No.1: should calculate days between two dates within the same month", () => {
    const startDate = new Date(2023, 9, 1);
    const endDate = new Date(2023, 9, 10);
    const result = calcDate(startDate, endDate);
    expect(result).toBe(9);
  });
  // calculates days between two dates across different months
  it("No.2: should calculate days between two dates across different months", () => {
    const startDate = new Date(2023, 9, 1);
    const endDate = new Date(2023, 10, 10);
    const result = calcDate(startDate, endDate);
    expect(result).toBe(40);
  });
  // calculates days when startDate and endDate are the same
  it("No.3: should calculate days when startDate and endDate are the same", () => {
    const startDate = new Date(2023, 9, 1);
    const endDate = new Date(2023, 9, 1);
    const result = calcDate(startDate, endDate);
    expect(result).toBe(0);
  });
  // handles dates around daylight saving time changes
  it("No.4: should handle dates around daylight saving time changes when startDate > endDate", () => {
    const startDate = new Date(2023, 2, 10);
    const endDate = new Date(2023, 2, 1);
    const result = calcDate(startDate, endDate);
    expect(result).toBe(-9);
  });
});

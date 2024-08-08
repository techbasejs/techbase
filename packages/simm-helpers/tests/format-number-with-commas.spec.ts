/* eslint-disable unicorn/numeric-separators-style */
import { describe, expect, it } from "vitest";
import { formatNumberWithCommas } from "./../src/format-number-with-commas";

describe("formatNumberWithCommas", () => {
  it("should return an empty string for empty string input", () => {
    expect(formatNumberWithCommas("")).toBe("");
  });

  it('should return "0" for 0 input', () => {
    expect(formatNumberWithCommas(0)).toBe("0");
  });

  it('should return "0" for "0" string input', () => {
    expect(formatNumberWithCommas("0")).toBe("0");
  });

  it("should format positive integer numbers correctly", () => {
    expect(formatNumberWithCommas(1234567)).toBe("1,234,567");
  });

  it("should format negative integer numbers correctly", () => {
    expect(formatNumberWithCommas(-1234567)).toBe("-1,234,567");
  });

  it("should format positive decimal numbers correctly", () => {
    expect(formatNumberWithCommas(1234567.89)).toBe("1,234,567.89");
  });

  it("should format negative decimal numbers correctly", () => {
    expect(formatNumberWithCommas(-1234567.89)).toBe("-1,234,567.89");
  });

  it("should format positive string numbers correctly", () => {
    expect(formatNumberWithCommas("1234567")).toBe("1,234,567");
  });

  it("should format negative string numbers correctly", () => {
    expect(formatNumberWithCommas("-1234567")).toBe("-1,234,567");
  });

  it("should format positive decimal string numbers correctly", () => {
    expect(formatNumberWithCommas("1234567.89")).toBe("1,234,567.89");
  });

  it("should format negative decimal string numbers correctly", () => {
    expect(formatNumberWithCommas("-1234567.89")).toBe("-1,234,567.89");
  });

  it("should format numbers with more than three decimal places correctly", () => {
    expect(formatNumberWithCommas("1234.56789")).toBe("1,234.56789");
  });

  it("should format negative numbers with more than three decimal places correctly", () => {
    expect(formatNumberWithCommas("-1234.56789")).toBe("-1,234.56789");
  });

  it("should format numbers with less than three decimal places correctly", () => {
    expect(formatNumberWithCommas("1234.5")).toBe("1,234.5");
  });

  it("should format negative numbers with less than three decimal places correctly", () => {
    expect(formatNumberWithCommas("-1234.5")).toBe("-1,234.5");
  });
});

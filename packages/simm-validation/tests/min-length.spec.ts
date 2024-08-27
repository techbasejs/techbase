import { describe, expect, it } from "vitest";
import { minLength } from "../src/index";

describe("minLength", () => {
  it("should return true for a string with length equal to min", () => {
    expect(minLength("hello", 5)).toBe(true);
  });

  it("should return true for a string with length greater than min", () => {
    expect(minLength("hello world", 5)).toBe(true);
  });

  it("should return false for a string with length less than min", () => {
    expect(minLength("hi", 5)).toBe(false);
  });

  it("should return true for a number with digit length equal to min", () => {
    expect(minLength(12_345, 5)).toBe(true);
  });

  it("should return true for a number with digit length greater than min", () => {
    expect(minLength(123_456, 5)).toBe(true);
  });

  it("should return false for a number with digit length less than min", () => {
    expect(minLength(123, 5)).toBe(false);
  });

  it("should return true for an array with length greater than or equal to min", () => {
    expect(minLength([1, 2, 3], 2)).toBe(true);
  });

  it("should return false for an array with length less than min", () => {
    expect(minLength([1], 2)).toBe(false);
  });

  it("should return false for non-string and non-number input", () => {
    expect(minLength({}, 5)).toBe(false);
    expect(minLength(null, 5)).toBe(false);
    expect(minLength(undefined, 5)).toBe(false);
  });
});

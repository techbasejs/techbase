import { describe, expect, it } from "vitest";
import { maxLength } from "./../src/index";

describe("maxLength", () => {
  it("should return true for a string with length equal to max", () => {
    expect(maxLength("hello", 5)).toBe(true);
  });

  it("should return true for a string with length less than max", () => {
    expect(maxLength("hi", 5)).toBe(true);
  });

  it("should return false for a string with length greater than max", () => {
    expect(maxLength("hello world", 5)).toBe(false);
  });

  it("should return true for a number with digit length equal to max", () => {
    expect(maxLength(12_345, 5)).toBe(true);
  });

  it("should return true for a number with digit length less than max", () => {
    expect(maxLength(123, 5)).toBe(true);
  });

  it("should return false for a number with digit length greater than max", () => {
    expect(maxLength(123_456, 5)).toBe(false);
  });

  it("should return true for an array with length less than or equal to max", () => {
    expect(maxLength([1, 2, 3], 3)).toBe(true);
  });

  it("should return false for an array with length greater than max", () => {
    expect(maxLength([1, 2, 3, 4], 3)).toBe(false);
  });

  it("should return false for non-string and non-number input", () => {
    expect(maxLength({}, 5)).toBe(false);
    expect(maxLength(null, 5)).toBe(false);
    expect(maxLength(undefined, 5)).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { isStringArray } from "../src/is-string-array";

describe("isStringArray", () => {
  it("should return true for a valid JSON array of strings", () => {
    expect(isStringArray('["apple", "banana", "cherry"]')).toBe(true);
  });

  it("should return true for a valid JSON array with mixed types", () => {
    expect(isStringArray('[1, 2, "3"]')).toBe(true);
  });

  it("should return false for a JSON object", () => {
    expect(isStringArray('{"key": "value"}')).toBe(false);
  });

  it("should return false for null input", () => {
    expect(isStringArray(null)).toBe(false);
  });

  it("should return false for a non-array string", () => {
    expect(isStringArray("not an array")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(isStringArray("")).toBe(false);
  });

  it("should return false for an invalid JSON string", () => {
    expect(isStringArray('["apple", "banana", "cherry"')).toBe(false);
  });

  it("should return true for an empty JSON array", () => {
    expect(isStringArray("[]")).toBe(true);
  });

  it("should return true for a JSON array of numbers", () => {
    expect(isStringArray("[1, 2, 3]")).toBe(true);
  });

  it("should return false for a JSON string that is not an array", () => {
    expect(isStringArray('"not an array"')).toBe(false);
  });
});

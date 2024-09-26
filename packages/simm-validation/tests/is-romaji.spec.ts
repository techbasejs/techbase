import { isRomaji } from "../src/is-romaji";
import { describe, expect, it } from "vitest";

describe("isRomaji", () => {
  // Test case for a valid Romaji string without spaces
  it("should return true for valid Romaji string without spaces", () => {
    expect(isRomaji("Simple")).toBe(true);
  });

  // Test case for a valid Romaji string with spaces
  it("should return true for valid Romaji string with spaces", () => {
    expect(isRomaji("Simple Package")).toBe(true);
  });

  // Test case for a string containing diacritical marks
  it("should return false for string containing diacritical marks", () => {
    expect(isRomaji("Sĩmplè")).toBe(false);
  });

  // Test case for a string containing Japanese characters
  it("should return false for string containing Japanese characters", () => {
    expect(isRomaji("東京")).toBe(false);
  });

  // Test case for a string containing numbers
  it("should return false for string containing numbers", () => {
    expect(isRomaji("Simple123")).toBe(false);
  });

  // Test case for a string containing special characters
  it("should return false for string containing special characters", () => {
    expect(isRomaji("Simple!")).toBe(false);
  });

  // Test case for an empty string
  it("should return false for empty string", () => {
    expect(isRomaji("")).toBe(false);
  });

  // Test case for a null value
  it("should return false for null value", () => {
    expect(isRomaji(null)).toBe(false);
  });

  // Test case for an undefined value
  it("should return false for undefined value", () => {
    expect(isRomaji(undefined)).toBe(false);
  });
});

import { expect, describe, test } from "vitest";
import { isHexColor } from "../src/is-hex-color";

describe("isHexColor", () => {
  test("returns true for a valid 6-character hex color with #", () => {
    const testString = "#FFFFFF"; // White color in hex
    expect(isHexColor(testString)).toBe(true);
  });

  test("returns true for a valid 3-character shorthand hex color with #", () => {
    const testString = "#FFF"; // White color in shorthand hex
    expect(isHexColor(testString)).toBe(true);
  });

  test("returns true for a valid 6-character hex color without #", () => {
    const testString = "000000"; // Black color in hex without #
    expect(isHexColor(testString)).toBe(true);
  });

  test("returns true for a valid 3-character hex color without #", () => {
    const testString = "ABC"; // Shorthand color code without #
    expect(isHexColor(testString)).toBe(true);
  });

  test("returns true for a valid 8-character hex color with alpha", () => {
    const testString = "#FFFFFF00"; // White color with full transparency
    expect(isHexColor(testString, true)).toBe(true);
  });

  test("returns true for a valid 4-character shorthand hex color with alpha", () => {
    const testString = "#FFF0"; // White color with partial transparency
    expect(isHexColor(testString, true)).toBe(true);
  });

  test("returns false for a hex color with invalid characters", () => {
    const testString = "#GGG"; // Invalid characters 'G'
    expect(isHexColor(testString)).toBe(false);
  });

  test("returns false for a hex color with invalid length", () => {
    const testString = "#FFFFF"; // Only 5 characters
    expect(isHexColor(testString)).toBe(false);
  });

  test("returns false for a string that is not a hex color", () => {
    const testString = "Hello"; // Not a hex color at all
    expect(isHexColor(testString)).toBe(false);
  });

  test("returns false for an empty string", () => {
    const testString = "";
    expect(isHexColor(testString)).toBe(false);
  });

  test("returns false for null", () => {
    const testString = null;
    expect(isHexColor(testString)).toBe(false);
  });

  test("returns false for undefined", () => {
    const testString = undefined;
    expect(isHexColor(testString)).toBe(false);
  });

  test("returns false for a string with extra characters", () => {
    const testString = "#FFFFFFF"; // Too many characters (7 instead of 6)
    expect(isHexColor(testString)).toBe(false);
  });
});

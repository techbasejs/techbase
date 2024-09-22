import { expect, describe, test } from "vitest";
import { isRgbColor } from "../src/is-rgb-color";

describe("isRgbColor", () => {
  test("returns true for a valid RGB color string", () => {
    const testString = "rgb(255, 255, 255)"; // White color
    expect(isRgbColor(testString)).toBe(true);
  });

  test("returns true for a valid RGB color string with no spaces", () => {
    const testString = "rgb(0,0,0)"; // Black color
    expect(isRgbColor(testString)).toBe(true);
  });

  test("returns true for a valid RGB color string with minimal spaces", () => {
    const testString = "rgb( 255 , 0 , 127 )"; // Custom color
    expect(isRgbColor(testString)).toBe(true);
  });

  test("returns false for an invalid RGB color string with out-of-bounds values", () => {
    const testString = "rgb(256, 0, 0)"; // Red value out of range
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for an invalid RGB color string with missing values", () => {
    const testString = "rgb(255,255)"; // Missing the blue component
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for an invalid RGB color string with extra values", () => {
    const testString = "rgb(255, 255, 255, 255)"; // Too many values
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for an invalid RGB color string with invalid characters", () => {
    const testString = "rgb(255, 255, abc)"; // Invalid blue component
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for an empty string", () => {
    const testString = "";
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for null", () => {
    const testString = null;
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for undefined", () => {
    const testString = undefined;
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for a string that isn't in the RGB format", () => {
    const testString = "rgb(hello)"; // Not valid values
    expect(isRgbColor(testString)).toBe(false);
  });

  test("returns false for a string that is missing parentheses", () => {
    const testString = "rgb 255, 255, 255"; // No parentheses
    expect(isRgbColor(testString)).toBe(false);
  });
});

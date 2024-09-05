import { expect, describe, test } from "vitest";
import { isBase64 } from "../src/is-base64";

describe("isBase64", () => {
  test("returns true for a valid Base64 encoded string", () => {
    const testString = "SGVsbG8gd29ybGQ="; // "Hello world" in Base64
    expect(isBase64(testString)).toBe(true);
  });

  test("returns false for a Base64 string with no padding but is a multiple of 4", () => {
    const testString = "SGVsbG8gd29ybGQ"; // "Hello world" in Base64 without padding
    expect(isBase64(testString)).toBe(false);
  });

  test("returns true for a valid Base64 string with one padding character", () => {
    const testString = "SGVsbG8gd29ybGU="; // Valid Base64 with one padding character
    expect(isBase64(testString)).toBe(true);
  });

  test("returns true for a valid Base64 string with two padding characters", () => {
    const testString = "SGVsbG8gdw=="; // Valid Base64 with two padding characters
    expect(isBase64(testString)).toBe(true);
  });

  test("returns false for an invalid Base64 string with too many padding characters", () => {
    const testString = "SGVsbG8gdw==="; // Invalid Base64 with too many padding characters
    expect(isBase64(testString)).toBe(false);
  });

  test("returns false for a string with invalid Base64 characters", () => {
    const testString = "SGVsbG8gd29ybGQ$"; // Contains invalid character '$'
    expect(isBase64(testString)).toBe(false);
  });

  test("returns false for a string with a length that is not a multiple of 4", () => {
    const testString = "SGVsbG8gdw"; // Length is not a multiple of 4
    expect(isBase64(testString)).toBe(false);
  });

  test("returns false for an empty string", () => {
    const testString = "";
    expect(isBase64(testString)).toBe(false);
  });

  test("returns false for null", () => {
    const testString = null;
    expect(isBase64(testString)).toBe(false);
  });

  test("returns false for undefined", () => {
    const testString = undefined;
    expect(isBase64(testString)).toBe(false);
  });

  test("returns false for a string containing only non-Base64 characters", () => {
    const testString = "ABCDE"; // Only alphabetic characters, not valid Base64
    expect(isBase64(testString)).toBe(false);
  });

  test("returns false for a string containing a mix of Base64 and non-Base64 characters", () => {
    const testString = "SGVsbG8gd29ybGQ$%^"; // Mix of valid Base64 and invalid characters
    expect(isBase64(testString)).toBe(false);
  });
});

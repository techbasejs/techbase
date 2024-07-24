import { test, expect, describe } from "vitest";
import { isPhoneNumber } from "../src/index";

describe("isPhoneNumber", () => {
  test("returns true for valid phone numbers", () => {
    expect(isPhoneNumber('0123456789')).toBe(true);
    expect(isPhoneNumber('01234567890')).toBe(true);
    expect(isPhoneNumber('012-3456-7890')).toBe(true);
    expect(isPhoneNumber('0123-456-789')).toBe(true);
    expect(isPhoneNumber('+1-800-555-5555')).toBe(true);
    expect(isPhoneNumber('+44 20 7946 0958')).toBe(true);
    expect(isPhoneNumber('0039 02 12345678')).toBe(true);
  });

  test("returns true for valid phone numbers with custom regex", () => {
    const customRegex = /^\d{3}-\d{3}-\d{4}$/;
    expect(isPhoneNumber('123-456-7890', customRegex)).toBe(true);
    expect(isPhoneNumber('012-3456-7890', customRegex)).toBe(false);
  });

  test("returns false for invalid phone numbers", () => {
    expect(isPhoneNumber('1234567890')).toBe(false);
    expect(isPhoneNumber('012345678')).toBe(false);
    expect(isPhoneNumber('012345678901')).toBe(false);
    expect(isPhoneNumber('phone number')).toBe(false);
    expect(isPhoneNumber('')).toBe(false);
    expect(isPhoneNumber('012-345-678')).toBe(false);
    expect(isPhoneNumber('0123-45-6789')).toBe(false);
  });

  test("returns false for null or undefined", () => {
    expect(isPhoneNumber(null)).toBe(false);
    expect(isPhoneNumber(undefined as any)).toBe(false);
  });

  test("returns false for empty string", () => {
    expect(isPhoneNumber('')).toBe(false);
  });

  test("handles non-string, non-number inputs", () => {
    expect(isPhoneNumber({} as any)).toBe(false);
    expect(isPhoneNumber([] as any)).toBe(false);
    expect(isPhoneNumber(true as any)).toBe(false);
  });
});

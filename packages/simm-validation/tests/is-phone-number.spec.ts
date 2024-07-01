import { test, expect, describe } from "vitest";
import { isPhoneNumber } from "../src/is-phone-number";

describe("isPhoneNumber", () => {
  test("returns true for valid phone numbers", () => {
    expect(isPhoneNumber('0123456789')).toBe(true);
    expect(isPhoneNumber('01234567890')).toBe(true);
  });

  test("returns false for invalid phone numbers", () => {
    expect(isPhoneNumber('1234567890')).toBe(false);
    expect(isPhoneNumber('012345678')).toBe(false);
    expect(isPhoneNumber('012345678901')).toBe(false);
    expect(isPhoneNumber('phone number')).toBe(false);
    expect(isPhoneNumber('')).toBe(false);
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

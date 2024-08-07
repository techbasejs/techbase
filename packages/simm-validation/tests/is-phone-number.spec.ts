import { test, expect, describe } from "vitest";
import { isPhoneNumber } from "../src/index";

describe("isPhoneNumber", () => {
  test("returns true for valid Japan phone numbers", () => {
    expect(isPhoneNumber('090-1234-5678')).toBe(true); // Japan mobile number
    expect(isPhoneNumber('080-1234-5678')).toBe(true); // Japan mobile number
    expect(isPhoneNumber('070-1234-5678')).toBe(true); // Japan mobile number
    expect(isPhoneNumber('050-1234-5678')).toBe(true); // Japan IP number
    expect(isPhoneNumber('03-1234-5678')).toBe(true); // Japan landline number Tokyo
    expect(isPhoneNumber('06-1234-5678')).toBe(true); // Japan landline number Osaka
  });

  test("returns true for valid phone numbers with custom regex", () => {
    const customRegex = /^\d{3}-\d{3}-\d{4}$/;
    expect(isPhoneNumber('123-456-7890', { customRegex })).toBe(true);
    expect(isPhoneNumber('012-3456-7890', { customRegex })).toBe(false);
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

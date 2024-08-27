import { test, expect, describe } from "vitest";
import { isJapanesePhoneNumber } from "../src/index";

describe("isJapanesePhoneNumber", () => {
  test("returns true for valid Japan phone numbers", () => {
    expect(isJapanesePhoneNumber("090-1234-5678")).toBe(true); // Japan mobile number
    expect(isJapanesePhoneNumber("080-1234-5678")).toBe(true); // Japan mobile number
    expect(isJapanesePhoneNumber("070-1234-5678")).toBe(true); // Japan mobile number
    expect(isJapanesePhoneNumber("050-1234-5678")).toBe(true); // Japan IP number
    expect(isJapanesePhoneNumber("03-1234-5678")).toBe(true); // Japan landline number Tokyo
    expect(isJapanesePhoneNumber("06-1234-5678")).toBe(true); // Japan landline number Osaka
  });

  test("returns true for valid phone numbers with custom regex", () => {
    const customRegex = /^\d{3}-\d{3}-\d{4}$/;
    expect(isJapanesePhoneNumber("123-456-7890", { customRegex })).toBe(true);
    expect(isJapanesePhoneNumber("012-3456-7890", { customRegex })).toBe(false);
  });

  test("returns false for invalid phone numbers", () => {
    expect(isJapanesePhoneNumber("1234567890")).toBe(false);
    expect(isJapanesePhoneNumber("012345678")).toBe(false);
    expect(isJapanesePhoneNumber("012345678901")).toBe(false);
    expect(isJapanesePhoneNumber("phone number")).toBe(false);
    expect(isJapanesePhoneNumber("")).toBe(false);
    expect(isJapanesePhoneNumber("012-345-678")).toBe(false);
  });

  test("returns false for null or undefined", () => {
    expect(isJapanesePhoneNumber(null)).toBe(false);
    expect(isJapanesePhoneNumber(undefined)).toBe(false);
  });

  test("returns false for empty string", () => {
    expect(isJapanesePhoneNumber("")).toBe(false);
  });

  test("handles non-string, non-number inputs", () => {
    expect(isJapanesePhoneNumber({})).toBe(false);
    expect(isJapanesePhoneNumber([])).toBe(false);
    expect(isJapanesePhoneNumber(true)).toBe(false);
  });
});

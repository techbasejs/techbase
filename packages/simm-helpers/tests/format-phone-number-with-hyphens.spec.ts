/* eslint-disable unicorn/numeric-separators-style */
import { formatPhoneNumberWithHyphens } from "./../src/format-phone-number-with-hyphens";
import { describe, expect, it } from "vitest";

describe("formatPhoneNumberWithHyphens", () => {
  it("should return undefined for undefined input", () => {
    expect(formatPhoneNumberWithHyphens(undefined)).toBeUndefined();
  });

  it("should return the input if it is an empty string", () => {
    expect(formatPhoneNumberWithHyphens("")).toBe("");
  });

  it("should format a 10-digit phone number correctly", () => {
    expect(formatPhoneNumberWithHyphens("1234567890")).toBe("123-456-7890");
  });

  it("should format a phone number with more than 10 digits correctly", () => {
    expect(formatPhoneNumberWithHyphens("1234567890123")).toBe(
      "123-456-7890-123",
    );
  });

  it("should format a 10-digit phone number correctly when input is a number", () => {
    expect(formatPhoneNumberWithHyphens(1234567890)).toBe("123-456-7890");
  });

  it("should format a phone number with more than 10 digits correctly when input is a number", () => {
    expect(formatPhoneNumberWithHyphens(1234567890123)).toBe(
      "123-456-7890-123",
    );
  });

  it("should handle phone numbers starting with a plus sign correctly", () => {
    expect(formatPhoneNumberWithHyphens("+1234567890")).toBe("+123-456-7890");
  });

  it("should handle phone numbers starting with a plus sign and more than 10 digits correctly", () => {
    expect(formatPhoneNumberWithHyphens("+1234567890123")).toBe(
      "+123-456-7890-123",
    );
  });

  it("should return the input if it is less than 10 digits", () => {
    expect(formatPhoneNumberWithHyphens("123456789")).toBe("123456789");
  });

  it("should return the input if it is less than 10 digits and starts with a plus sign", () => {
    expect(formatPhoneNumberWithHyphens("+123456789")).toBe("+123456789");
  });
});

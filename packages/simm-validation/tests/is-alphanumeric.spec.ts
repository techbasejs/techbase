import { describe, expect, it } from "vitest";
import { isAlphanumeric } from '../src/is-alphanumeric';

describe("isAlphanumeric", () => {
  it("should return true for a string with only letters", () => {
    expect(isAlphanumeric("abcABC")).toBe(true);
  });

  it("should return true for a string with only numbers", () => {
    expect(isAlphanumeric("123456")).toBe(true);
  });

  it("should return true for a string with letters and numbers", () => {
    expect(isAlphanumeric("abc123ABC")).toBe(true);
  });

  it("should return false for a string with special characters", () => {
    expect(isAlphanumeric("abc123!@#")).toBe(false);
  });

  it("should return false for a string with spaces", () => {
    expect(isAlphanumeric("abc 123")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(isAlphanumeric("")).toBe(false);
  });

  it("should return true for a string with mixed case letters and numbers", () => {
    expect(isAlphanumeric("aBc123")).toBe(true);
  });

  it("should return false for a string with special characters at the start", () => {
    expect(isAlphanumeric("!abc123")).toBe(false);
  });

  it("should return false for a string with special characters at the end", () => {
    expect(isAlphanumeric("abc123!")).toBe(false);
  });

  it("should return true for a long alphanumeric string", () => {
    expect(
      isAlphanumeric(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      ),
    ).toBe(true);
  });

  it("should return false for a scientific notation number string", () => {
    expect(isAlphanumeric("123e3")).toBe(false);
  });

  it("should return false for a scientific notation number string with plus sign", () => {
    expect(isAlphanumeric("1233e+4")).toBe(false);
  });
});

import { it, expect, describe } from "vitest";

import { isStandardEmail } from "../src/is-standard-email";

describe("isStandardEmail", () => {
  describe("Valid cases", () => {
    it("should return true for valid email addresses", () => {
      expect(isStandardEmail("test@example.com")).toBe(true);
      expect(isStandardEmail("user.name+tag+sorting@example.com")).toBe(true);
      expect(isStandardEmail("user.name@sub.example.co.uk")).toBe(true);
    });

    it("should return true for emails with valid special characters in username", () => {
      expect(isStandardEmail("user.name@example.com")).toBe(true);
      expect(isStandardEmail("user+name@example.com")).toBe(true);
      expect(isStandardEmail("user-name@example.com")).toBe(true);
    });

    it("should return true for emails with subdomains", () => {
      expect(isStandardEmail("user.name@sub.example.com")).toBe(true);
      expect(isStandardEmail("user.name@sub.sub.example.com")).toBe(true);
    });

    it("should return true for emails with numbers in domain", () => {
      expect(isStandardEmail("user.name@123.com")).toBe(true);
      expect(isStandardEmail("user.name@sub.123.co.uk")).toBe(true);
    });

    it("should return true for emails with hyphens in domain", () => {
      expect(isStandardEmail("user.name@sub-domain.com")).toBe(true);
      expect(isStandardEmail("user.name@sub-domain.co.uk")).toBe(true);
    });

    it("should return true for long domain suffixes", () => {
      expect(isStandardEmail("user.name@example.museum")).toBe(true);
      expect(isStandardEmail("user.name@sub.example.travel")).toBe(true);
    });

    it("should return true for emails with digits in username", () => {
      expect(isStandardEmail("user123@example.com")).toBe(true);
      expect(isStandardEmail("123user@example.com")).toBe(true);
    });

    it("should return true for emails with uppercase letters", () => {
      expect(isStandardEmail("User.Name@Example.com")).toBe(true);
      expect(isStandardEmail("USER.NAME@EXAMPLE.COM")).toBe(true);
    });

    it("should return true for emails with mixed case in domain", () => {
      expect(isStandardEmail("user.name@Example.Com")).toBe(true);
      expect(isStandardEmail("user.name@Sub.Example.Co.Uk")).toBe(true);
    });
  });

  describe("Invalid cases", () => {
    it('should return false for emails without "@" symbol', () => {
      expect(isStandardEmail("testexample.com")).toBe(false);
      expect(isStandardEmail("user.name+tag+sortingexample.com")).toBe(false);
      expect(isStandardEmail("user.namesub.example.co.uk")).toBe(false);
    });

    it("should return false for emails without domain", () => {
      expect(isStandardEmail("test@")).toBe(false);
      expect(isStandardEmail("user.name+tag+sorting@")).toBe(false);
      expect(isStandardEmail("user.name@")).toBe(false);
    });

    it("should return false for emails without username", () => {
      expect(isStandardEmail("@example.com")).toBe(false);
      expect(isStandardEmail("@sub.example.co.uk")).toBe(false);
    });

    it("should return false for emails with invalid characters in username", () => {
      expect(isStandardEmail("user!name@example.com")).toBe(false);
      expect(isStandardEmail("user^name@example.com")).toBe(false);
      expect(isStandardEmail("user&name@example.com")).toBe(false);
    });

    it("should return false for emails with invalid domain suffix", () => {
      expect(isStandardEmail("user.name@example.c")).toBe(false);
      expect(isStandardEmail("user.name@example.")).toBe(false);
      expect(isStandardEmail("user.name@example")).toBe(false);
    });

    it("should return false for emails with spaces", () => {
      expect(isStandardEmail("user name@example.com")).toBe(false);
      expect(isStandardEmail("user.name@ example.com")).toBe(false);
      expect(isStandardEmail("user.name@example. com")).toBe(false);
    });

    it("should return false for emails with invalid characters in domain", () => {
      expect(isStandardEmail("user.name@exam!ple.com")).toBe(false);
      expect(isStandardEmail("user.name@exa^mple.com")).toBe(false);
      expect(isStandardEmail("user.name@exam&ple.com")).toBe(false);
    });
  });
});

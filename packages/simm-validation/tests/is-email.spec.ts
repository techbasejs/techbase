import { it, expect, describe } from "vitest";

import { isEmail } from "../src/is-email";

describe("isEmail", () => {
  describe("Valid cases", () => {
    it("should return true for valid email addresses", () => {
      expect(isEmail("test@example.com")).toBe(true);
      expect(isEmail("user.name+tag+sorting@example.com")).toBe(true);
      expect(isEmail("user.name@sub.example.co.uk")).toBe(true);
    });

    it("should return true for emails with valid special characters in username", () => {
      expect(isEmail("user.name@example.com")).toBe(true);
      expect(isEmail("user+name@example.com")).toBe(true);
      expect(isEmail("user-name@example.com")).toBe(true);
    });

    it("should return true for emails with subdomains", () => {
      expect(isEmail("user.name@sub.example.com")).toBe(true);
      expect(isEmail("user.name@sub.sub.example.com")).toBe(true);
    });

    it("should return true for emails with numbers in domain", () => {
      expect(isEmail("user.name@123.com")).toBe(true);
      expect(isEmail("user.name@sub.123.co.uk")).toBe(true);
    });

    it("should return true for emails with hyphens in domain", () => {
      expect(isEmail("user.name@sub-domain.com")).toBe(true);
      expect(isEmail("user.name@sub-domain.co.uk")).toBe(true);
    });

    it("should return true for long domain suffixes", () => {
      expect(isEmail("user.name@example.museum")).toBe(true);
      expect(isEmail("user.name@sub.example.travel")).toBe(true);
    });

    it("should return true for emails with digits in username", () => {
      expect(isEmail("user123@example.com")).toBe(true);
      expect(isEmail("123user@example.com")).toBe(true);
    });

    it("should return true for emails with uppercase letters", () => {
      expect(isEmail("User.Name@Example.com")).toBe(true);
      expect(isEmail("USER.NAME@EXAMPLE.COM")).toBe(true);
    });

    it("should return true for emails with mixed case in domain", () => {
      expect(isEmail("user.name@Example.Com")).toBe(true);
      expect(isEmail("user.name@Sub.Example.Co.Uk")).toBe(true);
    });
  });

  describe("Invalid cases", () => {
    it('should return false for emails without "@" symbol', () => {
      expect(isEmail("testexample.com")).toBe(false);
      expect(isEmail("user.name+tag+sortingexample.com")).toBe(false);
      expect(isEmail("user.namesub.example.co.uk")).toBe(false);
    });

    it("should return false for emails without domain", () => {
      expect(isEmail("test@")).toBe(false);
      expect(isEmail("user.name+tag+sorting@")).toBe(false);
      expect(isEmail("user.name@")).toBe(false);
    });

    it("should return false for emails without username", () => {
      expect(isEmail("@example.com")).toBe(false);
      expect(isEmail("@sub.example.co.uk")).toBe(false);
    });

    it("should return false for emails with invalid characters in username", () => {
      expect(isEmail("user!name@example.com")).toBe(false);
      expect(isEmail("user^name@example.com")).toBe(false);
      expect(isEmail("user&name@example.com")).toBe(false);
    });

    it("should return false for emails with invalid domain suffix", () => {
      expect(isEmail("user.name@example.c")).toBe(false);
      expect(isEmail("user.name@example.")).toBe(false);
      expect(isEmail("user.name@example")).toBe(false);
    });

    it("should return false for emails with spaces", () => {
      expect(isEmail("user name@example.com")).toBe(false);
      expect(isEmail("user.name@ example.com")).toBe(false);
      expect(isEmail("user.name@example. com")).toBe(false);
    });

    it("should return false for emails with invalid characters in domain", () => {
      expect(isEmail("user.name@exam!ple.com")).toBe(false);
      expect(isEmail("user.name@exa^mple.com")).toBe(false);
      expect(isEmail("user.name@exam&ple.com")).toBe(false);
    });
  });
});

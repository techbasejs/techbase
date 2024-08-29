import { it, expect, describe } from "vitest";

import { isPassword } from "../src/is-password";

describe("isPassword", () => {
  describe("Valid case", () => {
    it("Password has more than 8 characters, contains number characters, contains special characters, contains uppercase characters", () => {
      expect(isPassword("Qwertyu1!")).toBe(true);
    });

    it("Password has more than 8 characters, contains number characters, contains special characters, contains uppercase characters", () => {
      expect(isPassword("Qwertyu1.")).toBe(true);
    });

    it("should pass for a password containing special characters like . , /", () => {
      expect(isPassword("Valid1,.")).toBe(true);
    });
  });

  describe("Invalid cases", () => {
    it("Password has less than 8 characters", () => {
      expect(isPassword("Qwe1@")).toBe(false);
    });

    it("Password has more than 8 characters but doesn't contain number characters", () => {
      expect(isPassword("Qwertyu@")).toBe(false);
    });

    it("Password has more than 8 characters, contains number characters but doesn't contain special characters", () => {
      expect(isPassword("Qwertyu1")).toBe(false);
    });

    it("Password has more than 8 characters, contains number characters, contains special characters, but doesn't contain uppercase characters", () => {
      expect(isPassword("qwertyu1!")).toBe(false);
    });
  });
});

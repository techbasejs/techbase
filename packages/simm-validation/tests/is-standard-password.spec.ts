import { it, expect, describe } from "vitest";

import { isStandardPassword } from "../src/is-standard-password";

describe("isStandardPassword", () => {
  it("Password has less than 8 characters", () => {
    expect(isStandardPassword("Qwe1@")).toBe(false);
  });

  it("Password has more than 8 characters but doesn't contain number characters", () => {
    expect(isStandardPassword("Qwertyu@")).toBe(false);
  });

  it("Password has more than 8 characters, contains number characters but doesn't contain special characters", () => {
    expect(isStandardPassword("Qwertyu1")).toBe(false);
  });

  it("Password has more than 8 characters, contains number characters, contains special characters, but doesn't contain uppercase characters", () => {
    expect(isStandardPassword("qwertyu1!")).toBe(false);
  });

  it("Password has more than 8 characters, contains number characters, contains special characters, contains uppercase characters", () => {
    expect(isStandardPassword("Qwertyu1!")).toBe(true);
  });

  it("Password has more than 8 characters, contains number characters, contains special characters, contains uppercase characters", () => {
    expect(isStandardPassword("Qwertyu1.")).toBe(true);
  });

  it("should pass for a password containing special characters like . , /", () => {
    expect(isStandardPassword("Valid1,.")).toBe(true);
  });
});

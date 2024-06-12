import { test, expect, describe } from "vitest";

import { isStandardPassword } from "../src/index";

describe("isStandardPassword", () => {
  test("Password has less than 8 characters", () => {
    expect(isStandardPassword("Qwe1@")).toBe(false);
  });

  test("Password has more than 8 characters but doesn't contain number characters", () => {
    expect(isStandardPassword("Qwertyu@")).toBe(false);
  });

  test("Password has more than 8 characters, contains number characters but doesn't contain special characters", () => {
    expect(isStandardPassword("Qwertyu1")).toBe(false);
  });

  test("Password has more than 8 characters, contains number characters, contains special characters, but doesn't contain uppercase characters", () => {
    expect(isStandardPassword("qwertyu1!")).toBe(false);
  });

  test("Password has more than 8 characters, contains number characters, contains special characters, contains uppercase characters", () => {
    expect(isStandardPassword("Qwertyu1!")).toBe(true);
  });
});

import { test, expect, describe } from "vitest";

import { isStandardEmail } from "../src/index";

describe("isStandardEmail", () => {
  test("Email doesn't contain @", () => {
    expect(isStandardEmail("Qwe1")).toBe(false);
  });

  test("Email contains empty string", () => {
    expect(isStandardEmail("Qwe u@")).toBe(false);
  });

  test("Email contains only @", () => {
    expect(isStandardEmail("@")).toBe(false);
  });

  test("Email contains more than 1 @", () => {
    expect(isStandardEmail("ab@c@zxc.com")).toBe(false);
  });

  test("Email doesn't contain .", () => {
    expect(isStandardEmail("abc@zxc")).toBe(false);
  });

  test("Standard Email", () => {
    expect(isStandardEmail("abc@zxc.com")).toBe(true);
  });
});

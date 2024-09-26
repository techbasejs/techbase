import { it, expect, describe } from "vitest";
import { isStrongPassword } from "../src";

describe("isStrongPassword", () => {
  it("check length of password", () => {
    expect(isStrongPassword("abcde😃fxyz", { minLength: 8 })).toBe(true);
    expect(isStrongPassword("abcde", { minLength: 8 })).toBe(false);
    expect(isStrongPassword("abcdefxyz", { minLength: 18 })).toBe(false);
    expect(isStrongPassword("abcde fxyz", { minLength: 18 })).toBe(false);
    expect(isStrongPassword(new Date(), { minLength: 18 })).toBe(false);
  });
  it("check uppercase characters", () => {
    expect(
      isStrongPassword("Abcdef123", { minLength: 8, uppercase: true })
    ).toBe(true);
    expect(
      isStrongPassword("1aaa2ddd", { minLength: 8, uppercase: { min: 1 } })
    ).toBe(false);
    expect(
      isStrongPassword("1aaa2dddF", { minLength: 8, uppercase: { min: 2 } })
    ).toBe(false);
  });

  it("check lowercase characters", () => {
    expect(
      isStrongPassword("Abcdef123", { minLength: 8, lowercase: true })
    ).toBe(true);
    expect(
      isStrongPassword("Abcdef123", { minLength: 8, lowercase: { min: 10 } })
    ).toBe(false);
    expect(
      isStrongPassword("1aaa2ddd", { minLength: 8, lowercase: { min: 8 } })
    ).toBe(false);
  });

  it("check number characters", () => {
    expect(isStrongPassword("abcdef123", { minLength: 8, number: true })).toBe(
      true
    );
    expect(
      isStrongPassword("1aaa2ddd", { minLength: 8, number: { min: 3 } })
    ).toBe(false);
  });

  it("check symbol characters", () => {
    expect(isStrongPassword("Abcdef@123", { minLength: 8, symbol: true })).toBe(
      true
    );
    expect(
      isStrongPassword("Abcdef123", { minLength: 8, symbol: { min: 1 } })
    ).toBe(false);
  });
});

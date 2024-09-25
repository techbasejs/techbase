import { it, expect, describe } from "vitest";
import { isStrongPassword } from "../src";

describe("isStrongPassword", () => {
  it("check length of password", () => {
    expect(isStrongPassword("abcdefxyz", { minLength: 8 })).toBe(true);
    expect(isStrongPassword("abcdefxyz", { minLength: 18 })).toBe(false);
  });

  it("check number characters", () => {
    expect(isStrongPassword("abcdef123", { minLength: 8, minNumbers: 1 })).toBe(
      true
    );
    expect(isStrongPassword("1aaa2ddd", { minLength: 8, minNumbers: 3 })).toBe(
      false
    );
  });

  it("check uppercase characters", () => {
    expect(
      isStrongPassword("Abcdef123", { minLength: 8, minUppercase: 1 })
    ).toBe(true);
    expect(
      isStrongPassword("1aaa2ddd", { minLength: 8, minUppercase: 1 })
    ).toBe(false);
    expect(
      isStrongPassword("1aaa2dddF", { minLength: 8, minUppercase: 2 })
    ).toBe(false);
  });

  it("check lowercase characters", () => {
    expect(
      isStrongPassword("Abcdef123", { minLength: 8, minLowercase: 4 })
    ).toBe(true);
    expect(
      isStrongPassword("1aaa2ddd", { minLength: 8, minLowercase: 8 })
    ).toBe(false);
  });

  it("check symbol characters", () => {
    expect(
      isStrongPassword("Abcdef@123", { minLength: 8, minSymbols: 1 })
    ).toBe(true);
    expect(isStrongPassword("Abcdef123", { minLength: 8, minSymbols: 1 })).toBe(
      false
    );
  });
});

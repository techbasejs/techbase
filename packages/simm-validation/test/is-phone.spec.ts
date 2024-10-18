import { validatePhone } from "../src/is-phone";
import { describe, it, expect } from "vitest";

describe("validatePhone function", () => {
  it("should return true for valid phone numbers", () => {
    expect(validatePhone("0123456789").isValid).toBe(true);
    expect(validatePhone("0987654321").isValid).toBe(true);
    expect(validatePhone("0555555555").isValid).toBe(true);
  });

  it("should return false and provide correct error message for invalid phone numbers", () => {
    const result1 = validatePhone("123-456-7890");
    expect(result1.isValid).toBe(false);
    expect(result1.errorMessage).toBe(
      "Phone Error: Phone number must start with 0 and be 10 or 11 digits long",
    );

    const result2 = validatePhone("1234");
    expect(result2.isValid).toBe(false);
    expect(result2.errorMessage).toBe(
      "Phone Error: Phone number must start with 0 and be 10 or 11 digits long",
    );

    const result3 = validatePhone("abcdefghij");
    expect(result3.isValid).toBe(false);
    expect(result3.errorMessage).toBe(
      "Phone Error: Phone number must start with 0 and be 10 or 11 digits long",
    );
  });
});

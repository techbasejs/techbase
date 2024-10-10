import { describe, it, expect } from "vitest";
import * as yup from "yup";
import "../../src/yup-extends/custom-validate"; // Import the file that extends yup

describe("yup-extends isPhoneNumber", () => {
  it("should validate a correct phone number", () => {
    const schema = yup.string().isPhoneNumber();
    const validPhoneNumber = "1234567890";

    expect(schema.isValidSync(validPhoneNumber)).toBe(true);
  });

  it("should invalidate an incorrect phone number", () => {
    const schema = yup.string().isPhoneNumber();
    const invalidPhoneNumber = "invalid-phone-number";

    expect(schema.isValidSync(invalidPhoneNumber)).toBe(false);
  });

  it("should return true for an empty value", () => {
    const schema = yup.string().isPhoneNumber();

    expect(schema.isValidSync("")).toBe(true);
  });

  it("should use the custom message when validation fails", () => {
    const schema = yup
      .string()
      .isPhoneNumber("Custom invalid phone number message");
    const invalidPhoneNumber = "invalid-phone-number";

    schema.validate(invalidPhoneNumber).catch((error_) => {
      expect(error_.message).toBe("Custom invalid phone number message");
    });
  });

  it("should validate a phone number with a specific locale", () => {
    const schema = yup.string().isPhoneNumber("Invalid phone number", "en-US");
    const validPhoneNumber = "(555) 555-1234"; // Replace with a valid phone number format for 'en-US' locale
    console.log(schema.isValidSync(validPhoneNumber), schema, "@@@@@@");
    expect(schema.isValidSync(validPhoneNumber)).toBe(true);
  });
});

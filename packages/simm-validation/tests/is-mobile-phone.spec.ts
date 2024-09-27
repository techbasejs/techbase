import { describe, it, expect } from "vitest";
import { isMobilePhone } from "../src/is-mobile-phone";

describe("isMobilePhone", () => {
  it("should be a mobile phone number", () => {
    expect(isMobilePhone("+84789550792")).toBe(true);
    expect(isMobilePhone("+84789550792", "vi-VN")).toBe(true);
    expect(isMobilePhone("0789550792", "vi-VN")).toBe(true);
    expect(isMobilePhone("(555) 555-1234", "en-US")).toBe(true);
    expect(isMobilePhone("(555) 555-1234", ["vi-VN", "en-US"])).toBe(true);
  });

  it("should not be a mobile phone number", () => {
    expect(isMobilePhone(85789550792, "vi-VN")).toBe(false);
    expect(isMobilePhone("+85789550792", "vi-VN")).toBe(false);
    expect(isMobilePhone("(5555) 555-1234", ["vi-VN", "en-US"])).toBe(false);
  });
});

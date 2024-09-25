import { describe, it, expect } from "vitest";
import { isPhone } from "../src";

describe("isPhone", () => {
  it("should be a phone number", () => {
    expect(isPhone("+84789550792", "vi-VN")).toBe(true);
    expect(isPhone("0789550792", "vi-VN")).toBe(true);
    expect(isPhone("(555) 555-1234", "en-US")).toBe(true);
    expect(isPhone("(555) 555-1234", ["vi-VN", "en-US"])).toBe(true);
  });

  it("should not be a phone number", () => {
    expect(isPhone("+85789550792", "vi-VN")).toBe(false);
    expect(isPhone("(5555) 555-1234", ["vi-VN", "en-US"])).toBe(false);
  });
});

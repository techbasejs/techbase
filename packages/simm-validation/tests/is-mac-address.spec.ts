import { describe, expect, it } from "vitest";
import { isMacAddress } from "../src/is-mac-address";

describe("isMacAddress", () => {
  it("should be MAC address", () => {
    expect(isMacAddress("00:1A:2B:3C:4D:5E")).toBe(true);
    expect(isMacAddress("A1-B2-C3-D4-E5-F6")).toBe(true);
    expect(isMacAddress("001A.2B3C.4D5E")).toBe(true);
    expect(isMacAddress("001A2B3C4D5E", { noSeparators: true })).toBe(true);
    expect(isMacAddress("001A2B3C4D5E4D5E", { noSeparators: true })).toBe(true);
  });

  it("should not be MAC address", () => {
    expect(isMacAddress(1_234_556_432)).toBe(false);
    expect(isMacAddress("A1:B2C3.D4-E5F6")).toBe(false);
    expect(isMacAddress("001A2B3C4D5E")).toBe(false);
    expect(isMacAddress("GG:XX:YY:ZZ:4D:5E")).toBe(false);
  });
});

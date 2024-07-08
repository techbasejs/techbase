import { describe, expect, it } from "vitest";
import { toHalfWidth } from "../src/index";

describe("toHalfWidth", () => {
  it("No.1: Should convert full-width Latin characters to half-width", () => {
    expect(toHalfWidth("！")).toBe("!");
    expect(toHalfWidth("（")).toBe("(");
    expect(toHalfWidth("）")).toBe(")");
    expect(toHalfWidth("～")).toBe("~");
  });

  it("No.2: Should convert full-width whitespace to half-width whitespace", () => {
    expect(toHalfWidth("　")).toBe(" ");
  });

  it("No.3: Should convert full-width Katakana characters to half-width Katakana characters", () => {
    expect(toHalfWidth("ガ")).toBe("ｶﾞ");
    expect(toHalfWidth("ジ")).toBe("ｼﾞ");
    expect(toHalfWidth("ゾ")).toBe("ｿﾞ");
    expect(toHalfWidth("。")).toBe("｡");
  });

  it("No.4: Should handle mixed-width characters", () => {
    expect(toHalfWidth("！ガ～")).toBe("!ｶﾞ~");
    expect(toHalfWidth("　ジ　ゾ")).toBe(" ｼﾞ ｿﾞ");
  });

  it("No.5: Should handle empty strings", () => {
    expect(toHalfWidth("")).toBe("");
  });

  it("No.6: Should handle undefined strings", () => {
    expect(toHalfWidth(undefined)).toBe(undefined);
  });

  it("No.7: Should handle null strings", () => {
    expect(toHalfWidth(null)).toBe(null);
  });
});

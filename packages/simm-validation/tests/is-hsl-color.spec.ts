import { describe, expect, it } from "vitest";
import { isHSLColor } from "../src";

describe("isHSLColor", () => {
  it("should be HSL color", () => {
    expect(isHSLColor("hsl(120,100%,50%)")).toBe(true);
    expect(isHSLColor("hsl(120deg,100%,50%)")).toBe(true);
    expect(isHSLColor("hsl(120 100% 50%)")).toBe(true);
    expect(isHSLColor("hsla(-0.5e2rad -100% -2.5%)")).toBe(true);
    expect(isHSLColor("hsl(170, 50%, 50%)")).toBe(true);
    expect(isHSLColor("hsla(108, 100%, 50%, 1)")).toBe(true);
  });

  it("should not be HSL color", () => {
    expect(isHSLColor(new Date())).toBe(false);
    expect(isHSLColor("hsl(120,100,50)")).toBe(false);
    expect(isHSLColor("hsl(120% 100% 50%)")).toBe(false);
    expect(isHSLColor("hsl(120|100%|50%)")).toBe(false);
  });
});

import { formatDecimalByExample } from "../../simm-helpers/src/currency-format";
import { describe, expect, it } from "vitest";

describe("currency-format.spec - formatDecimalByExample", () => {
  it("should format value with same decimal places as example", () => {
    const value = 123.456;
    const example = 0.12;
    const result = formatDecimalByExample(value, example);
    expect(result).toBe("123.45");
  });
  // Example value is zero
  it("should format value with zero decimal places when example is zero", () => {
    const value = 123.456;
    const example = 0;
    const result = formatDecimalByExample(value, example);
    expect(result).toBe("123");
  });
  // Handles example with no decimal places correctly
  it("should handle example with no decimal places correctly", () => {
    const value = 456.789;
    const example = 123;
    const result = formatDecimalByExample(value, example);
    expect(result).toBe("456");
  });
  it('should return "0" when value is falsy or NaN', () => {
    const value = Number.NaN;
    const example = 789.123;
    const result = formatDecimalByExample(value, example);
    expect(result).toBe("0.000");
  });

  it("should format negative value with same decimal places as example", () => {
    const value = -123.456;
    const example = -0.12;
    const result = formatDecimalByExample(value, example);
    expect(result).toBe("-123.45");
  });

  it("should format value with same decimal places as example when value is a very large decimal", () => {
    const value = 123.456;
    const example = 2.3e-6;
    const result = formatDecimalByExample(value, example);
    expect(result).toBe("123.4560000");
  });
});

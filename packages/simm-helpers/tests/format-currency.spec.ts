import { describe, expect, it } from "vitest";
import { formatCurrency } from "../src/format-currency";

describe("formatCurrency", () => {
  it("should format USD currency from number", () => {
    expect(formatCurrency(1000, "USD")).toBe("$1,000.00");
  });

  it("should format USD currency from string", () => {
    expect(formatCurrency("1000", "USD")).toBe("$1,000.00");
  });

  it("should format JPY currency from number without fixed decimal", () => {
    expect(formatCurrency(1000, "JPY")).toBe("￥1,000.00");
  });

  it("should format JPY currency from string without fixed decimal", () => {
    expect(formatCurrency("1000", "JPY")).toBe("￥1,000.00");
  });

  it("should format JPY currency with fixed decimal places", () => {
    expect(formatCurrency(1000.123, "JPY", 1)).toBe("￥1,000.1");
  });

  it("should format JPY currency with fixed decimal places from string", () => {
    expect(formatCurrency("1000.123", "JPY", 1)).toBe("￥1,000.1");
  });

  it("should format 0 USD correctly", () => {
    expect(formatCurrency(0, "USD")).toBe("$0.00");
  });

  it("should format 0 JPY correctly", () => {
    expect(formatCurrency(0, "JPY")).toBe("￥0.00");
  });

  it('should format "0" USD correctly', () => {
    expect(formatCurrency("0", "USD")).toBe("$0.00");
  });

  it('should format "0" JPY correctly', () => {
    expect(formatCurrency("0", "JPY")).toBe("￥0.00");
  });

  it("should format large numbers in USD", () => {
    expect(formatCurrency(1234.123, "USD")).toBe("$1,234.12");
  });

  it("should format large numbers in JPY with default decimal places", () => {
    expect(formatCurrency(1234.123, "JPY")).toBe("￥1,234.12");
  });

  it("should format large numbers in JPY with specified decimal places", () => {
    expect(formatCurrency(123.123, "JPY", 3)).toBe("￥123.123");
  });

  it("should format negative numbers in USD", () => {
    expect(formatCurrency(-1000, "USD")).toBe("(-$1,000.00)");
  });

  it("should format negative numbers in JPY", () => {
    expect(formatCurrency(-1000, "JPY")).toBe("-￥1,000.00");
  });
});

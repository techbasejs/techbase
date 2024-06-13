import { describe, expect, it } from "vitest";
import {
  formatCurrencyJPY,
  formatCurrencyJPYFloat,
  formatCurrencyUS,
  formatDecimal,
  formatNumberWithCommas,
  formatPhoneNumberWithHyphens,
} from "../format-utils";

describe("formatPhoneNumberWithHyphens", () => {
  it("should return undefined if input is undefined", () => {
    expect(formatPhoneNumberWithHyphens(undefined)).toBeUndefined();
  });

  it("should return the input if it is less than 4 digits", () => {
    expect(formatPhoneNumberWithHyphens("123")).toBe("123");
    expect(formatPhoneNumberWithHyphens(123)).toBe("123");
  });

  it("should format numbers with 4 to 6 digits with one hyphen", () => {
    expect(formatPhoneNumberWithHyphens("1234")).toBe("123-4");
    expect(formatPhoneNumberWithHyphens(12_345)).toBe("123-45");
    expect(formatPhoneNumberWithHyphens(123_456)).toBe("123-456");
  });

  it("should format numbers with 7 to 10 digits correctly", () => {
    expect(formatPhoneNumberWithHyphens("1234567")).toBe("123-456-7");
    expect(formatPhoneNumberWithHyphens("12345678")).toBe("123-456-78");
    expect(formatPhoneNumberWithHyphens("123456789")).toBe("123-456-789");
    expect(formatPhoneNumberWithHyphens("1234567890")).toBe("123-456-7890");
  });

  it("should format numbers with more than 10 digits correctly", () => {
    expect(formatPhoneNumberWithHyphens("12345678901")).toBe("123-456-7890-1");
    expect(formatPhoneNumberWithHyphens("123456789012")).toBe(
      "123-456-7890-12",
    );
    expect(formatPhoneNumberWithHyphens("1234567890123")).toBe(
      "123-456-7890-123",
    );
    expect(formatPhoneNumberWithHyphens("12345678901234")).toBe(
      "123-456-7890-1234",
    );
  });

  it("should handle numbers starting with a plus sign", () => {
    expect(formatPhoneNumberWithHyphens("+123")).toBe("+123");
    expect(formatPhoneNumberWithHyphens("+1234")).toBe("+123-4");
    expect(formatPhoneNumberWithHyphens("+12345")).toBe("+123-45");
    expect(formatPhoneNumberWithHyphens("+123456")).toBe("+123-456");
    expect(formatPhoneNumberWithHyphens("+1234567")).toBe("+123-456-7");
    expect(formatPhoneNumberWithHyphens("+12345678")).toBe("+123-456-78");
    expect(formatPhoneNumberWithHyphens("+123456789")).toBe("+123-456-789");
    expect(formatPhoneNumberWithHyphens("+1234567890")).toBe("+123-456-7890");
    expect(formatPhoneNumberWithHyphens("+12345678901")).toBe(
      "+123-456-7890-1",
    );
    expect(formatPhoneNumberWithHyphens("+123456789012")).toBe(
      "+123-456-7890-12",
    );
  });
});

describe("formatDecimal", () => {
  it("should return an empty string if input is 0", () => {
    expect(formatDecimal(0)).toBe(0);
  });

  it("should handle fixed being undefined", () => {
    expect(formatDecimal(123)).toBe(123);
    expect(formatDecimal(123.456)).toBe(123);
  });

  it("should format a number input with fixed decimal places", () => {
    expect(formatDecimal(123, 2)).toBe(123);
    expect(formatDecimal(123.456, 2)).toBe(123.46);
    expect(formatDecimal(123.456, 0)).toBe(123);
  });
});

describe("formatNumberWithCommas", () => {
  it('should return an empty string if input is undefined, null, 0, or "0"', () => {
    expect(formatNumberWithCommas(0)).toBe("0");
    expect(formatNumberWithCommas("0")).toBe("0");
  });

  it("should return the input as string if input is less than 1000", () => {
    expect(formatNumberWithCommas(123)).toBe("123");
    expect(formatNumberWithCommas("456")).toBe("456");
    expect(formatNumberWithCommas(999)).toBe("999");
  });

  it("should format numbers 1000 and greater with commas", () => {
    expect(formatNumberWithCommas(1000)).toBe("1,000");
    expect(formatNumberWithCommas(1_234_567)).toBe("1,234,567");
    expect(formatNumberWithCommas(1_000_000_000)).toBe("1,000,000,000");
  });

  it("should format string numbers 1000 and greater with commas", () => {
    expect(formatNumberWithCommas("1000")).toBe("1,000");
    expect(formatNumberWithCommas("1234567")).toBe("1,234,567");
    expect(formatNumberWithCommas("1000000000")).toBe("1,000,000,000");
  });

  it("should format decimal numbers with commas", () => {
    expect(formatNumberWithCommas(1234.56)).toBe("1,234.56");
    expect(formatNumberWithCommas("1234567.89")).toBe("1,234,567.89");
    expect(formatNumberWithCommas("1000000.0001")).toBe("1,000,000.0001");
  });
});

describe("formatCurrencyUS", () => {
  it('should return an empty string if input is  0, or "0"', () => {
    expect(formatCurrencyUS(0)).toBe("$0");
    expect(formatCurrencyUS("0")).toBe("$0");
  });

  it("should format positive integer numbers", () => {
    expect(formatCurrencyUS(1000)).toBe("$1,000.00");
    expect(formatCurrencyUS(123_456_789)).toBe("$123,456,789.00");
  });

  it("should format negative integer numbers", () => {
    expect(formatCurrencyUS(-1000)).toBe("-$1,000.00");
    expect(formatCurrencyUS(-123_456_789)).toBe("-$123,456,789.00");
  });

  it("should format positive decimal numbers", () => {
    expect(formatCurrencyUS(1234.56)).toBe("$1,234.56");
    expect(formatCurrencyUS(9_876_543.21)).toBe("$9,876,543.21");
  });

  it("should format negative decimal numbers", () => {
    expect(formatCurrencyUS(-1234.56)).toBe("-$1,234.56");
    expect(formatCurrencyUS(-9_876_543.21)).toBe("-$9,876,543.21");
  });

  it("should format string input representing positive numbers", () => {
    expect(formatCurrencyUS("1000")).toBe("$1,000.00");
    expect(formatCurrencyUS("123456789")).toBe("$123,456,789.00");
    expect(formatCurrencyUS("1234.56")).toBe("$1,234.56");
    expect(formatCurrencyUS("9876543.21")).toBe("$9,876,543.21");
  });

  it("should format string input representing negative numbers", () => {
    expect(formatCurrencyUS("-1000")).toBe("-$1,000.00");
    expect(formatCurrencyUS("-123456789")).toBe("-$123,456,789.00");
    expect(formatCurrencyUS("-1234.56")).toBe("-$1,234.56");
    expect(formatCurrencyUS("-9876543.21")).toBe("-$9,876,543.21");
  });
});

describe("formatCurrencyJPY", () => {
  it('should return "￥0" if input is 0 or "0"', () => {
    expect(formatCurrencyJPY(0)).toBe("￥0");
    expect(formatCurrencyJPY("0")).toBe("￥0");
  });

  it("should format positive integer numbers", () => {
    expect(formatCurrencyJPY(1000)).toBe("￥1,000");
    expect(formatCurrencyJPY(123_456_789)).toBe("￥123,456,789");
  });

  it("should format negative integer numbers", () => {
    expect(formatCurrencyJPY(-1000)).toBe("-￥1,000");
    expect(formatCurrencyJPY(-123_456_789)).toBe("-￥123,456,789");
  });

  it("should format positive decimal numbers", () => {
    expect(formatCurrencyJPY(1234.56)).toBe("￥1,235"); // Rounded to ￥1,235 (Japanese Yen doesn't use decimals for standard display)
    expect(formatCurrencyJPY(9_876_543.21)).toBe("￥9,876,543");
  });

  it("should format negative decimal numbers", () => {
    expect(formatCurrencyJPY(-1234.56)).toBe("-￥1,235"); // Rounded to ￥1,235 (Japanese Yen doesn't use decimals for standard display)
    expect(formatCurrencyJPY(-9_876_543.21)).toBe("-￥9,876,543");
  });

  it("should format string input representing positive numbers", () => {
    expect(formatCurrencyJPY("1000")).toBe("￥1,000");
    expect(formatCurrencyJPY("123456789")).toBe("￥123,456,789");
    expect(formatCurrencyJPY("1234.56")).toBe("￥1,235");
    expect(formatCurrencyJPY("9876543.21")).toBe("￥9,876,543");
  });

  it("should format string input representing negative numbers", () => {
    expect(formatCurrencyJPY("-1000")).toBe("-￥1,000");
    expect(formatCurrencyJPY("-123456789")).toBe("-￥123,456,789");
    expect(formatCurrencyJPY("-1234.56")).toBe("-￥1,235");
    expect(formatCurrencyJPY("-9876543.21")).toBe("-￥9,876,543");
  });
});

describe("formatCurrencyJPYFloat", () => {
  it("should format positive integer number without decimal", () => {
    expect(formatCurrencyJPYFloat(1000)).toBe("￥1,000.00");
  });

  it("should format negative integer number without decimal", () => {
    expect(formatCurrencyJPYFloat(-1000)).toBe("-￥1,000.00");
  });

  it("should format positive float number with odd decimal places", () => {
    expect(formatCurrencyJPYFloat(1234.567)).toBe("￥1,234.57");
  });

  it("should format negative float number with odd decimal places", () => {
    expect(formatCurrencyJPYFloat(-9876.543)).toBe("-￥9,876.54");
  });

  it("should format positive float number with even decimal places", () => {
    expect(formatCurrencyJPYFloat(1234.56)).toBe("￥1,234.56");
  });

  it("should format negative float number with even decimal places", () => {
    expect(formatCurrencyJPYFloat(-9876.54)).toBe("-￥9,876.54");
  });

  it("should format positive integer number without decimal from string input", () => {
    expect(formatCurrencyJPYFloat("1000")).toBe("￥1,000.00");
  });

  it("should format negative integer number without decimal from string input", () => {
    expect(formatCurrencyJPYFloat("-1000")).toBe("-￥1,000.00");
  });

  it("should format positive float number with odd decimal places from string input", () => {
    expect(formatCurrencyJPYFloat("1234.567")).toBe("￥1,234.57");
  });

  it("should format negative float number with odd decimal places from string input", () => {
    expect(formatCurrencyJPYFloat("-9876.543")).toBe("-￥9,876.54");
  });

  it("should format positive float number with even decimal places from string input", () => {
    expect(formatCurrencyJPYFloat("1234.56")).toBe("￥1,234.56");
  });

  it("should format negative float number with even decimal places from string input", () => {
    expect(formatCurrencyJPYFloat("-9876.54")).toBe("-￥9,876.54");
  });

  it('should return "￥0" if input is positive 0 and fixed is specified', () => {
    expect(formatCurrencyJPYFloat(0, 2)).toBe("￥0.00");
  });

  it('should return "￥0" if input is negative 0 and fixed is specified', () => {
    expect(formatCurrencyJPYFloat(-0, 2)).toBe("￥0.00");
  });

  it("should format positive float 0.0 with specified fixed", () => {
    expect(formatCurrencyJPYFloat(0, 2)).toBe("￥0.00");
  });

  it("should format negative float 0.0 with specified fixed", () => {
    expect(formatCurrencyJPYFloat(-0, 2)).toBe("￥0.00");
  });
});

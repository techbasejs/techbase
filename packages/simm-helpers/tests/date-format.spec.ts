import { dateFormat } from "../src/index";
import { describe, it, expect } from "vitest";

describe("dateFormat function", () => {
  it("should format datetime correctly with supported format", () => {
    const date = new Date();
    const formatted = dateFormat(date, "YYYY-MM-DD HH:mm:ss");
    const expected = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
    expect(formatted).toEqual(expected);
  });

  it("should format date correctly with supported format", () => {
    const date = new Date();
    const formatted = dateFormat(date, "YYYY-MM-DD");
    const expected = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    expect(formatted).toEqual(expected);
  });

  it("should throw error for invalid date parameter", () => {
    const invalidDate = "abc";
    expect(() => {
      dateFormat(invalidDate as any, "YYYY-MM-DD HH:mm:ss");
    }).toThrowError(`Invalid date string 'abc'`);
  });

  it("should return an empty string for null date", () => {
    expect(dateFormat(null, "YYYY-MM-DD")).toBe("");
  });

  it("should return an empty string for undefined date", () => {
    expect(dateFormat(undefined, "YYYY-MM-DD")).toBe("");
  });

  it("should format datetime correctly with full format", () => {
    const date = new Date("2024-08-07T14:30:45Z");
    const formatted = dateFormat(date, "YYYY-MM-DD HH:mm:ss");
    const expected = `2024-08-07 21:30:45`;
    expect(formatted).toEqual(expected);
  });

  it("should format date correctly with date-only format", () => {
    const date = new Date("2024-08-07T14:30:45Z");
    const formatted = dateFormat(date, "YYYY-MM-DD");
    const expected = `2024-08-07`;
    expect(formatted).toEqual(expected);
  });

  it("should format time correctly with hour-only format", () => {
    const date = new Date("2024-08-07T14:30:45Z");
    const formatted = dateFormat(date, "YYYY");
    const expected = `2024`;
    expect(formatted).toEqual(expected);
  });

  it("should format time correctly with minute-only format", () => {
    const date = new Date("2024-08-07T14:30:45Z");
    const formatted = dateFormat(date, "MM");
    const expected = `08`;
    expect(formatted).toEqual(expected);
  });
});

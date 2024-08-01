import { dateFormat } from "../src/index";
import { describe, it, expect } from "vitest";

describe('dateFormat function', () => {
  it('should format datetime correctly', () => {
    const date = new Date();
    const formatted = dateFormat(date, 'YYYY-MM-DD HH:mm:ss');
    const expected = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    expect(formatted).toEqual(expected);
  });

  it('should format date correctly', () => {
    const date = new Date();
    const formatted = dateFormat(date, 'YYYY-MM-DD');
    const expected = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    expect(formatted).toEqual(expected);
  });

  it('should throw error for invalid format (abc)', () => {
    const date = new Date();
    expect(() => {
      dateFormat(date, 'abc');
    }).toThrowError("Invalid format string 'abc'");
  });

  it('should throw error for invalid date parameter', () => {
    const invalidDate = 'abc';
    expect(() => {
      dateFormat(invalidDate as any, 'YYYY-MM-DD HH:mm:ss');
    }).toThrowError(`Invalid date parameter: '${invalidDate}'`);
  });

});
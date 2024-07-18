import { describe, expect, it } from "vitest";
import { maxLength } from './../src/max-length';

describe('maxLength', () => {
  it('Should return true for an array with length less than or equal to the maximum', () => {
    expect(maxLength([1, 2, 3], 4)).toBe(true);
    expect(maxLength([1, 2, 3], 3)).toBe(true);
  });

  it('Should return false for an array with length greater than the maximum', () => {
    expect(maxLength([1, 2, 3], 2)).toBe(false);
  });

  it('Should return true for a string with length less than or equal to the maximum', () => {
    expect(maxLength('abc', 4)).toBe(true);
    expect(maxLength('abc', 3)).toBe(true);
  });

  it('Should return false for a string with length greater than the maximum', () => {
    expect(maxLength('abc', 2)).toBe(false);
  });
});

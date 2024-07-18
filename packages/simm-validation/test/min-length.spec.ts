import { describe, expect, it } from "vitest";
import { minLength } from './../src/min-length';

describe('minLength', () => {
  it('Should return true for an array with length greater than or equal to the minimum', () => {
    expect(minLength([1, 2, 3], 2)).toBe(true);
    expect(minLength([1, 2, 3], 3)).toBe(true);
  });

  it('Should return false for an array with length less than the minimum', () => {
    expect(minLength([1, 2, 3], 4)).toBe(false);
  });

  it('Should return true for a string with length greater than or equal to the minimum', () => {
    expect(minLength('abc', 2)).toBe(true);
    expect(minLength('abc', 3)).toBe(true);
  });

  it('Should return false for a string with length less than the minimum', () => {
    expect(minLength('abc', 4)).toBe(false);
  });
});

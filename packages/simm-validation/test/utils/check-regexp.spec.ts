import { expect, describe, test } from "vitest";
import { checkRegExp } from "../../src/utils/check-regexp";
describe('checkRegExp', () => {
  test('returns true when the string and the pattern matches', () => {
    const testString = 'abcd';
    const pattern = /^[a-z]*$/;
    expect(checkRegExp(testString, pattern)).toEqual(true);
  });

  test('returns false when the string and the pattern don\'t match', () => {
    const testString = 'abcd123';
    const pattern = /^[a-z]*$/;
    expect(checkRegExp(testString, pattern)).toEqual(false);
  });

  test('returns true when the number and the pattern matches', () => {
    const testNumber = 123;
    const pattern = /^\d*$/;
    expect(checkRegExp(testNumber, pattern)).toEqual(true);
  });

  test('returns false when the string is null', () => {
    const pattern = /^[a-z]*$/;
    expect(checkRegExp(null, pattern)).toEqual(false);
  });

  test('returns false when the string is empty', () => {
    const testString = '';
    const pattern = /^[a-z]*$/;
    expect(checkRegExp(testString, pattern)).toEqual(false);
  });
});
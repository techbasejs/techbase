import { expect, describe, test } from "vitest";
import { checkRegExp } from "../../src/utils/simm-check-regexp";


describe('checkRegExp', () => {
  const pattern =  /^[ -~｡-ﾟ]+$/; // Half width char

  test('returns false when the string contains only regex matching characters', () => {
    const testString = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ';
    expect(checkRegExp(testString, pattern)).toEqual(false);
  });

  test('returns true when the string contains any non-regex matching characters', () => {
    const testString = 'abcd';
    expect(checkRegExp(testString, pattern)).toEqual(true);
  });

  test('returns false when the string is null', () => {
    expect(checkRegExp(null, pattern)).toEqual(false);
  });

  test('returns true when the string is empty', () => {
    expect(checkRegExp('', pattern)).toEqual(false);
  });
});

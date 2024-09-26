import { describe, it, expect } from 'vitest';
import { isKatakana } from '../src/is-katakana';

describe('isKatakana', () => {
  it('should return false for null input', () => {
    expect(isKatakana(null)).toBe(false);
  });

  it('should return false for undefined input', () => {
    expect(isKatakana(undefined)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isKatakana('')).toBe(false);
  });

  it('should return true for string with only Katakana characters', () => {
    expect(isKatakana('カタカナ')).toBe(true);
  });

  it('should return false for string with non-Katakana characters', () => {
    expect(isKatakana('カタカナabc')).toBe(false);
  });

  it('should return false for string with Hiragana characters', () => {
    expect(isKatakana('ひらがな')).toBe(false);
  });

  it('should return false for string with Kanji characters', () => {
    expect(isKatakana('漢字')).toBe(false);
  });

  it('should return false for string with mixed Katakana and other characters', () => {
    expect(isKatakana('カタカナひらがな')).toBe(false);
  });
});

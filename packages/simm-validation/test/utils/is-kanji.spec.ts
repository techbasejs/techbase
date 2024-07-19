import { isKanji } from './../../src/is-kanji';
import { describe, expect, it } from 'vitest';

describe('isKanji', () => {
  it('returns false for Hiragana characters', () => {
    expect(isKanji('こんにちは')).toBe(false);
  });

  it('returns false for Katakana characters', () => {
    expect(isKanji('コンニチハ')).toBe(false);
  });

  it('returns true for mixed Kanji and Hiragana characters', () => {
    expect(isKanji('今日は')).toBe(true);
  });

  it('returns true for Kanji characters', () => {
    expect(isKanji('漢字')).toBe(true);
  });

  it('returns false for non-Japanese characters', () => {
    expect(isKanji('Hello123')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isKanji('')).toBe(false);
  });

  it('returns true for string with Kanji and other characters', () => {
    expect(isKanji('漢字とひらがな')).toBe(true);
  });
});

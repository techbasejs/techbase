import { describe, it, expect } from 'vitest';
import { isKatakana } from '../../src';

describe('isKatakana', () => {
    it('should return true for full-width Katakana', () => {
        expect(isKatakana('カタカナ')).toBe(true);
    });

    it('should return true for half-width Katakana', () => {
        expect(isKatakana('ｶﾀｶﾅ')).toBe(true);
    });

    it('should return false for mixed Katakana and non-Katakana', () => {
        expect(isKatakana('カタカナA')).toBe(false);
    });

    it('should return false for Hiragana', () => {
        expect(isKatakana('あいうえお')).toBe(false);
    });

    it('should return true for Katakana phonetic extensions', () => {
        expect(isKatakana('ㇰㇱㇲ')).toBe(true);
    });
});

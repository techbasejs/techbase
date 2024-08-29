import { REGEXS } from "./shared/constants";

/**
 * Validates if the given string contains only Japanese characters.
 *
 * This validation includes:
 * - Hiragana Unicode range: \u3040-\u309F
 * - Katakana Unicode range: \u30A0-\u30FF
 * - Kanji Unicode range: \u4E00-\u9FFF
 * - Full-width characters Unicode range: \uFF00-\uFF9F
 *
 * @param {string | null | undefined} input - The string to validate.
 * @returns {boolean} - Returns true if the string contains only Japanese characters (Hiragana, Katakana, Kanji, or full-width characters), false otherwise.
 *
 * @example
 * ```typescript
 * const result1 = isJapanese("こんにちは"); // true, contains only Hiragana characters
 * const result2 = isJapanese("カタカナ"); // true, contains only Katakana characters
 * const result3 = isJapanese("漢字"); // true, contains only Kanji characters
 * const result4 = isJapanese("ｱｲｳｴｵ"); // true, contains only full-width Katakana characters
 * const result5 = isJapanese("Hello"); // false, contains non-Japanese characters
 * const result6 = isJapanese("こんにちは123"); // false, contains a mix of Japanese and non-Japanese characters
 * const result7 = isJapanese(""); // false, empty string
 * const result8 = isJapanese(null); // false, input is null
 * const result9 = isJapanese(undefined); // false, input is undefined
 * ```
 */
export const isJapanese = (input: string | null | undefined): boolean => {
  return typeof input === "string" && REGEXS.JAPANESE.test(input);
};

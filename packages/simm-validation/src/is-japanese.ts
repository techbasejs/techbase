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
 * @param {string} text - The string to validate.
 * @returns {boolean} - Returns true if the string contains only Japanese characters (Hiragana, Katakana, Kanji, or full-width characters), false otherwise.
 */
export const isJapanese = (input: string | null | undefined): boolean => {
  return typeof input === "string" && REGEXS.JAPANESE.test(input);
};

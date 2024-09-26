/**
 * Checks if a string contains any Kanji characters.
 *
 * @param {string} text - The string to check.
 * @returns {boolean} - Returns `true` if the string contains at least one Kanji character, otherwise returns `false`.
 * @example
 * isKanji("こんにちは"); // false - Hiragana characters
 * isKanji("コンニチハ"); // false - Katakana characters
 * isKanji("今日は"); // true - Mixed Kanji and Hiragana characters
 * isKanji("漢字"); // true - Kanji characters
 * isKanji("Hello"); // false - Non-Japanese characters
 */

import { REGEXS } from "./shared/constants";

export const isKanji = (text: string | null | undefined): boolean => {
  if (text === null || text === undefined) {
    return false;
  }

  return REGEXS.KANJI.test(text);
};

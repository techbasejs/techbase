/* eslint-disable no-irregular-whitespace */
import { REGEXS } from "./shared/constants";

/**
 * Checks if the given text is composed of only full-width katakana characters,
 * Japanese spaces, and Japanese punctuation marks.
 *
 * @param {string} text - The text to be checked.
 * @return {boolean} Returns true if the text is composed of only full-width katakana
 * characters, Japanese spaces, and Japanese punctuation marks. Otherwise, returns false.
 * @example
 * isFullWidthKana("カタカナ"); // true
 * isFullWidthKana("カタカナ　カタカナ"); // true
 * isFullWidthKana("カタカナ、カタカナ"); // true
 * isFullWidthKana("カタカナ。カタカナ"); // true
 * isFullWidthKana("カタカナa"); // false
 */
export function isFullWidthKana(text: string): boolean {
  return REGEXS.FULL_WIDTH_KANA.test(text);
}

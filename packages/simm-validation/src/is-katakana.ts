import { REGEXS } from "./shared/constants";

/**
 * Checks if the input string contains only Katakana characters.
 *
 * @param {string} input - The string to check.
 * @return {boolean} Returns true if the input string contains only Katakana characters, false otherwise.
 * @example
 * isKatakana("カタカナ"); // true
 * isKatakana("カタカナabc"); // false
 * isKatakana("ひらがな"); // false
 * isKatakana("漢字"); // false
 */
export function isKatakana(input: string | null | undefined): boolean {
  if (!input) return false;
  const katakanaRegex = REGEXS.KATAKANA;

  return katakanaRegex.test(input);
}

import { REGEXS } from "./constants";

/**
 * Validates if the given string contains only Hiragana characters.
 *
 * Hiragana Unicode range: \u3040-\u309F
 *
 * @param {string} input - The string to validate.
 * @returns {boolean} - Returns true if the string contains only Hiragana characters, false otherwise.
 */
export const isHiragana = (input: string | null | undefined): boolean => {
  return typeof input === "string" && REGEXS.HIRAGANA.test(input);
};

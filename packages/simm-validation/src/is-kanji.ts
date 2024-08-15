/**
 * Checks if a string contains any Kanji characters.
 *
 * @param {string} text - The string to check.
 * @returns {boolean} - Returns `true` if the string contains at least one Kanji character, otherwise returns `false`.
`
 */
import { regexValidate } from "./shared/constants/regex";

export const isKanji = (text: string | null | undefined): boolean => {
  if (text === null || text === undefined) {
    return false;
  }
  return regexValidate.KANJI_REGEX.test(text);
}

import { REGEXS } from "./shared/constants";

/**
 * Checks if a given string contains any emoji characters.
 * @param {string | null | undefined} value - The string to check for emoji characters.
 * @return {boolean} Returns true if the string contains emoji characters, false otherwise.
 * @example
 * hasEmoji("Hello, 😃"); // true
 * hasEmoji("Hello"); // false
 * hasEmoji("こんにちは"); // false
 * hasEmoji("こんにちは, 😃"); // true
 * hasEmoji("こんにちは, 😃, Hello"); // true
 */
export const hasEmoji = (value: string | null | undefined): boolean => {
  if (!value) return false;
  const regexEmoji = REGEXS.EMOJI;
  const regExpEmoji = new RegExp(regexEmoji);

  return regExpEmoji.test(value);
};

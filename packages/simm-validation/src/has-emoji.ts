import { regexValidate } from "./config/regex";

/**
 * Checks if a given string contains any emoji characters.
 * @param {string} value - The string to check for emoji characters.
 * @return {boolean} Returns true if the string contains emoji characters, false otherwise.
 */
export const hasEmoji = (value?: string | null): boolean => {
  if(!value) return false
  const regexEmoji = new RegExp(regexValidate.EMOJI);
  return regexEmoji.test(value);
};

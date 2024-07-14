/**
 * Validates if the given string contains only Hiragana characters.
 *
 * Hiragana Unicode range: \u3040-\u309F
 *
 * @param {string} input - The string to validate.
 * @param {RegExp} regex - The regex in order to validate.
 * @returns {boolean} - Returns true if the string contains only Hiragana characters, false otherwise.
 */
export const isHiragana = (
  input: string,
  regex: RegExp = /^[\u3040-\u309F]+$/,
): boolean => {
  return regex.test(input);
};

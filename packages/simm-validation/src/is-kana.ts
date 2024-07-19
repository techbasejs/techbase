/**
 * Validates if the given string contains only Kana characters.
 * Kana Unicode range:  /^[\u3040-\u30FF]+$/
 *
 * @param {string} input - The string to validate.
 * @param {RegExp} regex - The regex in order to validate.
 * @returns {boolean} - Returns true if the string contains only Kana characters, false otherwise.
 */
export const isKana = (
  input: string,
  regex: RegExp = /^[\u3040-\u30FF]+$/,
): boolean => {
  return regex.test(input);
};

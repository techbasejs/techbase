/**
 * This function checks if a given string matches a specific regular expression pattern.
 * @param {string | number | null} str - The string to test against the regular expression pattern. Can be `null`.
 * @param {RegExp} pattern - The regular expression pattern to test the string against.
 * @returns {boolean} Returns `true` if the string matches the pattern, `false` if it doesn't or if the string is `null`.
 * @example
 * ```
 * const pattern = /hello/i;
 * checkRegex('Hello World', pattern);  // return true
 * checkRegex(null, pattern);  // return false
 * ```
 */
export const checkRegex = (str: string | number | null, pattern: RegExp): boolean => {
  if (typeof str === 'undefined' || str === null || str === '') return false;
  return pattern.test(str.toString());
};

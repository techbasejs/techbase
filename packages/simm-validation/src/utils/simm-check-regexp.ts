/**
 * This function checks if a given string matches a specific regular expression pattern.
 * @param {string | null} str - The string to test against the regular expression pattern. Can be `null`.
 * @param {RegExp} pattern - The regular expression pattern to test the string against.
 * @returns {boolean} Returns `true` if the string matches the pattern, `false` if it doesn't or if the string is `null`.
 * @example
 * ```
 * const pattern = /hello/i;
 * simmCheckRegexp('Hello World', pattern);  // returns true
 * simmCheckRegexp(null, pattern);  // returns false
 * ```
 */
export const simmCheckRegexp = (
  str: string | number | null,
  pattern: RegExp,
): boolean => {
  if (str == null) {
    return false;
  }
  return pattern.test(str.toString());
};

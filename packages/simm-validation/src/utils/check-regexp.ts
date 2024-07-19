import { isEmpty } from "validator";

/**
 * This function checks if a given string or number matches a specific regular expression pattern.
 *
 * @param {string | number | null} str - The input value to be tested. It can be a string, a number or null.
 * @param {RegExp} pattern - The regular expression against which the `str` parameter will be tested.
 * @returns {boolean} Returns true if the `str` matches the `pattern`, otherwise returns false. If `str` is null or an empty string, it will return false.
 *
 * @example
 * checkRegExp('123', /^[0-9]*$/);  // returns true
 * checkRegExp(123, /^[a-z]*$/);   // returns false
 */
export const checkRegExp = (
  str: string | number | null,
  pattern: RegExp,
): boolean => {
  if (str === null || (typeof str == 'string' && isEmpty(str)) ) {
    return false;
  }
  return pattern.test(str.toString());
};

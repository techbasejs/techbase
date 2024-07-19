import { checkRegExp } from "./utils/check-regexp";

/**
 * This function checks if a given string is a half-width numeric string.
 * Half-width numerics include decimal numbers and can be negative. They are referred to as "half-width"
 * because in character encodings, they occupy one byte of space.
 * @param {string | null} str - The string to check. Can be `null`.
 * @returns {boolean} Returns `true` if the string is a half-width numeric, `false` otherwise or if the string is `null`.
 * @example
 * ```
 * isHalfWidthNumeric('123');  // returns true
 * isHalfWidthNumeric('-456.78');  // returns true
 * isHalfWidthNumeric(null);  // returns false
 * ```
 */
export const isHalfWidthNumeric = (str: string | number | null): boolean => {
  return checkRegExp(str, /^-?\d+(\.\d+)?$/);
};

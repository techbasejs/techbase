import { checkRegExp } from "./utils/check-regexp";

/**
 * Checks if the provided string strictly contains only half-width characters.
 *
 * @param {string | null} str - The input string to be checked.
 * @returns {boolean} Returns `true` if the string exclusively contains half-width characters; `false` otherwise.
 * @example
 *  const result = isHalfWidthChar('abc123');
 *  console.log(result); // prints: true
 *  const result2 = isHalfWidthChar('ａｂｃ１２３');
 *  console.log(result2); // prints: false
 */
export const isHalfWidthChar = (str: string | null): boolean => {
  return checkRegExp(str, /^[ -~｡-ﾟ]+$/);
};

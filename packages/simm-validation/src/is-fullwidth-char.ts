import { checkRegExp } from "./utils/check-regexp";

/**
 * Checks if the provided string strictly contains only full-width characters.
 * @param {string | null} str - The input string to be checked.
 * @returns {boolean} Returns `true` if the string exclusively contains full-width characters; `false` otherwise.
 * @example
 *  const result = isFullWidthChar('ａｂｃ１２３');
 *  console.log(result); // prints: true
 *  const result2 = isFullWidthChar('abc123');
 *  console.log(result2); // prints: false
 */
export const isFullWidthChar = (str: string | null): boolean => {
  return checkRegExp(str, /^[^ -~｡-ﾟ]+$/);
};

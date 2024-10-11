import { REGEXS } from "./shared/constants";
import { isEmpty } from "./is-empty";
/**
 * Check if the given value is alphanumeric.
 * @param value - The value to check.
 * @returns True if the value is alphanumeric, otherwise false.
 * @example
 * isAlphanumeric("Hello123"); // true
 * isAlphanumeric("こんにちは"); // false
 * isAlphanumeric("こんにちは, Hello"); // false
 * isAlphanumeric("こんにちは, Hello123"); // false
 * isAlphanumeric("こんにちは, Hello 123"); // false
 * isAlphanumeric("Hello 123"); // false
 */
export const isAlphanumeric = (
  value: string | number | null | undefined,
): boolean => {
  if (isEmpty(value)) return false;

  return REGEXS.ALPHANUMERIC.test(String(value));
};

import { REGEXS } from "./shared/constants";
import { isEmpty } from "./is-empty";
/**
 * Check if the given value is alphanumeric.
 * @param value - The value to check.
 * @returns True if the value is alphanumeric, otherwise false.
 */
export const isAlphanumeric = (
  value: string | number | null | undefined,
): boolean => {
  if (isEmpty(value)) return false;

  return REGEXS.ALPHANUMERIC.test(String(value));
};

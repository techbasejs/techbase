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

  const alphanumericRegex = /^[\dA-Za-z]+$/;
  return alphanumericRegex.test(String(value));
};

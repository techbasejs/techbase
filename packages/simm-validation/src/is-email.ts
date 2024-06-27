import { REGEX } from "./libs/constant";

/**
 * Check if a string is a valid email address.
 *
 * @param {string|null|undefined} value - The string to check.
 * @returns {boolean} - Whether the string is a valid email address.
 */
export const isEmail = (value?: string) => {
  // Check if the value is falsy.
  if (!value) return false;
  // Check if the value is a valid email address using a regular expression.
  return REGEX.email.test(value);
};

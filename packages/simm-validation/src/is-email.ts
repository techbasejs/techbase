import { isEmpty } from "./is-empty";

/**
 * Check if a string is a valid email address.
 *
 * @param {string|null|undefined} value - The string to check.
 * @param {RegExp|null|undefined} regex - An optional regular expression to use.
 * @returns {boolean} - Whether the string is a valid email address.
 * @example
 *  const result = isEmail('JGqgR@example.com');
 *  console.log(result); // prints: true
 *  const result2 = isEmail('example.com');
 *  console.log(result2); // prints: false
 */
export const isEmail = (
  value?: string | null,
  // Taken from HTML spec (NFC 5322): https://regex101.com/r/3uvtNl/1
  regex: RegExp = /^((?:[\w!#$%&'*+/=?\\^`{|}~-]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)([\w.\\-]*\w\.\w{2,})$/,
) => {
  // Check if the value is falsy.
  if (isEmpty(value)) return false;
  // Check if the value is a valid email address using a regular expression.
  return regex.test(value ?? "");
};

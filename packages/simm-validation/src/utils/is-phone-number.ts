/**
 * Checks if the provided value is a valid phone number.
 *
 * The phone number can match one of the following patterns:
 * 1. /^0\d{9,10}$/ - Starts with '0' followed by 9 to 10 digits (local format).
 * 2. /^\d{2,4}-\d{3,4}-\d{3,4}$/ - Format 'XXX-XXXX-XXX' or similar.
 * 3. /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/ - International format with optional '+' and country code.
 *
 * @param {string | number | null | undefined} value - The value to be checked, which can be either a string, number, null, or undefined.
 * @param {RegExp} [customRegex] - Optional custom regex pattern to validate the phone number.
 * @returns {boolean} Returns `true` if the value is a valid phone number according to the patterns; `false` otherwise.
 * @example
 *  const result = isPhoneNumber('0123456789');
 *  console.log(result); // prints: true
 *  const result2 = isPhoneNumber('0123-456-789');
 *  console.log(result2); // prints: true
 *  const result3 = isPhoneNumber('+84 76812312');
 *  console.log(result3); // prints: true
 */

export const isPhoneNumber = (value: string | number | null | undefined, customRegex?: RegExp): boolean => {
  if (value === 'undefined' || value === null || value === '') return false;
  const defaultRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const newRegex = customRegex || defaultRegex;
  return newRegex.test(String(value));
}

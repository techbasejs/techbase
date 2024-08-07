const defaultRegex = /^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})$/;

interface PhoneNumberOptions {
  customRegex?: RegExp;
  [key: string]: any;
}
/**
 * Checks if the provided value is a valid phone number.
 *
 * The phone number can match one of the following patterns:
 * /^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})$/ - Japan phone numbers.
 *
 * @param {string | number | null | undefined} value - The value to be checked, which can be either a string, number, null, or undefined.
 * @param {RegExp} [customRegex] - Optional custom regex pattern to validate the phone number.
 * @returns {boolean} Returns `true` if the value is a valid phone number according to the patterns; `false` otherwise.
 * @example
 *  const result = isPhoneNumber('0123456789');
 *  console.log(result); // prints: true
 *  const result2 = isPhoneNumber('090-1234-5678');
 *  console.log(result2); // prints: true
 */

export const isPhoneNumber = (value: string | number | null | undefined, options: PhoneNumberOptions = {}): boolean => {
  if (value === 'undefined' || value === null || value === '') return false;
  const { customRegex } = options;
  const newRegex = customRegex || defaultRegex;
  return newRegex.test(String(value));
}
